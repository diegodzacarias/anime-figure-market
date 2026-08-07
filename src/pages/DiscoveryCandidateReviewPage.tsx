import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import ApiErrorToast from "@/components/ui/api-error-toast";
import LoadingOverlay from "@/components/ui/loading-overlay";
import PageControls from "@/components/ui/page-controls";
import DiscoveryCandidateCard from "@/components/discoveryCandidateReview/DiscoveryCandidateCard";
import DiscoveryCandidateActionDialog, {
  DiscoveryCandidateActionType,
} from "@/components/discoveryCandidateReview/DiscoveryCandidateActionDialog";
import { apiRequest } from "@/lib/apiClient";
import { ApiErrorResponse, normalizeApiError } from "@/lib/apiError";
import { defaultPageMeta, getPageContent, getPageMeta, type PageResponse } from "@/lib/page";
import type { FigureDiscoveryCandidate } from "@/types/discoveryCandidate";

const DISCOVERY_CANDIDATES_PATH = "/v1/scraping/discovery-candidates";

const statusFilterOptions: { value: string; label: string }[] = [
  { value: "PENDING_REVIEW", label: "Pendientes de revisión" },
  { value: "CONFIRMED_DUPLICATE", label: "Confirmados: duplicado" },
  { value: "CONFIRMED_NEW", label: "Confirmados: figura nueva" },
  { value: "", label: "Todos los estados" },
];

const DiscoveryCandidateReviewPage = () => {
  const [candidates, setCandidates] = useState<FigureDiscoveryCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("PENDING_REVIEW");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [pageMeta, setPageMeta] = useState(defaultPageMeta);
  const [apiError, setApiError] = useState<ApiErrorResponse | null>(null);
  const [actionTarget, setActionTarget] = useState<{
    candidate: FigureDiscoveryCandidate;
    action: DiscoveryCandidateActionType;
  } | null>(null);

  const fetchCandidates = async (showLoading = true) => {
    if (showLoading) setLoading(true);

    try {
      const data = await apiRequest<PageResponse<FigureDiscoveryCandidate>>(DISCOVERY_CANDIDATES_PATH, {
        query: {
          status: statusFilter || undefined,
          page,
          size: pageSize,
          sort: "id,asc",
        },
        fallbackMessage: "Error al cargar los candidatos de descubrimiento.",
      });

      setCandidates(getPageContent<FigureDiscoveryCandidate>(data));
      setPageMeta(getPageMeta<FigureDiscoveryCandidate>(data, pageSize));
    } catch (error) {
      setApiError(normalizeApiError(error, "Error al cargar los candidatos de descubrimiento."));
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, page, pageSize]);

  useEffect(() => {
    setPage(0);
  }, [statusFilter]);

  const filteredCandidates = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return candidates;

    return candidates.filter((candidate) =>
      [
        candidate.id?.toString(),
        candidate.franchiseName,
        candidate.brandName,
        candidate.sourceCode,
        candidate.sourceTitle,
        candidate.productCode,
        candidate.janCode,
        candidate.possibleDuplicateFigureName,
        candidate.possibleDuplicateFigureSlug,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(query))
    );
  }, [candidates, search]);

  const closeActionDialog = () => setActionTarget(null);

  const handleConfirm = async (reviewNotes: string) => {
    if (!actionTarget) return;
    const { candidate, action } = actionTarget;
    const endpointAction = action === "duplicate" ? "confirm-duplicate" : "confirm-new";

    setSaving(true);
    try {
      await apiRequest<FigureDiscoveryCandidate>(`${DISCOVERY_CANDIDATES_PATH}/${candidate.id}/${endpointAction}`, {
        method: "POST",
        json: { reviewNotes: reviewNotes || undefined },
        fallbackMessage: `Error al confirmar el candidato como ${
          action === "duplicate" ? "duplicado" : "figura nueva"
        }.`,
      });

      await fetchCandidates(false);
      closeActionDialog();
    } catch (error) {
      setApiError(normalizeApiError(error, "Error al confirmar el candidato."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ApiErrorToast error={apiError} onClose={() => setApiError(null)} />

      <main className="container py-10">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Figure Discovery Candidates</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Revisa los productos encontrados en catálogos de fuentes oficiales: confirma si son una figura ya
            existente con otro nombre, o si son una figura canónica nueva.
          </p>
        </div>

        <div className="sticky top-20 z-40 mt-6 flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por título, franquicia, marca, código..."
              className="pl-9"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full rounded border border-input bg-background p-2 text-sm text-foreground"
            >
              {statusFilterOptions.map((option) => (
                <option key={option.value || "all"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <p className="text-sm text-muted-foreground">
            {filteredCandidates.length} mostrados - {pageMeta.totalElements} registros totales
          </p>
        </div>

        <LoadingOverlay active={saving} message="Guardando decisión..." className="mt-4">
          <div className="space-y-4">
            {loading ? (
              <div className="rounded-lg border bg-card p-10 text-center text-sm text-muted-foreground">
                Cargando candidatos...
              </div>
            ) : filteredCandidates.length === 0 ? (
              <div className="rounded-lg border bg-card p-10 text-center text-sm text-muted-foreground">
                No hay candidatos para mostrar.
              </div>
            ) : (
              filteredCandidates.map((candidate) => (
                <DiscoveryCandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  onConfirmDuplicate={(target) => setActionTarget({ candidate: target, action: "duplicate" })}
                  onConfirmNew={(target) => setActionTarget({ candidate: target, action: "new" })}
                />
              ))
            )}
          </div>
        </LoadingOverlay>

        <div className="mt-4">
          <PageControls
            page={pageMeta.page}
            size={pageMeta.size}
            totalElements={pageMeta.totalElements}
            totalPages={pageMeta.totalPages}
            disabled={loading || saving}
            onPageChange={setPage}
            onSizeChange={(size) => {
              setPageSize(size);
              setPage(0);
            }}
          />
        </div>
      </main>

      <DiscoveryCandidateActionDialog
        candidate={actionTarget?.candidate ?? null}
        action={actionTarget?.action ?? null}
        saving={saving}
        onOpenChange={(open) => {
          if (!open) closeActionDialog();
        }}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default DiscoveryCandidateReviewPage;
