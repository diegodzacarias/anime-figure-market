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
import FigureAliasFormDialog, {
  FigureAlias,
  FigureOption,
  SourceOption,
} from "@/components/figureAlias/FigureAliasFormDialog";
import FigureAliasTable from "@/components/figureAlias/FigureAliasTable";
import { useReferenceData } from "@/hooks/useReferenceData";
import { ApiErrorResponse, readApiErrorResponse, toClientApiError } from "@/lib/apiError";
import { defaultPageMeta, getPageContent, getPageMeta, withPageSize, withPagination } from "@/lib/page";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://figure-market-core.onrender.com/api";

const FIGURES_ENDPOINT = `${API_BASE_URL}/v1/figures`;
const FIGURE_ALIASES_ENDPOINT = `${API_BASE_URL}/figure-aliases`;
const SOURCES_ENDPOINT = `${API_BASE_URL}/v1/sources`;

const fallbackLoadMethods = [
  { value: "MANUAL", label: "Manual" },
  { value: "SCRAPED", label: "Scraped" },
  { value: "GENERATED", label: "Generated" },
  { value: "IMPORTED", label: "Imported" },
];

const FigureAliasPage = () => {
  const [aliases, setAliases] = useState<FigureAlias[]>([]);
  const [figures, setFigures] = useState<FigureOption[]>([]);
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
  const [selectedAlias, setSelectedAlias] = useState<FigureAlias | null>(null);
  const [aliasToDelete, setAliasToDelete] = useState<FigureAlias | null>(null);
  const { referenceData, loadingReferenceData } = useReferenceData();
  const mutating = saving || deleting;

  const fetchData = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
      setLoadingOptions(true);
    }

    try {
      const [aliasesResponse, figuresResponse, sourcesResponse] = await Promise.all([
        fetch(withPagination(FIGURE_ALIASES_ENDPOINT, page, pageSize)),
        fetch(withPageSize(FIGURES_ENDPOINT)),
        fetch(withPageSize(SOURCES_ENDPOINT)),
      ]);

      if (aliasesResponse.ok) {
        const data = await aliasesResponse.json();
        setAliases(getPageContent<FigureAlias>(data));
        setPageMeta(getPageMeta<FigureAlias>(data, pageSize));
      } else {
        console.error("Error fetching figure aliases");
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
      console.error("Request error fetching figure aliases:", error);
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

  const figureNames = useMemo(
    () => Object.fromEntries(figures.map((figure) => [figure.id, figure.name])),
    [figures]
  );

  const sourceNames = useMemo(
    () => Object.fromEntries(sources.map((source) => [source.id, source.name])),
    [sources]
  );

  const filteredAliases = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return aliases;

    return aliases.filter((alias) =>
      [
        alias.id?.toString(),
        alias.alias,
        alias.aliasNormalized,
        alias.loadMethod,
        alias.figureId ? figureNames[alias.figureId] : "",
        alias.sourceId ? sourceNames[alias.sourceId] : "",
      ]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(query))
    );
  }, [aliases, figureNames, search, sourceNames]);

  const openCreateDialog = () => {
    setSelectedAlias(null);
    setDialogOpen(true);
  };

  const openEditDialog = (alias: FigureAlias) => {
    setSelectedAlias(alias);
    setDialogOpen(true);
  };

  const handleSubmit = async (payload: Record<string, string | number>) => {
    setSaving(true);

    const isEditing = Boolean(selectedAlias?.id);
    const endpoint = isEditing
      ? `${FIGURE_ALIASES_ENDPOINT}/${selectedAlias?.id}`
      : FIGURE_ALIASES_ENDPOINT;

    try {
      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, "Error saving figure alias."));
        return;
      }

      await fetchData(false);

      setDialogOpen(false);
      setSelectedAlias(null);
    } catch (error) {
      console.error("Request error:", error);
      setApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!aliasToDelete?.id) return;

    setDeleting(true);

    try {
      const response = await fetch(`${FIGURE_ALIASES_ENDPOINT}/${aliasToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, "Error deleting figure alias."));
        return;
      }

      await fetchData(false);
      setAliasToDelete(null);
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
            <h1 className="text-3xl font-bold text-foreground">Figure Aliases</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage alternate names used to match figures across marketplace sources.
            </p>
          </div>

          <Button type="button" className="gap-2 md:self-center" onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            New Figure Alias
          </Button>
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search aliases"
              className="pl-9"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            {filteredAliases.length} shown - {pageMeta.totalElements} total records
          </p>
        </div>

        <LoadingOverlay active={mutating} message="Updating aliases..." className="mt-4">
          <FigureAliasTable
            aliases={filteredAliases}
            loading={loading}
            figureNames={figureNames}
            sourceNames={sourceNames}
            onEdit={openEditDialog}
            onDelete={setAliasToDelete}
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

      <FigureAliasFormDialog
        figureAlias={selectedAlias}
        figures={figures}
        sources={sources}
        open={dialogOpen}
        saving={saving}
        loadingOptions={loadingOptions || loadingReferenceData}
        loadMethods={referenceData.loadMethods.length > 0 ? referenceData.loadMethods : fallbackLoadMethods}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
      />

      <AlertDialog
        open={Boolean(aliasToDelete)}
        onOpenChange={(open) => {
          if (!open) setAliasToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete figure alias?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete "{aliasToDelete?.alias || "this alias"}" from the database.
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

export default FigureAliasPage;
