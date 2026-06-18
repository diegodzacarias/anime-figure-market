import { r as reactExports, j as jsxRuntimeExports } from "./index-CPEOJgG6.js";
import { I as Input, B as Button, N as Navbar } from "./Navbar-9fNHvRrU.js";
import { P as Plus, A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-D2ppruEr.js";
import { A as ApiErrorToast, r as readApiErrorResponse, t as toClientApiError } from "./apiError-Cq2EJZkP.js";
import { L as LoadingOverlay, T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, S as Search, P as PageControls } from "./table-FQ2urzbL.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-B5SQY8hX.js";
import { P as Pencil, T as Trash2 } from "./trash-2-DAgtuF4Y.js";
import { u as useReferenceData } from "./useReferenceData-DJ-euHkA.js";
import { d as defaultPageMeta, b as withPagination, g as getPageContent, a as getPageMeta } from "./page-DKdY7PVC.js";
const SourceFormDialog = ({
  source,
  sourceTypes,
  sourcePriorities,
  open,
  saving,
  onOpenChange,
  onSubmit
}) => {
  const [form, setForm] = reactExports.useState({
    name: "",
    baseUrl: "",
    type: "OFFICIAL",
    priority: "MEDIUM",
    active: "true"
  });
  reactExports.useEffect(() => {
    if (!open) return;
    setForm({
      name: (source == null ? void 0 : source.name) || "",
      baseUrl: (source == null ? void 0 : source.baseUrl) || "",
      type: (source == null ? void 0 : source.type) || "OFFICIAL",
      priority: (source == null ? void 0 : source.priority) || "MEDIUM",
      active: ((source == null ? void 0 : source.active) ?? true).toString()
    });
  }, [open, source]);
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
      name: form.name.trim(),
      type: form.type,
      active: form.active === "true",
      priority: form.priority
    };
    if (form.baseUrl.trim()) payload.baseUrl = form.baseUrl.trim();
    await onSubmit(payload);
  };
  const selectClass = "w-full border border-input bg-background text-foreground p-2 rounded";
  const optionClass = "bg-background text-foreground";
  const helperClass = "mt-1 text-xs text-muted-foreground";
  const labelClass = "mb-1 block text-sm font-medium text-foreground";
  const requiredMark = /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { active: saving, label: "Saving source..." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: source ? "Update Source" : "New Source" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Manage marketplace source metadata used by aliases and listings." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "grid gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
            "Name ",
            requiredMark
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "name", maxLength: 100, value: form.name, onChange: handleChange, required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Nombre visible de la fuente." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Base URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              name: "baseUrl",
              type: "url",
              maxLength: 200,
              value: form.baseUrl,
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "URL principal de la tienda o marketplace." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
            "Type ",
            requiredMark
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              name: "type",
              value: form.type,
              onChange: handleChange,
              className: selectClass,
              required: true,
              children: sourceTypes.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: type.value, children: type.label }, type.value))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Tipo o categoria de fuente, si aplica." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
            "Priority ",
            requiredMark
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              name: "priority",
              value: form.priority,
              onChange: handleChange,
              className: selectClass,
              required: true,
              children: sourcePriorities.map((priority) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { className: optionClass, value: priority.value, children: [
                priority.label,
                priority.level ? ` (${priority.level})` : ""
              ] }, priority.value))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Orden de prioridad para procesos internos." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
            "Active ",
            requiredMark
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              name: "active",
              value: form.active,
              onChange: handleChange,
              className: selectClass,
              required: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "true", children: "Yes" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "false", children: "No" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Indica si la fuente esta habilitada." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: saving, children: saving ? "Saving..." : source ? "Update" : "Create" })
      ] })
    ] })
  ] }) });
};
const SourceTable = ({ sources, loading, onEdit, onDelete }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-20", children: "ID" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Base URL" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Priority" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Active" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-48 text-right", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 7, className: "h-28 text-center text-muted-foreground", children: "Loading sources..." }) }) : sources.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 7, className: "h-28 text-center text-muted-foreground", children: "No sources found." }) }) : sources.map((source) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: source.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: source.name || "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-xs truncate", children: source.baseUrl || "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: source.type || "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: source.priority ?? "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: source.active ? "Yes" : "No" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", className: "gap-2", onClick: () => onEdit(source), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
          "Actualizar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "destructive", size: "sm", className: "gap-2", onClick: () => onDelete(source), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
          "Eliminar"
        ] })
      ] }) })
    ] }, source.id)) })
  ] }) });
};
const API_BASE_URL = "https://figure-market-core.onrender.com/api";
const SOURCES_ENDPOINT = `${API_BASE_URL}/v1/sources`;
const fallbackSourceTypes = [
  { value: "OFFICIAL", label: "Official" },
  { value: "RETAILER", label: "Retailer" },
  { value: "MARKETPLACE", label: "Marketplace" }
];
const fallbackSourcePriorities = [
  { value: "OFFICIAL", label: "Official", level: 100 },
  { value: "HIGH", label: "High", level: 80 },
  { value: "MEDIUM", label: "Medium", level: 50 },
  { value: "LOW", label: "Low", level: 30 },
  { value: "UNRELIABLE", label: "Unreliable", level: 10 }
];
const SourcePage = () => {
  const [sources, setSources] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [deleting, setDeleting] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(0);
  const [pageSize, setPageSize] = reactExports.useState(20);
  const [pageMeta, setPageMeta] = reactExports.useState(defaultPageMeta);
  const [apiError, setApiError] = reactExports.useState(null);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [selectedSource, setSelectedSource] = reactExports.useState(null);
  const [sourceToDelete, setSourceToDelete] = reactExports.useState(null);
  const mutating = saving || deleting;
  const { referenceData } = useReferenceData();
  const fetchSources = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const response = await fetch(withPagination(SOURCES_ENDPOINT, page, pageSize));
      if (!response.ok) {
        console.error("Error fetching sources");
        return;
      }
      const data = await response.json();
      setSources(getPageContent(data));
      setPageMeta(getPageMeta(data, pageSize));
    } catch (error) {
      console.error("Request error fetching sources:", error);
    } finally {
      if (showLoading) setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    fetchSources();
  }, [page, pageSize]);
  reactExports.useEffect(() => {
    setPage(0);
  }, [search]);
  const filteredSources = reactExports.useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return sources;
    return sources.filter(
      (source) => {
        var _a, _b;
        return [(_a = source.id) == null ? void 0 : _a.toString(), source.name, source.baseUrl, source.type, (_b = source.priority) == null ? void 0 : _b.toString()].filter(Boolean).some((value) => value == null ? void 0 : value.toLowerCase().includes(query));
      }
    );
  }, [search, sources]);
  const openCreateDialog = () => {
    setSelectedSource(null);
    setDialogOpen(true);
  };
  const openEditDialog = (source) => {
    setSelectedSource(source);
    setDialogOpen(true);
  };
  const handleSubmit = async (payload) => {
    setSaving(true);
    const isEditing = Boolean(selectedSource == null ? void 0 : selectedSource.id);
    const endpoint = isEditing ? `${SOURCES_ENDPOINT}/${selectedSource == null ? void 0 : selectedSource.id}` : SOURCES_ENDPOINT;
    try {
      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, "Error saving source."));
        return;
      }
      await fetchSources(false);
      setDialogOpen(false);
      setSelectedSource(null);
    } catch (error) {
      console.error("Request error:", error);
      setApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async () => {
    if (!(sourceToDelete == null ? void 0 : sourceToDelete.id)) return;
    setDeleting(true);
    try {
      const response = await fetch(`${SOURCES_ENDPOINT}/${sourceToDelete.id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, "Error deleting source."));
        return;
      }
      await fetchSources(false);
      setSourceToDelete(null);
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Sources" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Manage source records used by aliases and source listings." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", className: "gap-2 md:self-center", onClick: openCreateDialog, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          "New Source"
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
              placeholder: "Search sources",
              className: "pl-9"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          filteredSources.length,
          " shown - ",
          pageMeta.totalElements,
          " total records"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { active: mutating, message: "Updating sources...", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SourceTable,
        {
          sources: filteredSources,
          loading,
          onEdit: openEditDialog,
          onDelete: setSourceToDelete
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
      SourceFormDialog,
      {
        source: selectedSource,
        sourceTypes: referenceData.sourceTypes.length > 0 ? referenceData.sourceTypes : fallbackSourceTypes,
        sourcePriorities: referenceData.sourcePriorities.length > 0 ? referenceData.sourcePriorities : fallbackSourcePriorities,
        open: dialogOpen,
        saving,
        onOpenChange: setDialogOpen,
        onSubmit: handleSubmit
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: Boolean(sourceToDelete),
        onOpenChange: (open) => {
          if (!open) setSourceToDelete(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete source?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              'This action will delete "',
              (sourceToDelete == null ? void 0 : sourceToDelete.name) || "this source",
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
  SourcePage as default
};
