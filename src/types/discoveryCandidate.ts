export type DiscoveryCandidateStatus = "PENDING_REVIEW" | "CONFIRMED_DUPLICATE" | "CONFIRMED_NEW";

export type FigureDiscoveryCandidate = {
  id: number;

  franchiseId: number;
  franchiseName: string;

  brandId: number;
  brandName: string;

  sourceCode: string;

  possibleDuplicateFigureId: number | null;
  possibleDuplicateFigureName: string | null;
  possibleDuplicateFigureSlug: string | null;

  productCode: string | null;
  janCode: string | null;
  sourceTitle: string;
  sourceUrl: string | null;
  mainImageUrl: string | null;
  thumbnailUrl: string | null;
  lineName: string | null;
  material: string | null;
  editionSize: number | null;
  price: number | null;
  currencyCode: "USD" | "JPY" | "EUR" | null;
  availabilityText: string | null;

  matchScore: number;
  matchReasons: string;

  status: DiscoveryCandidateStatus;
  resultingFigureId: number | null;
  reviewNotes: string | null;

  capturedAt: string;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
