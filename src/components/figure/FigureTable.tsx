import { ExternalLink, Pencil, ShieldAlert, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Figure } from "./FigureFormDialog";

const FALLBACK_IMAGE_URL = `${import.meta.env.BASE_URL}placeholder.svg`;

type FigureTableProps = {
  figures: Figure[];
  loading: boolean;
  franchiseNames: Record<number, string>;
  brandNames: Record<number, string>;
  onEdit: (figure: Figure) => void;
  onDelete: (figure: Figure) => void;
  onPhysicalDelete: (figure: Figure) => void;
};

const getFranchiseName = (figure: Figure, franchiseNames: Record<number, string>) => {
  const franchiseId = figure.franchiseId || figure.franchise?.id;
  return figure.franchise?.name || (franchiseId ? franchiseNames[franchiseId] : "") || "-";
};

const getBrandName = (figure: Figure, brandNames: Record<number, string>) => {
  const brandId = figure.brandId || figure.brand?.id;
  return figure.brand?.name || (brandId ? brandNames[brandId] : "") || "-";
};

const FigureThumbnail = ({ figure }: { figure: Figure }) => {
  const imageUrl = figure.primaryImageUrl || FALLBACK_IMAGE_URL;
  const altText = figure.name || "Figure image";

  return (
    <HoverCard openDelay={150} closeDelay={80}>
      <HoverCardTrigger asChild>
        <div className="h-16 w-14 cursor-zoom-in overflow-hidden rounded-md border bg-muted">
          <img
            src={imageUrl}
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
            src={imageUrl}
            alt={altText}
            className="h-full w-full object-contain"
            onError={(event) => {
              event.currentTarget.src = FALLBACK_IMAGE_URL;
            }}
          />
        </div>
        <p className="mt-2 line-clamp-2 text-xs font-medium text-popover-foreground">
          {figure.name || `Figure ${figure.id || ""}`.trim()}
        </p>
      </HoverCardContent>
    </HoverCard>
  );
};

const FigureTable = ({
  figures,
  loading,
  franchiseNames,
  brandNames,
  onEdit,
  onDelete,
  onPhysicalDelete,
}: FigureTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">ID</TableHead>
              <TableHead className="w-24">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Franchise</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>JAN/EAN</TableHead>
              <TableHead>Product Code</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-80 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={11} className="h-28 text-center text-muted-foreground">
                  Loading figures...
                </TableCell>
              </TableRow>
            ) : figures.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="h-28 text-center text-muted-foreground">
                  No figures found.
                </TableCell>
              </TableRow>
            ) : (
              figures.map((figure) => (
                <TableRow key={figure.id}>
                  <TableCell className="font-medium">{figure.id}</TableCell>
                  <TableCell>
                    <FigureThumbnail figure={figure} />
                  </TableCell>
                  <TableCell>{figure.name || "-"}</TableCell>
                  <TableCell>{figure.slug || "-"}</TableCell>
                  <TableCell>{getFranchiseName(figure, franchiseNames)}</TableCell>
                  <TableCell>{getBrandName(figure, brandNames)}</TableCell>
                  <TableCell>{figure.janCode || "-"}</TableCell>
                  <TableCell>{figure.officialProductCode || "-"}</TableCell>
                  <TableCell>
                    {figure.sourceReferenceUrl ? (
                      <a
                        href={figure.sourceReferenceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        Open
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>{figure.status || "-"}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap justify-end gap-2">
                      <Button type="button" variant="outline" size="sm" className="gap-2" onClick={() => onEdit(figure)}>
                        <Pencil className="h-3.5 w-3.5" />
                        Actualizar
                      </Button>
                      <Button type="button" variant="destructive" size="sm" className="gap-2" onClick={() => onDelete(figure)}>
                        <Trash2 className="h-3.5 w-3.5" />
                        Eliminar
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-2 border-destructive/60 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => onPhysicalDelete(figure)}
                      >
                        <ShieldAlert className="h-3.5 w-3.5" />
                        Borrado fisico
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

export default FigureTable;
