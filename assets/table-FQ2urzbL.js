import { c as createLucideIcon, j as jsxRuntimeExports, e as cn, r as reactExports } from "./index-CPEOJgG6.js";
import { L as LoaderCircle } from "./apiError-Cq2EJZkP.js";
import { B as Button } from "./Navbar-9fNHvRrU.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ChevronLeft = createLucideIcon("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ChevronRight = createLucideIcon("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Search = createLucideIcon("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
const LoadingIndicator = ({ label, className }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn(
      "absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm",
      className
    ),
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-md border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" }),
      label
    ] })
  }
);
const LoadingOverlay = ({
  active,
  label,
  message,
  className,
  fullscreen = false,
  children
}) => {
  const loadingLabel = label || message || "Loading...";
  if (fullscreen) {
    if (children) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        children,
        active && /* @__PURE__ */ jsxRuntimeExports.jsx(
          LoadingIndicator,
          {
            label: loadingLabel,
            className: "fixed z-[100] rounded-none bg-background/75"
          }
        )
      ] });
    }
    return active ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      LoadingIndicator,
      {
        label: loadingLabel,
        className: "fixed z-[100] rounded-none bg-background/75"
      }
    ) : null;
  }
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
export {
  ChevronRight as C,
  LoadingOverlay as L,
  PageControls as P,
  Search as S,
  Table as T,
  TableHeader as a,
  TableRow as b,
  TableHead as c,
  TableBody as d,
  TableCell as e
};
