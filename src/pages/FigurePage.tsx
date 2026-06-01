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
import FigureFormDialog, { Figure, FranchiseOption } from "@/components/figure/FigureFormDialog";
import FigureTable from "@/components/figure/FigureTable";
import type { SourceOption } from "@/components/figureAlias/FigureAliasFormDialog";
import { useReferenceData } from "@/hooks/useReferenceData";
import { ApiErrorResponse, readApiErrorResponse, toClientApiError } from "@/lib/apiError";
import { defaultPageMeta, getPageContent, getPageMeta, withPageSize, withPagination } from "@/lib/page";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://figure-market-core.onrender.com/api";

const FIGURES_ENDPOINT = `${API_BASE_URL}/v1/figures`;
const FIGURE_SLUG_SUGGESTION_ENDPOINT = `${FIGURES_ENDPOINT}/slug/suggestion`;
const FIGURE_SLUG_AVAILABILITY_ENDPOINT = `${FIGURES_ENDPOINT}/slug/availability`;
const FRANCHISES_ENDPOINT = `${API_BASE_URL}/v1/franchises`;
const SOURCES_ENDPOINT = `${API_BASE_URL}/v1/sources`;

const brands = [
  { id: 1, name: "Good Smile Company" },
  { id: 2, name: "Kotobukiya" },
  { id: 3, name: "MegaHouse" },
  { id: 4, name: "Prime 1" },
  { id: 5, name: "FREEing" },
];

const fallbackCurrencyCodes = [
  { value: "USD", label: "Usd", symbol: "$" },
  { value: "JPY", label: "Jpy", symbol: "¥" },
];

const fallbackFigureStatuses = [
  { value: "PREORDER", label: "Preorder" },
  { value: "RELEASED", label: "Released" },
  { value: "SOLD_OUT", label: "Sold Out" },
];

const FigurePage = () => {
  const [figures, setFigures] = useState<Figure[]>([]);
  const [franchises, setFranchises] = useState<FranchiseOption[]>([]);
  const [sources, setSources] = useState<SourceOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [pageMeta, setPageMeta] = useState(defaultPageMeta);
  const [apiError, setApiError] = useState<ApiErrorResponse | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFigure, setSelectedFigure] = useState<Figure | null>(null);
  const [figureToDelete, setFigureToDelete] = useState<Figure | null>(null);
  const mutating = saving || deleting;
  const { referenceData } = useReferenceData();

  const fetchData = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
      setLoadingOptions(true);
    }

    try {
      const [figuresResponse, franchisesResponse, sourcesResponse] = await Promise.all([
        fetch(withPagination(FIGURES_ENDPOINT, page, pageSize)),
        fetch(withPageSize(FRANCHISES_ENDPOINT)),
        fetch(withPageSize(SOURCES_ENDPOINT)),
      ]);

      if (figuresResponse.ok) {
        const data = await figuresResponse.json();
        setFigures(getPageContent<Figure>(data));
        setPageMeta(getPageMeta<Figure>(data, pageSize));
      } else {
        console.error("Error fetching figures");
      }

      if (franchisesResponse.ok) {
        const data = await franchisesResponse.json();
        setFranchises(getPageContent<FranchiseOption>(data));
      } else {
        console.error("Error fetching franchises");
      }

      if (sourcesResponse.ok) {
        const data = await sourcesResponse.json();
        setSources(getPageContent<SourceOption>(data));
      } else {
        console.error("Error fetching sources");
      }
    } catch (error) {
      console.error("Request error fetching figures:", error);
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

  const franchiseNames = useMemo(
    () => Object.fromEntries(franchises.map((franchise) => [franchise.id, franchise.name])),
    [franchises]
  );

  const brandNames = useMemo(
    () => Object.fromEntries(brands.map((brand) => [brand.id, brand.name])),
    []
  );

  const filteredFigures = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return figures;

    return figures.filter((figure) =>
      [
        figure.id?.toString(),
        figure.name,
        figure.slug,
        figure.janCode,
        figure.officialProductCode,
        figure.franchise?.name,
        figure.brand?.name,
        figure.status,
      ]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(query))
    );
  }, [figures, search]);

  const openCreateDialog = () => {
    setSelectedFigure(null);
    setDialogOpen(true);
  };

  const openEditDialog = (figure: Figure) => {
    setSelectedFigure(figure);
    setDialogOpen(true);
  };

  const generateSlug = async (name: string) => {
    const response = await fetch(
      `${FIGURE_SLUG_SUGGESTION_ENDPOINT}?title=${encodeURIComponent(name)}`
    );

    if (!response.ok) {
      setApiError(await readApiErrorResponse(response, "Error generating slug."));
      throw new Error("Error generating slug");
    }

    const data = await response.json();
    return data.slug || "";
  };

  const validateSlug = async (slug: string, figureId?: number) => {
    const params = new URLSearchParams({ slug });

    if (figureId) {
      params.set("excludeFigureId", figureId.toString());
    }

    const response = await fetch(`${FIGURE_SLUG_AVAILABILITY_ENDPOINT}?${params.toString()}`);

    if (!response.ok) {
      setApiError(await readApiErrorResponse(response, "Error validating slug."));
      throw new Error("Error validating slug");
    }

    const data = await response.json();
    return Boolean(data.available);
  };

  const handleSubmit = async (payload: Record<string, string | number | boolean>) => {
    setSaving(true);

    const isEditing = Boolean(selectedFigure?.id);
    const endpoint = isEditing ? `${FIGURES_ENDPOINT}/${selectedFigure?.id}` : FIGURES_ENDPOINT;

    try {
      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, "Error saving figure."));
        return;
      }

      const savedFigure = await response.json();
      await fetchData(false);

      if (isEditing) {
        setDialogOpen(false);
        setSelectedFigure(null);
      } else {
        setSelectedFigure(savedFigure);
      }
    } catch (error) {
      console.error("Request error:", error);
      setApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!figureToDelete?.id) return;

    setDeleting(true);

    try {
      const response = await fetch(`${FIGURES_ENDPOINT}/${figureToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, "Error deleting figure."));
        return;
      }

      await fetchData(false);
      setFigureToDelete(null);
    } catch (error) {
      console.error("Request error:", error);
      setApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ApiErrorToast error={apiError} onClose={() => setApiError(null)} />

      <main className="container py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Figures</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage figure records used by aliases, listings, and marketplace views.
            </p>
          </div>

          <Button type="button" className="gap-2 md:self-center" onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            New Figure
          </Button>
        </div>

        <div className="mt-6 rounded-lg border bg-muted/30 p-4">
          <h2 className="text-sm font-medium text-foreground">Source quick links</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {sources.filter((source) => source.baseUrl).length === 0 ? (
              <p className="text-sm text-muted-foreground">No source URLs available.</p>
            ) : (
              sources
                .filter((source) => source.baseUrl)
                .map((source) => (
                  <a
                    key={source.id}
                    href={source.baseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    {source.name}
                  </a>
                ))
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search figures"
              className="pl-9"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            {filteredFigures.length} shown - {pageMeta.totalElements} total records
          </p>
        </div>

        <LoadingOverlay active={mutating} message="Updating figures..." className="mt-4">
          <FigureTable
            figures={filteredFigures}
            loading={loading}
            franchiseNames={franchiseNames}
            brandNames={brandNames}
            onEdit={openEditDialog}
            onDelete={setFigureToDelete}
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

      <FigureFormDialog
        figure={selectedFigure}
        franchises={franchises}
        brands={brands}
        open={dialogOpen}
        saving={saving}
        loadingOptions={loadingOptions}
        currencyCodes={referenceData.currencyCodes.length > 0 ? referenceData.currencyCodes : fallbackCurrencyCodes}
        figureStatuses={referenceData.figureStatuses.length > 0 ? referenceData.figureStatuses : fallbackFigureStatuses}
        onOpenChange={setDialogOpen}
        onGenerateSlug={generateSlug}
        onValidateSlug={validateSlug}
        onApiError={setApiError}
        onSubmit={handleSubmit}
      />

      <AlertDialog
        open={Boolean(figureToDelete)}
        onOpenChange={(open) => {
          if (!open) setFigureToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete figure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete "{figureToDelete?.name || "this figure"}" from the database.
              This cannot be undone.
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
    </div>
  );
};

export default FigurePage;
