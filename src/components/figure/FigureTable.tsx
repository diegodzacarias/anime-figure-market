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
import type { Figure } from "./FigureFormDialog";

type FigureTableProps = {
  figures: Figure[];
  loading: boolean;
  franchiseNames: Record<number, string>;
  brandNames: Record<number, string>;
  onEdit: (figure: Figure) => void;
  onDelete: (figure: Figure) => void;
};

const getFranchiseName = (figure: Figure, franchiseNames: Record<number, string>) => {
  const franchiseId = figure.franchiseId || figure.franchise?.id;
  return figure.franchise?.name || (franchiseId ? franchiseNames[franchiseId] : "") || "-";
};

const getBrandName = (figure: Figure, brandNames: Record<number, string>) => {
  const brandId = figure.brandId || figure.brand?.id;
  return figure.brand?.name || (brandId ? brandNames[brandId] : "") || "-";
};

const FigureTable = ({
  figures,
  loading,
  franchiseNames,
  brandNames,
  onEdit,
  onDelete,
}: FigureTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Franchise</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>JAN/EAN</TableHead>
              <TableHead>Product Code</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-48 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} className="h-28 text-center text-muted-foreground">
                  Loading figures...
                </TableCell>
              </TableRow>
            ) : figures.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-28 text-center text-muted-foreground">
                  No figures found.
                </TableCell>
              </TableRow>
            ) : (
              figures.map((figure) => (
                <TableRow key={figure.id}>
                  <TableCell className="font-medium">{figure.id}</TableCell>
                  <TableCell>{figure.name || "-"}</TableCell>
                  <TableCell>{figure.slug || "-"}</TableCell>
                  <TableCell>{getFranchiseName(figure, franchiseNames)}</TableCell>
                  <TableCell>{getBrandName(figure, brandNames)}</TableCell>
                  <TableCell>{figure.janCode || "-"}</TableCell>
                  <TableCell>{figure.officialProductCode || "-"}</TableCell>
                  <TableCell>{figure.status || "-"}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" size="sm" className="gap-2" onClick={() => onEdit(figure)}>
                        <Pencil className="h-3.5 w-3.5" />
                        Actualizar
                      </Button>
                      <Button type="button" variant="destructive" size="sm" className="gap-2" onClick={() => onDelete(figure)}>
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

export default FigureTable;
