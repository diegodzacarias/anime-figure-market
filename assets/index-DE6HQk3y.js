const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Index-BITFf6Rq.js","assets/react-vendor-Bhf2bzcN.js","assets/vendor-COs6rlZq.js","assets/Navbar-_ItMA5Sh.js","assets/radix-vendor-KSOk4oW_.js","assets/icons-vendor-DLHCyI7j.js","assets/page-DKdY7PVC.js","assets/query-vendor-CRnINZg8.js","assets/AnimeDetail-Bpgw58Sl.js","assets/NotFound-DxA-HsO5.js","assets/FigurePage-CkRTw0Av.js","assets/apiError-CWp63LAl.js","assets/useReferenceData-m6mpmIsJ.js","assets/FigureAliasPage-DjutAb7d.js","assets/dialog-DJdRbjCm.js","assets/FigureCombobox-BptXteHq.js","assets/popover-0w1iJOQw.js","assets/FigureSourceListingPage-CSnDOLWU.js","assets/FranchisePage-DQ_vP4QL.js","assets/SourcePage-D7UwVxut.js","assets/CandidateReviewPage-D0J50tBY.js","assets/CharacterAdminPages-DhuFFOOK.js"])))=>i.map(i=>d[i]);
import { j as jsxRuntimeExports, r as reactExports, B as BrowserRouter, d as createRoot } from "./react-vendor-Bhf2bzcN.js";
import { Q as QueryClient, a as QueryClientProvider } from "./query-vendor-CRnINZg8.js";
import { t as j, $ as $e, v as twMerge, w as clsx, x as cva, y as Routes, z as Route } from "./vendor-COs6rlZq.js";
import { V as Viewport, R as Root2, A as Action, C as Close, T as Title, D as Description, P as Provider, a as Content2, b as Provider$1 } from "./radix-vendor-KSOk4oW_.js";
import { X } from "./icons-vendor-DLHCyI7j.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/anime-figure-market/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const Toaster$1 = ({ ...props }) => {
  const { theme = "system" } = j();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    $e,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => t.id === action.toast.id ? { ...t, ...action.toast } : t)
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = reactExports.useState(memoryState);
  reactExports.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = Provider;
const ToastViewport = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = reactExports.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { ref, className: cn(toastVariants({ variant }), className), ...props });
});
Toast.displayName = Root2.displayName;
const ToastAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      className
    ),
    ...props
  }
));
ToastAction.displayName = Action.displayName;
const ToastClose = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = Close.displayName;
const ToastTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ref, className: cn("text-sm font-semibold", className), ...props }));
ToastTitle.displayName = Title.displayName;
const ToastDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ref, className: cn("text-sm opacity-90", className), ...props }));
ToastDescription.displayName = Description.displayName;
function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsxRuntimeExports.jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToastViewport, {})
  ] });
}
const TooltipProvider = Provider$1;
const TooltipContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = Content2.displayName;
const Index = reactExports.lazy(() => __vitePreload(() => import("./Index-BITFf6Rq.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7]) : void 0));
const AnimeDetail = reactExports.lazy(() => __vitePreload(() => import("./AnimeDetail-Bpgw58Sl.js"), true ? __vite__mapDeps([8,1,2,3,4,5,7]) : void 0));
const NotFound = reactExports.lazy(() => __vitePreload(() => import("./NotFound-DxA-HsO5.js"), true ? __vite__mapDeps([9,1,2]) : void 0));
const FigurePage = reactExports.lazy(() => __vitePreload(() => import("./FigurePage-CkRTw0Av.js"), true ? __vite__mapDeps([10,1,2,3,4,5,11,12,6,7]) : void 0));
const FigureAliasPage = reactExports.lazy(() => __vitePreload(() => import("./FigureAliasPage-DjutAb7d.js"), true ? __vite__mapDeps([13,1,2,3,4,5,11,14,15,16,12,6,7]) : void 0));
const FigureSourceListingPage = reactExports.lazy(() => __vitePreload(() => import("./FigureSourceListingPage-CSnDOLWU.js"), true ? __vite__mapDeps([17,1,2,3,4,5,11,14,15,16,12,6,7]) : void 0));
const FranchisePage = reactExports.lazy(() => __vitePreload(() => import("./FranchisePage-DQ_vP4QL.js"), true ? __vite__mapDeps([18,1,2,3,4,5,11,14,6,7]) : void 0));
const SourcePage = reactExports.lazy(() => __vitePreload(() => import("./SourcePage-D7UwVxut.js"), true ? __vite__mapDeps([19,1,2,3,4,5,11,14,12,6,7]) : void 0));
const CandidateReviewPage = reactExports.lazy(() => __vitePreload(() => import("./CandidateReviewPage-D0J50tBY.js"), true ? __vite__mapDeps([20,1,2,3,4,5,11,14,15,16,12,6,7]) : void 0));
const CharacterPage = reactExports.lazy(
  () => __vitePreload(() => import("./CharacterAdminPages-DhuFFOOK.js"), true ? __vite__mapDeps([21,1,2,3,4,5,11,16,14,6,7]) : void 0).then((module) => ({ default: module.CharacterPage }))
);
const CharacterAliasPage = reactExports.lazy(
  () => __vitePreload(() => import("./CharacterAdminPages-DhuFFOOK.js"), true ? __vite__mapDeps([21,1,2,3,4,5,11,16,14,6,7]) : void 0).then((module) => ({ default: module.CharacterAliasPage }))
);
const CharacterFormPage = reactExports.lazy(
  () => __vitePreload(() => import("./CharacterAdminPages-DhuFFOOK.js"), true ? __vite__mapDeps([21,1,2,3,4,5,11,16,14,6,7]) : void 0).then((module) => ({ default: module.CharacterFormPage }))
);
const CharacterFormAliasPage = reactExports.lazy(
  () => __vitePreload(() => import("./CharacterAdminPages-DhuFFOOK.js"), true ? __vite__mapDeps([21,1,2,3,4,5,11,16,14,6,7]) : void 0).then((module) => ({ default: module.CharacterFormAliasPage }))
);
const FigureCharacterPage = reactExports.lazy(
  () => __vitePreload(() => import("./CharacterAdminPages-DhuFFOOK.js"), true ? __vite__mapDeps([21,1,2,3,4,5,11,16,14,6,7]) : void 0).then((module) => ({ default: module.FigureCharacterPage }))
);
const queryClient = new QueryClient();
const RouteFallback = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground", children: "Loading..." });
const App = () => /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TooltipProvider, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster$1, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { basename: "/anime-figure-market", children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(RouteFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Index, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/anime/:animeId", element: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimeDetail, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/work/figure", element: /* @__PURE__ */ jsxRuntimeExports.jsx(FigurePage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/work/figure-alias", element: /* @__PURE__ */ jsxRuntimeExports.jsx(FigureAliasPage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/work/figure-source-listing", element: /* @__PURE__ */ jsxRuntimeExports.jsx(FigureSourceListingPage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/work/figure-listing", element: /* @__PURE__ */ jsxRuntimeExports.jsx(FigureSourceListingPage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/work/franchises", element: /* @__PURE__ */ jsxRuntimeExports.jsx(FranchisePage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/work/sources", element: /* @__PURE__ */ jsxRuntimeExports.jsx(SourcePage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/figure-admin/candidate-review", element: /* @__PURE__ */ jsxRuntimeExports.jsx(CandidateReviewPage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/character-admin/characters", element: /* @__PURE__ */ jsxRuntimeExports.jsx(CharacterPage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/character-admin/character-aliases", element: /* @__PURE__ */ jsxRuntimeExports.jsx(CharacterAliasPage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/character-admin/character-forms", element: /* @__PURE__ */ jsxRuntimeExports.jsx(CharacterFormPage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/character-admin/character-form-aliases", element: /* @__PURE__ */ jsxRuntimeExports.jsx(CharacterFormAliasPage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/character-admin/figure-characters", element: /* @__PURE__ */ jsxRuntimeExports.jsx(FigureCharacterPage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(NotFound, {}) })
  ] }) }) })
] }) });
createRoot(document.getElementById("root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(App, {}));
export {
  __vitePreload as _,
  cn as c
};
