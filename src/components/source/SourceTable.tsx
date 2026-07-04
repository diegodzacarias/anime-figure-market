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
import type { Source } from "./SourceFormDialog";

type SourceTableProps = {
  sources: Source[];
  loading: boolean;
  onEdit: (source: Source) => void;
  onDelete: (source: Source) => void;
};

const SourceTable = ({ sources, loading, onEdit, onDelete }: SourceTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Base URL</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Active</TableHead>
            <TableHead className="w-48 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className="h-28 text-center text-muted-foreground">
                Loading sources...
              </TableCell>
            </TableRow>
          ) : sources.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-28 text-center text-muted-foreground">
                No sources found.
              </TableCell>
            </TableRow>
          ) : (
            sources.map((source) => (
              <TableRow key={source.id}>
                <TableCell className="font-medium">{source.id}</TableCell>
                <TableCell>{source.name || "-"}</TableCell>
                <TableCell className="max-w-xs">
                  {source.baseUrl ? (
                    <a
                      href={source.baseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 truncate text-primary hover:underline"
                    >
                      <span className="truncate">{source.baseUrl}</span>
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  ) : "-"}
                </TableCell>
                <TableCell>{source.type || "-"}</TableCell>
                <TableCell>{source.priority ?? "-"}</TableCell>
                <TableCell>{source.active ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" size="sm" className="gap-2" onClick={() => onEdit(source)}>
                      <Pencil className="h-3.5 w-3.5" />
                      Actualizar
                    </Button>
                    <Button type="button" variant="destructive" size="sm" className="gap-2" onClick={() => onDelete(source)}>
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

export default SourceTable;
