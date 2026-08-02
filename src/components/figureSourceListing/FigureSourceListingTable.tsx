import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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

const FALLBACK_IMAGE_URL = `${import.meta.env.BASE_URL}placeholder.svg`;

type FigureSourceListingTableProps = {
  listings: FigureSourceListing[];
  loading: boolean;
  figureImagesById: Record<number, string | null | undefined>;
  onEdit: (listing: FigureSourceListing) => void;
  onDelete: (listing: FigureSourceListing) => void;
};

const ListingFigureThumbnail = ({
  imageUrl,
  altText,
}: {
  imageUrl?: string | null;
  altText: string;
}) => {
  const resolvedImageUrl = imageUrl || FALLBACK_IMAGE_URL;

  return (
    <HoverCard openDelay={150} closeDelay={80}>
      <HoverCardTrigger asChild>
        <div className="h-16 w-14 cursor-zoom-in overflow-hidden rounded-md border bg-muted">
          <img
            src={resolvedImageUrl}
            alt={altText}
            className="h-full w-full object-contain"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.src = FALLBACK_IMAGE_URL;
            }}
          />
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="right" align="center" className="w-72 p-2">
        <div className="aspect-[4/5] overflow-hidden rounded-md bg-muted">
          <img
            src={resolvedImageUrl}
            alt={altText}
            className="h-full w-full object-contain"
            onError={(event) => {
              event.currentTarget.src = FALLBACK_IMAGE_URL;
            }}
          />
        </div>
        <p className="mt-2 line-clamp-2 text-xs font-medium text-popover-foreground">{altText}</p>
      </HoverCardContent>
    </HoverCard>
  );
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
  figureImagesById,
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
              <TableHead className="w-24">Image</TableHead>
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
              <TableHead className="sticky right-0 z-10 w-20 border-l bg-card text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={13} className="h-28 text-center text-muted-foreground">
                  Loading source listings...
                </TableCell>
              </TableRow>
            ) : listings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={13} className="h-28 text-center text-muted-foreground">
                  No source listings found.
                </TableCell>
              </TableRow>
            ) : (
              listings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell className="font-medium">{listing.id}</TableCell>
                  <TableCell>
                    <ListingFigureThumbnail
                      imageUrl={listing.figureId ? figureImagesById[listing.figureId] : undefined}
                      altText={listing.figureName || `Figure ${listing.figureId || ""}`.trim()}
                    />
                  </TableCell>
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
                  <TableCell className="sticky right-0 z-10 border-l bg-card">
                    <div className="flex justify-center gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        title="Actualizar"
                        aria-label="Actualizar"
                        onClick={() => onEdit(listing)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        title="Eliminar"
                        aria-label="Eliminar"
                        onClick={() => onDelete(listing)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
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
