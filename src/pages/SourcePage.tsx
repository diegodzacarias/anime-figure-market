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
import { Input } from "@/components/ui/input";
import LoadingOverlay from "@/components/ui/loading-overlay";
import SourceFormDialog, { Source } from "@/components/source/SourceFormDialog";
import SourceTable from "@/components/source/SourceTable";
import { useReferenceData } from "@/hooks/useReferenceData";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://figure-market-core.onrender.com/api";

const SOURCES_ENDPOINT = `${API_BASE_URL}/v1/sources`;

const fallbackSourceTypes = [
  { value: "OFFICIAL", label: "Official" },
  { value: "RETAILER", label: "Retailer" },
  { value: "MARKETPLACE", label: "Marketplace" },
];

const fallbackSourcePriorities = [
  { value: "OFFICIAL", label: "Official", level: 100 },
  { value: "HIGH", label: "High", level: 80 },
  { value: "MEDIUM", label: "Medium", level: 50 },
  { value: "LOW", label: "Low", level: 30 },
  { value: "UNRELIABLE", label: "Unreliable", level: 10 },
];

const SourcePage = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [sourceToDelete, setSourceToDelete] = useState<Source | null>(null);
  const mutating = saving || deleting;
  const { referenceData } = useReferenceData();

  const fetchSources = async (showLoading = true) => {
    if (showLoading) setLoading(true);

    try {
      const response = await fetch(SOURCES_ENDPOINT);

      if (!response.ok) {
        console.error("Error fetching sources");
        return;
      }

      const data = await response.json();
      setSources(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Request error fetching sources:", error);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchSources();
  }, []);

  const filteredSources = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return sources;

    return sources.filter((source) =>
      [source.id?.toString(), source.name, source.baseUrl, source.type, source.priority?.toString()]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(query))
    );
  }, [search, sources]);

  const openCreateDialog = () => {
    setSelectedSource(null);
    setDialogOpen(true);
  };

  const openEditDialog = (source: Source) => {
    setSelectedSource(source);
    setDialogOpen(true);
  };

  const handleSubmit = async (payload: Record<string, string | number | boolean>) => {
    setSaving(true);

    const isEditing = Boolean(selectedSource?.id);
    const endpoint = isEditing ? `${SOURCES_ENDPOINT}/${selectedSource?.id}` : SOURCES_ENDPOINT;

    try {
      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend error:", errorText);
        alert("Error saving source. Check console.");
        return;
      }

      await fetchSources(false);

      setDialogOpen(false);
      setSelectedSource(null);
    } catch (error) {
      console.error("Request error:", error);
      alert("Error connecting to backend. Check console.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!sourceToDelete?.id) return;

    setDeleting(true);

    try {
      const response = await fetch(`${SOURCES_ENDPOINT}/${sourceToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend error:", errorText);
        alert("Error deleting source. Check console.");
        return;
      }

      await fetchSources(false);
      setSourceToDelete(null);
    } catch (error) {
      console.error("Request error:", error);
      alert("Error connecting to backend. Check console.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sources</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage source records used by aliases and source listings.
            </p>
          </div>

          <Button type="button" className="gap-2 md:self-center" onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            New Source
          </Button>
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sources"
              className="pl-9"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            {filteredSources.length} of {sources.length} records
          </p>
        </div>

        <LoadingOverlay active={mutating} message="Updating sources..." className="mt-4">
          <SourceTable
            sources={filteredSources}
            loading={loading}
            onEdit={openEditDialog}
            onDelete={setSourceToDelete}
          />
        </LoadingOverlay>
      </main>

      <SourceFormDialog
        source={selectedSource}
        sourceTypes={referenceData.sourceTypes.length > 0 ? referenceData.sourceTypes : fallbackSourceTypes}
        sourcePriorities={
          referenceData.sourcePriorities.length > 0
            ? referenceData.sourcePriorities
            : fallbackSourcePriorities
        }
        open={dialogOpen}
        saving={saving}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
      />

      <AlertDialog
        open={Boolean(sourceToDelete)}
        onOpenChange={(open) => {
          if (!open) setSourceToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete source?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete "{sourceToDelete?.name || "this source"}" from the database.
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

export default SourcePage;
