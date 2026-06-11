const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/FigureFormDialog-DCdne3lg.js","assets/index-_-vfgGHr.js","assets/index-B43YI_Om.css","assets/apiError-Tyyvc9AH.js","assets/Navbar-BSyiII2D.js","assets/dialog-BogUNvft.js","assets/popover-D7SQ_-R_.js","assets/page-DKdY7PVC.js"])))=>i.map(i=>d[i]);
import { j as jsxRuntimeExports, r as reactExports, _ as __vitePreload } from "./index-_-vfgGHr.js";
import { B as Button, N as Navbar, I as Input } from "./Navbar-BSyiII2D.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, A as ApiErrorToast, P as Plus, S as Search, L as LoadingOverlay, f as PageControls, g as AlertDialog, h as AlertDialogContent, i as AlertDialogHeader, j as AlertDialogTitle, k as AlertDialogDescription, l as AlertDialogFooter, m as AlertDialogCancel, n as AlertDialogAction, r as readApiErrorResponse, t as toClientApiError } from "./apiError-Tyyvc9AH.js";
import { P as Pencil, T as Trash2 } from "./trash-2-7ewYfWml.js";
import { u as useReferenceData } from "./useReferenceData-BP7RAqMV.js";
import { d as defaultPageMeta, w as withPageSize, g as getPageContent, a as getPageMeta } from "./page-DKdY7PVC.js";
const getFranchiseName = (figure, franchiseNames) => {
  var _a, _b;
  const franchiseId = figure.franchiseId || ((_a = figure.franchise) == null ? void 0 : _a.id);
  return ((_b = figure.franchise) == null ? void 0 : _b.name) || (franchiseId ? franchiseNames[franchiseId] : "") || "-";
};
const getBrandName = (figure, brandNames) => {
  var _a, _b;
  const brandId = figure.brandId || ((_a = figure.brand) == null ? void 0 : _a.id);
  return ((_b = figure.brand) == null ? void 0 : _b.name) || (brandId ? brandNames[brandId] : "") || "-";
};
const FigureTable = ({
  figures,
  loading,
  franchiseNames,
  brandNames,
  onEdit,
  onDelete
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-20", children: "ID" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Slug" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Franchise" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Brand" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "JAN/EAN" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Product Code" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-48 text-right", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 9, className: "h-28 text-center text-muted-foreground", children: "Loading figures..." }) }) : figures.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 9, className: "h-28 text-center text-muted-foreground", children: "No figures found." }) }) : figures.map((figure) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: figure.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: figure.name || "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: figure.slug || "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: getFranchiseName(figure, franchiseNames) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: getBrandName(figure, brandNames) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: figure.janCode || "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: figure.officialProductCode || "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: figure.status || "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", className: "gap-2", onClick: () => onEdit(figure), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
          "Actualizar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "destructive", size: "sm", className: "gap-2", onClick: () => onDelete(figure), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
          "Eliminar"
        ] })
      ] }) })
    ] }, figure.id)) })
  ] }) }) });
};
const API_BASE_URL = "https://figure-market-core.onrender.com/api";
const FIGURES_ENDPOINT = `${API_BASE_URL}/v1/figures`;
const FIGURE_SEARCH_ENDPOINT = `${FIGURES_ENDPOINT}/search`;
const FIGURE_SLUG_SUGGESTION_ENDPOINT = `${FIGURES_ENDPOINT}/slug/suggestion`;
const FIGURE_SLUG_AVAILABILITY_ENDPOINT = `${FIGURES_ENDPOINT}/slug/availability`;
const FRANCHISES_ENDPOINT = `${API_BASE_URL}/v1/franchises`;
const SOURCES_ENDPOINT = `${API_BASE_URL}/v1/sources`;
const FigureFormDialog = reactExports.lazy(() => __vitePreload(() => import("./FigureFormDialog-DCdne3lg.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7]) : void 0));
const brands = [
  { id: 1, name: "Good Smile Company" },
  { id: 2, name: "Kotobukiya" },
  { id: 3, name: "MegaHouse" },
  { id: 4, name: "Prime 1" },
  { id: 5, name: "FREEing" }
];
const fallbackCurrencyCodes = [
  { value: "USD", label: "Usd", symbol: "$" },
  { value: "JPY", label: "Jpy", symbol: "¥" }
];
const fallbackFigureStatuses = [
  { value: "PREORDER", label: "Preorder" },
  { value: "RELEASED", label: "Released" },
  { value: "SOLD_OUT", label: "Sold Out" }
];
const buildFigureSearchUrl = (page, size, query, filters) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort: "name,asc"
  });
  if (query.trim()) {
    params.set("q", query.trim());
  }
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  return `${FIGURE_SEARCH_ENDPOINT}?${params.toString()}`;
};
const FigurePage = () => {
  const [figures, setFigures] = reactExports.useState([]);
  const [franchises, setFranchises] = reactExports.useState([]);
  const [sources, setSources] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [loadingOptions, setLoadingOptions] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [deleting, setDeleting] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const [filters, setFilters] = reactExports.useState({
    franchiseId: "",
    brandId: "",
    status: "",
    baseCurrencyCode: "",
    isLicensed: ""
  });
  const [page, setPage] = reactExports.useState(0);
  const [pageSize, setPageSize] = reactExports.useState(20);
  const [pageMeta, setPageMeta] = reactExports.useState(defaultPageMeta);
  const [apiError, setApiError] = reactExports.useState(null);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [selectedFigure, setSelectedFigure] = reactExports.useState(null);
  const [figureToDelete, setFigureToDelete] = reactExports.useState(null);
  const mutating = saving || deleting;
  const { referenceData } = useReferenceData();
  const fetchData = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
      setLoadingOptions(true);
    }
    try {
      const [figuresResponse, franchisesResponse, sourcesResponse] = await Promise.all([
        fetch(buildFigureSearchUrl(page, pageSize, search, filters)),
        fetch(withPageSize(FRANCHISES_ENDPOINT)),
        fetch(withPageSize(SOURCES_ENDPOINT))
      ]);
      if (figuresResponse.ok) {
        const data = await figuresResponse.json();
        setFigures(getPageContent(data));
        setPageMeta(getPageMeta(data, pageSize));
      } else {
        console.error("Error fetching figures");
      }
      if (franchisesResponse.ok) {
        const data = await franchisesResponse.json();
        setFranchises(getPageContent(data));
      } else {
        console.error("Error fetching franchises");
      }
      if (sourcesResponse.ok) {
        const data = await sourcesResponse.json();
        setSources(getPageContent(data));
      } else {
        console.error("Error fetching sources");
      }
    } catch (error) {
      console.error("Request error fetching figures:", error);
    } finally {
      if (showLoading) {
        setLoading(false);
        setLoadingOptions(false);
      }
    }
  };
  reactExports.useEffect(() => {
    fetchData();
  }, [page, pageSize, search, filters]);
  const franchiseNames = reactExports.useMemo(
    () => Object.fromEntries(franchises.map((franchise) => [franchise.id, franchise.name])),
    [franchises]
  );
  const brandNames = reactExports.useMemo(
    () => Object.fromEntries(brands.map((brand) => [brand.id, brand.name])),
    []
  );
  const filteredFigures = figures;
  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(0);
  };
  const openCreateDialog = () => {
    setSelectedFigure(null);
    setDialogOpen(true);
  };
  const openEditDialog = (figure) => {
    setSelectedFigure(figure);
    setDialogOpen(true);
  };
  const generateSlug = async (name) => {
    const response = await fetch(
      `${FIGURE_SLUG_SUGGESTION_ENDPOINT}?title=${encodeURIComponent(name)}`
    );
    if (!response.ok) {
      setApiError(await readApiErrorResponse(response, "Error generating slug."));
      throw new Error("Error generating slug");
    }
    const data = await response.json();
    return data.slug || "";
  };
  const validateSlug = async (slug, figureId) => {
    const params = new URLSearchParams({ slug });
    if (figureId) {
      params.set("excludeFigureId", figureId.toString());
    }
    const response = await fetch(`${FIGURE_SLUG_AVAILABILITY_ENDPOINT}?${params.toString()}`);
    if (!response.ok) {
      setApiError(await readApiErrorResponse(response, "Error validating slug."));
      throw new Error("Error validating slug");
    }
    const data = await response.json();
    return Boolean(data.available);
  };
  const handleSubmit = async (payload) => {
    setSaving(true);
    const isEditing = Boolean(selectedFigure == null ? void 0 : selectedFigure.id);
    const endpoint = isEditing ? `${FIGURES_ENDPOINT}/${selectedFigure == null ? void 0 : selectedFigure.id}` : FIGURES_ENDPOINT;
    try {
      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, "Error saving figure."));
        return;
      }
      const savedFigure = await response.json();
      await fetchData(false);
      if (isEditing) {
        setDialogOpen(false);
        setSelectedFigure(null);
      } else {
        setSelectedFigure(savedFigure);
      }
    } catch (error) {
      console.error("Request error:", error);
      setApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async () => {
    if (!(figureToDelete == null ? void 0 : figureToDelete.id)) return;
    setDeleting(true);
    try {
      const response = await fetch(`${FIGURES_ENDPOINT}/${figureToDelete.id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, "Error deleting figure."));
        return;
      }
      await fetchData(false);
      setFigureToDelete(null);
    } catch (error) {
      console.error("Request error:", error);
      setApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setDeleting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ApiErrorToast, { error: apiError, onClose: () => setApiError(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Figures" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Manage figure records used by aliases, listings, and marketplace views." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", className: "gap-2 md:self-center", onClick: openCreateDialog, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          "New Figure"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-lg border bg-muted/30 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium text-foreground", children: "Source quick links" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: sources.filter((source) => source.baseUrl).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No source URLs available." }) : sources.filter((source) => source.baseUrl).map((source) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: source.baseUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground",
            children: source.name
          },
          source.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-lg border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full md:max-w-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: search,
                onChange: (e) => {
                  setSearch(e.target.value);
                  setPage(0);
                },
                placeholder: "Search figures",
                className: "pl-9"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            filteredFigures.length,
            " shown - ",
            pageMeta.totalElements,
            " total records"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 md:grid-cols-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: filters.franchiseId,
              onChange: (event) => updateFilter("franchiseId", event.target.value),
              className: "rounded border border-input bg-background p-2 text-sm text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All franchises" }),
                franchises.map((franchise) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: franchise.id, children: franchise.name }, franchise.id))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: filters.brandId,
              onChange: (event) => updateFilter("brandId", event.target.value),
              className: "rounded border border-input bg-background p-2 text-sm text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All brands" }),
                brands.map((brand) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: brand.id, children: brand.name }, brand.id))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: filters.status,
              onChange: (event) => updateFilter("status", event.target.value),
              className: "rounded border border-input bg-background p-2 text-sm text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All statuses" }),
                (referenceData.figureStatuses.length > 0 ? referenceData.figureStatuses : fallbackFigureStatuses).map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: status.value, children: status.label }, status.value))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: filters.baseCurrencyCode,
              onChange: (event) => updateFilter("baseCurrencyCode", event.target.value),
              className: "rounded border border-input bg-background p-2 text-sm text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All currencies" }),
                (referenceData.currencyCodes.length > 0 ? referenceData.currencyCodes : fallbackCurrencyCodes).map((currency) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: currency.value, children: currency.label }, currency.value))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: filters.isLicensed,
              onChange: (event) => updateFilter("isLicensed", event.target.value),
              className: "rounded border border-input bg-background p-2 text-sm text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All license states" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "true", children: "Licensed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "false", children: "Unlicensed" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { active: mutating, message: "Updating figures...", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        FigureTable,
        {
          figures: filteredFigures,
          loading,
          franchiseNames,
          brandNames,
          onEdit: openEditDialog,
          onDelete: setFigureToDelete
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        PageControls,
        {
          page: pageMeta.page,
          size: pageMeta.size,
          totalElements: pageMeta.totalElements,
          totalPages: pageMeta.totalPages,
          disabled: loading || mutating,
          onPageChange: setPage,
          onSizeChange: (size) => {
            setPageSize(size);
            setPage(0);
          }
        }
      ) })
    ] }),
    dialogOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      FigureFormDialog,
      {
        figure: selectedFigure,
        franchises,
        brands,
        open: dialogOpen,
        saving,
        loadingOptions,
        currencyCodes: referenceData.currencyCodes.length > 0 ? referenceData.currencyCodes : fallbackCurrencyCodes,
        figureStatuses: referenceData.figureStatuses.length > 0 ? referenceData.figureStatuses : fallbackFigureStatuses,
        onOpenChange: setDialogOpen,
        onGenerateSlug: generateSlug,
        onValidateSlug: validateSlug,
        onApiError: setApiError,
        onSubmit: handleSubmit
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: Boolean(figureToDelete),
        onOpenChange: (open) => {
          if (!open) setFigureToDelete(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete figure?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              'This action will delete "',
              (figureToDelete == null ? void 0 : figureToDelete.name) || "this figure",
              '" from the database. This cannot be undone.'
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: deleting, children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                disabled: deleting,
                onClick: handleDelete,
                children: deleting ? "Deleting..." : "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
};
export {
  FigurePage as default
};
