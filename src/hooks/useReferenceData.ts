import { useEffect, useState } from "react";
import { ReferenceData } from "@/types/referenceData";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://figure-market-core.onrender.com/api";

const REFERENCE_DATA_ENDPOINT = `${API_BASE_URL}/v1/reference-data`;

const emptyReferenceData: ReferenceData = {
  currencyCodes: [],
  figureStatuses: [],
  figureSourceListingStatuses: [],
  loadMethods: [],
  sourcePriorities: [],
  sourceTypes: [],
  scrapedListingCandidateStatuses: [],
  matchDecisions: [],
};

export function useReferenceData() {
  const [referenceData, setReferenceData] = useState<ReferenceData>(emptyReferenceData);
  const [loadingReferenceData, setLoadingReferenceData] = useState(true);

  useEffect(() => {
    const fetchReferenceData = async () => {
      setLoadingReferenceData(true);

      try {
        const response = await fetch(REFERENCE_DATA_ENDPOINT);

        if (!response.ok) {
          console.error("Error fetching reference data");
          return;
        }

        const data = await response.json();
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
