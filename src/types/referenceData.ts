export type ReferenceDataOption = {
  value: string;
  label: string;
  symbol?: string;
  level?: number;
};

export type ReferenceData = {
  currencyCodes: ReferenceDataOption[];
  figureStatuses: ReferenceDataOption[];
  figureSourceListingStatuses: ReferenceDataOption[];
  loadMethods: ReferenceDataOption[];
  sourcePriorities: ReferenceDataOption[];
  sourceTypes: ReferenceDataOption[];
  scrapedListingCandidateStatuses: ReferenceDataOption[];
  matchDecisions: ReferenceDataOption[];
};
