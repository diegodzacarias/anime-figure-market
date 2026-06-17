import { c as createLucideIcon, j as jsxRuntimeExports, X } from "./index-BBtVfQu2.js";
import { B as Button } from "./Navbar-BMQL-z9P.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LoaderCircle = createLucideIcon("LoaderCircle", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]
]);
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
  LoaderCircle as L,
  readApiErrorResponse as r,
  toClientApiError as t
};
