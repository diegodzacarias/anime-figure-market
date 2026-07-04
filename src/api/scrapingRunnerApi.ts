import { apiRequest } from "@/lib/apiClient";
import type { ScrapedListingCandidate } from "@/components/candidateReview/CandidateReviewFormDialog";
import type { FigureSourceListing } from "@/components/figureSourceListing/FigureSourceListingFormDialog";

const NINNIN_GAME_SCRAPING_ENDPOINT = "/v1/scraping/nin-nin-game/figures";
const SCRAPING_FIGURE_STATE_ENDPOINT = "/v1/scraping/figures";

export type ScrapingQueryResult = {
  query?: string;
  success?: boolean;
  resultCount?: number;
  errorMessage?: string | null;
  executionId?: number;
  figureAliasId?: number | null;
  querySource?: string | null;
  [key: string]: unknown;
};

export type ScrapingMatch = {
  listing?: {
    sourceCode?: string | null;
    title?: string | null;
    url?: string | null;
    price?: number | string | null;
    currencyCode?: string | null;
    rawPriceText?: string | null;
    availability?: string | null;
    rawAvailabilityText?: string | null;
    imageUrl?: string | null;
    sourceItemId?: string | null;
    productCode?: string | null;
    janCode?: string | null;
    [key: string]: unknown;
  };
  title?: string;
  sourceTitle?: string;
  name?: string;
  price?: number | string | null;
  currencyCode?: string | null;
  availability?: string | null;
  score?: number | string | null;
  matchScore?: number | string | null;
  confidence?: string | null;
  decision?: string | null;
  matchDecision?: string | null;
  productCode?: string | null;
  janCode?: string | null;
  url?: string | null;
  sourceUrl?: string | null;
  [key: string]: unknown;
};

export type NinNinGameScrapingResponse = {
  scrapingRunId?: number;
  figureId?: number;
  figureName?: string;
  sourceCode?: string;
  queries?: string[];
  foundResults?: boolean;
  hasErrors?: boolean;
  totalResults?: number;
  minimumCandidateScore?: number;
  candidateCount?: number;
  queryResults?: ScrapingQueryResult[];
  candidateMatches?: ScrapingMatch[];
  matches?: ScrapingMatch[];
  results?: ScrapingMatch[];
  [key: string]: unknown;
};

export type ScrapingFigureState = {
  figureId?: number;
  limit?: number;
  candidateCount?: number;
  pendingReviewCandidateCount?: number;
  approvedCandidateCount?: number;
  rejectedCandidateCount?: number;
  sourceListingCount?: number;
  hasPendingReviewCandidates?: boolean;
  hasSourceListings?: boolean;
  pendingReviewCandidates?: ScrapedListingCandidate[];
  recentCandidates?: ScrapedListingCandidate[];
  sourceListings?: FigureSourceListing[];
};

export type ScrapingJobData = {
  runId: string;
  figureId: number;
  source: string;
  status: "QUEUED" | "RUNNING" | "COMPLETED" | "PARTIAL" | "FAILED";
  startedAt: string;
  finishedAt: string | null;
  queryCount: number;
  totalFound: number;
  totalSaved: number;
  errorMessage: string | null;
};

export type ScrapingJobResponse = {
  success: boolean;
  data: ScrapingJobData;
};

export async function startScrapingJob(
  sourceCode: string,
  figureId: number
): Promise<ScrapingJobResponse> {
  return apiRequest<ScrapingJobResponse>(
    `/v1/scraping/sources/${sourceCode}/figures/${figureId}/jobs`,
    {
      method: "POST",
      fallbackMessage: "Error starting scraping job.",
    }
  );
}

export async function getScrapingJobStatus(runId: string): Promise<ScrapingJobResponse> {
  return apiRequest<ScrapingJobResponse>(`/v1/scraping/jobs/${runId}`, {
    fallbackMessage: "Error fetching scraping job status.",
  });
}

export async function getScrapingJobResult(runId: string): Promise<NinNinGameScrapingResponse> {
  return apiRequest<NinNinGameScrapingResponse>(`/v1/scraping/jobs/${runId}/result`, {
    fallbackMessage: "Error fetching scraping job result.",
  });
}

export async function runNinNinGameScraping(
  figureId: number
): Promise<NinNinGameScrapingResponse> {
  return apiRequest<NinNinGameScrapingResponse>(`${NINNIN_GAME_SCRAPING_ENDPOINT}/${figureId}/search`, {
    method: "POST",
    fallbackMessage: "Error running Nin-Nin Game scraping.",
  });
}

export async function getScrapingFigureState(
  figureId: number,
  limit = 20
): Promise<ScrapingFigureState> {
  return apiRequest<ScrapingFigureState>(`${SCRAPING_FIGURE_STATE_ENDPOINT}/${figureId}/state`, {
    query: { limit },
    fallbackMessage: "Error loading scraping figure state.",
  });
}
