import { apiRequest } from "@/lib/apiClient";

export type FigurePhysicalDeleteResponse = {
  figureId: number;
  physicallyDeleted: boolean;
  scrapedListingCandidatesDeleted: number;
  marketSalesDeleted: number;
  metricSnapshotsDeleted: number;
  sourceListingsDeleted: number;
  aliasesDeleted: number;
  imagesDeleted: number;
  characterRelationsDeleted: number;
};

export const physicallyDeleteFigure = (figureId: number) =>
  apiRequest<FigurePhysicalDeleteResponse>(`/v1/figures/${figureId}/physical`, {
    method: "DELETE",
    fallbackMessage: "Error physically deleting figure.",
  });
