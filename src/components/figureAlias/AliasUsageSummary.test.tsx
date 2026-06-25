import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  AliasDecisionCell,
  AliasOutcomeCell,
  AliasUsageCell,
} from "@/components/figureAlias/AliasUsageSummary";
import type { FigureAlias } from "@/types/figureAlias";

const alias = (overrides: Partial<FigureAlias> = {}): FigureAlias => ({
  id: 25,
  alias: "Naruto alias",
  usedForScraping: true,
  scrapingUseCount: 3,
  lastScrapedAt: "2026-06-21T16:30:00",
  scrapingResultCount: 4,
  scrapingNoResultCount: 1,
  scrapingErrorCount: 1,
  scrapingDiscardCount: 3,
  scrapingReviewCount: 1,
  scrapingAutoMatchCount: 0,
  ...overrides,
});

describe("AliasUsageSummary", () => {
  it("derives informative labels from usage metrics", () => {
    render(<AliasUsageCell alias={alias()} />);

    expect(screen.getByText("With errors")).toBeInTheDocument();
    expect(screen.getByText("Produced candidates")).toBeInTheDocument();
    expect(screen.getByText("3 executions")).toBeInTheDocument();
    expect(screen.getByText("Last: 21/06/2026 16:30:00")).toBeInTheDocument();
  });

  it("marks an alias with no executions as never used", () => {
    render(
      <AliasUsageCell
        alias={alias({
          usedForScraping: false,
          scrapingUseCount: 0,
          lastScrapedAt: null,
        })}
      />
    );

    expect(screen.getByText("Never used")).toBeInTheDocument();
    expect(screen.getByText("0 executions")).toBeInTheDocument();
  });

  it("renders outcome and decision counters", () => {
    render(
      <>
        <AliasOutcomeCell alias={alias()} />
        <AliasDecisionCell alias={alias()} />
      </>
    );

    expect(screen.getByText("Results")).toBeInTheDocument();
    expect(screen.getByText("No results")).toBeInTheDocument();
    expect(screen.getByText("Discards")).toBeInTheDocument();
    expect(screen.getByText("Reviews")).toBeInTheDocument();
    expect(screen.getByText("Auto-match")).toBeInTheDocument();
  });
});
