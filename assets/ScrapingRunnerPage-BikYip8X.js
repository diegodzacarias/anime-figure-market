import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, e as cn, L as Link } from "./index-DwefzumF.js";
import { g as getFiguresForAliasGenerator, b as getFigureAliasScrapingQueries, R as RefreshCw } from "./figureAliasGeneratorApi-2GrEh959.js";
import { g as getFranchises } from "./franchiseApi-C5E79V3y.js";
import { r as readApiErrorResponse, A as ApiErrorToast, t as toClientApiError } from "./apiError-DCkcZcGa.js";
import { N as Navbar, I as Input, B as Button } from "./Navbar-BzYxyuvL.js";
import { B as Badge } from "./badge-Ds0a6Wtj.js";
import { L as LoadingOverlay, S as Search, T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, P as PageControls } from "./table-DpPTT4Px.js";
import { u as useReferenceData } from "./useReferenceData-CvIVeAIZ.js";
import { d as defaultPageMeta, g as getPageContent, a as getPageMeta } from "./page-DKdY7PVC.js";
import { E as ExternalLink } from "./external-link-CS7oGSrz.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Play = createLucideIcon("Play", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
const BASE_URL = "https://figure-market-core.onrender.com/api";
const NINNIN_GAME_SCRAPING_ENDPOINT = `${BASE_URL}/v1/scraping/nin-nin-game/figures`;
async function runNinNinGameScraping(figureId) {
  const response = await fetch(`${NINNIN_GAME_SCRAPING_ENDPOINT}/${figureId}/search`, {
    method: "POST"
  });
  if (!response.ok) {
    throw await readApiErrorResponse(response, "Error running Nin-Nin Game scraping.");
  }
  return response.json();
}
const Card = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("rounded-lg border bg-card text-card-foreground shadow-sm", className), ...props }));
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { ref, className: cn("text-2xl font-semibold leading-none tracking-tight", className), ...props })
);
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const FALLBACK_IMAGE_URL = `${"/anime-figure-market/"}placeholder.svg`;
const SCRAPING_QUERY_LIMIT = 20;
const getFigureId = (figure) => (figure == null ? void 0 : figure.figureId) || (figure == null ? void 0 : figure.id);
const getFigureName = (figure) => (figure == null ? void 0 : figure.figureName) || (figure == null ? void 0 : figure.name) || "";
const getFigureSlug = (figure) => (figure == null ? void 0 : figure.figureSlug) || (figure == null ? void 0 : figure.slug) || "";
const getFranchiseName = (figure) => {
  var _a;
  return (figure == null ? void 0 : figure.franchiseName) || ((_a = figure == null ? void 0 : figure.franchise) == null ? void 0 : _a.name) || (figure == null ? void 0 : figure.franchiseId) || "-";
};
const getBrandName = (figure) => {
  var _a;
  return (figure == null ? void 0 : figure.brandName) || ((_a = figure == null ? void 0 : figure.brand) == null ? void 0 : _a.name) || (figure == null ? void 0 : figure.brandId) || "-";
};
const getAliasCount = (figure) => (figure == null ? void 0 : figure.aliasCount) ?? 0;
const getGeneratedAliasCount = (figure) => (figure == null ? void 0 : figure.generatedAliasCount) ?? 0;
const getManualAliasCount = (figure) => (figure == null ? void 0 : figure.manualAliasCount) ?? 0;
const getImportedAliasCount = (figure) => (figure == null ? void 0 : figure.importedAliasCount) ?? 0;
const getScrapedAliasCount = (figure) => (figure == null ? void 0 : figure.scrapedAliasCount) ?? 0;
const figureHasAliases = (figure) => (figure == null ? void 0 : figure.hasAliases) ?? getAliasCount(figure) > 0;
const figureHasGeneratedAliases = (figure) => (figure == null ? void 0 : figure.hasGeneratedAliases) ?? getGeneratedAliasCount(figure) > 0;
const getFigureImageUrl = (figure) => (figure == null ? void 0 : figure.primaryImageUrl) || FALLBACK_IMAGE_URL;
const formatValue = (value) => {
  if (value === void 0 || value === null || value === "") return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};
const formatCount = (value) => typeof value === "number" || typeof value === "string" ? value : "-";
const asArray = (value) => Array.isArray(value) ? value : [];
const getMatchTitle = (match) => match.title || match.sourceTitle || match.name || "-";
const getMatchScore = (match) => match.score ?? match.matchScore ?? "-";
const getMatchDecision = (match) => match.decision || match.matchDecision || "-";
const getMatchUrl = (match) => match.url || match.sourceUrl || "";
const buildGeneratorFilters = (franchiseId, status, aliasState) => {
  const filters = {};
  if (franchiseId) filters.franchiseId = franchiseId;
  if (status) filters.status = status;
  if (aliasState === "hasAliases") filters.hasAliases = true;
  if (aliasState === "noAliases") filters.hasAliases = false;
  if (aliasState === "hasGeneratedAliases") filters.hasGeneratedAliases = true;
  if (aliasState === "noGeneratedAliases") filters.hasGeneratedAliases = false;
  if (aliasState === "needsRegeneration") filters.mayNeedRegeneration = true;
  if (aliasState === "upToDate") filters.mayNeedRegeneration = false;
  return filters;
};
const toApiError = (error, fallbackMessage) => {
  if (error && typeof error === "object" && "message" in error && "status" in error) {
    return error;
  }
  return toClientApiError(error, fallbackMessage);
};
const decisionVariant = (decision) => {
  const normalized = String(decision || "").toUpperCase();
  if (normalized === "AUTO_MATCH" || normalized === "MATCH") return "default";
  if (normalized === "REVIEW") return "secondary";
  if (normalized === "DISCARD" || normalized === "REJECT") return "destructive";
  return "outline";
};
const confidenceVariant = (confidence) => {
  const normalized = String(confidence || "").toUpperCase();
  if (normalized === "HIGH") return "default";
  if (normalized === "MEDIUM") return "secondary";
  return "outline";
};
const StatusBadge = ({ value }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: formatValue(value) === "Yes" ? "default" : "outline", children: formatValue(value) });
const FigureImage = ({ figure }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-16 shrink-0 overflow-hidden rounded-md border bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  "img",
  {
    src: getFigureImageUrl(figure),
    alt: getFigureName(figure) || "Figure image",
    className: "h-full w-full object-contain",
    loading: "lazy",
    onError: (event) => {
      event.currentTarget.src = FALLBACK_IMAGE_URL;
    }
  }
) });
const QueryResultsTable = ({ queryResults }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Query" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Success" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Results" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Error" })
  ] }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: queryResults.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 4, className: "h-20 text-center text-muted-foreground", children: "No query results returned." }) }) : queryResults.map((queryResult, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: formatValue(queryResult.query) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { value: queryResult.success }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: formatCount(queryResult.resultCount) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-md whitespace-normal", children: formatValue(queryResult.errorMessage) })
  ] }, `${queryResult.query || "query"}-${index}`)) })
] }) });
const MatchesTable = ({ title, description, matches }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: description })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Title" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Price" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Availability" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Score" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Confidence" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Decision" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Codes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "URL" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: matches.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 8, className: "h-20 text-center text-muted-foreground", children: "No records returned." }) }) : matches.map((match, index) => {
      const url = getMatchUrl(match);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-md whitespace-normal font-medium", children: getMatchTitle(match) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: match.price !== void 0 && match.price !== null ? `${match.price} ${match.currencyCode || ""}`.trim() : "-" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: formatValue(match.availability) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: formatValue(getMatchScore(match)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: confidenceVariant(match.confidence), children: formatValue(match.confidence) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: decisionVariant(getMatchDecision(match)), children: formatValue(getMatchDecision(match)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            "Product: ",
            formatValue(match.productCode)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            "JAN: ",
            formatValue(match.janCode)
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: url ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: url,
            target: "_blank",
            rel: "noreferrer",
            className: "inline-flex items-center gap-1 text-primary hover:underline",
            children: [
              "Open",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" })
            ]
          }
        ) : "-" })
      ] }, `${getMatchTitle(match)}-${index}`);
    }) })
  ] }) }) })
] });
const ScrapingRunnerPage = () => {
  const [figures, setFigures] = reactExports.useState([]);
  const [franchises, setFranchises] = reactExports.useState([]);
  const [loadingFigures, setLoadingFigures] = reactExports.useState(true);
  const [loadingFranchises, setLoadingFranchises] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [franchiseFilter, setFranchiseFilter] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("");
  const [aliasStateFilter, setAliasStateFilter] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(0);
  const [pageSize, setPageSize] = reactExports.useState(20);
  const [pageMeta, setPageMeta] = reactExports.useState(defaultPageMeta);
  const [selectedFigure, setSelectedFigure] = reactExports.useState(null);
  const [scrapingQueries, setScrapingQueries] = reactExports.useState([]);
  const [queriesLoading, setQueriesLoading] = reactExports.useState(false);
  const [running, setRunning] = reactExports.useState(false);
  const [scrapingResult, setScrapingResult] = reactExports.useState(null);
  const [apiError, setApiError] = reactExports.useState(null);
  const { referenceData } = useReferenceData();
  const selectedFigureId = getFigureId(selectedFigure);
  const queryResults = reactExports.useMemo(
    () => asArray(scrapingResult == null ? void 0 : scrapingResult.queryResults),
    [scrapingResult]
  );
  const candidateMatches = reactExports.useMemo(
    () => asArray(scrapingResult == null ? void 0 : scrapingResult.candidateMatches),
    [scrapingResult]
  );
  const matches = reactExports.useMemo(() => asArray(scrapingResult == null ? void 0 : scrapingResult.matches), [scrapingResult]);
  const rawResults = reactExports.useMemo(() => asArray(scrapingResult == null ? void 0 : scrapingResult.results), [scrapingResult]);
  const rawCandidateCount = (scrapingResult == null ? void 0 : scrapingResult.candidateCount) ?? candidateMatches.length;
  const parsedCandidateCount = Number(rawCandidateCount);
  const candidateCount = Number.isFinite(parsedCandidateCount) ? parsedCandidateCount : 0;
  const minimumScoreText = (scrapingResult == null ? void 0 : scrapingResult.minimumCandidateScore) !== void 0 && (scrapingResult == null ? void 0 : scrapingResult.minimumCandidateScore) !== null ? ` de ${scrapingResult.minimumCandidateScore}` : "";
  const fetchFigures = reactExports.useCallback(async () => {
    setLoadingFigures(true);
    try {
      const data = await getFiguresForAliasGenerator(
        page,
        pageSize,
        search,
        buildGeneratorFilters(franchiseFilter, statusFilter, aliasStateFilter)
      );
      setFigures(getPageContent(data));
      setPageMeta(getPageMeta(data, pageSize));
    } catch (error) {
      setApiError(toApiError(error, "Error loading figures."));
    } finally {
      setLoadingFigures(false);
    }
  }, [aliasStateFilter, franchiseFilter, page, pageSize, search, statusFilter]);
  const fetchFranchises = reactExports.useCallback(async () => {
    setLoadingFranchises(true);
    try {
      setFranchises(await getFranchises());
    } catch (error) {
      setApiError(toApiError(error, "Error loading franchises."));
    } finally {
      setLoadingFranchises(false);
    }
  }, []);
  const fetchScrapingQueries = reactExports.useCallback(
    async () => {
      if (!selectedFigureId) return;
      setQueriesLoading(true);
      try {
        setScrapingQueries(await getFigureAliasScrapingQueries(selectedFigureId, SCRAPING_QUERY_LIMIT));
      } catch (error) {
        setApiError(toApiError(error, "Error loading scraping queries."));
      } finally {
        setQueriesLoading(false);
      }
    },
    [selectedFigureId]
  );
  reactExports.useEffect(() => {
    fetchFigures();
  }, [fetchFigures]);
  reactExports.useEffect(() => {
    fetchFranchises();
  }, [fetchFranchises]);
  reactExports.useEffect(() => {
    setScrapingQueries([]);
    setScrapingResult(null);
    if (selectedFigureId) {
      fetchScrapingQueries();
    }
  }, [selectedFigureId]);
  const handleSelectFigure = (figure) => {
    setSelectedFigure(figure);
  };
  const handleRunScraping = async () => {
    if (!selectedFigureId) return;
    setRunning(true);
    setApiError(null);
    try {
      setScrapingResult(await runNinNinGameScraping(selectedFigureId));
    } catch (error) {
      setApiError(toApiError(error, "Error running Nin-Nin Game scraping."));
    } finally {
      setRunning(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ApiErrorToast, { error: apiError, onClose: () => setApiError(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LoadingOverlay,
      {
        active: running,
        fullscreen: true,
        message: "Running Nin-Nin Game scraping..."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Figure Scraping Runner" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Select a figure, inspect its scraping queries, and run Nin-Nin Game scraping manually." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-6 xl:grid-cols-[minmax(24rem,0.85fr)_minmax(0,1.45fr)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-lg border bg-card p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: search,
                  onChange: (event) => {
                    setSearch(event.target.value);
                    setPage(0);
                  },
                  placeholder: "Search figures",
                  className: "pl-9"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: franchiseFilter,
                  disabled: loadingFranchises,
                  onChange: (event) => {
                    setFranchiseFilter(event.target.value);
                    setPage(0);
                  },
                  className: "rounded border border-input bg-background p-2 text-sm text-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: loadingFranchises ? "Loading franchises..." : "All franchises" }),
                    franchises.map((franchise) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: franchise.id, children: franchise.name }, franchise.id))
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: statusFilter,
                  onChange: (event) => {
                    setStatusFilter(event.target.value);
                    setPage(0);
                  },
                  className: "rounded border border-input bg-background p-2 text-sm text-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All statuses" }),
                    referenceData.figureStatuses.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: status.value, children: status.label }, status.value))
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: aliasStateFilter,
                  onChange: (event) => {
                    setAliasStateFilter(event.target.value);
                    setPage(0);
                  },
                  className: "rounded border border-input bg-background p-2 text-sm text-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All alias states" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "noAliases", children: "No aliases" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "hasAliases", children: "Has aliases" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "noGeneratedAliases", children: "No generated aliases" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "hasGeneratedAliases", children: "Has generated aliases" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "needsRegeneration", children: "Needs regeneration" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "upToDate", children: "Up to date" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              figures.length,
              " shown - ",
              pageMeta.totalElements,
              " total records"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-lg border bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-16", children: "ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-20", children: "Image" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Figure" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Alias state" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loadingFigures ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 4, className: "h-28 text-center text-muted-foreground", children: "Loading figures..." }) }) : figures.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 4, className: "h-28 text-center text-muted-foreground", children: "No figures found." }) }) : figures.map((figure) => {
              const figureId = getFigureId(figure);
              const selected = selectedFigureId === figureId;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TableRow,
                {
                  className: `cursor-pointer ${selected ? "bg-muted" : ""}`,
                  onClick: () => handleSelectFigure(figure),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: figureId }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FigureImage, { figure }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-3 font-medium text-foreground", children: getFigureName(figure) || "-" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
                        getFranchiseName(figure),
                        " / ",
                        getBrandName(figure)
                      ] }),
                      figure.lineName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: figure.lineName })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: figureHasAliases(figure) ? "secondary" : "outline", children: [
                        getAliasCount(figure),
                        " total"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: figureHasGeneratedAliases(figure) ? "default" : "outline", children: [
                        getGeneratedAliasCount(figure),
                        " generated"
                      ] }),
                      figure.mayNeedRegeneration && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "Needs regen" })
                    ] }) })
                  ]
                },
                figureId
              );
            }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            PageControls,
            {
              page: pageMeta.page,
              size: pageMeta.size,
              totalElements: pageMeta.totalElements,
              totalPages: pageMeta.totalPages,
              disabled: loadingFigures,
              onPageChange: setPage,
              onSizeChange: (size) => {
                setPageSize(size);
                setPage(0);
              }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "space-y-6", children: !selectedFigure ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[28rem] items-center justify-center rounded-lg border border-dashed bg-card p-8 text-center text-sm text-muted-foreground", children: "Select a figure to inspect scraping queries and run the manual scraper." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FigureImage, { figure: selectedFigure }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Selected Figure" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "mt-2 whitespace-normal break-words text-2xl", children: getFigureName(selectedFigure) || `Figure ${selectedFigureId}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { className: "mt-2", children: [
                    getFranchiseName(selectedFigure),
                    " / ",
                    getBrandName(selectedFigure)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
                      "ID ",
                      selectedFigureId
                    ] }),
                    selectedFigure.status && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: selectedFigure.status }),
                    selectedFigure.lineName && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: selectedFigure.lineName }),
                    getFigureSlug(selectedFigure) && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: getFigureSlug(selectedFigure) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: figureHasAliases(selectedFigure) ? "secondary" : "outline", children: [
                      getAliasCount(selectedFigure),
                      " aliases"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: figureHasGeneratedAliases(selectedFigure) ? "default" : "outline", children: [
                      getGeneratedAliasCount(selectedFigure),
                      " generated"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
                      getManualAliasCount(selectedFigure),
                      " manual"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
                      getImportedAliasCount(selectedFigure),
                      " imported"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
                      getScrapedAliasCount(selectedFigure),
                      " scraped"
                    ] }),
                    selectedFigure.mayNeedRegeneration && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "Needs regeneration" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  className: "gap-2",
                  disabled: running || !selectedFigureId,
                  onClick: handleRunScraping,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4" }),
                    "Run Nin-Nin Game Scraping"
                  ]
                }
              )
            ] }) }),
            (!figureHasAliases(selectedFigure) || selectedFigure.mayNeedRegeneration) && /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border border-secondary/40 bg-secondary/10 p-3 text-sm text-foreground", children: "This figure has no aliases or may need regeneration. You can still run scraping, but generating aliases first may improve matching." }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Queries that will be used for scraping" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
                  "The backend builds these from figure name, product codes, JAN code, saved aliases, and generated aliases. Requesting up to ",
                  SCRAPING_QUERY_LIMIT,
                  " total queries."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  className: "gap-2",
                  disabled: queriesLoading || running,
                  onClick: () => fetchScrapingQueries(),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3.5 w-3.5" }),
                    "Refresh"
                  ]
                }
              ) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: queriesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-md border border-dashed bg-background p-4 text-sm text-muted-foreground", children: "Loading scraping queries..." }) : scrapingQueries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-md border border-dashed bg-background p-4 text-sm text-muted-foreground", children: "No scraping queries available." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-2", children: scrapingQueries.map((query, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-md border bg-background p-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mr-2 font-semibold text-primary", children: [
                index + 1,
                "."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: query })
            ] }, `${query}-${index}`)) }) })
          ] }),
          scrapingResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 md:flex-row md:items-start md:justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Scraping Result" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Processed response from Nin-Nin Game scraping." })
                ] }),
                candidateCount > 0 && selectedFigureId && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: `/figure-admin/candidate-review?figureId=${selectedFigureId}`, children: [
                  "Go to Candidate Review",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" })
                ] }) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `rounded-md border p-4 text-sm ${candidateCount === 0 ? "border-secondary/40 bg-secondary/10 text-foreground" : "border-primary/30 bg-primary/10 text-foreground"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Scraping finalizado." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: candidateCount === 0 ? `Ningun candidato paso el umbral minimo${minimumScoreText}.` : `${candidateCount} candidato${candidateCount === 1 ? "" : "s"} paso${candidateCount === 1 ? "" : "n"} el umbral minimo${minimumScoreText}.` })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border bg-background p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase text-muted-foreground", children: "Figure" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm font-semibold text-foreground", children: scrapingResult.figureName || getFigureName(selectedFigure) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border bg-background p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase text-muted-foreground", children: "Source" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm font-semibold text-foreground", children: formatValue(scrapingResult.sourceCode) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border bg-background p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase text-muted-foreground", children: "Total" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-2xl font-bold text-foreground", children: formatCount(scrapingResult.totalResults) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border bg-background p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase text-muted-foreground", children: "Candidates" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-2xl font-bold text-foreground", children: candidateCount })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border bg-background p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase text-muted-foreground", children: "Found" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { value: scrapingResult.foundResults }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border bg-background p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase text-muted-foreground", children: "Errors" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: scrapingResult.hasErrors ? "destructive" : "outline", children: scrapingResult.hasErrors ? "Yes" : "No" }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Executed Queries" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: (scrapingResult.queries || scrapingQueries).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "No queries returned" }) : (scrapingResult.queries || scrapingQueries).map((query, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: query }, `${query}-${index}`)) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-sm font-semibold text-foreground", children: "Query Results" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(QueryResultsTable, { queryResults })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MatchesTable,
              {
                title: "Candidate Matches",
                description: "Results that passed the minimum score and should be reviewed.",
                matches: candidateMatches
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MatchesTable,
              {
                title: "All Weighted Matches",
                description: "All scored matches returned by the scraper.",
                matches
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MatchesTable,
              {
                title: "Raw Scraped Results",
                description: "Raw source results before final candidate review.",
                matches: rawResults
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Raw JSON" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Full backend response for troubleshooting." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "rounded-lg border bg-background p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "cursor-pointer text-sm font-medium text-foreground", children: "Show raw response" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "mt-4 max-h-96 overflow-auto whitespace-pre-wrap rounded-md bg-muted p-4 text-xs text-muted-foreground", children: JSON.stringify(scrapingResult, null, 2) })
              ] }) })
            ] })
          ] })
        ] }) })
      ] })
    ] })
  ] });
};
export {
  ScrapingRunnerPage as default
};
