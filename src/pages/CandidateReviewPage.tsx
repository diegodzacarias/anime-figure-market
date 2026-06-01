import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ApiErrorToast from "@/components/ui/api-error-toast";
import { Input } from "@/components/ui/input";
import LoadingOverlay from "@/components/ui/loading-overlay";
import PageControls from "@/components/ui/page-controls";
import CandidateReviewFormDialog, {
  ScrapedListingCandidate,
} from "@/components/candidateReview/CandidateReviewFormDialog";
import CandidateReviewTable from "@/components/candidateReview/CandidateReviewTable";
import type { FigureOption, SourceOption } from "@/components/figureAlias/FigureAliasFormDialog";
import { useReferenceData } from "@/hooks/useReferenceData";
import { ApiErrorResponse, readApiErrorResponse, toClientApiError } from "@/lib/apiError";
import { defaultPageMeta, getPageContent, getPageMeta, withPageSize, withPagination } from "@/lib/page";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://figure-market-core.onrender.com/api";

const CANDIDATES_ENDPOINT = `${API_BASE_URL}/v1/scraping/candidates`;
const FIGURES_ENDPOINT = `${API_BASE_URL}/v1/figures`;
const SOURCES_ENDPOINT = `${API_BASE_URL}/v1/sources`;

const fallbackCurrencyCodes = [
  { value: "USD", label: "Usd", symbol: "$" },
  { value: "JPY", label: "Jpy", symbol: "JPY" },
];

const fallbackCandidateStatuses = [
  { value: "PENDING_REVIEW", label: "Pending Review" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

const fallbackListingStatuses = [
  { value: "ACTIVE", label: "Active" },
  { value: "SOLD_OUT", label: "Sold Out" },
  { value: "ARCHIVED", label: "Archived" },
  { value: "UNKNOWN", label: "Unknown" },
];

const fallbackMatchDecisions = [
  { value: "REVIEW", label: "Review" },
  { value: "MATCH", label: "Match" },
  { value: "DISCARD", label: "Discard" },
];

const CandidateReviewPage = () => {
  const [candidates, setCandidates] = useState<ScrapedListingCandidate[]>([]);
  const [figures, setFigures] = useState<FigureOption[]>([]);
  const [sources, setSources] = useState<SourceOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [statusChanging, setStatusChanging] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [pageMeta, setPageMeta] = useState(defaultPageMeta);
  const [apiError, setApiError] = useState<ApiErrorResponse | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<ScrapedListingCandidate | null>(null);
  const [candidateToDelete, setCandidateToDelete] = useState<ScrapedListingCandidate | null>(null);
  const [candidateToApprove, setCandidateToApprove] = useState<ScrapedListingCandidate | null>(null);
  const [candidateToReject, setCandidateToReject] = useState<ScrapedListingCandidate | null>(null);
  const { referenceData, loadingReferenceData } = useReferenceData();
  const mutating = saving || deleting || statusChanging;

  const fetchData = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
      setLoadingOptions(true);
    }

    try {
      const [candidatesResponse, figuresResponse, sourcesResponse] = await Promise.all([
        fetch(withPagination(CANDIDATES_ENDPOINT, page, pageSize)),
        fetch(withPageSize(FIGURES_ENDPOINT)),
        fetch(withPageSize(SOURCES_ENDPOINT)),
      ]);

      if (candidatesResponse.ok) {
        const data = await candidatesResponse.json();
        setCandidates(getPageContent<ScrapedListingCandidate>(data));
        setPageMeta(getPageMeta<ScrapedListingCandidate>(data, pageSize));
      } else {
        console.error("Error fetching scraped listing candidates");
      }

      if (figuresResponse.ok) {
        const data = await figuresResponse.json();
        setFigures(getPageContent<FigureOption>(data));
      } else {
        console.error("Error fetching figures");
      }

      if (sourcesResponse.ok) {
        const data = await sourcesResponse.json();
        setSources(getPageContent<SourceOption>(data));
      } else {
        console.error("Error fetching sources");
      }
    } catch (error) {
      console.error("Request error fetching candidates:", error);
    } finally {
      if (showLoading) {
        setLoading(false);
        setLoadingOptions(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  useEffect(() => {
    setPage(0);
  }, [search]);

  const filteredCandidates = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return candidates;

    return candidates.filter((candidate) =>
      [
        candidate.id?.toString(),
        candidate.figureName,
        candidate.figureSlug,
        candidate.sourceName,
        candidate.sourceCode,
        candidate.sourceItemId,
        candidate.sourceTitle,
        candidate.sourceUrl,
        candidate.status,
        candidate.matchDecision,
        candidate.listingStatus,
        candidate.productCode,
        candidate.janCode,
      ]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(query))
    );
  }, [candidates, search]);

  const openCreateDialog = () => {
    setSelectedCandidate(null);
    setDialogOpen(true);
  };

  const openViewDialog = (candidate: ScrapedListingCandidate) => {
    setSelectedCandidate(candidate);
    setDialogOpen(true);
  };

  const handleSubmit = async (payload: Record<string, string | number | boolean>) => {
    setSaving(true);

    const isEditing = Boolean(selectedCandidate?.id);
    const endpoint = isEditing
      ? `${CANDIDATES_ENDPOINT}/${selectedCandidate?.id}`
      : CANDIDATES_ENDPOINT;

    try {
      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, "Error saving candidate."));
        return;
      }

      await fetchData(false);
      setDialogOpen(false);
      setSelectedCandidate(null);
    } catch (error) {
      console.error("Request error:", error);
      setApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!candidateToDelete?.id) return;
    setDeleting(true);

    try {
      const response = await fetch(`${CANDIDATES_ENDPOINT}/${candidateToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, "Error deleting candidate."));
        return;
      }

      await fetchData(false);
      setCandidateToDelete(null);
    } catch (error) {
      console.error("Request error:", error);
      setApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setDeleting(false);
    }
  };

  const updateCandidateDecision = async (
    candidate: ScrapedListingCandidate | null,
    action: "approve" | "reject"
  ) => {
    if (!candidate?.id) return;
    setStatusChanging(true);

    try {
      const response = await fetch(`${CANDIDATES_ENDPOINT}/${candidate.id}/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewNotes: candidate.reviewNotes || "" }),
      });

      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, `Error trying to ${action} candidate.`));
        return;
      }

      await fetchData(false);
      setCandidateToApprove(null);
      setCandidateToReject(null);
    } catch (error) {
      console.error("Request error:", error);
      setApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setStatusChanging(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ApiErrorToast error={apiError} onClose={() => setApiError(null)} />

      <main className="container py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Candidate Review</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Review scraped candidates before approving them as figure source listings.
            </p>
          </div>

          <Button type="button" className="gap-2 md:self-center" onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            New Candidate
          </Button>
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search candidates"
              className="pl-9"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            {filteredCandidates.length} shown - {pageMeta.totalElements} total records
          </p>
        </div>

        <LoadingOverlay active={mutating} message="Updating candidates..." className="mt-4">
          <CandidateReviewTable
            candidates={filteredCandidates}
            loading={loading}
            onView={openViewDialog}
            onApprove={setCandidateToApprove}
            onReject={setCandidateToReject}
            onDelete={setCandidateToDelete}
          />
        </LoadingOverlay>

        <div className="mt-4">
          <PageControls
            page={pageMeta.page}
            size={pageMeta.size}
            totalElements={pageMeta.totalElements}
            totalPages={pageMeta.totalPages}
            disabled={loading || mutating}
            onPageChange={setPage}
            onSizeChange={(size) => {
              setPageSize(size);
              setPage(0);
            }}
          />
        </div>
      </main>

      <CandidateReviewFormDialog
        candidate={selectedCandidate}
        figures={figures}
        sources={sources}
        open={dialogOpen}
        saving={saving}
        loadingOptions={loadingOptions || loadingReferenceData}
        currencyCodes={referenceData.currencyCodes.length > 0 ? referenceData.currencyCodes : fallbackCurrencyCodes}
        candidateStatuses={
          referenceData.scrapedListingCandidateStatuses.length > 0
            ? referenceData.scrapedListingCandidateStatuses
            : fallbackCandidateStatuses
        }
        listingStatuses={
          referenceData.figureSourceListingStatuses.length > 0
            ? referenceData.figureSourceListingStatuses
            : fallbackListingStatuses
        }
        matchDecisions={
          referenceData.matchDecisions.length > 0 ? referenceData.matchDecisions : fallbackMatchDecisions
        }
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
      />

      <AlertDialog
        open={Boolean(candidateToDelete)}
        onOpenChange={(open) => {
          if (!open) setCandidateToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete candidate?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete "{candidateToDelete?.sourceTitle || "this candidate"}" from the
              database. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleting}
              onClick={handleDelete}
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={Boolean(candidateToApprove)}
        onOpenChange={(open) => {
          if (!open) setCandidateToApprove(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve candidate?</AlertDialogTitle>
            <AlertDialogDescription>
              This will approve "{candidateToApprove?.sourceTitle || "this candidate"}" and create or update
              the related figure source listing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={statusChanging}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={statusChanging}
              onClick={() => updateCandidateDecision(candidateToApprove, "approve")}
            >
              {statusChanging ? "Approving..." : "Approve"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={Boolean(candidateToReject)}
        onOpenChange={(open) => {
          if (!open) setCandidateToReject(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject candidate?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark "{candidateToReject?.sourceTitle || "this candidate"}" as rejected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={statusChanging}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={statusChanging}
              onClick={() => updateCandidateDecision(candidateToReject, "reject")}
            >
              {statusChanging ? "Rejecting..." : "Reject"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CandidateReviewPage;
