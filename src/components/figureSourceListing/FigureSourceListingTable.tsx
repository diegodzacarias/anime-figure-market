import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/date";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { FigureSourceListing } from "./FigureSourceListingFormDialog";

type FigureSourceListingTableProps = {
  listings: FigureSourceListing[];
  loading: boolean;
  onEdit: (listing: FigureSourceListing) => void;
  onDelete: (listing: FigureSourceListing) => void;
};

const loadMethodVariant = (loadMethod?: string | null): "default" | "secondary" | "outline" => {
  const normalized = String(loadMethod || "").toUpperCase();

  if (normalized === "SCRAPED" || normalized === "GENERATED") return "default";
  if (normalized === "MANUAL") return "secondary";
  return "outline";
};

const FigureSourceListingTable = ({
  listings,
  loading,
  onEdit,
  onDelete,
}: FigureSourceListingTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">ID</TableHead>
              <TableHead>Figure</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Load Method</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Preorder</TableHead>
              <TableHead>Release Est.</TableHead>
              <TableHead>Captured</TableHead>
              <TableHead>Available</TableHead>
              <TableHead className="w-48 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={12} className="h-28 text-center text-muted-foreground">
                  Loading source listings...
                </TableCell>
              </TableRow>
            ) : listings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} className="h-28 text-center text-muted-foreground">
                  No source listings found.
                </TableCell>
              </TableRow>
            ) : (
              listings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell className="font-medium">{listing.id}</TableCell>
                  <TableCell>{listing.figureName || listing.figureId || "-"}</TableCell>
                  <TableCell>{listing.sourceName || listing.sourceId || "-"}</TableCell>
                  <TableCell>
                    {listing.loadMethod ? (
                      <Badge variant={loadMethodVariant(listing.loadMethod)}>{listing.loadMethod}</Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="max-w-xs">
                    {listing.sourceUrl ? (
                      <a
                        href={listing.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        <span className="truncate">{listing.sourceTitle || listing.sourceUrl}</span>
                        <ExternalLink className="h-3 w-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="truncate">{listing.sourceTitle || "-"}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {listing.price ? `${listing.price} ${listing.currencyCode || ""}` : "-"}
                  </TableCell>
                  <TableCell>{listing.listingStatus || "-"}</TableCell>
                  <TableCell>{formatDateTime(listing.preorderDate)}</TableCell>
                  <TableCell>{formatDateTime(listing.estimatedReleaseDate)}</TableCell>
                  <TableCell>{formatDateTime(listing.capturedAt)}</TableCell>
                  <TableCell>
                    {listing.isAvailable === undefined || listing.isAvailable === null
                      ? "Unknown"
                      : listing.isAvailable
                        ? "Yes"
                        : "No"}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" size="sm" className="gap-2" onClick={() => onEdit(listing)}>
                        <Pencil className="h-3.5 w-3.5" />
                        Actualizar
                      </Button>
                      <Button type="button" variant="destructive" size="sm" className="gap-2" onClick={() => onDelete(listing)}>
                        <Trash2 className="h-3.5 w-3.5" />
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FigureSourceListingTable;
