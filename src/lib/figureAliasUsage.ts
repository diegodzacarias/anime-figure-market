import type { FigureAlias } from "@/types/figureAlias";

export type AliasUsageLabel =
  | "Never used"
  | "Used"
  | "No results"
  | "With errors"
  | "Produced candidates";

export function getAliasUsageLabels(alias: FigureAlias): AliasUsageLabel[] {
  if (!alias.usedForScraping) {
    return ["Never used"];
  }

  const labels: AliasUsageLabel[] = [];

  if (alias.scrapingNoResultCount > 0 && alias.scrapingResultCount === 0) {
    labels.push("No results");
  }

  if (alias.scrapingErrorCount > 0) {
    labels.push("With errors");
  }

  if (alias.scrapingReviewCount > 0 || alias.scrapingAutoMatchCount > 0) {
    labels.push("Produced candidates");
  }

  return labels.length > 0 ? labels : ["Used"];
}
