import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports } from "./index-D60BU_pf.js";
import { r as readApiErrorResponse, A as ApiErrorToast, t as toClientApiError } from "./apiError-BEJ0Mm-y.js";
import { N as Navbar, I as Input, B as Button } from "./Navbar-D34K6YbM.js";
import { B as Badge } from "./badge-Dp_5K0mJ.js";
import { S as Search, T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, P as PageControls, L as LoadingOverlay } from "./table-D7RkKV79.js";
import { d as defaultPageMeta, g as getPageContent, a as getPageMeta } from "./page-DEGBjxB5.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eye = createLucideIcon("Eye", [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const RefreshCw = createLucideIcon("RefreshCw", [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WandSparkles = createLucideIcon("WandSparkles", [
  [
    "path",
    {
      d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
      key: "ul74o6"
    }
  ],
  ["path", { d: "m14 7 3 3", key: "1r5n42" }],
  ["path", { d: "M5 6v4", key: "ilb8ba" }],
  ["path", { d: "M19 14v4", key: "blhpug" }],
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M7 8H3", key: "zfb6yr" }],
  ["path", { d: "M21 16h-4", key: "1cnmox" }],
  ["path", { d: "M11 3H9", key: "1obp7u" }]
]);
const BASE_URL = "https://figure-market-core.onrender.com/api";
const FIGURES_SEARCH_ENDPOINT = `${BASE_URL}/v1/figures/search`;
const FIGURE_ALIASES_ENDPOINT = `${BASE_URL}/figure-aliases`;
const requestJson = async (url, init) => {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw await readApiErrorResponse(response, "Backend request failed.");
  }
  return response.json();
};
const getFiguresForAliasGenerator = (page, size, query) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort: "name,asc"
  });
  if (query.trim()) {
    params.set("q", query.trim());
  }
  return requestJson(
    `${FIGURES_SEARCH_ENDPOINT}?${params.toString()}`
  );
};
const getExistingFigureAliases = (figureId, page = 0, size = 20) => requestJson(
  `${FIGURE_ALIASES_ENDPOINT}/figure/${figureId}?page=${page}&size=${size}`
);
const previewGeneratedFigureAliases = (figureId) => requestJson(
  `${FIGURE_ALIASES_ENDPOINT}/figure/${figureId}/preview-generated`
);
const generateFigureAliases = (figureId) => requestJson(`${FIGURE_ALIASES_ENDPOINT}/figure/${figureId}/generate`, {
  method: "POST"
});
const getFigureAliasScrapingQueries = (figureId, max) => requestJson(`${FIGURE_ALIASES_ENDPOINT}/figure/${figureId}/scraping-queries?max=${max}`);
const getFranchiseName = (figure) => {
  var _a;
  return ((_a = figure.franchise) == null ? void 0 : _a.name) || figure.franchiseId || "-";
};
const getBrandName = (figure) => {
  var _a;
  return ((_a = figure.brand) == null ? void 0 : _a.name) || figure.brandId || "-";
};
const toApiError = (error, fallbackMessage) => {
  if (error && typeof error === "object" && "message" in error && "status" in error) {
    return error;
  }
  return toClientApiError(error, fallbackMessage);
};
const formatValue = (value) => value === void 0 || value === null || value === "" ? "-" : value;
const priorityVariant = (priority) => {
  const normalized = String(priority || "").toUpperCase();
  if (normalized === "HIGH") return "default";
  if (normalized === "MEDIUM") return "secondary";
  return "outline";
};
const methodVariant = (method) => {
  const normalized = String(method || "").toUpperCase();
  if (normalized === "GENERATED") return "default";
  if (normalized === "MANUAL") return "secondary";
  return "outline";
};
const PreviewAliasesTable = ({ aliases, loading }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Alias" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Normalized" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Priority" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Source" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Reason" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "State" })
  ] }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "h-24 text-center text-muted-foreground", children: "Loading preview..." }) }) : aliases.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "h-24 text-center text-muted-foreground", children: "No preview generated yet." }) }) : aliases.map((alias, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: formatValue(alias.alias) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: formatValue(alias.aliasNormalized) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: priorityVariant(alias.priority), children: formatValue(alias.priority) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: formatValue(alias.generationSource) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-sm whitespace-normal", children: formatValue(alias.reason) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: alias.alreadyExists ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "Already exists" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "New candidate" }) })
  ] }, `${alias.alias}-${index}`)) })
] }) });
const ExistingAliasesTable = ({ aliases, loading }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Alias" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Normalized" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Method" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Priority" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Source" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Reason" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Source ID" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Created At" })
  ] }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 8, className: "h-24 text-center text-muted-foreground", children: "Loading aliases..." }) }) : aliases.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 8, className: "h-24 text-center text-muted-foreground", children: "No aliases found for this figure." }) }) : aliases.map((alias) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: formatValue(alias.alias) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: formatValue(alias.aliasNormalized) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: methodVariant(alias.loadMethod), children: formatValue(alias.loadMethod) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: priorityVariant(alias.generationPriority), children: formatValue(alias.generationPriority) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: formatValue(alias.generationSource) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-sm whitespace-normal", children: formatValue(alias.generationReason) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: formatValue(alias.sourceId) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: formatValue(alias.createdAt) })
  ] }, alias.id || alias.alias)) })
] }) });
const GenerationSummary = ({ result }) => {
  if (!result) return null;
  const items = [
    ["Generated", result.generatedCount ?? 0],
    ["Saved", result.savedCount ?? 0],
    ["Skipped existing", result.skippedExistingCount ?? 0],
    ["Scraping queries", result.scrapingQueryCount ?? 0]
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 rounded-lg border bg-muted/30 p-4 sm:grid-cols-2 lg:grid-cols-4", children: items.map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border bg-background p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-2xl font-bold text-foreground", children: value })
  ] }, label)) });
};
const FigureAliasGeneratorPage = () => {
  const [figures, setFigures] = reactExports.useState([]);
  const [loadingFigures, setLoadingFigures] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(0);
  const [pageSize, setPageSize] = reactExports.useState(20);
  const [pageMeta, setPageMeta] = reactExports.useState(defaultPageMeta);
  const [selectedFigure, setSelectedFigure] = reactExports.useState(null);
  const [existingAliases, setExistingAliases] = reactExports.useState([]);
  const [loadingExistingAliases, setLoadingExistingAliases] = reactExports.useState(false);
  const [previewResult, setPreviewResult] = reactExports.useState(null);
  const [previewLoading, setPreviewLoading] = reactExports.useState(false);
  const [generating, setGenerating] = reactExports.useState(false);
  const [generationResult, setGenerationResult] = reactExports.useState(null);
  const [scrapingQueries, setScrapingQueries] = reactExports.useState([]);
  const [queriesLoading, setQueriesLoading] = reactExports.useState(false);
  const [queryMax, setQueryMax] = reactExports.useState(5);
  const [successMessage, setSuccessMessage] = reactExports.useState("");
  const [apiError, setApiError] = reactExports.useState(null);
  const selectedFigureId = selectedFigure == null ? void 0 : selectedFigure.id;
  const fetchFigures = reactExports.useCallback(async () => {
    setLoadingFigures(true);
    try {
      const data = await getFiguresForAliasGenerator(page, pageSize, search);
      setFigures(getPageContent(data));
      setPageMeta(getPageMeta(data, pageSize));
    } catch (error) {
      setApiError(toApiError(error, "Error loading figures."));
    } finally {
      setLoadingFigures(false);
    }
  }, [page, pageSize, search]);
  const fetchExistingAliases = reactExports.useCallback(async () => {
    if (!selectedFigureId) return;
    setLoadingExistingAliases(true);
    try {
      const data = await getExistingFigureAliases(selectedFigureId, 0, 20);
      setExistingAliases(getPageContent(data));
    } catch (error) {
      setApiError(toApiError(error, "Error loading existing aliases."));
    } finally {
      setLoadingExistingAliases(false);
    }
  }, [selectedFigureId]);
  const fetchScrapingQueries = reactExports.useCallback(async () => {
    if (!selectedFigureId) return;
    setQueriesLoading(true);
    try {
      setScrapingQueries(await getFigureAliasScrapingQueries(selectedFigureId, queryMax));
    } catch (error) {
      setApiError(toApiError(error, "Error loading scraping queries."));
    } finally {
      setQueriesLoading(false);
    }
  }, [queryMax, selectedFigureId]);
  reactExports.useEffect(() => {
    fetchFigures();
  }, [fetchFigures]);
  reactExports.useEffect(() => {
    setExistingAliases([]);
    setPreviewResult(null);
    setGenerationResult(null);
    setScrapingQueries([]);
    setSuccessMessage("");
    if (selectedFigureId) {
      fetchExistingAliases();
    }
  }, [selectedFigureId]);
  reactExports.useEffect(() => {
    if (selectedFigureId) fetchScrapingQueries();
  }, [queryMax, selectedFigureId]);
  const handleSelectFigure = (figure) => {
    setSelectedFigure(figure);
  };
  const handlePreviewAliases = async () => {
    if (!selectedFigureId) return;
    setPreviewLoading(true);
    setSuccessMessage("");
    try {
      setPreviewResult(await previewGeneratedFigureAliases(selectedFigureId));
    } catch (error) {
      setApiError(toApiError(error, "Error previewing aliases."));
    } finally {
      setPreviewLoading(false);
    }
  };
  const handleGenerateAliases = async () => {
    if (!selectedFigureId) return;
    setGenerating(true);
    setSuccessMessage("");
    try {
      const result = await generateFigureAliases(selectedFigureId);
      setGenerationResult(result);
      setPreviewResult(null);
      setSuccessMessage("Aliases generated successfully.");
      await fetchExistingAliases();
      await fetchScrapingQueries();
    } catch (error) {
      setApiError(toApiError(error, "Error generating aliases."));
    } finally {
      setGenerating(false);
    }
  };
  const previewAliases = reactExports.useMemo(
    () => (previewResult == null ? void 0 : previewResult.generatedAliases) || [],
    [previewResult]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ApiErrorToast, { error: apiError, onClose: () => setApiError(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Figure Alias Generator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Generate, preview, and review aliases for scraping and matching workflows." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-6 xl:grid-cols-[minmax(24rem,0.9fr)_minmax(0,1.35fr)]", children: [
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
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              figures.length,
              " shown - ",
              pageMeta.totalElements,
              " total records"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 overflow-hidden rounded-lg border bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-16", children: "ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Figure" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loadingFigures ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 3, className: "h-28 text-center text-muted-foreground", children: "Loading figures..." }) }) : figures.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 3, className: "h-28 text-center text-muted-foreground", children: "No figures found." }) }) : figures.map((figure) => {
              const selected = (selectedFigure == null ? void 0 : selectedFigure.id) === figure.id;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TableRow,
                {
                  className: `cursor-pointer ${selected ? "bg-muted" : ""}`,
                  onClick: () => handleSelectFigure(figure),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: figure.id }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 font-medium text-foreground", children: figure.name || "-" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
                        getFranchiseName(figure),
                        " / ",
                        getBrandName(figure)
                      ] }),
                      figure.lineName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: figure.lineName })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: figure.status ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: figure.status }) : "-" })
                  ]
                },
                figure.id
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { active: generating, message: "Generating aliases...", children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "rounded-lg border bg-card p-4", children: !selectedFigure ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[28rem] items-center justify-center rounded-lg border border-dashed bg-background p-8 text-center text-sm text-muted-foreground", children: "Select a figure to preview aliases, generate aliases, and inspect scraping queries." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 rounded-lg border bg-background p-4 lg:flex-row lg:items-start lg:justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Selected Figure" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-2xl font-bold text-foreground", children: selectedFigure.name || `Figure ${selectedFigure.id}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-2 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
                  "ID ",
                  selectedFigure.id
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: getFranchiseName(selectedFigure) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: getBrandName(selectedFigure) }),
                selectedFigure.status && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: selectedFigure.status }),
                selectedFigure.lineName && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: selectedFigure.lineName })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  className: "gap-2",
                  disabled: previewLoading || generating,
                  onClick: handlePreviewAliases,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }),
                    "Preview aliases"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  className: "gap-2",
                  disabled: generating,
                  onClick: handleGenerateAliases,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "h-4 w-4" }),
                    "Generate aliases"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  className: "gap-2",
                  disabled: loadingExistingAliases || generating,
                  onClick: fetchExistingAliases,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
                    "Refresh existing aliases"
                  ]
                }
              )
            ] })
          ] }),
          successMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm font-medium text-foreground", children: successMessage }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(GenerationSummary, { result: generationResult }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-muted/30 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground", children: "Scraping queries" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Queries used by scraping to search this figure in external sources." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", htmlFor: "query-max", children: "Max" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    id: "query-max",
                    value: queryMax,
                    disabled: queriesLoading || generating,
                    onChange: (event) => setQueryMax(Number(event.target.value)),
                    className: "rounded border border-input bg-background px-2 py-1 text-foreground",
                    children: Array.from({ length: 10 }, (_, index) => index + 1).map((value) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value, children: value }, value))
                  }
                )
              ] })
            ] }),
            queriesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-md border border-dashed bg-background p-4 text-sm text-muted-foreground", children: "Loading scraping queries..." }) : scrapingQueries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-md border border-dashed bg-background p-4 text-sm text-muted-foreground", children: "No scraping queries available." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-2", children: scrapingQueries.map((query, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-md border bg-background p-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mr-2 font-semibold text-primary", children: [
                index + 1,
                "."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: query })
            ] }, `${query}-${index}`)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground", children: "Preview generated aliases" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "These aliases are generated by the backend but are not persisted until Generate aliases is used." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewAliasesTable, { aliases: previewAliases, loading: previewLoading })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground", children: "Existing aliases" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Persisted aliases currently linked to the selected figure." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExistingAliasesTable, { aliases: existingAliases, loading: loadingExistingAliases })
          ] })
        ] }) }) })
      ] })
    ] })
  ] });
};
export {
  FigureAliasGeneratorPage as default
};
