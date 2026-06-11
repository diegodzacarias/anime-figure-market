import { r as reactExports, j as jsxRuntimeExports } from "./react-vendor-Bhf2bzcN.js";
import { O as Overlay2, p as Content2, q as Title2, r as Description2, s as Action, t as Cancel, u as Root2, v as Portal2 } from "./radix-vendor-KSOk4oW_.js";
import { c as cn } from "./index-DE6HQk3y.js";
import { b as buttonVariants, B as Button } from "./Navbar-_ItMA5Sh.js";
import { X, L as LoaderCircle, f as ChevronLeft, C as ChevronRight } from "./icons-vendor-DLHCyI7j.js";
const AlertDialog = Root2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className), ...props });
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Title2, { ref, className: cn("text-lg font-semibold", className), ...props }));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Description2, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
const ApiErrorToast = ({ error, onClose }) => {
  if (!error) return null;
  const details = error.details ? Object.entries(error.details) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed right-4 top-20 z-[100] w-[calc(100vw-2rem)] max-w-lg rounded-lg border border-destructive/30 bg-background/90 p-4 text-foreground shadow-lg backdrop-blur md:right-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-destructive", children: error.status ? `${error.status} ${error.error || "Error"}` : error.error || "Error" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm", children: error.message })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", className: "h-8 w-8 shrink-0", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1 text-xs text-muted-foreground", children: [
      error.path && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Path: ",
        error.path
      ] }),
      error.requestId && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Request ID: ",
        error.requestId
      ] }),
      error.timestamp && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Timestamp: ",
        error.timestamp
      ] })
    ] }),
    details.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-md border border-destructive/20 bg-destructive/5 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-destructive", children: "Details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1 text-xs text-muted-foreground", children: details.map(([field, message]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
          field,
          ":"
        ] }),
        " ",
        message
      ] }, field)) })
    ] })
  ] });
};
const LoadingIndicator = ({ label }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-md border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-card", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" }),
  label
] }) });
const LoadingOverlay = ({
  active,
  label,
  message,
  className,
  children
}) => {
  const loadingLabel = label || message || "Loading...";
  if (children) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("relative", className), children: [
      children,
      active && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingIndicator, { label: loadingLabel })
    ] });
  }
  if (!active) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingIndicator, { label: loadingLabel }) });
};
const pageSizeOptions = [10, 20, 50, 100];
const PageControls = ({
  page,
  size,
  totalElements,
  totalPages,
  disabled = false,
  onPageChange,
  onSizeChange
}) => {
  const currentPage = totalPages > 0 ? page + 1 : 0;
  const canGoPrevious = page > 0 && !disabled;
  const canGoNext = page + 1 < totalPages && !disabled;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 rounded-lg border bg-card p-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      "Page ",
      currentPage,
      " of ",
      totalPages,
      " - ",
      totalElements,
      " records"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium text-muted-foreground", htmlFor: "page-size", children: "Rows" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          id: "page-size",
          value: size,
          disabled,
          onChange: (event) => onSizeChange(Number(event.target.value)),
          className: "rounded border border-input bg-background px-2 py-1 text-foreground",
          children: pageSizeOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option, children: option }, option))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-1",
          disabled: !canGoPrevious,
          onClick: () => onPageChange(page - 1),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
            "Previous"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-1",
          disabled: !canGoNext,
          onClick: () => onPageChange(page + 1),
          children: [
            "Next",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
          ]
        }
      )
    ] })
  ] });
};
const Table = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { ref, className: cn("w-full caption-bottom text-sm", className), ...props }) })
);
Table.displayName = "Table";
const TableHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props })
);
TableHeader.displayName = "TableHeader";
const TableBody = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props })
);
TableBody.displayName = "TableBody";
const TableFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { ref, className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className), ...props })
);
TableFooter.displayName = "TableFooter";
const TableRow = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      ref,
      className: cn("border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50", className),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
const TableHead = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      ref,
      className: cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      ),
      ...props
    }
  )
);
TableHead.displayName = "TableHead";
const TableCell = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { ref, className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className), ...props })
);
TableCell.displayName = "TableCell";
const TableCaption = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("caption", { ref, className: cn("mt-4 text-sm text-muted-foreground", className), ...props })
);
TableCaption.displayName = "TableCaption";
async function readApiErrorResponse(response, fallbackMessage) {
  const text = await response.text();
  if (text) {
    try {
      const data = JSON.parse(text);
      return {
        status: data.status ?? response.status,
        error: data.error ?? response.statusText,
        message: data.message ?? fallbackMessage,
        path: data.path,
        requestId: data.requestId,
        details: data.details,
        timestamp: data.timestamp
      };
    } catch {
      return {
        status: response.status,
        error: response.statusText,
        message: text
      };
    }
  }
  return {
    status: response.status,
    error: response.statusText,
    message: fallbackMessage
  };
}
function toClientApiError(error, fallbackMessage) {
  return {
    status: 0,
    error: "Client Error",
    message: error instanceof Error ? error.message : fallbackMessage
  };
}
export {
  ApiErrorToast as A,
  LoadingOverlay as L,
  PageControls as P,
  Table as T,
  TableHeader as a,
  TableRow as b,
  TableHead as c,
  TableBody as d,
  TableCell as e,
  AlertDialog as f,
  AlertDialogContent as g,
  AlertDialogHeader as h,
  AlertDialogTitle as i,
  AlertDialogDescription as j,
  AlertDialogFooter as k,
  AlertDialogCancel as l,
  AlertDialogAction as m,
  readApiErrorResponse as r,
  toClientApiError as t
};
