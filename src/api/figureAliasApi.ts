import { apiRequest } from "@/lib/apiClient";
import type { PageResponse } from "@/lib/page";
import type {
  FigureAlias,
  FigureAliasFilters,
  FigureAliasScrapingHistory,
} from "@/types/figureAlias";

type AliasPageRequest = FigureAliasFilters & {
  figureId?: number;
  page?: number;
  size?: number;
  sort?: string;
};

type AliasHistoryRequest = {
  sourceCode?: string;
  page?: number;
  size?: number;
  sort?: string;
};

export type FigureAliasPayload = {
  figureId: number;
  sourceId?: number;
  alias: string;
  loadMethod: string;
};

export const getFigureAliases = ({
  figureId,
  page = 0,
  size = 20,
  sort = "id,asc",
  ...filters
}: AliasPageRequest) =>
  apiRequest<PageResponse<FigureAlias>>(
    figureId ? `/v1/figure-aliases/figure/${figureId}` : "/v1/figure-aliases",
    {
      query: { ...filters, page, size, sort },
      fallbackMessage: "Error loading figure aliases.",
    }
  );

export const getFigureAliasScrapingHistory = (
  aliasId: number,
  { sourceCode, page = 0, size = 20, sort = "executedAt,desc" }: AliasHistoryRequest = {}
) =>
  apiRequest<PageResponse<FigureAliasScrapingHistory>>(
    `/v1/figure-aliases/${aliasId}/scraping-history`,
    {
      query: { sourceCode, page, size, sort },
      fallbackMessage: "Error loading alias scraping history.",
    }
  );

export const createFigureAlias = (payload: FigureAliasPayload) =>
  apiRequest<FigureAlias>("/v1/figure-aliases", {
    method: "POST",
    json: payload,
    fallbackMessage: "Error saving figure alias.",
  });

export const updateFigureAlias = (aliasId: number, payload: FigureAliasPayload) =>
  apiRequest<FigureAlias>(`/v1/figure-aliases/${aliasId}`, {
    method: "PUT",
    json: payload,
    fallbackMessage: "Error saving figure alias.",
  });

export const deleteFigureAlias = (aliasId: number) =>
  apiRequest<void>(`/v1/figure-aliases/${aliasId}`, {
    method: "DELETE",
    fallbackMessage: "Error deleting figure alias.",
  });
