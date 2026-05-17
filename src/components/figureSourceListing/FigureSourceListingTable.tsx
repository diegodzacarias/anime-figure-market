import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const FigureSourceListingTable = ({
  listings,
  loading,
  onEdit,
  onDelete,
}: FigureSourceListingTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">ID</TableHead>
            <TableHead>Figure</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Available</TableHead>
            <TableHead className="w-48 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} className="h-28 text-center text-muted-foreground">
                Loading source listings...
              </TableCell>
            </TableRow>
          ) : listings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-28 text-center text-muted-foreground">
                No source listings found.
              </TableCell>
            </TableRow>
          ) : (
            listings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell className="font-medium">{listing.id}</TableCell>
                <TableCell>{listing.figureName || listing.figureId || "-"}</TableCell>
                <TableCell>{listing.sourceName || listing.sourceId || "-"}</TableCell>
                <TableCell className="max-w-xs truncate">{listing.sourceTitle || "-"}</TableCell>
                <TableCell>
                  {listing.price ? `${listing.price} ${listing.currencyCode || ""}` : "-"}
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
  );
};

export default FigureSourceListingTable;
