import { useCallback, useEffect, useMemo, useState } from "react";
import { Eye, History, RefreshCw, Search, Wand2 } from "lucide-react";
import {
  generateFigureAliases,
  getExistingFigureAliases,
  getFigureAliasScrapingQueries,
  getFiguresForAliasGenerator,
  previewGeneratedFigureAliases,
  type ExistingFigureAlias,
  type FigureAliasGenerationResponse,
  type FigureAliasGeneratorFilters,
  type FigureAliasGeneratorFigure,
  type GeneratedFigureAlias,
} from "@/api/figureAliasGeneratorApi";
import { getFranchises } from "@/api/franchiseApi";
import Navbar from "@/components/Navbar";
import {
  AliasDecisionCell,
  AliasOutcomeCell,
  AliasUsageCell,
} from "@/components/figureAlias/AliasUsageSummary";
import FigureAliasHistoryDialog from "@/components/figureAlias/FigureAliasHistoryDialog";
import FigureAliasUsageFilters from "@/components/figureAlias/FigureAliasUsageFilters";
import ApiErrorToast from "@/components/ui/api-error-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import LoadingOverlay from "@/components/ui/loading-overlay";
import PageControls from "@/components/ui/page-controls";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
import type { ReferenceDataOption } from "@/types/referenceData";
import type { FigureAliasUsageFilter } from "@/types/figureAlias";

const FALLBACK_IMAGE_URL = `${import.meta.env.BASE_URL}placeholder.svg`;

const getFigureId = (figure: FigureAliasGeneratorFigure | null | undefined) =>
  figure?.figureId || figure?.id;

const getFigureName = (figure: FigureAliasGeneratorFigure | null | undefined) =>
  figure?.figureName || figure?.name || "";

const getFigureSlug = (figure: FigureAliasGeneratorFigure) =>
  figure.figureSlug || figure.slug || "";

const getFranchiseName = (figure: FigureAliasGeneratorFigure) =>
  figure.franchiseName || figure.franchise?.name || figure.franchiseId || "-";

const getBrandName = (figure: FigureAliasGeneratorFigure) =>
  figure.brandName || figure.brand?.name || figure.brandId || "-";

const getAliasCount = (figure: FigureAliasGeneratorFigure) => figure.aliasCount ?? 0;

const getGeneratedAliasCount = (figure: FigureAliasGeneratorFigure) =>
  figure.generatedAliasCount ?? 0;

const figureHasAliases = (figure: FigureAliasGeneratorFigure) =>
  figure.hasAliases ?? getAliasCount(figure) > 0;

const figureHasGeneratedAliases = (figure: FigureAliasGeneratorFigure) =>
  figure.hasGeneratedAliases ?? getGeneratedAliasCount(figure) > 0;

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

const formatValue = (value: string | number | null | undefined) =>
  value === undefined || value === null || value === "" ? "-" : value;

const normalizeUiText = (value: string | number | null | undefined) =>
  String(value || "").trim().toLowerCase().replace(/\s+/g, " ");

const looksLikeFixedQueryAlias = (
  alias: GeneratedFigureAlias,
  figure: FigureAliasGeneratorFigure | null
) => {
  const source = String(alias.generationSource || "").toUpperCase();

  return (
    source.includes("JAN") ||
    source.includes("OFFICIAL_PRODUCT_CODE") ||
    normalizeUiText(alias.alias) === normalizeUiText(getFigureName(figure))
  );
};

const getOptionLabel = (
  options: ReferenceDataOption[],
  value: string | number | null | undefined
) => {
  const normalizedValue = value === undefined || value === null ? "" : String(value);
  return options.find((option) => option.value === normalizedValue)?.label || formatValue(value);
};

const getFigureImageUrl = (figure: FigureAliasGeneratorFigure) =>
  figure.primaryImageUrl || FALLBACK_IMAGE_URL;

const FigureThumbnail = ({ figure }: { figure: FigureAliasGeneratorFigure }) => {
  const imageUrl = getFigureImageUrl(figure);
  const altText = getFigureName(figure) || "Figure image";

  return (
    <HoverCard openDelay={150} closeDelay={80}>
      <HoverCardTrigger asChild>
        <div className="h-14 w-11 cursor-zoom-in overflow-hidden rounded-md border bg-muted">
          <img
            src={imageUrl}
            alt={altText}
            className="h-full w-full object-contain"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.src = FALLBACK_IMAGE_URL;
            }}
          />
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="right" align="center" className="w-56 p-2">
        <div className="aspect-[4/5] overflow-hidden rounded-md bg-muted">
          <img
            src={imageUrl}
            alt={altText}
            className="h-full w-full object-contain"
            onError={(event) => {
              event.currentTarget.src = FALLBACK_IMAGE_URL;
            }}
          />
        </div>
        <p className="mt-2 line-clamp-2 text-xs font-medium text-popover-foreground">
          {getFigureName(figure) || `Figure ${getFigureId(figure) || ""}`.trim()}
        </p>
      </HoverCardContent>
    </HoverCard>
  );
};

const priorityVariant = (
  priority: string | number | null | undefined
): "default" | "secondary" | "outline" => {
  const normalized = String(priority || "").toUpperCase();

  if (normalized === "HIGH") return "default";
  if (normalized === "MEDIUM") return "secondary";
  return "outline";
};

const methodVariant = (method: string | null | undefined): "default" | "secondary" | "outline" => {
  const normalized = String(method || "").toUpperCase();

  if (normalized === "GENERATED") return "default";
  if (normalized === "MANUAL") return "secondary";
  return "outline";
};

type PreviewAliasesTableProps = {
  aliases: GeneratedFigureAlias[];
  loading: boolean;
  priorityOptions: ReferenceDataOption[];
  sourceOptions: ReferenceDataOption[];
};

const PreviewAliasesTable = ({
  aliases,
  loading,
  priorityOptions,
  sourceOptions,
}: PreviewAliasesTableProps) => (
  <div className="overflow-hidden rounded-lg border bg-background">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Alias</TableHead>
          <TableHead>Normalized</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>State</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
              Loading preview...
            </TableCell>
          </TableRow>
        ) : aliases.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
              No preview generated yet.
            </TableCell>
          </TableRow>
        ) : (
          aliases.map((alias, index) => (
            <TableRow key={`${alias.alias}-${index}`}>
              <TableCell className="font-medium">{formatValue(alias.alias)}</TableCell>
              <TableCell>{formatValue(alias.aliasNormalized)}</TableCell>
              <TableCell>
                <Badge variant={priorityVariant(alias.priority)}>
                  {getOptionLabel(priorityOptions, alias.priority)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{getOptionLabel(sourceOptions, alias.generationSource)}</Badge>
              </TableCell>
              <TableCell className="max-w-sm whitespace-normal">{formatValue(alias.reason)}</TableCell>
              <TableCell>
                {alias.alreadyExists ? (
                  <Badge variant="outline">Already exists</Badge>
                ) : (
                  <Badge variant="secondary">New candidate</Badge>
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>
);

type ExistingAliasesTableProps = {
  aliases: ExistingFigureAlias[];
  loading: boolean;
  loadMethodOptions: ReferenceDataOption[];
  priorityOptions: ReferenceDataOption[];
  sourceOptions: ReferenceDataOption[];
  onHistory: (alias: ExistingFigureAlias) => void;
};

const ExistingAliasesTable = ({
  aliases,
  loading,
  loadMethodOptions,
  priorityOptions,
  sourceOptions,
  onHistory,
}: ExistingAliasesTableProps) => (
  <div className="overflow-hidden rounded-lg border bg-background">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Alias</TableHead>
          <TableHead>Normalized</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Generation Source</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Alias Source</TableHead>
          <TableHead>Scraping Usage</TableHead>
          <TableHead>Outcomes</TableHead>
          <TableHead>Decisions</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={12} className="h-24 text-center text-muted-foreground">
              Loading aliases...
            </TableCell>
          </TableRow>
        ) : aliases.length === 0 ? (
          <TableRow>
            <TableCell colSpan={12} className="h-24 text-center text-muted-foreground">
              No aliases found for this figure.
            </TableCell>
          </TableRow>
        ) : (
          aliases.map((alias) => (
            <TableRow key={alias.id || alias.alias}>
              <TableCell className="font-medium">{formatValue(alias.alias)}</TableCell>
              <TableCell>{formatValue(alias.aliasNormalized)}</TableCell>
              <TableCell>
                <Badge variant={methodVariant(alias.loadMethod)}>
                  {getOptionLabel(loadMethodOptions, alias.loadMethod)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={priorityVariant(alias.generationPriority)}>
                  {getOptionLabel(priorityOptions, alias.generationPriority)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{getOptionLabel(sourceOptions, alias.generationSource)}</Badge>
              </TableCell>
              <TableCell className="max-w-sm whitespace-normal">
                {formatValue(alias.generationReason)}
              </TableCell>
              <TableCell>{alias.sourceName || formatValue(alias.sourceId)}</TableCell>
              <TableCell><AliasUsageCell alias={alias} /></TableCell>
              <TableCell><AliasOutcomeCell alias={alias} /></TableCell>
              <TableCell><AliasDecisionCell alias={alias} /></TableCell>
              <TableCell>{formatDateTime(alias.createdAt)}</TableCell>
              <TableCell className="text-right">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="gap-2"
                  disabled={!alias.id}
                  onClick={() => onHistory(alias)}
                >
                  <History className="h-3.5 w-3.5" />
                  History
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>
);

type GenerationSummaryProps = {
  result: FigureAliasGenerationResponse | null;
};

const GenerationSummary = ({ result }: GenerationSummaryProps) => {
  if (!result) return null;

  const items = [
    ["Generated", result.generatedCount ?? 0],
    ["Saved", result.savedCount ?? 0],
    ["Skipped existing", result.skippedExistingCount ?? 0],
    ["Scraping queries", result.scrapingQueryCount ?? 0],
  ];

  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([label, value]) => (
          <div key={label} className="rounded-md border bg-background p-3">
            <p className="text-xs font-medium uppercase text-muted-foreground">{label}</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
          </div>
        ))}
      </div>
      {(result.savedCount ?? 0) === 0 && (
        <p className="mt-3 rounded-md border border-dashed bg-background p-3 text-sm text-muted-foreground">
          No new aliases were saved.
        </p>
      )}
    </div>
  );
};

type AliasStateFilter =
  | ""
  | "hasAliases"
  | "noAliases"
  | "hasGeneratedAliases"
  | "noGeneratedAliases"
  | "needsRegeneration"
  | "upToDate";

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

const FigureAliasGeneratorPage = () => {
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
  const [existingAliases, setExistingAliases] = useState<ExistingFigureAlias[]>([]);
  const [loadingExistingAliases, setLoadingExistingAliases] = useState(false);
  const [existingAliasPage, setExistingAliasPage] = useState(0);
  const [existingAliasPageSize, setExistingAliasPageSize] = useState(20);
  const [existingAliasPageMeta, setExistingAliasPageMeta] = useState(defaultPageMeta);
  const [existingAliasUsageFilter, setExistingAliasUsageFilter] = useState<FigureAliasUsageFilter>("");
  const [existingAliasSourceFilter, setExistingAliasSourceFilter] = useState("");
  const [existingAliasLastUsedBefore, setExistingAliasLastUsedBefore] = useState("");
  const [historyAlias, setHistoryAlias] = useState<ExistingFigureAlias | null>(null);
  const [previewResult, setPreviewResult] = useState<FigureAliasGenerationResponse | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<FigureAliasGenerationResponse | null>(null);
  const [scrapingQueries, setScrapingQueries] = useState<string[]>([]);
  const [queriesLoading, setQueriesLoading] = useState(false);
  const [queryMax, setQueryMax] = useState(5);
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState<ApiErrorResponse | null>(null);
  const [activeTab, setActiveTab] = useState("generated");
  const { referenceData } = useReferenceData();

  const selectedFigureId = getFigureId(selectedFigure);

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

  const fetchExistingAliases = useCallback(async () => {
    if (!selectedFigureId) return;

    setLoadingExistingAliases(true);

    try {
      const data = await getExistingFigureAliases(
        selectedFigureId,
        existingAliasPage,
        existingAliasPageSize,
        {
          usedForScraping: existingAliasUsageFilter
            ? existingAliasUsageFilter === "used"
            : undefined,
          sourceCode: existingAliasSourceFilter || undefined,
          lastUsedBefore: existingAliasLastUsedBefore || undefined,
        }
      );
      setExistingAliases(getPageContent<ExistingFigureAlias>(data));
      setExistingAliasPageMeta(getPageMeta<ExistingFigureAlias>(data, existingAliasPageSize));
    } catch (error) {
      setApiError(toApiError(error, "Error loading existing aliases."));
    } finally {
      setLoadingExistingAliases(false);
    }
  }, [
    existingAliasLastUsedBefore,
    existingAliasPage,
    existingAliasPageSize,
    existingAliasSourceFilter,
    existingAliasUsageFilter,
    selectedFigureId,
  ]);

  const fetchScrapingQueries = useCallback(async (max = queryMax) => {
    if (!selectedFigureId) return;

    setQueriesLoading(true);

    try {
      setScrapingQueries(await getFigureAliasScrapingQueries(selectedFigureId, max));
    } catch (error) {
      setApiError(toApiError(error, "Error loading scraping queries."));
    } finally {
      setQueriesLoading(false);
    }
  }, [queryMax, selectedFigureId]);

  const fetchGeneratedPreview = useCallback(
    async (showLoading = true) => {
      if (!selectedFigureId) return null;

      if (showLoading) {
        setPreviewLoading(true);
      }

      try {
        const result = await previewGeneratedFigureAliases(selectedFigureId);
        setPreviewResult(result);
        return result;
      } catch (error) {
        setApiError(toApiError(error, "Error previewing aliases."));
        return null;
      } finally {
        if (showLoading) {
          setPreviewLoading(false);
        }
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
    setExistingAliases([]);
    setExistingAliasPage(0);
    setExistingAliasPageMeta(defaultPageMeta);
    setPreviewResult(null);
    setGenerationResult(null);
    setScrapingQueries([]);
    setQueryMax(5);
    setSuccessMessage("");
    setActiveTab("generated");

    if (selectedFigureId) {
      fetchScrapingQueries(5);
    }
  }, [selectedFigureId]);

  useEffect(() => {
    fetchExistingAliases();
  }, [fetchExistingAliases]);

  const handleSelectFigure = (figure: FigureAliasGeneratorFigure) => {
    setSelectedFigure(figure);
  };

  const handlePreviewAliases = async () => {
    if (!selectedFigureId) return;

    setPreviewLoading(true);
    setSuccessMessage("");
    setActiveTab("generated");

    await fetchGeneratedPreview(false);
    setPreviewLoading(false);
  };

  const handleGenerateAliases = async () => {
    if (!selectedFigureId) return;

    setGenerating(true);
    setSuccessMessage("");

    try {
      const result = await generateFigureAliases(selectedFigureId);
      setGenerationResult(result);
      setScrapingQueries(result.scrapingQueries || []);
      setSelectedFigure((current) => {
        if (!current || getFigureId(current) !== selectedFigureId) return current;

        const savedCount = result.savedCount ?? 0;
        return {
          ...current,
          aliasCount: (current.aliasCount ?? 0) + savedCount,
          generatedAliasCount: (current.generatedAliasCount ?? 0) + savedCount,
          hasAliases: true,
          hasGeneratedAliases: true,
          mayNeedRegeneration: false,
        };
      });
      setSuccessMessage("Aliases generated successfully.");
      await Promise.all([
        fetchExistingAliases(),
        fetchScrapingQueries(queryMax),
        fetchGeneratedPreview(false),
        fetchFigures(),
      ]);
      setActiveTab("existing");
    } catch (error) {
      setApiError(toApiError(error, "Error generating aliases."));
    } finally {
      setGenerating(false);
    }
  };

  const handleQueryMaxChange = (value: number) => {
    setQueryMax(value);
    if (selectedFigureId) {
      fetchScrapingQueries(value);
    }
  };

  const previewAliases = useMemo(
    () => previewResult?.generatedAliases || [],
    [previewResult]
  );
  const hasUnexpectedGeneratedAliases = useMemo(
    () => previewAliases.some((alias) => looksLikeFixedQueryAlias(alias, selectedFigure)),
    [previewAliases, selectedFigure]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ApiErrorToast error={apiError} onClose={() => setApiError(null)} />

      <main className="container py-10">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Figure Alias Generator</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Generate, preview, and review aliases for scraping and matching workflows.
          </p>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(24rem,0.9fr)_minmax(0,1.35fr)]">
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
                    <TableHead>Aliases</TableHead>
                    <TableHead>State</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingFigures ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-28 text-center text-muted-foreground">
                        Loading figures...
                      </TableCell>
                    </TableRow>
                  ) : figures.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-28 text-center text-muted-foreground">
                        No figures found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    figures.map((figure) => {
                      const figureId = getFigureId(figure);
                      const selected = selectedFigureId === figureId;
                      const generatedCount = getGeneratedAliasCount(figure);
                      const aliasCount = getAliasCount(figure);

                      return (
                        <TableRow
                          key={figureId}
                          className={`cursor-pointer ${selected ? "bg-muted" : ""}`}
                          onClick={() => handleSelectFigure(figure)}
                        >
                          <TableCell className="font-medium">{figureId}</TableCell>
                          <TableCell>
                            <FigureThumbnail figure={figure} />
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="line-clamp-2 font-medium text-foreground">
                                {getFigureName(figure) || "-"}
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {getFranchiseName(figure)} / {getBrandName(figure)}
                              </p>
                              {getFigureSlug(figure) && (
                                <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                                  {getFigureSlug(figure)}
                                </p>
                              )}
                              {figure.lineName && (
                                <p className="mt-1 text-xs text-muted-foreground">{figure.lineName}</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              <Badge variant={figureHasAliases(figure) ? "secondary" : "outline"}>
                                {aliasCount} total
                              </Badge>
                              <Badge variant={figureHasGeneratedAliases(figure) ? "default" : "outline"}>
                                {generatedCount} generated
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {figure.status && <Badge variant="outline">{figure.status}</Badge>}
                              {figure.mayNeedRegeneration ? (
                                <Badge variant="secondary">Needs regen</Badge>
                              ) : (
                                figureHasGeneratedAliases(figure) && <Badge variant="outline">Up to date</Badge>
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

          <LoadingOverlay active={generating} message="Generating aliases...">
            <section className="rounded-lg border bg-card p-4">
              {!selectedFigure ? (
                <div className="flex min-h-[28rem] items-center justify-center rounded-lg border border-dashed bg-background p-8 text-center text-sm text-muted-foreground">
                  Select a figure to preview aliases, generate aliases, and inspect scraping queries.
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col gap-4 rounded-lg border bg-background p-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex min-w-0 gap-4">
                      <div className="h-28 w-24 shrink-0 overflow-hidden rounded-md border bg-muted">
                        <img
                          src={getFigureImageUrl(selectedFigure)}
                          alt={getFigureName(selectedFigure) || "Selected figure image"}
                          className="h-full w-full object-contain"
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.src = FALLBACK_IMAGE_URL;
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                          Selected Figure
                        </p>
                        <h2 className="mt-2 whitespace-normal break-words text-2xl font-bold text-foreground">
                          {getFigureName(selectedFigure) || `Figure ${selectedFigureId}`}
                        </h2>
                        <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline">ID {selectedFigureId}</Badge>
                          {selectedFigure.status && <Badge variant="outline">{selectedFigure.status}</Badge>}
                          {selectedFigure.lineName && <Badge variant="outline">{selectedFigure.lineName}</Badge>}
                          <Badge variant="secondary">{getAliasCount(selectedFigure)} aliases</Badge>
                          <Badge variant={figureHasGeneratedAliases(selectedFigure) ? "default" : "outline"}>
                            {getGeneratedAliasCount(selectedFigure)} generated
                          </Badge>
                          {selectedFigure.mayNeedRegeneration && (
                            <Badge variant="secondary">Needs regeneration</Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="gap-2"
                        disabled={previewLoading || generating}
                        onClick={handlePreviewAliases}
                      >
                        <Eye className="h-4 w-4" />
                        Preview generated aliases
                      </Button>
                      <Button
                        type="button"
                        className="gap-2"
                        disabled={generating}
                        onClick={handleGenerateAliases}
                      >
                        <Wand2 className="h-4 w-4" />
                        Generate and save aliases
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        className="gap-2"
                        disabled={loadingExistingAliases || generating}
                        onClick={() => {
                          setActiveTab("existing");
                          fetchExistingAliases();
                        }}
                      >
                        <RefreshCw className="h-4 w-4" />
                        Refresh existing aliases
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        className="gap-2"
                        disabled={queriesLoading || generating}
                        onClick={() => {
                          setActiveTab("queries");
                          fetchScrapingQueries(queryMax);
                        }}
                      >
                        <RefreshCw className="h-4 w-4" />
                        Refresh scraping queries
                      </Button>
                    </div>
                  </div>

                  {successMessage && (
                    <div className="rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm font-medium text-foreground">
                      {successMessage}
                    </div>
                  )}

                  <GenerationSummary result={generationResult} />

                  <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList className="grid h-auto w-full grid-cols-1 md:grid-cols-3">
                      <TabsTrigger value="generated">Generated Aliases</TabsTrigger>
                      <TabsTrigger value="existing">Existing Aliases</TabsTrigger>
                      <TabsTrigger value="queries">Scraping Queries</TabsTrigger>
                    </TabsList>

                    <TabsContent value="generated" className="space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Generated Aliases</h3>
                        <p className="text-sm text-muted-foreground">
                          Structured candidates that can be saved as aliases. Fixed queries like Figure name, JAN, and official product code belong in Scraping Queries.
                        </p>
                      </div>
                      {hasUnexpectedGeneratedAliases && (
                        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                          Some generated aliases look like fixed scraping queries. This may indicate the backend returned deprecated alias candidates.
                        </div>
                      )}
                      <PreviewAliasesTable
                        aliases={previewAliases}
                        loading={previewLoading}
                        priorityOptions={referenceData.figureAliasGenerationPriorities}
                        sourceOptions={referenceData.figureAliasGenerationSources}
                      />
                    </TabsContent>

                    <TabsContent value="existing" className="space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Existing Aliases</h3>
                        <p className="text-sm text-muted-foreground">
                          Persisted aliases currently linked to the selected figure.
                        </p>
                      </div>
                      <FigureAliasUsageFilters
                        usage={existingAliasUsageFilter}
                        sourceCode={existingAliasSourceFilter}
                        lastUsedBefore={existingAliasLastUsedBefore}
                        disabled={loadingExistingAliases || generating}
                        onUsageChange={(value) => {
                          setExistingAliasUsageFilter(value);
                          setExistingAliasPage(0);
                        }}
                        onSourceCodeChange={(value) => {
                          setExistingAliasSourceFilter(value);
                          setExistingAliasPage(0);
                        }}
                        onLastUsedBeforeChange={(value) => {
                          setExistingAliasLastUsedBefore(value);
                          setExistingAliasPage(0);
                        }}
                      />
                      <ExistingAliasesTable
                        aliases={existingAliases}
                        loading={loadingExistingAliases}
                        loadMethodOptions={referenceData.loadMethods}
                        priorityOptions={referenceData.figureAliasGenerationPriorities}
                        sourceOptions={referenceData.figureAliasGenerationSources}
                        onHistory={setHistoryAlias}
                      />
                      <PageControls
                        page={existingAliasPageMeta.page}
                        size={existingAliasPageMeta.size}
                        totalElements={existingAliasPageMeta.totalElements}
                        totalPages={existingAliasPageMeta.totalPages}
                        disabled={loadingExistingAliases || generating}
                        onPageChange={setExistingAliasPage}
                        onSizeChange={(size) => {
                          setExistingAliasPageSize(size);
                          setExistingAliasPage(0);
                        }}
                      />
                    </TabsContent>

                    <TabsContent value="queries">
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">Scraping Queries</h3>
                            <p className="text-sm text-muted-foreground">
                              Final ordered queries used by scraping.
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-muted-foreground" htmlFor="query-max">
                              Max
                            </label>
                            <select
                              id="query-max"
                              value={queryMax}
                              disabled={queriesLoading || generating}
                              onChange={(event) => handleQueryMaxChange(Number(event.target.value))}
                              className="rounded border border-input bg-background px-2 py-1 text-foreground"
                            >
                              {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
                                <option key={value} value={value}>
                                  {value}
                                </option>
                              ))}
                            </select>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="gap-2"
                              disabled={queriesLoading || generating}
                              onClick={() => fetchScrapingQueries(queryMax)}
                            >
                              <RefreshCw className="h-3.5 w-3.5" />
                              Refresh
                            </Button>
                          </div>
                        </div>

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
                              <li key={`${query}-${index}`} className="rounded-md border bg-background p-3 text-sm">
                                <span className="mr-2 font-semibold text-primary">{index + 1}.</span>
                                <span className="text-foreground">{query}</span>
                              </li>
                            ))}
                          </ol>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </section>
          </LoadingOverlay>
        </div>
      </main>

      <FigureAliasHistoryDialog
        alias={historyAlias}
        open={Boolean(historyAlias)}
        onOpenChange={(open) => {
          if (!open) setHistoryAlias(null);
        }}
        onApiError={setApiError}
      />
    </div>
  );
};

export default FigureAliasGeneratorPage;
