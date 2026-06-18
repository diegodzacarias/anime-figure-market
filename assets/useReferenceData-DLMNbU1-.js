import { r as reactExports } from "./index-B0hEIL8K.js";
const API_BASE_URL = "https://figure-market-core.onrender.com/api";
const REFERENCE_DATA_ENDPOINT = `${API_BASE_URL}/v1/reference-data`;
const emptyReferenceData = {
  currencyCodes: [],
  figureStatuses: [],
  figureSourceListingStatuses: [],
  loadMethods: [],
  figureAliasGenerationPriorities: [],
  figureAliasGenerationSources: [],
  sourcePriorities: [],
  sourceTypes: [],
  scrapedListingCandidateStatuses: [],
  matchDecisions: []
};
function useReferenceData() {
  const [referenceData, setReferenceData] = reactExports.useState(emptyReferenceData);
  const [loadingReferenceData, setLoadingReferenceData] = reactExports.useState(true);
  reactExports.useEffect(() => {
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
          ...data
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
export {
  useReferenceData as u
};
