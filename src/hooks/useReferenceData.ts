import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/apiClient";
import { ReferenceData } from "@/types/referenceData";

const emptyReferenceData: ReferenceData = {
  currencyCodes: [],
  figureStatuses: [],
  figureSourceListingStatuses: [],
  loadMethods: [],
  figureAliasGenerationPriorities: [],
  figureAliasGenerationSources: [],
  sourcePriorities: [],
  sourceTypes: [],
  scrapedListingCandidateStatuses: [],
  matchDecisions: [],
  brandSegments: [],
};

export function useReferenceData() {
  const [referenceData, setReferenceData] = useState<ReferenceData>(emptyReferenceData);
  const [loadingReferenceData, setLoadingReferenceData] = useState(true);

  useEffect(() => {
    const fetchReferenceData = async () => {
      setLoadingReferenceData(true);

      try {
        const data = await apiRequest<ReferenceData>("/v1/reference-data", {
          fallbackMessage: "Error fetching reference data.",
        });
        setReferenceData({
          ...emptyReferenceData,
          ...data,
        });
      } catch (error) {
        console.error("Request error fetching reference data:", error);
      } finally {
        setLoadingReferenceData(false);
      }
    };

    fetchReferenceData();
  }, []);

  return { referenceData, loadingReferenceData };
}
