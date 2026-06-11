import { r as reactExports, j as jsxRuntimeExports } from "./react-vendor-Bhf2bzcN.js";
import { I as Input, B as Button, N as Navbar } from "./Navbar-_ItMA5Sh.js";
import { L as LoadingOverlay, T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, A as ApiErrorToast, P as PageControls, f as AlertDialog, g as AlertDialogContent, h as AlertDialogHeader, i as AlertDialogTitle, j as AlertDialogDescription, k as AlertDialogFooter, l as AlertDialogCancel, m as AlertDialogAction, r as readApiErrorResponse, t as toClientApiError } from "./apiError-CWp63LAl.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-DJdRbjCm.js";
import { c as cn } from "./index-DE6HQk3y.js";
import { F as FigureCombobox } from "./FigureCombobox-BptXteHq.js";
import { S as SubTrigger2, c as SubContent2, d as Portal2, e as Content2, I as Item2, f as CheckboxItem2, g as ItemIndicator2, h as RadioItem2, L as Label2, i as Separator2, j as Root2, k as Trigger } from "./radix-vendor-KSOk4oW_.js";
import { C as ChevronRight, c as Check, d as Circle, E as Ellipsis, a as Plus, b as Search } from "./icons-vendor-DLHCyI7j.js";
import { u as useReferenceData } from "./useReferenceData-m6mpmIsJ.js";
import { d as defaultPageMeta, b as withPagination, w as withPageSize, g as getPageContent, a as getPageMeta } from "./page-DKdY7PVC.js";
import "./vendor-COs6rlZq.js";
import "./query-vendor-CRnINZg8.js";
import "./popover-0w1iJOQw.js";
const Textarea = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";
const getCurrentDateTimeValue = () => {
  const now = /* @__PURE__ */ new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 6e4);
  return localDate.toISOString().slice(0, 16);
};
const toDateTimeInputValue = (value) => value ? value.slice(0, 16) : "";
const CandidateReviewFormDialog = ({
  candidate,
  figures,
  sources,
  currencyCodes,
  candidateStatuses,
  listingStatuses,
  matchDecisions,
  open,
  saving,
  loadingOptions,
  onOpenChange,
  onSubmit
}) => {
  const isReviewMode = Boolean(candidate);
  const [form, setForm] = reactExports.useState({
    figureId: "",
    sourceId: "",
    sourceCode: "",
    sourceItemId: "",
    sourceTitle: "",
    sourceUrl: "",
    price: "",
    currencyCode: "",
    rawPriceText: "",
    availability: "",
    rawAvailabilityText: "",
    imageUrl: "",
    productCode: "",
    janCode: "",
    matchScore: "",
    matchDecision: "REVIEW",
    status: "PENDING_REVIEW",
    listingStatus: "",
    isAvailable: "",
    scoreBreakdownJson: "",
    reasonsJson: "",
    reviewNotes: "",
    capturedAt: getCurrentDateTimeValue(),
    reviewedAt: ""
  });
  reactExports.useEffect(() => {
    var _a, _b, _c, _d;
    if (!open) return;
    setForm({
      figureId: ((_a = candidate == null ? void 0 : candidate.figureId) == null ? void 0 : _a.toString()) || "",
      sourceId: ((_b = candidate == null ? void 0 : candidate.sourceId) == null ? void 0 : _b.toString()) || "",
      sourceCode: (candidate == null ? void 0 : candidate.sourceCode) || "",
      sourceItemId: (candidate == null ? void 0 : candidate.sourceItemId) || "",
      sourceTitle: (candidate == null ? void 0 : candidate.sourceTitle) || "",
      sourceUrl: (candidate == null ? void 0 : candidate.sourceUrl) || "",
      price: ((_c = candidate == null ? void 0 : candidate.price) == null ? void 0 : _c.toString()) || "",
      currencyCode: (candidate == null ? void 0 : candidate.currencyCode) || "",
      rawPriceText: (candidate == null ? void 0 : candidate.rawPriceText) || "",
      availability: (candidate == null ? void 0 : candidate.availability) || "",
      rawAvailabilityText: (candidate == null ? void 0 : candidate.rawAvailabilityText) || "",
      imageUrl: (candidate == null ? void 0 : candidate.imageUrl) || "",
      productCode: (candidate == null ? void 0 : candidate.productCode) || "",
      janCode: (candidate == null ? void 0 : candidate.janCode) || "",
      matchScore: ((_d = candidate == null ? void 0 : candidate.matchScore) == null ? void 0 : _d.toString()) || "",
      matchDecision: (candidate == null ? void 0 : candidate.matchDecision) || "REVIEW",
      status: (candidate == null ? void 0 : candidate.status) || "PENDING_REVIEW",
      listingStatus: (candidate == null ? void 0 : candidate.listingStatus) || "",
      isAvailable: (candidate == null ? void 0 : candidate.isAvailable) === void 0 || (candidate == null ? void 0 : candidate.isAvailable) === null ? "" : candidate.isAvailable.toString(),
      scoreBreakdownJson: (candidate == null ? void 0 : candidate.scoreBreakdownJson) || "",
      reasonsJson: (candidate == null ? void 0 : candidate.reasonsJson) || "",
      reviewNotes: (candidate == null ? void 0 : candidate.reviewNotes) || "",
      capturedAt: toDateTimeInputValue(candidate == null ? void 0 : candidate.capturedAt) || getCurrentDateTimeValue(),
      reviewedAt: toDateTimeInputValue(candidate == null ? void 0 : candidate.reviewedAt)
    });
  }, [candidate, open]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      figureId: Number(form.figureId),
      sourceId: Number(form.sourceId),
      sourceCode: form.sourceCode.trim(),
      sourceTitle: form.sourceTitle.trim(),
      capturedAt: form.capturedAt
    };
    if (form.sourceItemId.trim()) payload.sourceItemId = form.sourceItemId.trim();
    if (form.sourceUrl.trim()) payload.sourceUrl = form.sourceUrl.trim();
    if (form.price) payload.price = Number(form.price);
    if (form.currencyCode) payload.currencyCode = form.currencyCode;
    if (form.rawPriceText.trim()) payload.rawPriceText = form.rawPriceText.trim();
    if (form.availability.trim()) payload.availability = form.availability.trim();
    if (form.rawAvailabilityText.trim()) payload.rawAvailabilityText = form.rawAvailabilityText.trim();
    if (form.imageUrl.trim()) payload.imageUrl = form.imageUrl.trim();
    if (form.productCode.trim()) payload.productCode = form.productCode.trim();
    if (form.janCode.trim()) payload.janCode = form.janCode.trim();
    if (form.matchScore) payload.matchScore = Number(form.matchScore);
    if (form.matchDecision) payload.matchDecision = form.matchDecision;
    if (form.status) payload.status = form.status;
    if (form.listingStatus) payload.listingStatus = form.listingStatus;
    if (form.isAvailable) payload.isAvailable = form.isAvailable === "true";
    if (form.scoreBreakdownJson.trim()) payload.scoreBreakdownJson = form.scoreBreakdownJson.trim();
    if (form.reasonsJson.trim()) payload.reasonsJson = form.reasonsJson.trim();
    if (form.reviewNotes.trim()) payload.reviewNotes = form.reviewNotes.trim();
    if (candidate) payload.reviewedAt = getCurrentDateTimeValue();
    await onSubmit(payload);
  };
  const selectClass = "w-full rounded border border-input bg-background p-2 text-foreground";
  const optionClass = "bg-background text-foreground";
  const helperClass = "mt-1 text-xs text-muted-foreground";
  const labelClass = "mb-1 block text-sm font-medium text-foreground";
  const requiredMark = /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] max-w-5xl overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { active: saving, label: "Saving candidate..." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: candidate ? "View Candidate" : "New Candidate" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: candidate ? "Inspect scraped data and register review notes before approving or rejecting it." : "Create a scraped listing candidate manually when needed." })
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
              disabled: isReviewMode || loadingOptions || figures.length === 0,
              loading: loadingOptions,
              onChange: (value) => setForm((prev) => ({ ...prev, figureId: value }))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "figureId", value: form.figureId, required: true, className: "sr-only", onChange: () => void 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Figura para la que se encontro este candidato." })
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
              disabled: isReviewMode || loadingOptions || sources.length === 0,
              required: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "", children: loadingOptions ? "Loading sources..." : "Select a source" }),
                sources.map((source) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: source.id, children: source.name }, source.id))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Fuente donde se encontro el resultado scrapeado." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
            "Source Code ",
            requiredMark
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "sourceCode", maxLength: 80, value: form.sourceCode, onChange: handleChange, disabled: isReviewMode, required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Codigo tecnico de la fuente usada por scraping." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Source Item ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "sourceItemId", maxLength: 255, value: form.sourceItemId, onChange: handleChange, disabled: isReviewMode }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Identificador externo del item, si existe." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
            "Source Title ",
            requiredMark
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "sourceTitle", maxLength: 500, value: form.sourceTitle, onChange: handleChange, disabled: isReviewMode, required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Titulo detectado en la pagina origen." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Source URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "sourceUrl", type: "url", value: form.sourceUrl, onChange: handleChange, disabled: isReviewMode }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "URL directa del candidato scrapeado." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "price", type: "number", min: "0", step: "0.01", value: form.price, onChange: handleChange, disabled: isReviewMode }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Precio detectado como numero." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Currency" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { name: "currencyCode", value: form.currencyCode, onChange: handleChange, className: selectClass, disabled: isReviewMode, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "", children: "Not set" }),
            currencyCodes.map((currency) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { className: optionClass, value: currency.value, children: [
              currency.label,
              currency.symbol ? ` (${currency.symbol})` : ""
            ] }, currency.value))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Moneda del precio detectado." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Raw Price Text" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "rawPriceText", value: form.rawPriceText, onChange: handleChange, disabled: isReviewMode }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Texto de precio tal como vino de la fuente." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Availability" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "availability", value: form.availability, onChange: handleChange, disabled: isReviewMode }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Disponibilidad interpretada por scraping." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Raw Availability Text" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "rawAvailabilityText", value: form.rawAvailabilityText, onChange: handleChange, disabled: isReviewMode }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Texto bruto de disponibilidad de la fuente." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Image URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "imageUrl", type: "url", value: form.imageUrl, onChange: handleChange, disabled: isReviewMode }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Imagen del producto detectada." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Product Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "productCode", value: form.productCode, onChange: handleChange, disabled: isReviewMode }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Codigo de producto encontrado." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "JAN Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "janCode", value: form.janCode, onChange: handleChange, disabled: isReviewMode }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Codigo JAN si la fuente lo publica." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Match Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "matchScore", type: "number", min: "0", step: "0.01", value: form.matchScore, onChange: handleChange, disabled: isReviewMode }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Puntaje de coincidencia calculado." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Match Decision" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { name: "matchDecision", value: form.matchDecision, onChange: handleChange, className: selectClass, disabled: isReviewMode, children: matchDecisions.map((decision) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: decision.value, children: decision.label }, decision.value)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Decision del proceso de matching." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Candidate Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { name: "status", value: form.status, onChange: handleChange, className: selectClass, disabled: isReviewMode, children: candidateStatuses.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: status.value, children: status.label }, status.value)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Estado de revision del candidato." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Listing Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { name: "listingStatus", value: form.listingStatus, onChange: handleChange, className: selectClass, disabled: isReviewMode, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "", children: "Not set" }),
            listingStatuses.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: status.value, children: status.label }, status.value))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Estado que tendria como listing final." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Available" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { name: "isAvailable", value: form.isAvailable, onChange: handleChange, className: selectClass, disabled: isReviewMode, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "", children: "Unknown" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "true", children: "Yes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "false", children: "No" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Disponibilidad final sugerida." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Captured At" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "capturedAt", type: "datetime-local", value: form.capturedAt, onChange: handleChange, disabled: isReviewMode }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Momento en que se capturo el candidato." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Reviewed At" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "reviewedAt", type: "datetime-local", value: form.reviewedAt, onChange: handleChange, disabled: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Momento de revision manual, si ya ocurrio." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Review Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { name: "reviewNotes", value: form.reviewNotes, onChange: handleChange }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Notas internas sobre la decision tomada." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Score Breakdown JSON" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { name: "scoreBreakdownJson", value: form.scoreBreakdownJson, onChange: handleChange, disabled: isReviewMode }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Detalle JSON del puntaje, si aplica." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Reasons JSON" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { name: "reasonsJson", value: form.reasonsJson, onChange: handleChange, disabled: isReviewMode }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Razones JSON del matching, si aplica." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: saving, children: saving ? "Saving..." : candidate ? "Save Review" : "Create" })
      ] })
    ] })
  ] }) });
};
const DropdownMenu = Root2;
const DropdownMenuTrigger = Trigger;
const DropdownMenuSubTrigger = reactExports.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SubTrigger2,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent focus:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
const DropdownMenuSubContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SubContent2,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = SubContent2.displayName;
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = Content2.displayName;
const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = Item2.displayName;
const DropdownMenuCheckboxItem = reactExports.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  CheckboxItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
const DropdownMenuRadioItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  RadioItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
const DropdownMenuLabel = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label2,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = Label2.displayName;
const DropdownMenuSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Separator2, { ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props }));
DropdownMenuSeparator.displayName = Separator2.displayName;
const CandidateReviewTable = ({
  candidates,
  loading,
  onView,
  onApprove,
  onReject,
  onDelete
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-20", children: "ID" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Figure" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Source" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Title" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Price" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Score" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-24 text-right", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 8, className: "h-28 text-center text-muted-foreground", children: "Loading candidates..." }) }) : candidates.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 8, className: "h-28 text-center text-muted-foreground", children: "No candidates found." }) }) : candidates.map((candidate) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: candidate.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "min-w-56", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: candidate.figureName || candidate.figureId || "-" }),
        candidate.figureSlug && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: candidate.figureSlug })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: candidate.sourceName || candidate.sourceId || "-" }),
        candidate.sourceCode && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: candidate.sourceCode })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate", children: candidate.sourceTitle || "-" }),
        candidate.sourceUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: candidate.sourceUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-xs text-primary hover:underline",
            children: "Open source URL"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: candidate.price ? `${candidate.price} ${candidate.currencyCode || ""}` : "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: candidate.matchScore ?? "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: candidate.status || "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { onClick: () => onView(candidate), children: "View" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { onClick: () => onApprove(candidate), children: "Approve" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { onClick: () => onReject(candidate), children: "Reject" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DropdownMenuItem,
            {
              className: "text-destructive focus:text-destructive",
              onClick: () => onDelete(candidate),
              children: "Delete"
            }
          )
        ] })
      ] }) })
    ] }, candidate.id)) })
  ] }) }) });
};
const API_BASE_URL = "https://figure-market-core.onrender.com/api";
const CANDIDATES_ENDPOINT = `${API_BASE_URL}/v1/scraping/candidates`;
const FIGURES_ENDPOINT = `${API_BASE_URL}/v1/figures`;
const SOURCES_ENDPOINT = `${API_BASE_URL}/v1/sources`;
const fallbackCurrencyCodes = [
  { value: "USD", label: "Usd", symbol: "$" },
  { value: "JPY", label: "Jpy", symbol: "JPY" }
];
const fallbackCandidateStatuses = [
  { value: "PENDING_REVIEW", label: "Pending Review" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" }
];
const fallbackListingStatuses = [
  { value: "ACTIVE", label: "Active" },
  { value: "SOLD_OUT", label: "Sold Out" },
  { value: "ARCHIVED", label: "Archived" },
  { value: "UNKNOWN", label: "Unknown" }
];
const fallbackMatchDecisions = [
  { value: "REVIEW", label: "Review" },
  { value: "MATCH", label: "Match" },
  { value: "DISCARD", label: "Discard" }
];
const CandidateReviewPage = () => {
  const [candidates, setCandidates] = reactExports.useState([]);
  const [figures, setFigures] = reactExports.useState([]);
  const [sources, setSources] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [loadingOptions, setLoadingOptions] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [deleting, setDeleting] = reactExports.useState(false);
  const [statusChanging, setStatusChanging] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(0);
  const [pageSize, setPageSize] = reactExports.useState(20);
  const [pageMeta, setPageMeta] = reactExports.useState(defaultPageMeta);
  const [apiError, setApiError] = reactExports.useState(null);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [selectedCandidate, setSelectedCandidate] = reactExports.useState(null);
  const [candidateToDelete, setCandidateToDelete] = reactExports.useState(null);
  const [candidateToApprove, setCandidateToApprove] = reactExports.useState(null);
  const [candidateToReject, setCandidateToReject] = reactExports.useState(null);
  const { referenceData, loadingReferenceData } = useReferenceData();
  const mutating = saving || deleting || statusChanging;
  const fetchData = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
      setLoadingOptions(true);
    }
    try {
      const [candidatesResponse, figuresResponse, sourcesResponse] = await Promise.all([
        fetch(withPagination(CANDIDATES_ENDPOINT, page, pageSize)),
        fetch(withPageSize(FIGURES_ENDPOINT)),
        fetch(withPageSize(SOURCES_ENDPOINT))
      ]);
      if (candidatesResponse.ok) {
        const data = await candidatesResponse.json();
        setCandidates(getPageContent(data));
        setPageMeta(getPageMeta(data, pageSize));
      } else {
        console.error("Error fetching scraped listing candidates");
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
      console.error("Request error fetching candidates:", error);
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
  const filteredCandidates = reactExports.useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return candidates;
    return candidates.filter(
      (candidate) => {
        var _a;
        return [
          (_a = candidate.id) == null ? void 0 : _a.toString(),
          candidate.figureName,
          candidate.figureSlug,
          candidate.sourceName,
          candidate.sourceCode,
          candidate.sourceItemId,
          candidate.sourceTitle,
          candidate.sourceUrl,
          candidate.status,
          candidate.matchDecision,
          candidate.listingStatus,
          candidate.productCode,
          candidate.janCode
        ].filter(Boolean).some((value) => value == null ? void 0 : value.toLowerCase().includes(query));
      }
    );
  }, [candidates, search]);
  const openCreateDialog = () => {
    setSelectedCandidate(null);
    setDialogOpen(true);
  };
  const openViewDialog = (candidate) => {
    setSelectedCandidate(candidate);
    setDialogOpen(true);
  };
  const handleSubmit = async (payload) => {
    setSaving(true);
    const isEditing = Boolean(selectedCandidate == null ? void 0 : selectedCandidate.id);
    const endpoint = isEditing ? `${CANDIDATES_ENDPOINT}/${selectedCandidate == null ? void 0 : selectedCandidate.id}` : CANDIDATES_ENDPOINT;
    try {
      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, "Error saving candidate."));
        return;
      }
      await fetchData(false);
      setDialogOpen(false);
      setSelectedCandidate(null);
    } catch (error) {
      console.error("Request error:", error);
      setApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async () => {
    if (!(candidateToDelete == null ? void 0 : candidateToDelete.id)) return;
    setDeleting(true);
    try {
      const response = await fetch(`${CANDIDATES_ENDPOINT}/${candidateToDelete.id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, "Error deleting candidate."));
        return;
      }
      await fetchData(false);
      setCandidateToDelete(null);
    } catch (error) {
      console.error("Request error:", error);
      setApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setDeleting(false);
    }
  };
  const updateCandidateDecision = async (candidate, action) => {
    if (!(candidate == null ? void 0 : candidate.id)) return;
    setStatusChanging(true);
    try {
      const response = await fetch(`${CANDIDATES_ENDPOINT}/${candidate.id}/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewNotes: candidate.reviewNotes || "" })
      });
      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, `Error trying to ${action} candidate.`));
        return;
      }
      await fetchData(false);
      setCandidateToApprove(null);
      setCandidateToReject(null);
    } catch (error) {
      console.error("Request error:", error);
      setApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setStatusChanging(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ApiErrorToast, { error: apiError, onClose: () => setApiError(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Candidate Review" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Review scraped candidates before approving them as figure source listings." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", className: "gap-2 md:self-center", onClick: openCreateDialog, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          "New Candidate"
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
              placeholder: "Search candidates",
              className: "pl-9"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          filteredCandidates.length,
          " shown - ",
          pageMeta.totalElements,
          " total records"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { active: mutating, message: "Updating candidates...", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CandidateReviewTable,
        {
          candidates: filteredCandidates,
          loading,
          onView: openViewDialog,
          onApprove: setCandidateToApprove,
          onReject: setCandidateToReject,
          onDelete: setCandidateToDelete
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
      CandidateReviewFormDialog,
      {
        candidate: selectedCandidate,
        figures,
        sources,
        open: dialogOpen,
        saving,
        loadingOptions: loadingOptions || loadingReferenceData,
        currencyCodes: referenceData.currencyCodes.length > 0 ? referenceData.currencyCodes : fallbackCurrencyCodes,
        candidateStatuses: referenceData.scrapedListingCandidateStatuses.length > 0 ? referenceData.scrapedListingCandidateStatuses : fallbackCandidateStatuses,
        listingStatuses: referenceData.figureSourceListingStatuses.length > 0 ? referenceData.figureSourceListingStatuses : fallbackListingStatuses,
        matchDecisions: referenceData.matchDecisions.length > 0 ? referenceData.matchDecisions : fallbackMatchDecisions,
        onOpenChange: setDialogOpen,
        onSubmit: handleSubmit
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: Boolean(candidateToDelete),
        onOpenChange: (open) => {
          if (!open) setCandidateToDelete(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete candidate?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              'This action will delete "',
              (candidateToDelete == null ? void 0 : candidateToDelete.sourceTitle) || "this candidate",
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
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: Boolean(candidateToApprove),
        onOpenChange: (open) => {
          if (!open) setCandidateToApprove(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Approve candidate?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              'This will approve "',
              (candidateToApprove == null ? void 0 : candidateToApprove.sourceTitle) || "this candidate",
              '" and create or update the related figure source listing.'
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: statusChanging, children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                disabled: statusChanging,
                onClick: () => updateCandidateDecision(candidateToApprove, "approve"),
                children: statusChanging ? "Approving..." : "Approve"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: Boolean(candidateToReject),
        onOpenChange: (open) => {
          if (!open) setCandidateToReject(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Reject candidate?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              'This will mark "',
              (candidateToReject == null ? void 0 : candidateToReject.sourceTitle) || "this candidate",
              '" as rejected.'
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: statusChanging, children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                disabled: statusChanging,
                onClick: () => updateCandidateDecision(candidateToReject, "reject"),
                children: statusChanging ? "Rejecting..." : "Reject"
              }
            )
          ] })
        ] })
      }
    )
  ] });
};
export {
  CandidateReviewPage as default
};
