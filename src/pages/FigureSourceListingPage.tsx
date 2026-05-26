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
import type { FigureOption, SourceOption } from "@/components/figureAlias/FigureAliasFormDialog";
import FigureSourceListingFormDialog, {
  FigureSourceListing,
} from "@/components/figureSourceListing/FigureSourceListingFormDialog";
import FigureSourceListingTable from "@/components/figureSourceListing/FigureSourceListingTable";
import { useReferenceData } from "@/hooks/useReferenceData";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://figure-market-core.onrender.com/api";

const FIGURES_ENDPOINT = `${API_BASE_URL}/v1/figures`;
const FIGURE_SOURCE_LISTINGS_ENDPOINT = `${API_BASE_URL}/figure-source-listings`;
const SOURCES_ENDPOINT = `${API_BASE_URL}/v1/sources`;

const fallbackCurrencyCodes = [
  { value: "USD", label: "Usd", symbol: "$" },
  { value: "JPY", label: "Jpy", symbol: "¥" },
];

const fallbackListingStatuses = [
  { value: "ACTIVE", label: "Active" },
  { value: "SOLD_OUT", label: "Sold Out" },
  { value: "ARCHIVED", label: "Archived" },
  { value: "UNKNOWN", label: "Unknown" },
];

const FigureSourceListingPage = () => {
  const [listings, setListings] = useState<FigureSourceListing[]>([]);
  const [figures, setFigures] = useState<FigureOption[]>([]);
  const [sources, setSources] = useState<SourceOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<FigureSourceListing | null>(null);
  const [listingToDelete, setListingToDelete] = useState<FigureSourceListing | null>(null);
  const { referenceData, loadingReferenceData } = useReferenceData();
  const mutating = saving || deleting;

  const fetchData = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
      setLoadingOptions(true);
    }

    try {
      const [listingsResponse, figuresResponse, sourcesResponse] = await Promise.all([
        fetch(FIGURE_SOURCE_LISTINGS_ENDPOINT),
        fetch(FIGURES_ENDPOINT),
        fetch(SOURCES_ENDPOINT),
      ]);

      if (listingsResponse.ok) {
        const data = await listingsResponse.json();
        setListings(Array.isArray(data) ? data : []);
      } else {
        console.error("Error fetching figure source listings");
      }

      if (figuresResponse.ok) {
        const data = await figuresResponse.json();
        setFigures(Array.isArray(data) ? data : []);
      } else {
        console.error("Error fetching figures");
      }

      if (sourcesResponse.ok) {
        const data = await sourcesResponse.json();
        setSources(Array.isArray(data) ? data : []);
      } else {
        console.error("Error fetching sources");
      }
    } catch (error) {
      console.error("Request error fetching figure source listings:", error);
    } finally {
      if (showLoading) {
        setLoading(false);
        setLoadingOptions(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredListings = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return listings;

    return listings.filter((listing) =>
      [
        listing.id?.toString(),
        listing.figureName,
        listing.figureSlug,
        listing.sourceName,
        listing.sourceItemId,
        listing.sourceTitle,
        listing.sourceUrl,
        listing.currencyCode,
        listing.listingStatus,
      ]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(query))
    );
  }, [listings, search]);

  const openCreateDialog = () => {
    setSelectedListing(null);
    setDialogOpen(true);
  };

  const openEditDialog = (listing: FigureSourceListing) => {
    setSelectedListing(listing);
    setDialogOpen(true);
  };

  const handleSubmit = async (payload: Record<string, string | number | boolean>) => {
    setSaving(true);

    const isEditing = Boolean(selectedListing?.id);
    const endpoint = isEditing
      ? `${FIGURE_SOURCE_LISTINGS_ENDPOINT}/${selectedListing?.id}`
      : FIGURE_SOURCE_LISTINGS_ENDPOINT;

    try {
      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend error:", errorText);
        alert("Error saving figure source listing. Check console.");
        return;
      }

      await fetchData(false);

      setDialogOpen(false);
      setSelectedListing(null);
    } catch (error) {
      console.error("Request error:", error);
      alert("Error connecting to backend. Check console.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!listingToDelete?.id) return;

    setDeleting(true);

    try {
      const response = await fetch(`${FIGURE_SOURCE_LISTINGS_ENDPOINT}/${listingToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend error:", errorText);
        alert("Error deleting figure source listing. Check console.");
        return;
      }

      await fetchData(false);
      setListingToDelete(null);
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
            <h1 className="text-3xl font-bold text-foreground">Figure Source Listings</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage source-specific marketplace listings for each figure.
            </p>
          </div>

          <Button type="button" className="gap-2 md:self-center" onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            New Figure Source Listing
          </Button>
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search source listings"
              className="pl-9"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            {filteredListings.length} of {listings.length} records
          </p>
        </div>

        <LoadingOverlay active={mutating} message="Updating source listings..." className="mt-4">
          <FigureSourceListingTable
            listings={filteredListings}
            loading={loading}
            onEdit={openEditDialog}
            onDelete={setListingToDelete}
          />
        </LoadingOverlay>
      </main>

      <FigureSourceListingFormDialog
        listing={selectedListing}
        figures={figures}
        sources={sources}
        open={dialogOpen}
        saving={saving}
        loadingOptions={loadingOptions || loadingReferenceData}
        currencyCodes={referenceData.currencyCodes.length > 0 ? referenceData.currencyCodes : fallbackCurrencyCodes}
        listingStatuses={
          referenceData.figureSourceListingStatuses.length > 0
            ? referenceData.figureSourceListingStatuses
            : fallbackListingStatuses
        }
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
      />

      <AlertDialog
        open={Boolean(listingToDelete)}
        onOpenChange={(open) => {
          if (!open) setListingToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete source listing?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete "{listingToDelete?.sourceTitle || "this listing"}" from the
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
    </div>
  );
};

export default FigureSourceListingPage;
