import { apiRequest } from "@/lib/apiClient";
import type { PageResponse } from "@/lib/page";
import type { FigureAlias, FigureAliasFilters } from "@/types/figureAlias";

const FIGURE_ALIASES_ENDPOINT = "/v1/figure-aliases";
const FIGURE_ALIAS_GENERATOR_FIGURES_ENDPOINT = `${FIGURE_ALIASES_ENDPOINT}/generator/figures`;

export type FigureAliasGeneratorFigure = {
  figureId?: number;
  figureName?: string;
  figureSlug?: string;
  id?: number;
  franchiseId?: number;
  franchiseName?: string | null;
  franchise?: { id?: number; name?: string };
  brandId?: number;
  brandName?: string | null;
  brand?: { id?: number; name?: string };
  name?: string;
  slug?: string;
  lineName?: string | null;
  status?: string | null;
  primaryImageUrl?: string | null;
  aliasCount?: number | null;
  generatedAliasCount?: number | null;
  manualAliasCount?: number | null;
  importedAliasCount?: number | null;
  scrapedAliasCount?: number | null;
  figureUpdatedAt?: string | null;
  lastGeneratedAliasAt?: string | null;
  hasAliases?: boolean | null;
  hasGeneratedAliases?: boolean | null;
  mayNeedRegeneration?: boolean | null;
};

export type GeneratedFigureAlias = {
  alias?: string;
  aliasNormalized?: string;
  priority?: string | number | null;
  generationSource?: string | null;
  reason?: string | null;
  alreadyExists?: boolean | null;
};

export type ExistingFigureAlias = FigureAlias;

export type FigureScrapingQuery = {
  query: string;
  source: string;
  figureAliasId: number | null;
  reason: string;
  providerOrder: number;
  sourceOrder: number;
  sequence: number;
};

export type FigureAliasGenerationResponse = {
  figureId?: number;
  figureName?: string;
  maxGeneratedAliases?: number;
  generatedCount?: number;
  savedCount?: number;
  skippedExistingCount?: number;
  scrapingQueryCount?: number;
  generatedAliases?: GeneratedFigureAlias[];
  savedAliases?: ExistingFigureAlias[];
  scrapingQueries?: string[];
};

export type FigureAliasGeneratorFilters = {
  franchiseId?: string;
  status?: string;
  hasAliases?: boolean;
  hasGeneratedAliases?: boolean;
  mayNeedRegeneration?: boolean;
};

export const getFiguresForAliasGenerator = (
  page: number,
  size: number,
  query: string,
  filters: FigureAliasGeneratorFilters = {}
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort: "figureName,asc",
  });

  if (query.trim()) {
    params.set("q", query.trim());
  }

  if (filters.franchiseId) {
    params.set("franchiseId", filters.franchiseId);
  }

  if (filters.status) {
    params.set("status", filters.status);
  }

  if (filters.hasAliases !== undefined) {
    params.set("hasAliases", String(filters.hasAliases));
  }

  if (filters.hasGeneratedAliases !== undefined) {
    params.set("hasGeneratedAliases", String(filters.hasGeneratedAliases));
  }

  if (filters.mayNeedRegeneration !== undefined) {
    params.set("mayNeedRegeneration", String(filters.mayNeedRegeneration));
  }

  return apiRequest<PageResponse<FigureAliasGeneratorFigure> | FigureAliasGeneratorFigure[]>(
    FIGURE_ALIAS_GENERATOR_FIGURES_ENDPOINT,
    { query: Object.fromEntries(params.entries()), fallbackMessage: "Error loading figures." }
  );
};

export const getExistingFigureAliases = (
  figureId: number,
  page = 0,
  size = 20,
  filters: FigureAliasFilters = {}
) =>
  apiRequest<PageResponse<ExistingFigureAlias> | ExistingFigureAlias[]>(
    `${FIGURE_ALIASES_ENDPOINT}/figure/${figureId}`,
    {
      query: { ...filters, page, size, sort: "id,asc" },
      fallbackMessage: "Error loading existing aliases.",
    }
  );

export const previewGeneratedFigureAliases = (figureId: number) =>
  apiRequest<FigureAliasGenerationResponse>(
    `${FIGURE_ALIASES_ENDPOINT}/figure/${figureId}/preview-generated`,
    { fallbackMessage: "Error previewing aliases." }
  );

export const generateFigureAliases = (figureId: number) =>
  apiRequest<FigureAliasGenerationResponse>(`${FIGURE_ALIASES_ENDPOINT}/figure/${figureId}/generate`, {
    method: "POST",
    fallbackMessage: "Error generating aliases.",
  });

export const getFigureAliasScrapingQueries = (figureId: number, max?: number) => {
  const params = new URLSearchParams();

  if (max !== undefined) {
    params.set("max", max.toString());
  }

  return apiRequest<string[]>(
    `${FIGURE_ALIASES_ENDPOINT}/figure/${figureId}/scraping-queries`,
    { query: Object.fromEntries(params.entries()), fallbackMessage: "Error loading scraping queries." }
  );
};

export const getFigureAliasScrapingQueryDetails = (figureId: number, max?: number) =>
  apiRequest<FigureScrapingQuery[]>(
    `${FIGURE_ALIASES_ENDPOINT}/figure/${figureId}/scraping-query-details`,
    {
      query: { max },
      fallbackMessage: "Error loading scraping query details.",
    }
  );
