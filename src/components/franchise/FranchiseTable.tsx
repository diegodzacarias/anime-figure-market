import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Franchise } from "./FranchiseFormDialog";

type FranchiseTableProps = {
  franchises: Franchise[];
  loading: boolean;
  onEdit: (franchise: Franchise) => void;
  onDelete: (franchise: Franchise) => void;
};

const FranchiseTable = ({
  franchises,
  loading,
  onEdit,
  onDelete,
}: FranchiseTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Image URL</TableHead>
            <TableHead className="w-48 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="h-28 text-center text-muted-foreground">
                Loading franchises...
              </TableCell>
            </TableRow>
          ) : franchises.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-28 text-center text-muted-foreground">
                No franchises found.
              </TableCell>
            </TableRow>
          ) : (
            franchises.map((franchise) => (
              <TableRow key={franchise.id}>
                <TableCell className="font-medium">{franchise.id}</TableCell>
                <TableCell>{franchise.name || "-"}</TableCell>
                <TableCell>{franchise.slug || "-"}</TableCell>
                <TableCell className="max-w-xs">
                  {franchise.imageUrl ? (
                    <a
                      href={franchise.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 truncate text-primary hover:underline"
                    >
                      <span className="truncate">{franchise.imageUrl}</span>
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  ) : "-"}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => onEdit(franchise)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Actualizar
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="gap-2"
                      onClick={() => onDelete(franchise)}
                    >
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

export default FranchiseTable;
