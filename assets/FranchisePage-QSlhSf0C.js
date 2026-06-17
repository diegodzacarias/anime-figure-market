import { r as reactExports, j as jsxRuntimeExports } from "./index-DgSoNkx-.js";
import { I as Input, B as Button, N as Navbar } from "./Navbar-Bn5NoM40.js";
import { P as Plus, A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-hG9nbazE.js";
import { A as ApiErrorToast, r as readApiErrorResponse, t as toClientApiError } from "./apiError-s-ZUEyF3.js";
import { L as LoadingOverlay, T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, S as Search, P as PageControls } from "./table-C2_OchEm.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-Dp0II0Xv.js";
import { P as Pencil, T as Trash2 } from "./trash-2-_of38kj8.js";
import { d as defaultPageMeta, w as withPagination, g as getPageContent, a as getPageMeta } from "./page-DEGBjxB5.js";
const emptyForm = {
  name: "",
  slug: "",
  imageUrl: ""
};
const FranchiseFormDialog = ({
  franchise,
  open,
  saving,
  onOpenChange,
  onSubmit
}) => {
  const [form, setForm] = reactExports.useState(emptyForm);
  reactExports.useEffect(() => {
    if (!open) return;
    setForm({
      name: (franchise == null ? void 0 : franchise.name) || "",
      slug: (franchise == null ? void 0 : franchise.slug) || "",
      imageUrl: (franchise == null ? void 0 : franchise.imageUrl) || ""
    });
  }, [franchise, open]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({
      name: form.name.trim(),
      slug: form.slug.trim(),
      imageUrl: form.imageUrl.trim()
    });
  };
  const helperClass = "mt-1 text-xs text-muted-foreground";
  const labelClass = "mb-1 block text-sm font-medium text-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { active: saving, label: "Saving franchise..." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: franchise ? "Update Franchise" : "New Franchise" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Manage the basic data used to identify and display a franchise." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "grid gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              name: "name",
              placeholder: "Name",
              value: form.name,
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Nombre visible de la franquicia." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Slug" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              name: "slug",
              placeholder: "Slug",
              value: form.slug,
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Identificador para URL, en minusculas y con guiones." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Image URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              name: "imageUrl",
              type: "url",
              placeholder: "https://example.com/image.jpg",
              value: form.imageUrl,
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Imagen principal usada para representar la franquicia." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: saving, children: saving ? "Saving..." : franchise ? "Update" : "Create" })
      ] })
    ] })
  ] }) });
};
const FranchiseTable = ({
  franchises,
  loading,
  onEdit,
  onDelete
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-24", children: "ID" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Slug" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Image URL" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-48 text-right", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 5, className: "h-28 text-center text-muted-foreground", children: "Loading franchises..." }) }) : franchises.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 5, className: "h-28 text-center text-muted-foreground", children: "No franchises found." }) }) : franchises.map((franchise) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: franchise.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: franchise.name || "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: franchise.slug || "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-xs truncate", children: franchise.imageUrl || "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "gap-2",
            onClick: () => onEdit(franchise),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
              "Actualizar"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            className: "gap-2",
            onClick: () => onDelete(franchise),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
              "Eliminar"
            ]
          }
        )
      ] }) })
    ] }, franchise.id)) })
  ] }) });
};
const API_BASE_URL = "https://figure-market-core.onrender.com/api";
const FRANCHISES_ENDPOINT = `${API_BASE_URL}/v1/franchises`;
const FranchisePage = () => {
  const [franchises, setFranchises] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [deleting, setDeleting] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(0);
  const [pageSize, setPageSize] = reactExports.useState(20);
  const [pageMeta, setPageMeta] = reactExports.useState(defaultPageMeta);
  const [apiError, setApiError] = reactExports.useState(null);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [selectedFranchise, setSelectedFranchise] = reactExports.useState(null);
  const [franchiseToDelete, setFranchiseToDelete] = reactExports.useState(null);
  const mutating = saving || deleting;
  const fetchFranchises = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const response = await fetch(withPagination(FRANCHISES_ENDPOINT, page, pageSize));
      if (!response.ok) {
        console.error("Error fetching franchises");
        return;
      }
      const data = await response.json();
      setFranchises(getPageContent(data));
      setPageMeta(getPageMeta(data, pageSize));
    } catch (error) {
      console.error("Request error fetching franchises:", error);
    } finally {
      if (showLoading) setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    fetchFranchises();
  }, [page, pageSize]);
  reactExports.useEffect(() => {
    setPage(0);
  }, [search]);
  const filteredFranchises = reactExports.useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return franchises;
    return franchises.filter(
      (franchise) => {
        var _a;
        return [(_a = franchise.id) == null ? void 0 : _a.toString(), franchise.name, franchise.slug, franchise.imageUrl].filter(Boolean).some((value) => value == null ? void 0 : value.toLowerCase().includes(query));
      }
    );
  }, [franchises, search]);
  const openCreateDialog = () => {
    setSelectedFranchise(null);
    setDialogOpen(true);
  };
  const openEditDialog = (franchise) => {
    setSelectedFranchise(franchise);
    setDialogOpen(true);
  };
  const handleSubmit = async (payload) => {
    setSaving(true);
    const isEditing = Boolean(selectedFranchise == null ? void 0 : selectedFranchise.id);
    const endpoint = isEditing ? `${FRANCHISES_ENDPOINT}/${selectedFranchise == null ? void 0 : selectedFranchise.id}` : FRANCHISES_ENDPOINT;
    try {
      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, "Error saving franchise."));
        return;
      }
      await fetchFranchises(false);
      setDialogOpen(false);
      setSelectedFranchise(null);
    } catch (error) {
      console.error("Request error:", error);
      setApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async () => {
    if (!(franchiseToDelete == null ? void 0 : franchiseToDelete.id)) return;
    setDeleting(true);
    try {
      const response = await fetch(`${FRANCHISES_ENDPOINT}/${franchiseToDelete.id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, "Error deleting franchise."));
        return;
      }
      await fetchFranchises(false);
      setFranchiseToDelete(null);
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Franchises" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Manage franchise records used by figures and marketplace views." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", className: "gap-2 md:self-center", onClick: openCreateDialog, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          "New Franchise"
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
              placeholder: "Search by id, name, slug or image URL",
              className: "pl-9"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          filteredFranchises.length,
          " shown - ",
          pageMeta.totalElements,
          " total records"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { active: mutating, message: "Updating franchises...", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        FranchiseTable,
        {
          franchises: filteredFranchises,
          loading,
          onEdit: openEditDialog,
          onDelete: setFranchiseToDelete
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
      FranchiseFormDialog,
      {
        franchise: selectedFranchise,
        open: dialogOpen,
        saving,
        onOpenChange: setDialogOpen,
        onSubmit: handleSubmit
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: Boolean(franchiseToDelete),
        onOpenChange: (open) => {
          if (!open) setFranchiseToDelete(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete franchise?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              'This action will delete "',
              (franchiseToDelete == null ? void 0 : franchiseToDelete.name) || "this franchise",
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
  FranchisePage as default
};
