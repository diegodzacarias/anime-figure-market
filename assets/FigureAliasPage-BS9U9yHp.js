import { r as reactExports, j as jsxRuntimeExports } from "./index-CiMj1x9n.js";
import { I as Input, B as Button, N as Navbar } from "./Navbar-Duc0He4i.js";
import { P as Plus, A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DvaA0Lyt.js";
import { A as ApiErrorToast, r as readApiErrorResponse, t as toClientApiError } from "./apiError-JuPfcRPz.js";
import { L as LoadingOverlay, T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, S as Search, P as PageControls } from "./table-Cjh-D4VV.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-DuwuHGXG.js";
import { F as FigureCombobox } from "./FigureCombobox-DapeyksS.js";
import { f as formatDateTime } from "./date-DI8K_e3d.js";
import { P as Pencil, T as Trash2 } from "./trash-2-QH3KlvjW.js";
import { u as useReferenceData } from "./useReferenceData-BKc_O9bS.js";
import { d as defaultPageMeta, b as withPagination, w as withPageSize, g as getPageContent, a as getPageMeta } from "./page-DKdY7PVC.js";
import "./popover-CNqEE2HN.js";
const FigureAliasFormDialog = ({
  figureAlias,
  figures,
  sources,
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
    alias: "",
    loadMethod: "MANUAL"
  });
  reactExports.useEffect(() => {
    var _a, _b;
    if (!open) return;
    setForm({
      figureId: ((_a = figureAlias == null ? void 0 : figureAlias.figureId) == null ? void 0 : _a.toString()) || "",
      sourceId: ((_b = figureAlias == null ? void 0 : figureAlias.sourceId) == null ? void 0 : _b.toString()) || "",
      alias: (figureAlias == null ? void 0 : figureAlias.alias) || "",
      loadMethod: (figureAlias == null ? void 0 : figureAlias.loadMethod) || "MANUAL"
    });
  }, [figureAlias, open]);
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
      alias: form.alias.trim(),
      loadMethod: form.loadMethod
    };
    if (form.sourceId) payload.sourceId = Number(form.sourceId);
    await onSubmit(payload);
  };
  const selectClass = "w-full border border-input bg-background text-foreground p-2 rounded";
  const optionClass = "bg-background text-foreground";
  const helperClass = "mt-1 text-xs text-muted-foreground";
  const labelClass = "mb-1 block text-sm font-medium text-foreground";
  const requiredMark = /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { active: saving, label: "Saving figure alias..." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: figureAlias ? "Update Figure Alias" : "New Figure Alias" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Manage alternate names used to match figure listings from sources." })
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Figura a la que pertenece este alias." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Source" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              name: "sourceId",
              value: form.sourceId,
              onChange: handleChange,
              className: selectClass,
              disabled: loadingOptions || sources.length === 0,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "", children: loadingOptions ? "Loading sources..." : "None" }),
                sources.map((source) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: source.id, children: source.name }, source.id))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Fuente donde aplica o se identifico el alias, si corresponde." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
            "Alias ",
            requiredMark
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              name: "alias",
              maxLength: 255,
              value: form.alias,
              onChange: handleChange,
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Texto alternativo usado para busqueda o coincidencias." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
            "Load Method ",
            requiredMark
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              name: "loadMethod",
              value: form.loadMethod,
              onChange: handleChange,
              className: selectClass,
              required: true,
              children: loadMethods.map((method) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: method.value, children: method.label }, method.value))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Forma en que se cargo el alias." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: saving, children: saving ? "Saving..." : figureAlias ? "Update" : "Create" })
      ] })
    ] })
  ] }) });
};
const FigureAliasTable = ({
  aliases,
  loading,
  figureNames,
  sourceNames,
  onEdit,
  onDelete
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-20", children: "ID" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Alias" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Normalized Alias" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Figure" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Source" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Load Method" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Created At" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Updated At" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-48 text-right", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 9, className: "h-28 text-center text-muted-foreground", children: "Loading figure aliases..." }) }) : aliases.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 9, className: "h-28 text-center text-muted-foreground", children: "No figure aliases found." }) }) : aliases.map((alias) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: alias.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: alias.alias || "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: alias.aliasNormalized || "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: alias.figureId ? figureNames[alias.figureId] || alias.figureId : "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: alias.sourceId ? sourceNames[alias.sourceId] || alias.sourceId : "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: alias.loadMethod || "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: formatDateTime(alias.createdAt) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: formatDateTime(alias.updatedAt) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", className: "gap-2", onClick: () => onEdit(alias), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
          "Actualizar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "destructive", size: "sm", className: "gap-2", onClick: () => onDelete(alias), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
          "Eliminar"
        ] })
      ] }) })
    ] }, alias.id)) })
  ] }) }) });
};
const API_BASE_URL = "https://figure-market-core.onrender.com/api";
const FIGURES_ENDPOINT = `${API_BASE_URL}/v1/figures`;
const FIGURE_ALIASES_ENDPOINT = `${API_BASE_URL}/figure-aliases`;
const SOURCES_ENDPOINT = `${API_BASE_URL}/v1/sources`;
const fallbackLoadMethods = [
  { value: "MANUAL", label: "Manual" },
  { value: "SCRAPED", label: "Scraped" },
  { value: "GENERATED", label: "Generated" },
  { value: "IMPORTED", label: "Imported" }
];
const FigureAliasPage = () => {
  const [aliases, setAliases] = reactExports.useState([]);
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
  const [selectedAlias, setSelectedAlias] = reactExports.useState(null);
  const [aliasToDelete, setAliasToDelete] = reactExports.useState(null);
  const { referenceData, loadingReferenceData } = useReferenceData();
  const mutating = saving || deleting;
  const fetchData = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
      setLoadingOptions(true);
    }
    try {
      const [aliasesResponse, figuresResponse, sourcesResponse] = await Promise.all([
        fetch(withPagination(FIGURE_ALIASES_ENDPOINT, page, pageSize)),
        fetch(withPageSize(FIGURES_ENDPOINT)),
        fetch(withPageSize(SOURCES_ENDPOINT))
      ]);
      if (aliasesResponse.ok) {
        const data = await aliasesResponse.json();
        setAliases(getPageContent(data));
        setPageMeta(getPageMeta(data, pageSize));
      } else {
        console.error("Error fetching figure aliases");
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
      console.error("Request error fetching figure aliases:", error);
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
  const figureNames = reactExports.useMemo(
    () => Object.fromEntries(figures.map((figure) => [figure.id, figure.name])),
    [figures]
  );
  const sourceNames = reactExports.useMemo(
    () => Object.fromEntries(sources.map((source) => [source.id, source.name])),
    [sources]
  );
  const filteredAliases = reactExports.useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return aliases;
    return aliases.filter(
      (alias) => {
        var _a;
        return [
          (_a = alias.id) == null ? void 0 : _a.toString(),
          alias.alias,
          alias.aliasNormalized,
          alias.loadMethod,
          alias.figureId ? figureNames[alias.figureId] : "",
          alias.sourceId ? sourceNames[alias.sourceId] : ""
        ].filter(Boolean).some((value) => value == null ? void 0 : value.toLowerCase().includes(query));
      }
    );
  }, [aliases, figureNames, search, sourceNames]);
  const openCreateDialog = () => {
    setSelectedAlias(null);
    setDialogOpen(true);
  };
  const openEditDialog = (alias) => {
    setSelectedAlias(alias);
    setDialogOpen(true);
  };
  const handleSubmit = async (payload) => {
    setSaving(true);
    const isEditing = Boolean(selectedAlias == null ? void 0 : selectedAlias.id);
    const endpoint = isEditing ? `${FIGURE_ALIASES_ENDPOINT}/${selectedAlias == null ? void 0 : selectedAlias.id}` : FIGURE_ALIASES_ENDPOINT;
    try {
      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, "Error saving figure alias."));
        return;
      }
      await fetchData(false);
      setDialogOpen(false);
      setSelectedAlias(null);
    } catch (error) {
      console.error("Request error:", error);
      setApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async () => {
    if (!(aliasToDelete == null ? void 0 : aliasToDelete.id)) return;
    setDeleting(true);
    try {
      const response = await fetch(`${FIGURE_ALIASES_ENDPOINT}/${aliasToDelete.id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, "Error deleting figure alias."));
        return;
      }
      await fetchData(false);
      setAliasToDelete(null);
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Figure Aliases" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Manage alternate names used to match figures across marketplace sources." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", className: "gap-2 md:self-center", onClick: openCreateDialog, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          "New Figure Alias"
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
              placeholder: "Search aliases",
              className: "pl-9"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          filteredAliases.length,
          " shown - ",
          pageMeta.totalElements,
          " total records"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { active: mutating, message: "Updating aliases...", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        FigureAliasTable,
        {
          aliases: filteredAliases,
          loading,
          figureNames,
          sourceNames,
          onEdit: openEditDialog,
          onDelete: setAliasToDelete
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
      FigureAliasFormDialog,
      {
        figureAlias: selectedAlias,
        figures,
        sources,
        open: dialogOpen,
        saving,
        loadingOptions: loadingOptions || loadingReferenceData,
        loadMethods: referenceData.loadMethods.length > 0 ? referenceData.loadMethods : fallbackLoadMethods,
        onOpenChange: setDialogOpen,
        onSubmit: handleSubmit
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: Boolean(aliasToDelete),
        onOpenChange: (open) => {
          if (!open) setAliasToDelete(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete figure alias?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              'This action will delete "',
              (aliasToDelete == null ? void 0 : aliasToDelete.alias) || "this alias",
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
  FigureAliasPage as default
};
