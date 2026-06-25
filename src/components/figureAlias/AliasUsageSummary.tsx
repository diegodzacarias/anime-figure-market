import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/date";
import { getAliasUsageLabels } from "@/lib/figureAliasUsage";
import type { FigureAlias } from "@/types/figureAlias";

const labelVariant = (label: string): "default" | "secondary" | "destructive" | "outline" => {
  if (label === "With errors") return "destructive";
  if (label === "Produced candidates") return "default";
  if (label === "No results") return "secondary";
  return "outline";
};

export const AliasUsageBadges = ({ alias }: { alias: FigureAlias }) => (
  <div className="flex flex-wrap gap-1">
    {getAliasUsageLabels(alias).map((label) => (
      <Badge key={label} variant={labelVariant(label)}>
        {label}
      </Badge>
    ))}
  </div>
);

export const AliasUsageCell = ({ alias }: { alias: FigureAlias }) => (
  <div className="min-w-36 space-y-2">
    <AliasUsageBadges alias={alias} />
    <p className="text-xs text-muted-foreground">
      {alias.scrapingUseCount} {alias.scrapingUseCount === 1 ? "execution" : "executions"}
    </p>
    <p className="text-xs text-muted-foreground">Last: {formatDateTime(alias.lastScrapedAt)}</p>
  </div>
);

export const AliasOutcomeCell = ({ alias }: { alias: FigureAlias }) => (
  <dl className="grid min-w-32 grid-cols-2 gap-x-3 gap-y-1 text-xs">
    <dt className="text-muted-foreground">Results</dt>
    <dd className="text-right font-medium text-foreground">{alias.scrapingResultCount}</dd>
    <dt className="text-muted-foreground">No results</dt>
    <dd className="text-right font-medium text-foreground">{alias.scrapingNoResultCount}</dd>
    <dt className="text-muted-foreground">Errors</dt>
    <dd className="text-right font-medium text-foreground">{alias.scrapingErrorCount}</dd>
  </dl>
);

export const AliasDecisionCell = ({ alias }: { alias: FigureAlias }) => (
  <dl className="grid min-w-32 grid-cols-2 gap-x-3 gap-y-1 text-xs">
    <dt className="text-muted-foreground">Discards</dt>
    <dd className="text-right font-medium text-foreground">{alias.scrapingDiscardCount}</dd>
    <dt className="text-muted-foreground">Reviews</dt>
    <dd className="text-right font-medium text-foreground">{alias.scrapingReviewCount}</dd>
    <dt className="text-muted-foreground">Auto-match</dt>
    <dd className="text-right font-medium text-foreground">{alias.scrapingAutoMatchCount}</dd>
  </dl>
);
