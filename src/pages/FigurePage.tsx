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
import FigureFormDialog, { Figure, FranchiseOption } from "@/components/figure/FigureFormDialog";
import FigureTable from "@/components/figure/FigureTable";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://figure-market-core.onrender.com/api";

const FIGURES_ENDPOINT = `${API_BASE_URL}/v1/figures`;
const FRANCHISES_ENDPOINT = `${API_BASE_URL}/v1/franchises`;

const brands = [
  { id: 1, name: "Good Smile Company" },
  { id: 2, name: "Kotobukiya" },
  { id: 3, name: "MegaHouse" },
  { id: 4, name: "Prime 1" },
  { id: 5, name: "FREEing" },
];

const FigurePage = () => {
  const [figures, setFigures] = useState<Figure[]>([]);
  const [franchises, setFranchises] = useState<FranchiseOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFigure, setSelectedFigure] = useState<Figure | null>(null);
  const [figureToDelete, setFigureToDelete] = useState<Figure | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setLoadingOptions(true);

      try {
        const [figuresResponse, franchisesResponse] = await Promise.all([
          fetch(FIGURES_ENDPOINT),
          fetch(FRANCHISES_ENDPOINT),
        ]);

        if (figuresResponse.ok) {
          const data = await figuresResponse.json();
          setFigures(Array.isArray(data) ? data : []);
        } else {
          console.error("Error fetching figures");
        }

        if (franchisesResponse.ok) {
          const data = await franchisesResponse.json();
          setFranchises(Array.isArray(data) ? data : []);
        } else {
          console.error("Error fetching franchises");
        }
      } catch (error) {
        console.error("Request error fetching figures:", error);
      } finally {
        setLoading(false);
        setLoadingOptions(false);
      }
    };

    fetchData();
  }, []);

  const filteredFigures = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return figures;

    return figures.filter((figure) =>
      [
        figure.id?.toString(),
        figure.name,
        figure.slug,
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
        const errorText = await response.text();
        console.error("Backend error:", errorText);
        alert("Error saving figure. Check console.");
        return;
      }

      const savedFigure = await response.json();

      setFigures((current) =>
        isEditing
          ? current.map((figure) => (figure.id === savedFigure.id ? savedFigure : figure))
          : [savedFigure, ...current]
      );

      setDialogOpen(false);
      setSelectedFigure(null);
    } catch (error) {
      console.error("Request error:", error);
      alert("Error connecting to backend. Check console.");
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
        const errorText = await response.text();
        console.error("Backend error:", errorText);
        alert("Error deleting figure. Check console.");
        return;
      }

      setFigures((current) => current.filter((figure) => figure.id !== figureToDelete.id));
      setFigureToDelete(null);
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
            {filteredFigures.length} of {figures.length} records
          </p>
        </div>

        <div className="mt-4">
          <FigureTable
            figures={filteredFigures}
            loading={loading}
            onEdit={openEditDialog}
            onDelete={setFigureToDelete}
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
        onOpenChange={setDialogOpen}
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
