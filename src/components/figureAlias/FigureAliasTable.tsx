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
import type { FigureAlias } from "./FigureAliasFormDialog";

type FigureAliasTableProps = {
  aliases: FigureAlias[];
  loading: boolean;
  figureNames: Record<number, string>;
  sourceNames: Record<number, string>;
  onEdit: (alias: FigureAlias) => void;
  onDelete: (alias: FigureAlias) => void;
};

const FigureAliasTable = ({
  aliases,
  loading,
  figureNames,
  sourceNames,
  onEdit,
  onDelete,
}: FigureAliasTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">ID</TableHead>
            <TableHead>Alias</TableHead>
            <TableHead>Normalized Alias</TableHead>
            <TableHead>Figure</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Load Method</TableHead>
            <TableHead className="w-48 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className="h-28 text-center text-muted-foreground">
                Loading figure aliases...
              </TableCell>
            </TableRow>
          ) : aliases.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-28 text-center text-muted-foreground">
                No figure aliases found.
              </TableCell>
            </TableRow>
          ) : (
            aliases.map((alias) => (
              <TableRow key={alias.id}>
                <TableCell className="font-medium">{alias.id}</TableCell>
                <TableCell>{alias.alias || "-"}</TableCell>
                <TableCell>{alias.aliasNormalized || "-"}</TableCell>
                <TableCell>{alias.figureId ? figureNames[alias.figureId] || alias.figureId : "-"}</TableCell>
                <TableCell>{alias.sourceId ? sourceNames[alias.sourceId] || alias.sourceId : "-"}</TableCell>
                <TableCell>{alias.loadMethod || "-"}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" size="sm" className="gap-2" onClick={() => onEdit(alias)}>
                      <Pencil className="h-3.5 w-3.5" />
                      Actualizar
                    </Button>
                    <Button type="button" variant="destructive" size="sm" className="gap-2" onClick={() => onDelete(alias)}>
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

export default FigureAliasTable;
