import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Copy, ExternalLink, Play, RefreshCw, Search } from "lucide-react";
import { Link } from "react-router-dom";
import {
  getFigureAliasScrapingQueryDetails,
  getFiguresForAliasGenerator,
  type FigureScrapingQuery,
  type FigureAliasGeneratorFilters,
  type FigureAliasGeneratorFigure,
} from "@/api/figureAliasGeneratorApi";
import { getFranchises } from "@/api/franchiseApi";
import {
  getScrapingFigureState,
  getScrapingJobStatus,
  runNinNinGameScraping,
  startScrapingJob,
  type ScrapingFigureState,
  type ScrapingJobData,
  type NinNinGameScrapingResponse,
  type ScrapingMatch,
  type ScrapingQueryResult,
} from "@/api/scrapingRunnerApi";
import Navbar from "@/components/Navbar";
import ApiErrorToast from "@/components/ui/api-error-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LoadingOverlay from "@/components/ui/loading-overlay";
import PageControls from "@/components/ui/page-controls";
import { toast } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useReferenceData } from "@/hooks/useReferenceData";
import { ApiErrorResponse, toClientApiError } from "@/lib/apiError";
import { formatDateTime } from "@/lib/date";
import { defaultPageMeta, getPageContent, getPageMeta } from "@/lib/page";
import type { Franchise } from "@/types/franchise";

const FALLBACK_IMAGE_URL = `${import.meta.env.BASE_URL}placeholder.svg`;
const SCRAPING_QUERY_LIMIT = 20;
const SCRAPING_STATE_LIMIT = 20;

type AliasStateFilter =
  | ""
  | "hasAliases"
  | "noAliases"
  | "hasGeneratedAliases"
  | "noGeneratedAliases"
  | "needsRegeneration"
  | "upToDate";

const getFigureId = (figure: FigureAliasGeneratorFigure | null | undefined) =>
  figure?.figureId || figure?.id;

const getFigureName = (figure: FigureAliasGeneratorFigure | null | undefined) =>
  figure?.figureName || figure?.name || "";

const getFigureSlug = (figure: FigureAliasGeneratorFigure | null | undefined) =>
  figure?.figureSlug || figure?.slug || "";

const getFranchiseName = (figure: FigureAliasGeneratorFigure | null | undefined) =>
  figure?.franchiseName || figure?.franchise?.name || figure?.franchiseId || "-";

const getBrandName = (figure: FigureAliasGeneratorFigure | null | undefined) =>
  figure?.brandName || figure?.brand?.name || figure?.brandId || "-";

const getAliasCount = (figure: FigureAliasGeneratorFigure | null | undefined) =>
  figure?.aliasCount ?? 0;

const getGeneratedAliasCount = (figure: FigureAliasGeneratorFigure | null | undefined) =>
  figure?.generatedAliasCount ?? 0;

const getManualAliasCount = (figure: FigureAliasGeneratorFigure | null | undefined) =>
  figure?.manualAliasCount ?? 0;

const getImportedAliasCount = (figure: FigureAliasGeneratorFigure | null | undefined) =>
  figure?.importedAliasCount ?? 0;

const getScrapedAliasCount = (figure: FigureAliasGeneratorFigure | null | undefined) =>
  figure?.scrapedAliasCount ?? 0;

const figureHasAliases = (figure: FigureAliasGeneratorFigure | null | undefined) =>
  figure?.hasAliases ?? getAliasCount(figure) > 0;

const figureHasGeneratedAliases = (figure: FigureAliasGeneratorFigure | null | undefined) =>
  figure?.hasGeneratedAliases ?? getGeneratedAliasCount(figure) > 0;

const getFigureImageUrl = (figure: FigureAliasGeneratorFigure | null | undefined) =>
  figure?.primaryImageUrl || FALLBACK_IMAGE_URL;

const formatValue = (value: unknown) => {
  if (value === undefined || value === null || value === "") return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

const formatCount = (value: unknown) =>
  typeof value === "number" || typeof value === "string" ? value : "-";

const getResponseArray = <T,>(
  response: NinNinGameScrapingResponse | null | undefined,
  keys: string[]
): T[] => {
  if (!response) return [];

  for (const key of keys) {
    const value = response[key];

    if (Array.isArray(value)) return value as T[];
  }

  return [];
};

const firstDisplayValue = (...values: unknown[]) =>
  values.find((value) => value !== undefined && value !== null && value !== "");

const firstString = (...values: unknown[]) => {
  const value = firstDisplayValue(...values);

  if (value === undefined) return "";

  return String(value);
};

const getMatchTitle = (match: ScrapingMatch) =>
  firstString(match.title, match.sourceTitle, match.name, match.listing?.title) || "-";

const getMatchPrice = (match: ScrapingMatch) => firstDisplayValue(match.price, match.listing?.price);

const getMatchCurrencyCode = (match: ScrapingMatch) =>
  firstString(match.currencyCode, match.listing?.currencyCode);

const getMatchAvailability = (match: ScrapingMatch) =>
  firstDisplayValue(
    match.availability,
    match.listing?.availability,
    match.listing?.rawAvailabilityText
  );

const getMatchScore = (match: ScrapingMatch) => match.score ?? match.matchScore ?? "-";

const getMatchDecision = (match: ScrapingMatch) => match.decision || match.matchDecision || "-";

const getMatchUrl = (match: ScrapingMatch) =>
  firstString(match.url, match.sourceUrl, match.listing?.url);

const getMatchProductCode = (match: ScrapingMatch) =>
  firstDisplayValue(match.productCode, match.listing?.productCode, match.listing?.sourceItemId);

const getMatchJanCode = (match: ScrapingMatch) =>
  firstDisplayValue(match.janCode, match.listing?.janCode);

const getCandidateCountFromResult = (
  result: NinNinGameScrapingResponse | null | undefined,
  resultCandidateMatches = getResponseArray<ScrapingMatch>(result, ["candidateMatches"])
) => {
  const rawCandidateCount = result?.candidateCount ?? resultCandidateMatches.length;
  const parsedCandidateCount = Number(rawCandidateCount);

  return Number.isFinite(parsedCandidateCount) ? parsedCandidateCount : 0;
};

const buildCompletionDescription = (candidateCount: number, minimumScoreText: string) =>
  candidateCount === 0
    ? `Ningun candidato paso el umbral minimo${minimumScoreText}.`
    : `${candidateCount} candidato${candidateCount === 1 ? "" : "s"} paso${
        candidateCount === 1 ? "" : "n"
      } el umbral minimo${minimumScoreText}.`;

const buildGeneratorFilters = (
  franchiseId: string,
  status: string,
  aliasState: AliasStateFilter
): FigureAliasGeneratorFilters => {
  const filters: FigureAliasGeneratorFilters = {};

  if (franchiseId) filters.franchiseId = franchiseId;
  if (status) filters.status = status;

  if (aliasState === "hasAliases") filters.hasAliases = true;
  if (aliasState === "noAliases") filters.hasAliases = false;
  if (aliasState === "hasGeneratedAliases") filters.hasGeneratedAliases = true;
  if (aliasState === "noGeneratedAliases") filters.hasGeneratedAliases = false;
  if (aliasState === "needsRegeneration") filters.mayNeedRegeneration = true;
  if (aliasState === "upToDate") filters.mayNeedRegeneration = false;

  return filters;
};

const toApiError = (error: unknown, fallbackMessage: string): ApiErrorResponse => {
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    "status" in error
  ) {
    return error as ApiErrorResponse;
  }

  return toClientApiError(error, fallbackMessage);
};

const decisionVariant = (
  decision: unknown
): "default" | "secondary" | "outline" | "destructive" => {
  const normalized = String(decision || "").toUpperCase();

  if (normalized === "AUTO_MATCH" || normalized === "MATCH") return "default";
  if (normalized === "REVIEW") return "secondary";
  if (normalized === "DISCARD" || normalized === "REJECT") return "destructive";
  return "outline";
};

const confidenceVariant = (
  confidence: unknown
): "default" | "secondary" | "outline" => {
  const normalized = String(confidence || "").toUpperCase();

  if (normalized === "HIGH") return "default";
  if (normalized === "MEDIUM") return "secondary";
  return "outline";
};

const candidateStatusVariant = (
  status: unknown
): "default" | "secondary" | "outline" | "destructive" => {
  const normalized = String(status || "").toUpperCase();

  if (normalized === "APPROVED") return "default";
  if (normalized === "PENDING_REVIEW") return "secondary";
  if (normalized === "REJECTED") return "destructive";
  return "outline";
};

const loadMethodVariant = (loadMethod?: string | null): "default" | "secondary" | "outline" => {
  const normalized = String(loadMethod || "").toUpperCase();

  if (normalized === "SCRAPED" || normalized === "GENERATED") return "default";
  if (normalized === "MANUAL") return "secondary";
  return "outline";
};

const getStateCount = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const hasPersistedScrapingState = (state: ScrapingFigureState | null) =>
  Boolean(
    state &&
      (getStateCount(state.candidateCount) > 0 ||
        getStateCount(state.pendingReviewCandidateCount) > 0 ||
        getStateCount(state.sourceListingCount) > 0)
  );

const StatusBadge = ({ value }: { value: unknown }) => (
  <Badge variant={formatValue(value) === "Yes" ? "default" : "outline"}>{formatValue(value)}</Badge>
);

const FigureImage = ({ figure }: { figure: FigureAliasGeneratorFigure }) => (
  <div className="h-20 w-16 shrink-0 overflow-hidden rounded-md border bg-muted">
    <img
      src={getFigureImageUrl(figure)}
      alt={getFigureName(figure) || "Figure image"}
      className="h-full w-full object-contain"
      loading="lazy"
      onError={(event) => {
        event.currentTarget.src = FALLBACK_IMAGE_URL;
      }}
    />
  </div>
);

type QueryResultsTableProps = {
  queryResults: ScrapingQueryResult[];
};

const QueryResultsTable = ({ queryResults }: QueryResultsTableProps) => (
  <div className="rounded-lg border bg-background">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Execution</TableHead>
          <TableHead>Query</TableHead>
          <TableHead>Origin</TableHead>
          <TableHead>Alias</TableHead>
          <TableHead>Success</TableHead>
          <TableHead>Results</TableHead>
          <TableHead>Error</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {queryResults.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="h-20 text-center text-muted-foreground">
              No query results returned.
            </TableCell>
          </TableRow>
        ) : (
          queryResults.map((queryResult, index) => (
            <TableRow key={`${queryResult.query || "query"}-${index}`}>
              <TableCell className="whitespace-nowrap">
                {queryResult.executionId ? `#${queryResult.executionId}` : "-"}
              </TableCell>
              <TableCell className="font-medium">{formatValue(queryResult.query)}</TableCell>
              <TableCell>
                <Badge variant="outline">{formatValue(queryResult.querySource)}</Badge>
              </TableCell>
              <TableCell>
                {queryResult.figureAliasId ? (
                  <Badge variant="secondary">Alias #{queryResult.figureAliasId}</Badge>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell>
                <StatusBadge value={queryResult.success} />
              </TableCell>
              <TableCell>{formatCount(queryResult.resultCount)}</TableCell>
              <TableCell className="max-w-md whitespace-normal">
                {formatValue(queryResult.errorMessage)}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>
);

type MatchesTableProps = {
  title: string;
  description: string;
  matches: ScrapingMatch[];
};

const MatchesTable = ({ title, description, matches }: MatchesTableProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Decision</TableHead>
              <TableHead>Codes</TableHead>
              <TableHead>URL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-20 text-center text-muted-foreground">
                  No records returned.
                </TableCell>
              </TableRow>
            ) : (
              matches.map((match, index) => {
                const url = getMatchUrl(match);

                return (
                  <TableRow key={`${getMatchTitle(match)}-${index}`}>
                    <TableCell className="max-w-md whitespace-normal font-medium">
                      {getMatchTitle(match)}
                    </TableCell>
                    <TableCell>
                      {getMatchPrice(match) !== undefined
                        ? `${getMatchPrice(match)} ${getMatchCurrencyCode(match)}`.trim()
                        : "-"}
                    </TableCell>
                    <TableCell>{formatValue(getMatchAvailability(match))}</TableCell>
                    <TableCell>{formatValue(getMatchScore(match))}</TableCell>
                    <TableCell>
                      <Badge variant={confidenceVariant(match.confidence)}>
                        {formatValue(match.confidence)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={decisionVariant(getMatchDecision(match))}>
                        {formatValue(getMatchDecision(match))}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div>Product: {formatValue(getMatchProductCode(match))}</div>
                        <div>JAN: {formatValue(getMatchJanCode(match))}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          Open
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
);

type ScrapingCompletionNoticeProps = {
  candidateCount: number;
  minimumScoreText: string;
};

const ScrapingCompletionNotice = ({
  candidateCount,
  minimumScoreText,
}: ScrapingCompletionNoticeProps) => (
  <div
    className={`rounded-md border p-4 text-sm ${
      candidateCount === 0
        ? "border-secondary/40 bg-secondary/10 text-foreground"
        : "border-primary/30 bg-primary/10 text-foreground"
    }`}
  >
    <p className="font-semibold">Scraping finalizado.</p>
    <p className="mt-1 text-muted-foreground">
      {buildCompletionDescription(candidateCount, minimumScoreText)}
    </p>
  </div>
);

type ScrapingStateSummaryProps = {
  state: ScrapingFigureState | null;
  loading: boolean;
  selectedFigureId?: number;
};

const ScrapingStateSummary = ({
  state,
  loading,
  selectedFigureId,
}: ScrapingStateSummaryProps) => (
  <Card>
    <CardHeader>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <CardTitle className="text-lg">Persisted Scraping State</CardTitle>
          <CardDescription>
            Saved candidates and listings restored from the backend for this figure.
          </CardDescription>
        </div>
        {selectedFigureId && (
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link to={`/figure-admin/candidate-review?figureId=${selectedFigureId}`}>
              Candidate Review
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </Button>
        )}
      </div>
    </CardHeader>
    <CardContent>
      <LoadingOverlay active={loading} label="Loading scraping state...">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-md border bg-background p-3">
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Pending review candidates
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {getStateCount(state?.pendingReviewCandidateCount)}
              </p>
            </div>
            <div className="rounded-md border bg-background p-3">
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Approved candidates
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {getStateCount(state?.approvedCandidateCount)}
              </p>
            </div>
            <div className="rounded-md border bg-background p-3">
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Rejected candidates
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {getStateCount(state?.rejectedCandidateCount)}
              </p>
            </div>
            <div className="rounded-md border bg-background p-3">
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Saved source listings
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {getStateCount(state?.sourceListingCount)}
              </p>
            </div>
          </div>

          {!loading && !hasPersistedScrapingState(state) && (
            <p className="rounded-md border border-dashed bg-background p-4 text-sm text-muted-foreground">
              No saved scraping state yet for this figure.
            </p>
          )}
        </div>
      </LoadingOverlay>
    </CardContent>
  </Card>
);

type PendingReviewSectionProps = {
  candidates: NonNullable<ScrapingFigureState["pendingReviewCandidates"]>;
  selectedFigureId?: number;
  title?: string;
  description?: string;
  showReviewLink?: boolean;
  reviewLinkLabel?: string;
};

const PendingReviewSection = ({
  candidates,
  selectedFigureId,
  title = "Pending Review",
  description = "Candidates persisted by scraping and waiting for manual review.",
  showReviewLink = true,
  reviewLinkLabel = "Review candidates",
}: PendingReviewSectionProps) => {
  if (candidates.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {showReviewLink && selectedFigureId && (
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link to={`/figure-admin/candidate-review?figureId=${selectedFigureId}`}>
                {reviewLinkLabel}
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-lg border bg-background">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Captured</TableHead>
                  <TableHead>URL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidates.map((candidate) => (
                  <TableRow key={candidate.id || `${candidate.sourceTitle}-${candidate.capturedAt}`}>
                    <TableCell className="font-medium">{candidate.id || "-"}</TableCell>
                    <TableCell>
                      <div>{candidate.sourceName || candidate.sourceId || "-"}</div>
                      {candidate.sourceCode && (
                        <div className="text-xs text-muted-foreground">{candidate.sourceCode}</div>
                      )}
                    </TableCell>
                    <TableCell className="max-w-sm whitespace-normal">
                      {candidate.sourceTitle || "-"}
                    </TableCell>
                    <TableCell>
                      {candidate.price !== undefined && candidate.price !== null
                        ? `${candidate.price} ${candidate.currencyCode || ""}`.trim()
                        : "-"}
                    </TableCell>
                    <TableCell>{candidate.matchScore ?? "-"}</TableCell>
                    <TableCell>
                      <Badge variant={candidateStatusVariant(candidate.status)}>
                        {candidate.status || "-"}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDateTime(candidate.capturedAt)}</TableCell>
                    <TableCell>
                      {candidate.sourceUrl ? (
                        <a
                          href={candidate.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          Open
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

type SavedListingsSectionProps = {
  listings: NonNullable<ScrapingFigureState["sourceListings"]>;
};

const SavedListingsSection = ({ listings }: SavedListingsSectionProps) => {
  if (listings.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Saved Listings</CardTitle>
        <CardDescription>
          Source listings already persisted for this figure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-lg border bg-background">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Load Method</TableHead>
                  <TableHead>Captured</TableHead>
                  <TableHead>URL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((listing) => (
                  <TableRow key={listing.id || `${listing.sourceTitle}-${listing.capturedAt}`}>
                    <TableCell className="font-medium">{listing.id || "-"}</TableCell>
                    <TableCell>{listing.sourceName || listing.sourceId || "-"}</TableCell>
                    <TableCell className="max-w-sm whitespace-normal">
                      {listing.sourceTitle || "-"}
                    </TableCell>
                    <TableCell>
                      {listing.price !== undefined && listing.price !== null
                        ? `${listing.price} ${listing.currencyCode || ""}`.trim()
                        : "-"}
                    </TableCell>
                    <TableCell>{listing.listingStatus || "-"}</TableCell>
                    <TableCell>
                      {listing.isAvailable === undefined || listing.isAvailable === null
                        ? "Unknown"
                        : listing.isAvailable
                          ? "Yes"
                          : "No"}
                    </TableCell>
                    <TableCell>
                      {listing.loadMethod ? (
                        <Badge variant={loadMethodVariant(listing.loadMethod)}>
                          {listing.loadMethod}
                        </Badge>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>{formatDateTime(listing.capturedAt)}</TableCell>
                    <TableCell>
                      {listing.sourceUrl ? (
                        <a
                          href={listing.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          Open
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ScrapingRunnerPage = () => {
  const [figures, setFigures] = useState<FigureAliasGeneratorFigure[]>([]);
  const [franchises, setFranchises] = useState<Franchise[]>([]);
  const [loadingFigures, setLoadingFigures] = useState(true);
  const [loadingFranchises, setLoadingFranchises] = useState(true);
  const [search, setSearch] = useState("");
  const [franchiseFilter, setFranchiseFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [aliasStateFilter, setAliasStateFilter] = useState<AliasStateFilter>("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [pageMeta, setPageMeta] = useState(defaultPageMeta);
  const [selectedFigure, setSelectedFigure] = useState<FigureAliasGeneratorFigure | null>(null);
  const [scrapingQueries, setScrapingQueries] = useState<FigureScrapingQuery[]>([]);
  const [queriesLoading, setQueriesLoading] = useState(false);
  const [running, setRunning] = useState(false);
  const [asyncJob, setAsyncJob] = useState<ScrapingJobData | null>(null);
  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [scrapingResult, setScrapingResult] = useState<NinNinGameScrapingResponse | null>(null);
  const [scrapingState, setScrapingState] = useState<ScrapingFigureState | null>(null);
  const [scrapingStateLoading, setScrapingStateLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiErrorResponse | null>(null);
  const { referenceData } = useReferenceData();

  const selectedFigureId = getFigureId(selectedFigure);
  const queryResults = useMemo(
    () => getResponseArray<ScrapingQueryResult>(scrapingResult, ["queryResults"]),
    [scrapingResult]
  );
  const candidateMatches = useMemo(
    () => getResponseArray<ScrapingMatch>(scrapingResult, ["candidateMatches"]),
    [scrapingResult]
  );
  const matches = useMemo(
    () =>
      getResponseArray<ScrapingMatch>(scrapingResult, [
        "matches",
        "weightedMatches",
        "allWeightedMatches",
        "allMatches",
        "matchResults",
        "matchedResults",
      ]),
    [scrapingResult]
  );
  const rawResults = useMemo(
    () => getResponseArray<ScrapingMatch>(scrapingResult, ["results", "rawResults", "scrapedResults"]),
    [scrapingResult]
  );
  const pendingReviewCandidates = scrapingState?.pendingReviewCandidates || [];
  const recentCandidates = scrapingState?.recentCandidates || [];
  const sourceListings = scrapingState?.sourceListings || [];
  const candidateCount = getCandidateCountFromResult(scrapingResult, candidateMatches);
  const minimumScoreText =
    scrapingResult?.minimumCandidateScore !== undefined && scrapingResult?.minimumCandidateScore !== null
      ? ` de ${scrapingResult.minimumCandidateScore}`
      : "";
  const rawScrapingJson = useMemo(
    () => (scrapingResult ? JSON.stringify(scrapingResult, null, 2) : ""),
    [scrapingResult]
  );
  const scrapingQueryTexts = useMemo(
    () => scrapingQueries.map((query) => query.query),
    [scrapingQueries]
  );

  const fetchFigures = useCallback(async () => {
    setLoadingFigures(true);

    try {
      const data = await getFiguresForAliasGenerator(
        page,
        pageSize,
        search,
        buildGeneratorFilters(franchiseFilter, statusFilter, aliasStateFilter)
      );
      setFigures(getPageContent<FigureAliasGeneratorFigure>(data));
      setPageMeta(getPageMeta<FigureAliasGeneratorFigure>(data, pageSize));
    } catch (error) {
      setApiError(toApiError(error, "Error loading figures."));
    } finally {
      setLoadingFigures(false);
    }
  }, [aliasStateFilter, franchiseFilter, page, pageSize, search, statusFilter]);

  const fetchFranchises = useCallback(async () => {
    setLoadingFranchises(true);

    try {
      setFranchises(await getFranchises());
    } catch (error) {
      setApiError(toApiError(error, "Error loading franchises."));
    } finally {
      setLoadingFranchises(false);
    }
  }, []);

  const fetchScrapingQueries = useCallback(
    async () => {
      if (!selectedFigureId) return;

      setQueriesLoading(true);

      try {
        setScrapingQueries(await getFigureAliasScrapingQueryDetails(selectedFigureId, SCRAPING_QUERY_LIMIT));
      } catch (error) {
        setApiError(toApiError(error, "Error loading scraping queries."));
      } finally {
        setQueriesLoading(false);
      }
    },
    [selectedFigureId]
  );

  const fetchScrapingState = useCallback(
    async () => {
      if (!selectedFigureId) return;

      setScrapingStateLoading(true);

      try {
        setScrapingState(await getScrapingFigureState(selectedFigureId, SCRAPING_STATE_LIMIT));
      } catch (error) {
        setApiError(toApiError(error, "Error loading persisted scraping state."));
      } finally {
        setScrapingStateLoading(false);
      }
    },
    [selectedFigureId]
  );

  useEffect(() => {
    fetchFigures();
  }, [fetchFigures]);

  useEffect(() => {
    fetchFranchises();
  }, [fetchFranchises]);

  useEffect(() => {
    setScrapingQueries([]);
    setScrapingResult(null);
    setScrapingState(null);
    setAsyncJob(null);

    if (selectedFigureId) {
      fetchScrapingQueries();
      fetchScrapingState();
    }
  }, [fetchScrapingQueries, fetchScrapingState, selectedFigureId]);

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current !== null) {
      clearTimeout(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }, []);

  const pollJobStatus = useCallback(
    async (runId: string) => {
      try {
        const response = await getScrapingJobStatus(runId);
        const job = response.data;

        setAsyncJob(job);

        if (job.status === "RUNNING") {
          pollTimerRef.current = setTimeout(() => pollJobStatus(runId), 3000);
        } else {
          setRunning(false);
          await fetchScrapingState();
          if (job.status === "COMPLETED") {
            toast.success("Scraping finalizado", {
              description: `${job.totalSaved} resultado${job.totalSaved === 1 ? "" : "s"} guardado${job.totalSaved === 1 ? "" : "s"}.`,
            });
          } else {
            toast.error("Scraping fallido", { description: job.errorMessage || "Error desconocido." });
          }
        }
      } catch (error) {
        stopPolling();
        setRunning(false);
        setApiError(toApiError(error, "Error al obtener estado del job de scraping."));
      }
    },
    [fetchScrapingState, stopPolling]
  );

  useEffect(() => () => stopPolling(), [stopPolling]);

  const handleSelectFigure = (figure: FigureAliasGeneratorFigure) => {
    setSelectedFigure(figure);
  };

  const handleRunScraping = async () => {
    if (!selectedFigureId) return;

    setRunning(true);
    setAsyncJob(null);
    setApiError(null);

    try {
      const result = await runNinNinGameScraping(selectedFigureId);
      const resultCandidateCount = getCandidateCountFromResult(result);
      const resultMinimumScoreText =
        result.minimumCandidateScore !== undefined && result.minimumCandidateScore !== null
          ? ` de ${result.minimumCandidateScore}`
          : "";

      setScrapingResult(result);
      await fetchScrapingState();
      toast.success("Scraping finalizado", {
        description: buildCompletionDescription(resultCandidateCount, resultMinimumScoreText),
      });
      setRunning(false);
    } catch (syncError) {
      const apiErr = toApiError(syncError, "Error running Nin-Nin Game scraping.");

      if (apiErr.status === 503) {
        try {
          const jobResponse = await startScrapingJob("NIN_NIN_GAME", selectedFigureId);
          setAsyncJob(jobResponse.data);
          toast.info("Scraping en proceso", {
            description: "El scraping corre en background. Actualizando estado...",
          });
          pollTimerRef.current = setTimeout(() => pollJobStatus(jobResponse.data.runId), 3000);
        } catch (asyncError) {
          setRunning(false);
          setApiError(toApiError(asyncError, "Error iniciando job de scraping."));
        }
      } else {
        setRunning(false);
        setApiError(apiErr);
      }
    }
  };

  const handleCopyRawJson = async () => {
    if (!rawScrapingJson) return;

    try {
      await navigator.clipboard.writeText(rawScrapingJson);
      toast.success("JSON copiado");
    } catch {
      toast.error("No se pudo copiar el JSON");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ApiErrorToast error={apiError} onClose={() => setApiError(null)} />
      <LoadingOverlay
        active={running && !asyncJob}
        fullscreen
        message="Running Nin-Nin Game scraping..."
      />

      <main className="container py-10">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Figure Scraping Runner</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Select a figure, inspect its scraping queries, and run Nin-Nin Game scraping manually.
          </p>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(24rem,0.85fr)_minmax(0,1.45fr)]">
          <section className="rounded-lg border bg-card p-4">
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(0);
                  }}
                  placeholder="Search figures"
                  className="pl-9"
                />
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                <select
                  value={franchiseFilter}
                  disabled={loadingFranchises}
                  onChange={(event) => {
                    setFranchiseFilter(event.target.value);
                    setPage(0);
                  }}
                  className="rounded border border-input bg-background p-2 text-sm text-foreground"
                >
                  <option value="">{loadingFranchises ? "Loading franchises..." : "All franchises"}</option>
                  {franchises.map((franchise) => (
                    <option key={franchise.id} value={franchise.id}>
                      {franchise.name}
                    </option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(event) => {
                    setStatusFilter(event.target.value);
                    setPage(0);
                  }}
                  className="rounded border border-input bg-background p-2 text-sm text-foreground"
                >
                  <option value="">All statuses</option>
                  {referenceData.figureStatuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>

                <select
                  value={aliasStateFilter}
                  onChange={(event) => {
                    setAliasStateFilter(event.target.value as AliasStateFilter);
                    setPage(0);
                  }}
                  className="rounded border border-input bg-background p-2 text-sm text-foreground"
                >
                  <option value="">All alias states</option>
                  <option value="noAliases">No aliases</option>
                  <option value="hasAliases">Has aliases</option>
                  <option value="noGeneratedAliases">No generated aliases</option>
                  <option value="hasGeneratedAliases">Has generated aliases</option>
                  <option value="needsRegeneration">Needs regeneration</option>
                  <option value="upToDate">Up to date</option>
                </select>
              </div>

              <p className="text-sm text-muted-foreground">
                {figures.length} shown - {pageMeta.totalElements} total records
              </p>
            </div>

            <div className="mt-4 rounded-lg border bg-background">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">ID</TableHead>
                    <TableHead className="w-20">Image</TableHead>
                    <TableHead>Figure</TableHead>
                    <TableHead>Alias state</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingFigures ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-28 text-center text-muted-foreground">
                        Loading figures...
                      </TableCell>
                    </TableRow>
                  ) : figures.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-28 text-center text-muted-foreground">
                        No figures found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    figures.map((figure) => {
                      const figureId = getFigureId(figure);
                      const selected = selectedFigureId === figureId;

                      return (
                        <TableRow
                          key={figureId}
                          className={`cursor-pointer ${selected ? "bg-muted" : ""}`}
                          onClick={() => handleSelectFigure(figure)}
                        >
                          <TableCell className="font-medium">{figureId}</TableCell>
                          <TableCell>
                            <FigureImage figure={figure} />
                          </TableCell>
                          <TableCell>
                            <p className="line-clamp-3 font-medium text-foreground">
                              {getFigureName(figure) || "-"}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {getFranchiseName(figure)} / {getBrandName(figure)}
                            </p>
                            {figure.lineName && (
                              <p className="mt-1 text-xs text-muted-foreground">{figure.lineName}</p>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              <Badge variant={figureHasAliases(figure) ? "secondary" : "outline"}>
                                {getAliasCount(figure)} total
                              </Badge>
                              <Badge variant={figureHasGeneratedAliases(figure) ? "default" : "outline"}>
                                {getGeneratedAliasCount(figure)} generated
                              </Badge>
                              {figure.mayNeedRegeneration && (
                                <Badge variant="secondary">Needs regen</Badge>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4">
              <PageControls
                page={pageMeta.page}
                size={pageMeta.size}
                totalElements={pageMeta.totalElements}
                totalPages={pageMeta.totalPages}
                disabled={loadingFigures}
                onPageChange={setPage}
                onSizeChange={(size) => {
                  setPageSize(size);
                  setPage(0);
                }}
              />
            </div>
          </section>

          <section className="space-y-6">
              {!selectedFigure ? (
                <div className="flex min-h-[28rem] items-center justify-center rounded-lg border border-dashed bg-card p-8 text-center text-sm text-muted-foreground">
                  Select a figure to inspect scraping queries and run the manual scraper.
                </div>
              ) : (
                <>
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex min-w-0 gap-4">
                          <FigureImage figure={selectedFigure} />
                          <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                              Selected Figure
                            </p>
                            <CardTitle className="mt-2 whitespace-normal break-words text-2xl">
                              {getFigureName(selectedFigure) || `Figure ${selectedFigureId}`}
                            </CardTitle>
                            <CardDescription className="mt-2">
                              {getFranchiseName(selectedFigure)} / {getBrandName(selectedFigure)}
                            </CardDescription>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Badge variant="outline">ID {selectedFigureId}</Badge>
                              {selectedFigure.status && <Badge variant="outline">{selectedFigure.status}</Badge>}
                              {selectedFigure.lineName && <Badge variant="outline">{selectedFigure.lineName}</Badge>}
                              {getFigureSlug(selectedFigure) && (
                                <Badge variant="outline">{getFigureSlug(selectedFigure)}</Badge>
                              )}
                              <Badge variant={figureHasAliases(selectedFigure) ? "secondary" : "outline"}>
                                {getAliasCount(selectedFigure)} aliases
                              </Badge>
                              <Badge variant={figureHasGeneratedAliases(selectedFigure) ? "default" : "outline"}>
                                {getGeneratedAliasCount(selectedFigure)} generated
                              </Badge>
                              <Badge variant="outline">
                                {getManualAliasCount(selectedFigure)} manual
                              </Badge>
                              <Badge variant="outline">
                                {getImportedAliasCount(selectedFigure)} imported
                              </Badge>
                              <Badge variant="outline">
                                {getScrapedAliasCount(selectedFigure)} scraped
                              </Badge>
                              {selectedFigure.mayNeedRegeneration && (
                                <Badge variant="secondary">Needs regeneration</Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <Button
                          type="button"
                          className="gap-2"
                          disabled={running || !selectedFigureId}
                          onClick={handleRunScraping}
                        >
                          <Play className="h-4 w-4" />
                          Run Nin-Nin Game Scraping
                        </Button>
                      </div>
                    </CardHeader>
                    {(!figureHasAliases(selectedFigure) || selectedFigure.mayNeedRegeneration) && (
                      <CardContent>
                        <div className="rounded-md border border-secondary/40 bg-secondary/10 p-3 text-sm text-foreground">
                          This figure has no aliases or may need regeneration. You can still run scraping,
                          but generating aliases first may improve matching.
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  <ScrapingStateSummary
                    state={scrapingState}
                    loading={scrapingStateLoading}
                    selectedFigureId={selectedFigureId}
                  />

                  <PendingReviewSection
                    candidates={pendingReviewCandidates}
                    selectedFigureId={selectedFigureId}
                  />

                  <PendingReviewSection
                    title="Recent Candidates"
                    description="Latest persisted candidates for this figure, including reviewed items."
                    candidates={recentCandidates}
                    selectedFigureId={selectedFigureId}
                    showReviewLink={false}
                  />

                  <SavedListingsSection listings={sourceListings} />

                  {asyncJob && (
                    <div
                      className={`rounded-md border p-4 text-sm ${
                        asyncJob.status === "FAILED"
                          ? "border-destructive/40 bg-destructive/10 text-foreground"
                          : asyncJob.status === "COMPLETED"
                            ? "border-primary/30 bg-primary/10 text-foreground"
                            : "border-secondary/40 bg-secondary/10 text-foreground"
                      }`}
                    >
                      <p className="font-semibold">
                        Job asíncrono:{" "}
                        <span className="uppercase">{asyncJob.status}</span>
                      </p>
                      <p className="mt-1 text-muted-foreground">
                        Queries: {asyncJob.queryCount} · Encontrados: {asyncJob.totalFound} · Guardados: {asyncJob.totalSaved}
                        {asyncJob.errorMessage && ` · Error: ${asyncJob.errorMessage}`}
                      </p>
                    </div>
                  )}

                  {scrapingResult && (
                    <ScrapingCompletionNotice
                      candidateCount={candidateCount}
                      minimumScoreText={minimumScoreText}
                    />
                  )}

                  <Card>
                    <CardHeader>
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <CardTitle className="text-lg">Queries that will be used for scraping</CardTitle>
                          <CardDescription>
                            The backend builds these from figure name, product codes, JAN code, saved aliases,
                            and generated aliases. Requesting up to {SCRAPING_QUERY_LIMIT} total queries.
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="gap-2"
                            disabled={queriesLoading || running}
                            onClick={() => fetchScrapingQueries()}
                          >
                            <RefreshCw className="h-3.5 w-3.5" />
                            Refresh
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {queriesLoading ? (
                        <p className="rounded-md border border-dashed bg-background p-4 text-sm text-muted-foreground">
                          Loading scraping queries...
                        </p>
                      ) : scrapingQueries.length === 0 ? (
                        <p className="rounded-md border border-dashed bg-background p-4 text-sm text-muted-foreground">
                          No scraping queries available.
                        </p>
                      ) : (
                        <ol className="space-y-2">
                          {scrapingQueries.map((query, index) => (
                            <li key={`${query.query}-${index}`} className="rounded-md border bg-background p-3 text-sm">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-semibold text-primary">{index + 1}.</span>
                                <span className="min-w-0 flex-1 text-foreground">{query.query}</span>
                                <Badge variant="outline">{query.source}</Badge>
                                {query.figureAliasId !== null && (
                                  <Badge variant="secondary">Alias #{query.figureAliasId}</Badge>
                                )}
                              </div>
                              {query.reason && (
                                <p className="mt-2 text-xs text-muted-foreground">{query.reason}</p>
                              )}
                            </li>
                          ))}
                        </ol>
                      )}
                    </CardContent>
                  </Card>

                  {scrapingResult && (
                    <>
                      <Card>
                        <CardHeader>
                          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                            <div>
                              <CardTitle className="text-lg">Scraping Result</CardTitle>
                              <CardDescription>
                                Processed response from Nin-Nin Game scraping.
                              </CardDescription>
                            </div>
                            {candidateCount > 0 && selectedFigureId && (
                              <Button asChild variant="outline" className="gap-2">
                                <Link to={`/figure-admin/candidate-review?figureId=${selectedFigureId}`}>
                                  Go to Candidate Review
                                  <ExternalLink className="h-4 w-4" />
                                </Link>
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
                            <div className="rounded-md border bg-background p-3">
                              <p className="text-xs font-medium uppercase text-muted-foreground">Run ID</p>
                              <p className="mt-1 text-sm font-semibold text-foreground">
                                {scrapingResult.scrapingRunId ? `#${scrapingResult.scrapingRunId}` : "-"}
                              </p>
                            </div>
                            <div className="rounded-md border bg-background p-3">
                              <p className="text-xs font-medium uppercase text-muted-foreground">Figure</p>
                              <p className="mt-1 text-sm font-semibold text-foreground">
                                {scrapingResult.figureName || getFigureName(selectedFigure)}
                              </p>
                            </div>
                            <div className="rounded-md border bg-background p-3">
                              <p className="text-xs font-medium uppercase text-muted-foreground">Source</p>
                              <p className="mt-1 text-sm font-semibold text-foreground">
                                {formatValue(scrapingResult.sourceCode)}
                              </p>
                            </div>
                            <div className="rounded-md border bg-background p-3">
                              <p className="text-xs font-medium uppercase text-muted-foreground">Total</p>
                              <p className="mt-1 text-2xl font-bold text-foreground">
                                {formatCount(scrapingResult.totalResults)}
                              </p>
                            </div>
                            <div className="rounded-md border bg-background p-3">
                              <p className="text-xs font-medium uppercase text-muted-foreground">Candidates</p>
                              <p className="mt-1 text-2xl font-bold text-foreground">{candidateCount}</p>
                            </div>
                            <div className="rounded-md border bg-background p-3">
                              <p className="text-xs font-medium uppercase text-muted-foreground">Found</p>
                              <div className="mt-2">
                                <StatusBadge value={scrapingResult.foundResults} />
                              </div>
                            </div>
                            <div className="rounded-md border bg-background p-3">
                              <p className="text-xs font-medium uppercase text-muted-foreground">Errors</p>
                              <div className="mt-2">
                                <Badge variant={scrapingResult.hasErrors ? "destructive" : "outline"}>
                                  {scrapingResult.hasErrors ? "Yes" : "No"}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-semibold text-foreground">Executed Queries</h3>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {(scrapingResult.queries || scrapingQueryTexts).length === 0 ? (
                                <Badge variant="outline">No queries returned</Badge>
                              ) : (
                                (scrapingResult.queries || scrapingQueryTexts).map((query, index) => (
                                  <Badge key={`${query}-${index}`} variant="outline">
                                    {query}
                                  </Badge>
                                ))
                              )}
                            </div>
                          </div>

                          <div>
                            <h3 className="mb-2 text-sm font-semibold text-foreground">Query Results</h3>
                            <QueryResultsTable queryResults={queryResults} />
                          </div>
                        </CardContent>
                      </Card>

                      <MatchesTable
                        title="Candidate Matches"
                        description="Results that passed the minimum score and should be reviewed."
                        matches={candidateMatches}
                      />

                      <MatchesTable
                        title="All Weighted Matches"
                        description="All scored matches returned by the scraper."
                        matches={matches}
                      />

                      <MatchesTable
                        title="Raw Scraped Results"
                        description="Raw source results before final candidate review."
                        matches={rawResults}
                      />

                      <Card>
                        <CardHeader>
                          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                            <div>
                              <CardTitle className="text-lg">Raw JSON</CardTitle>
                              <CardDescription>Full backend response for troubleshooting.</CardDescription>
                            </div>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="gap-2"
                              onClick={handleCopyRawJson}
                            >
                              <Copy className="h-3.5 w-3.5" />
                              Copy JSON
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <details className="rounded-lg border bg-background p-4">
                            <summary className="cursor-pointer text-sm font-medium text-foreground">
                              Show raw response
                            </summary>
                            <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap rounded-md bg-muted p-4 text-xs text-muted-foreground">
                              {rawScrapingJson}
                            </pre>
                          </details>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </>
              )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default ScrapingRunnerPage;
