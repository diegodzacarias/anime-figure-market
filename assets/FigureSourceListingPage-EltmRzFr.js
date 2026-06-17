import { r as reactExports, j as jsxRuntimeExports } from "./index-BBtVfQu2.js";
import { I as Input, B as Button, N as Navbar } from "./Navbar-BMQL-z9P.js";
import { P as Plus, A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-Cq0kKi_G.js";
import { A as ApiErrorToast, r as readApiErrorResponse, t as toClientApiError } from "./apiError-B8hFs4iN.js";
import { L as LoadingOverlay, T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, S as Search, P as PageControls } from "./table-Dui9h94M.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-CIFynVfA.js";
import { F as FigureCombobox } from "./FigureCombobox-DxLNdgCy.js";
import { B as Badge } from "./badge-CguKk6zO.js";
import { P as Pencil, T as Trash2 } from "./trash-2-JY7JXY-3.js";
import { u as useReferenceData } from "./useReferenceData-D_WT5ltM.js";
import { d as defaultPageMeta, w as withPagination, b as withPageSize, g as getPageContent, a as getPageMeta } from "./page-DEGBjxB5.js";
import "./popover-7WmtZAUv.js";
const getCurrentDateTimeValue = () => {
  const now = /* @__PURE__ */ new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 6e4);
  return localDate.toISOString().slice(0, 16);
};
const toDateTimeInputValue = (value) => value ? value.slice(0, 16) : getCurrentDateTimeValue();
const FigureSourceListingFormDialog = ({
  listing,
  figures,
  sources,
  currencyCodes,
  listingStatuses,
  loadMethods,
  open,
  saving,
  loadingOptions,
  onOpenChange,
  onSubmit
}) => {
  const [form, setForm] = reactExports.useState({
    figureId: "",
    sourceId: "",
    sourceItemId: "",
    sourceTitle: "",
    sourceUrl: "",
    loadMethod: "",
    price: "",
    currencyCode: "USD",
    preorderDate: "",
    estimatedReleaseDate: "",
    listingStatus: "",
    isAvailable: "",
    editionText: "",
    releaseText: "",
    capturedAt: getCurrentDateTimeValue()
  });
  reactExports.useEffect(() => {
    var _a, _b, _c;
    if (!open) return;
    setForm({
      figureId: ((_a = listing == null ? void 0 : listing.figureId) == null ? void 0 : _a.toString()) || "",
      sourceId: ((_b = listing == null ? void 0 : listing.sourceId) == null ? void 0 : _b.toString()) || "",
      sourceItemId: (listing == null ? void 0 : listing.sourceItemId) || "",
      sourceTitle: (listing == null ? void 0 : listing.sourceTitle) || "",
      sourceUrl: (listing == null ? void 0 : listing.sourceUrl) || "",
      loadMethod: (listing == null ? void 0 : listing.loadMethod) || "",
      price: ((_c = listing == null ? void 0 : listing.price) == null ? void 0 : _c.toString()) || "",
      currencyCode: (listing == null ? void 0 : listing.currencyCode) || "USD",
      preorderDate: (listing == null ? void 0 : listing.preorderDate) || "",
      estimatedReleaseDate: (listing == null ? void 0 : listing.estimatedReleaseDate) || "",
      listingStatus: (listing == null ? void 0 : listing.listingStatus) || "",
      isAvailable: (listing == null ? void 0 : listing.isAvailable) === void 0 || (listing == null ? void 0 : listing.isAvailable) === null ? "" : listing.isAvailable.toString(),
      editionText: (listing == null ? void 0 : listing.editionText) || "",
      releaseText: (listing == null ? void 0 : listing.releaseText) || "",
      capturedAt: toDateTimeInputValue(listing == null ? void 0 : listing.capturedAt)
    });
  }, [listing, open]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      figureId: Number(form.figureId),
      sourceId: Number(form.sourceId),
      sourceTitle: form.sourceTitle.trim(),
      currencyCode: form.currencyCode,
      capturedAt: form.capturedAt
    };
    if (form.loadMethod) payload.loadMethod = form.loadMethod;
    if (form.sourceItemId.trim()) payload.sourceItemId = form.sourceItemId.trim();
    if (form.sourceUrl.trim()) payload.sourceUrl = form.sourceUrl.trim();
    if (form.price) payload.price = Number(form.price);
    if (form.preorderDate) payload.preorderDate = form.preorderDate;
    if (form.estimatedReleaseDate) payload.estimatedReleaseDate = form.estimatedReleaseDate;
    if (form.listingStatus) payload.listingStatus = form.listingStatus;
    if (form.isAvailable) payload.isAvailable = form.isAvailable === "true";
    if (form.editionText.trim()) payload.editionText = form.editionText.trim();
    if (form.releaseText.trim()) payload.releaseText = form.releaseText.trim();
    await onSubmit(payload);
  };
  const selectClass = "w-full border border-input bg-background text-foreground p-2 rounded";
  const optionClass = "bg-background text-foreground";
  const helperClass = "mt-1 text-xs text-muted-foreground";
  const labelClass = "mb-1 block text-sm font-medium text-foreground";
  const requiredMark = /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] max-w-4xl overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { active: saving, label: "Saving source listing..." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: listing ? "Update Figure Source Listing" : "New Figure Source Listing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Manage source-specific listing data captured from shops and marketplaces." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-muted/30 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-foreground", children: "Source quick links" }),
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "grid gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
            "Figure ",
            requiredMark
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FigureCombobox,
            {
              figures,
              value: form.figureId,
              disabled: loadingOptions || figures.length === 0,
              loading: loadingOptions,
              onChange: (value) => setForm((prev) => ({ ...prev, figureId: value }))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "figureId", value: form.figureId, required: true, className: "sr-only", onChange: () => void 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Figura relacionada con este listing." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
            "Source ",
            requiredMark
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              name: "sourceId",
              value: form.sourceId,
              onChange: handleChange,
              className: selectClass,
              disabled: loadingOptions || sources.length === 0,
              required: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "", children: loadingOptions ? "Loading sources..." : "Select a source" }),
                sources.map((source) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: source.id, children: source.name }, source.id))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Tienda, web o fuente donde aparece el listing." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Source Item ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "sourceItemId", maxLength: 255, value: form.sourceItemId, onChange: handleChange }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Identificador del item dentro de la fuente." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
            "Source Title ",
            requiredMark
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "sourceTitle", maxLength: 500, value: form.sourceTitle, onChange: handleChange, required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Titulo publicado por la fuente." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Source URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "sourceUrl", type: "url", maxLength: 1e3, value: form.sourceUrl, onChange: handleChange }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "URL directa del listing en la fuente." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Load Method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              name: "loadMethod",
              value: form.loadMethod,
              onChange: handleChange,
              className: selectClass,
              disabled: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "", children: "-" }),
                loadMethods.map((method) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: method.value, children: method.label }, method.value))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Metodo de carga informado por el backend." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "price", type: "number", min: "0.01", step: "0.01", value: form.price, onChange: handleChange }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Precio publicado, si esta disponible." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
            "Currency ",
            requiredMark
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { name: "currencyCode", value: form.currencyCode, onChange: handleChange, className: selectClass, required: true, children: currencyCodes.map((currency) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { className: optionClass, value: currency.value, children: [
            currency.label,
            currency.symbol ? ` (${currency.symbol})` : ""
          ] }, currency.value)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Moneda del precio del listing." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Preorder Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "preorderDate", type: "date", value: form.preorderDate, onChange: handleChange }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Fecha de preventa reportada por la fuente." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Estimated Release Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "estimatedReleaseDate", type: "date", value: form.estimatedReleaseDate, onChange: handleChange }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Fecha estimada de salida segun la fuente." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Listing Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { name: "listingStatus", value: form.listingStatus, onChange: handleChange, className: selectClass, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "", children: "Not set" }),
            listingStatuses.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: status.value, children: status.label }, status.value))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Estado del listing en la fuente." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Available" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { name: "isAvailable", value: form.isAvailable, onChange: handleChange, className: selectClass, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "", children: "Unknown" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "true", children: "Yes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "false", children: "No" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Indica si el item esta disponible en la fuente." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Edition Text" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "editionText", maxLength: 255, value: form.editionText, onChange: handleChange }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Texto de edicion tal como aparece en la fuente." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Release Text" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "releaseText", maxLength: 255, value: form.releaseText, onChange: handleChange }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Texto libre de lanzamiento reportado por la fuente." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
            "Captured At ",
            requiredMark
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "capturedAt", type: "datetime-local", value: form.capturedAt, onChange: handleChange, required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Momento en que se capturo esta informacion." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: saving, children: saving ? "Saving..." : listing ? "Update" : "Create" })
      ] })
    ] })
  ] }) });
};
const loadMethodVariant = (loadMethod) => {
  const normalized = String(loadMethod || "").toUpperCase();
  if (normalized === "SCRAPED" || normalized === "GENERATED") return "default";
  if (normalized === "MANUAL") return "secondary";
  return "outline";
};
const FigureSourceListingTable = ({
  listings,
  loading,
  onEdit,
  onDelete
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-20", children: "ID" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Figure" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Source" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Load Method" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Title" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Price" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Available" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-48 text-right", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 9, className: "h-28 text-center text-muted-foreground", children: "Loading source listings..." }) }) : listings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 9, className: "h-28 text-center text-muted-foreground", children: "No source listings found." }) }) : listings.map((listing) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: listing.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: listing.figureName || listing.figureId || "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: listing.sourceName || listing.sourceId || "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: listing.loadMethod ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: loadMethodVariant(listing.loadMethod), children: listing.loadMethod }) : "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-xs truncate", children: listing.sourceTitle || "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: listing.price ? `${listing.price} ${listing.currencyCode || ""}` : "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: listing.listingStatus || "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: listing.isAvailable === void 0 || listing.isAvailable === null ? "Unknown" : listing.isAvailable ? "Yes" : "No" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", className: "gap-2", onClick: () => onEdit(listing), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
          "Actualizar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "destructive", size: "sm", className: "gap-2", onClick: () => onDelete(listing), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
          "Eliminar"
        ] })
      ] }) })
    ] }, listing.id)) })
  ] }) });
};
const API_BASE_URL = "https://figure-market-core.onrender.com/api";
const FIGURES_ENDPOINT = `${API_BASE_URL}/v1/figures`;
const FIGURE_SOURCE_LISTINGS_ENDPOINT = `${API_BASE_URL}/figure-source-listings`;
const SOURCES_ENDPOINT = `${API_BASE_URL}/v1/sources`;
const fallbackCurrencyCodes = [
  { value: "USD", label: "Usd", symbol: "$" },
  { value: "JPY", label: "Jpy", symbol: "¥" }
];
const fallbackListingStatuses = [
  { value: "ACTIVE", label: "Active" },
  { value: "SOLD_OUT", label: "Sold Out" },
  { value: "ARCHIVED", label: "Archived" },
  { value: "UNKNOWN", label: "Unknown" }
];
const fallbackLoadMethods = [
  { value: "MANUAL", label: "Manual" },
  { value: "SCRAPED", label: "Scraped" },
  { value: "GENERATED", label: "Generated" },
  { value: "IMPORTED", label: "Imported" }
];
const FigureSourceListingPage = () => {
  const [listings, setListings] = reactExports.useState([]);
  const [figures, setFigures] = reactExports.useState([]);
  const [sources, setSources] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [loadingOptions, setLoadingOptions] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [deleting, setDeleting] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(0);
  const [pageSize, setPageSize] = reactExports.useState(20);
  const [pageMeta, setPageMeta] = reactExports.useState(defaultPageMeta);
  const [apiError, setApiError] = reactExports.useState(null);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [selectedListing, setSelectedListing] = reactExports.useState(null);
  const [listingToDelete, setListingToDelete] = reactExports.useState(null);
  const { referenceData, loadingReferenceData } = useReferenceData();
  const mutating = saving || deleting;
  const fetchData = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
      setLoadingOptions(true);
    }
    try {
      const [listingsResponse, figuresResponse, sourcesResponse] = await Promise.all([
        fetch(withPagination(FIGURE_SOURCE_LISTINGS_ENDPOINT, page, pageSize)),
        fetch(withPageSize(FIGURES_ENDPOINT)),
        fetch(withPageSize(SOURCES_ENDPOINT))
      ]);
      if (listingsResponse.ok) {
        const data = await listingsResponse.json();
        setListings(getPageContent(data));
        setPageMeta(getPageMeta(data, pageSize));
      } else {
        console.error("Error fetching figure source listings");
      }
      if (figuresResponse.ok) {
        const data = await figuresResponse.json();
        setFigures(getPageContent(data));
      } else {
        console.error("Error fetching figures");
      }
      if (sourcesResponse.ok) {
        const data = await sourcesResponse.json();
        setSources(getPageContent(data));
      } else {
        console.error("Error fetching sources");
      }
    } catch (error) {
      console.error("Request error fetching figure source listings:", error);
    } finally {
      if (showLoading) {
        setLoading(false);
        setLoadingOptions(false);
      }
    }
  };
  reactExports.useEffect(() => {
    fetchData();
  }, [page, pageSize]);
  reactExports.useEffect(() => {
    setPage(0);
  }, [search]);
  const filteredListings = reactExports.useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return listings;
    return listings.filter(
      (listing) => {
        var _a;
        return [
          (_a = listing.id) == null ? void 0 : _a.toString(),
          listing.figureName,
          listing.figureSlug,
          listing.sourceName,
          listing.sourceItemId,
          listing.sourceTitle,
          listing.sourceUrl,
          listing.currencyCode,
          listing.listingStatus,
          listing.loadMethod
        ].filter(Boolean).some((value) => value == null ? void 0 : value.toLowerCase().includes(query));
      }
    );
  }, [listings, search]);
  const openCreateDialog = () => {
    setSelectedListing(null);
    setDialogOpen(true);
  };
  const openEditDialog = (listing) => {
    setSelectedListing(listing);
    setDialogOpen(true);
  };
  const handleSubmit = async (payload) => {
    setSaving(true);
    const isEditing = Boolean(selectedListing == null ? void 0 : selectedListing.id);
    const endpoint = isEditing ? `${FIGURE_SOURCE_LISTINGS_ENDPOINT}/${selectedListing == null ? void 0 : selectedListing.id}` : FIGURE_SOURCE_LISTINGS_ENDPOINT;
    try {
      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, "Error saving figure source listing."));
        return;
      }
      await fetchData(false);
      setDialogOpen(false);
      setSelectedListing(null);
    } catch (error) {
      console.error("Request error:", error);
      setApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async () => {
    if (!(listingToDelete == null ? void 0 : listingToDelete.id)) return;
    setDeleting(true);
    try {
      const response = await fetch(`${FIGURE_SOURCE_LISTINGS_ENDPOINT}/${listingToDelete.id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, "Error deleting figure source listing."));
        return;
      }
      await fetchData(false);
      setListingToDelete(null);
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Figure Source Listings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Manage source-specific marketplace listings for each figure." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", className: "gap-2 md:self-center", onClick: openCreateDialog, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          "New Figure Source Listing"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full md:max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Search source listings",
              className: "pl-9"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          filteredListings.length,
          " shown - ",
          pageMeta.totalElements,
          " total records"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { active: mutating, message: "Updating source listings...", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        FigureSourceListingTable,
        {
          listings: filteredListings,
          loading,
          onEdit: openEditDialog,
          onDelete: setListingToDelete
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FigureSourceListingFormDialog,
      {
        listing: selectedListing,
        figures,
        sources,
        open: dialogOpen,
        saving,
        loadingOptions: loadingOptions || loadingReferenceData,
        currencyCodes: referenceData.currencyCodes.length > 0 ? referenceData.currencyCodes : fallbackCurrencyCodes,
        listingStatuses: referenceData.figureSourceListingStatuses.length > 0 ? referenceData.figureSourceListingStatuses : fallbackListingStatuses,
        loadMethods: referenceData.loadMethods.length > 0 ? referenceData.loadMethods : fallbackLoadMethods,
        onOpenChange: setDialogOpen,
        onSubmit: handleSubmit
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: Boolean(listingToDelete),
        onOpenChange: (open) => {
          if (!open) setListingToDelete(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete source listing?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              'This action will delete "',
              (listingToDelete == null ? void 0 : listingToDelete.sourceTitle) || "this listing",
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
  FigureSourceListingPage as default
};
