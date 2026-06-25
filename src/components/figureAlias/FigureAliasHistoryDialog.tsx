import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { getFigureAliasScrapingHistory } from "@/api/figureAliasApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoadingOverlay from "@/components/ui/loading-overlay";
import PageControls from "@/components/ui/page-controls";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ApiErrorResponse } from "@/lib/apiError";
import { normalizeApiError } from "@/lib/apiError";
import { formatDateTime } from "@/lib/date";
import { defaultPageMeta, getPageContent, getPageMeta } from "@/lib/page";
import { SCRAPING_SOURCE_OPTIONS } from "@/lib/scrapingSources";
import type { FigureAlias, FigureAliasScrapingHistory } from "@/types/figureAlias";

type FigureAliasHistoryDialogProps = {
  alias: FigureAlias | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApiError: (error: ApiErrorResponse) => void;
};

const statusVariant = (status: string) => {
  if (status === "ERROR") return "destructive" as const;
  if (status === "SUCCESS") return "default" as const;
  return "secondary" as const;
};

const FigureAliasHistoryDialog = ({
  alias,
  open,
  onOpenChange,
  onApiError,
}: FigureAliasHistoryDialogProps) => {
  const [history, setHistory] = useState<FigureAliasScrapingHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [sourceCode, setSourceCode] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [pageMeta, setPageMeta] = useState(defaultPageMeta);

  const loadHistory = useCallback(async () => {
    if (!open || !alias?.id) return;

    setLoading(true);

    try {
      const data = await getFigureAliasScrapingHistory(alias.id, {
        sourceCode,
        page,
        size: pageSize,
      });
      setHistory(getPageContent(data));
      setPageMeta(getPageMeta(data, pageSize));
    } catch (error) {
      onApiError(normalizeApiError(error, "Error loading alias scraping history."));
    } finally {
      setLoading(false);
    }
  }, [alias?.id, onApiError, open, page, pageSize, sourceCode]);

  useEffect(() => {
    if (open) loadHistory();
  }, [loadHistory, open]);

  useEffect(() => {
    if (!open) {
      setHistory([]);
      setSourceCode("");
      setPage(0);
      setPageSize(20);
      setPageMeta(defaultPageMeta);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] max-w-6xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Scraping history</DialogTitle>
          <DialogDescription>
            Executions that actually used "{alias?.alias || "this alias"}". History is loaded only while this dialog is open.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <label className="grid gap-1 text-xs font-medium text-muted-foreground">
            Scraping source
            <select
              value={sourceCode}
              disabled={loading}
              className="h-10 min-w-52 rounded-md border border-input bg-background px-3 text-sm text-foreground"
              onChange={(event) => {
                setSourceCode(event.target.value);
                setPage(0);
              }}
            >
              <option value="">All sources</option>
              {SCRAPING_SOURCE_OPTIONS.map((source) => (
                <option key={source.value} value={source.value}>
                  {source.label}
                </option>
              ))}
            </select>
          </label>

          <Button type="button" variant="outline" className="gap-2" disabled={loading} onClick={loadHistory}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        <LoadingOverlay active={loading} message="Loading scraping history...">
          <div className="overflow-hidden rounded-lg border">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Executed</TableHead>
                    <TableHead>Run / Execution</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Query</TableHead>
                    <TableHead>Origin</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Results</TableHead>
                    <TableHead>Decisions</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Error</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!loading && history.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="h-28 text-center text-muted-foreground">
                        No scraping executions found for this alias.
                      </TableCell>
                    </TableRow>
                  ) : (
                    history.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="whitespace-nowrap">{formatDateTime(entry.executedAt)}</TableCell>
                        <TableCell className="whitespace-nowrap text-xs">
                          <div>Run #{entry.scrapingRunId}</div>
                          <div className="text-muted-foreground">Execution #{entry.id}</div>
                        </TableCell>
                        <TableCell>{entry.sourceCode || "-"}</TableCell>
                        <TableCell className="min-w-64 whitespace-normal font-medium">{entry.query || "-"}</TableCell>
                        <TableCell>{entry.querySource || "-"}</TableCell>
                        <TableCell>
                          <Badge variant={statusVariant(entry.status)}>{entry.status}</Badge>
                        </TableCell>
                        <TableCell>{entry.resultCount}</TableCell>
                        <TableCell className="whitespace-nowrap text-xs">
                          <div>{entry.discardCount} discard</div>
                          <div>{entry.reviewCount} review</div>
                          <div>{entry.autoMatchCount} auto</div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{entry.durationMs} ms</TableCell>
                        <TableCell className="max-w-64 whitespace-normal text-xs text-destructive">
                          {entry.errorMessage || "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </LoadingOverlay>

        <PageControls
          page={pageMeta.page}
          size={pageMeta.size}
          totalElements={pageMeta.totalElements}
          totalPages={pageMeta.totalPages}
          disabled={loading}
          onPageChange={setPage}
          onSizeChange={(size) => {
            setPageSize(size);
            setPage(0);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FigureAliasHistoryDialog;
