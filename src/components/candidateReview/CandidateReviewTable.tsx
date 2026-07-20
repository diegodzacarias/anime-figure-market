import { MoreHorizontal, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/date";
import type { ScrapedListingCandidate } from "./CandidateReviewFormDialog";

type CandidateReviewTableProps = {
  candidates: ScrapedListingCandidate[];
  loading: boolean;
  onView: (candidate: ScrapedListingCandidate) => void;
  onApprove: (candidate: ScrapedListingCandidate) => void;
  onReject: (candidate: ScrapedListingCandidate) => void;
  onDelete: (candidate: ScrapedListingCandidate) => void;
};

const CandidateReviewTable = ({
  candidates,
  loading,
  onView,
  onApprove,
  onReject,
  onDelete,
}: CandidateReviewTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">ID</TableHead>
              <TableHead>Figure</TableHead>
              <TableHead>Match Score</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Captured</TableHead>
              <TableHead>Reviewed</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={10} className="h-28 text-center text-muted-foreground">
                  Loading candidates...
                </TableCell>
              </TableRow>
            ) : candidates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="h-28 text-center text-muted-foreground">
                  No candidates found.
                </TableCell>
              </TableRow>
            ) : (
              candidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="font-medium">{candidate.id}</TableCell>
                  <TableCell className="min-w-56">
                    {candidate.figureId ? (
                      <a
                        href={`/anime-figure-market/figure/${candidate.figureId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                      >
                        {candidate.figureName || candidate.figureId}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <div className="font-medium">{candidate.figureName || "-"}</div>
                    )}
                    {candidate.figureSlug && (
                      <div className="text-xs text-muted-foreground">{candidate.figureSlug}</div>
                    )}
                  </TableCell>
                  <TableCell>{candidate.matchScore ?? "-"}</TableCell>
                  <TableCell>
                    <div>{candidate.sourceName || candidate.sourceId || "-"}</div>
                    {candidate.sourceCode && (
                      <div className="text-xs text-muted-foreground">{candidate.sourceCode}</div>
                    )}
                  </TableCell>
                  <TableCell className="max-w-sm">
                    <div className="truncate">{candidate.sourceTitle || "-"}</div>
                    {candidate.sourceUrl && (
                      <a
                        href={candidate.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        Open source URL
                      </a>
                    )}
                  </TableCell>
                  <TableCell>
                    {candidate.price ? `${candidate.price} ${candidate.currencyCode || ""}` : "-"}
                  </TableCell>
                  <TableCell>{candidate.status || "-"}</TableCell>
                  <TableCell>{formatDateTime(candidate.capturedAt)}</TableCell>
                  <TableCell>{formatDateTime(candidate.reviewedAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onView(candidate)}>View</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onApprove(candidate)}>Approve</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onReject(candidate)}>Reject</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => onDelete(candidate)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default CandidateReviewTable;
