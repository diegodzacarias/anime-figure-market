import { History, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AliasDecisionCell,
  AliasOutcomeCell,
  AliasUsageCell,
} from "@/components/figureAlias/AliasUsageSummary";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/date";
import type { FigureAlias } from "./FigureAliasFormDialog";

type FigureAliasTableProps = {
  aliases: FigureAlias[];
  loading: boolean;
  figureNames: Record<number, string>;
  sourceNames: Record<number, string>;
  onEdit: (alias: FigureAlias) => void;
  onDelete: (alias: FigureAlias) => void;
  onHistory: (alias: FigureAlias) => void;
};

const FigureAliasTable = ({
  aliases,
  loading,
  figureNames,
  sourceNames,
  onEdit,
  onDelete,
  onHistory,
}: FigureAliasTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">ID</TableHead>
            <TableHead>Alias</TableHead>
            <TableHead>Figure</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Load Method</TableHead>
            <TableHead>Scraping Usage</TableHead>
            <TableHead>Outcomes</TableHead>
            <TableHead>Decisions</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead className="w-64 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={10} className="h-28 text-center text-muted-foreground">
                Loading figure aliases...
              </TableCell>
            </TableRow>
          ) : aliases.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} className="h-28 text-center text-muted-foreground">
                No figure aliases found.
              </TableCell>
            </TableRow>
          ) : (
            aliases.map((alias) => (
              <TableRow key={alias.id}>
                <TableCell className="font-medium">{alias.id}</TableCell>
                <TableCell className="min-w-56">
                  <p className="font-medium text-foreground">{alias.alias || "-"}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{alias.aliasNormalized || "-"}</p>
                </TableCell>
                <TableCell>{alias.figureId ? figureNames[alias.figureId] || alias.figureId : "-"}</TableCell>
                <TableCell>{alias.sourceId ? sourceNames[alias.sourceId] || alias.sourceId : "-"}</TableCell>
                <TableCell>{alias.loadMethod || "-"}</TableCell>
                <TableCell><AliasUsageCell alias={alias} /></TableCell>
                <TableCell><AliasOutcomeCell alias={alias} /></TableCell>
                <TableCell><AliasDecisionCell alias={alias} /></TableCell>
                <TableCell>{formatDateTime(alias.updatedAt)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap justify-end gap-2">
                    <Button type="button" variant="ghost" size="sm" className="gap-2" onClick={() => onHistory(alias)}>
                      <History className="h-3.5 w-3.5" />
                      History
                    </Button>
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
    </div>
  );
};

export default FigureAliasTable;
