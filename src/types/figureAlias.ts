export type FigureAlias = {
  id?: number;
  figureId?: number;
  sourceId?: number | null;
  sourceName?: string | null;
  alias?: string;
  aliasNormalized?: string;
  loadMethod?: string | null;
  generationPriority?: string | number | null;
  generationSource?: string | null;
  generationReason?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  usedForScraping: boolean;
  scrapingUseCount: number;
  lastScrapedAt: string | null;
  scrapingResultCount: number;
  scrapingNoResultCount: number;
  scrapingErrorCount: number;
  scrapingDiscardCount: number;
  scrapingReviewCount: number;
  scrapingAutoMatchCount: number;
};

export type FigureAliasUsageFilter = "" | "used" | "never-used";

export type FigureAliasFilters = {
  usedForScraping?: boolean;
  sourceCode?: string;
  lastUsedBefore?: string;
};

export type ScrapingQueryExecutionStatus = "SUCCESS" | "NO_RESULTS" | "ERROR";

export type FigureAliasScrapingHistory = {
  id: number;
  scrapingRunId: number;
  figureAliasId: number | null;
  sourceCode: string;
  query: string;
  querySource: string;
  status: ScrapingQueryExecutionStatus;
  resultCount: number;
  discardCount: number;
  reviewCount: number;
  autoMatchCount: number;
  errorMessage: string | null;
  durationMs: number;
  executedAt: string;
};
