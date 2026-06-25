import { afterEach, describe, expect, it, vi } from "vitest";
import { getFigureAliasScrapingHistory, getFigureAliases } from "@/api/figureAliasApi";
import { getFigureAliasScrapingQueryDetails } from "@/api/figureAliasGeneratorApi";
import { physicallyDeleteFigure } from "@/api/figureApi";
import { getScrapingFigureState, runNinNinGameScraping } from "@/api/scrapingRunnerApi";

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("backend change API services", () => {
  it("sends alias usage filters and backend pagination", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ content: [], totalElements: 0 }));
    vi.stubGlobal("fetch", fetchMock);

    await getFigureAliases({
      figureId: 7,
      usedForScraping: false,
      sourceCode: "NIN_NIN_GAME",
      lastUsedBefore: "2026-06-01T00:00",
      page: 2,
      size: 10,
    });

    const url = new URL(fetchMock.mock.calls[0][0] as string);
    expect(url.pathname).toContain("/api/v1/figure-aliases/figure/7");
    expect(url.searchParams.get("usedForScraping")).toBe("false");
    expect(url.searchParams.get("sourceCode")).toBe("NIN_NIN_GAME");
    expect(url.searchParams.get("lastUsedBefore")).toBe("2026-06-01T00:00");
    expect(url.searchParams.get("page")).toBe("2");
    expect(url.searchParams.get("size")).toBe("10");
  });

  it("loads alias history only through its paginated endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ content: [] }));
    vi.stubGlobal("fetch", fetchMock);

    await getFigureAliasScrapingHistory(25, {
      sourceCode: "NIN_NIN_GAME",
      page: 1,
      size: 20,
    });

    const url = new URL(fetchMock.mock.calls[0][0] as string);
    expect(url.pathname).toContain("/api/v1/figure-aliases/25/scraping-history");
    expect(url.searchParams.get("sourceCode")).toBe("NIN_NIN_GAME");
    expect(url.searchParams.get("sort")).toBe("executedAt,desc");
  });

  it("calls the physical figure delete endpoint and returns its cleanup summary", async () => {
    const payload = {
      figureId: 11,
      physicallyDeleted: true,
      scrapedListingCandidatesDeleted: 2,
      marketSalesDeleted: 0,
      metricSnapshotsDeleted: 0,
      sourceListingsDeleted: 3,
      aliasesDeleted: 5,
      imagesDeleted: 2,
      characterRelationsDeleted: 1,
    };
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(payload));
    vi.stubGlobal("fetch", fetchMock);

    await expect(physicallyDeleteFigure(11)).resolves.toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/figures/11/physical"),
      expect.objectContaining({ method: "DELETE" })
    );
  });

  it("preserves the scraping run and query trace fields from the immediate response", async () => {
    const payload = {
      scrapingRunId: 91,
      figureId: 7,
      queryResults: [
        {
          query: "Naruto alias",
          success: true,
          resultCount: 4,
          executionId: 123,
          figureAliasId: 25,
          querySource: "GENERATED_ALIAS",
        },
      ],
    };
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(payload));
    vi.stubGlobal("fetch", fetchMock);

    await expect(runNinNinGameScraping(7)).resolves.toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/scraping/nin-nin-game/figures/7/search"),
      expect.objectContaining({ method: "POST" })
    );
  });

  it("loads detailed pre-run queries including their persisted alias association", async () => {
    const payload = [
      {
        query: "Naruto alias",
        source: "GENERATED_ALIAS",
        figureAliasId: 25,
        reason: "Persisted alias",
        providerOrder: 2,
        sourceOrder: 1,
        sequence: 3,
      },
    ];
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(payload));
    vi.stubGlobal("fetch", fetchMock);

    await expect(getFigureAliasScrapingQueryDetails(7, 20)).resolves.toEqual(payload);

    const url = new URL(fetchMock.mock.calls[0][0] as string);
    expect(url.pathname).toContain("/api/v1/figure-aliases/figure/7/scraping-query-details");
    expect(url.searchParams.get("max")).toBe("20");
  });

  it("uses the persisted scraping state endpoint with its limit", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ figureId: 7, limit: 20 }));
    vi.stubGlobal("fetch", fetchMock);

    await getScrapingFigureState(7, 20);

    const url = new URL(fetchMock.mock.calls[0][0] as string);
    expect(url.pathname).toContain("/api/v1/scraping/figures/7/state");
    expect(url.searchParams.get("limit")).toBe("20");
  });

  it("throws the backend ApiErrorResponse including requestId", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse(
        {
          status: 500,
          error: "INTERNAL_SERVER_ERROR",
          message: "Unexpected server error",
          requestId: "request-123",
        },
        500
      )
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(physicallyDeleteFigure(11)).rejects.toMatchObject({
      status: 500,
      message: "Unexpected server error",
      requestId: "request-123",
    });
  });
});
