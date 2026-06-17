import { a as useParams, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-BBtVfQu2.js";
import { N as Navbar, B as Button } from "./Navbar-BMQL-z9P.js";
import { r as readApiErrorResponse, t as toClientApiError, A as ApiErrorToast, L as LoaderCircle } from "./apiError-B8hFs4iN.js";
import { g as getPageContent, a as getPageMeta } from "./page-DEGBjxB5.js";
import { A as ArrowLeft } from "./arrow-left-CoQLs-DQ.js";
const API_BASE_URL = "https://figure-market-core.onrender.com/api";
const FIGURES_SEARCH_ENDPOINT = `${API_BASE_URL}/v1/figures/search`;
const FRANCHISES_ENDPOINT = `${API_BASE_URL}/v1/franchises`;
const PAGE_SIZE = 20;
const FALLBACK_IMAGE_URL = `${"/anime-figure-market/"}placeholder.svg`;
const buildFiguresUrl = (franchiseId, page) => {
  const params = new URLSearchParams({
    franchiseId,
    page: page.toString(),
    size: PAGE_SIZE.toString(),
    sort: "name,asc"
  });
  return `${FIGURES_SEARCH_ENDPOINT}?${params.toString()}`;
};
const AnimeDetail = () => {
  const { animeId } = useParams();
  const [franchise, setFranchise] = reactExports.useState(null);
  const [figures, setFigures] = reactExports.useState([]);
  const [imageUrls, setImageUrls] = reactExports.useState({});
  const [pageMeta, setPageMeta] = reactExports.useState({
    totalElements: 0,
    totalPages: 0,
    page: 0,
    size: PAGE_SIZE
  });
  const [loading, setLoading] = reactExports.useState(true);
  const [loadingMore, setLoadingMore] = reactExports.useState(false);
  const [apiError, setApiError] = reactExports.useState(null);
  const sentinelRef = reactExports.useRef(null);
  const loadingRef = reactExports.useRef(false);
  const fetchPrimaryImages = reactExports.useCallback(async (nextFigures) => {
    const figuresWithIds = nextFigures.filter((figure) => figure.id && !figure.primaryImageUrl);
    if (figuresWithIds.length === 0) return;
    const entries = await Promise.all(
      figuresWithIds.map(async (figure) => {
        try {
          const response = await fetch(`${API_BASE_URL}/v1/figures/${figure.id}/images/primary`);
          if (!response.ok) {
            return [figure.id, FALLBACK_IMAGE_URL];
          }
          const data = await response.json();
          return [figure.id, data.imageUrl || FALLBACK_IMAGE_URL];
        } catch {
          return [figure.id, FALLBACK_IMAGE_URL];
        }
      })
    );
    setImageUrls((current) => ({
      ...current,
      ...Object.fromEntries(entries)
    }));
  }, []);
  const loadFiguresPage = reactExports.useCallback(
    async (pageToLoad, replace = false) => {
      if (!animeId || loadingRef.current) return;
      loadingRef.current = true;
      if (replace) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      try {
        const response = await fetch(buildFiguresUrl(animeId, pageToLoad));
        if (!response.ok) {
          setApiError(await readApiErrorResponse(response, "Error loading figures."));
          return;
        }
        const data = await response.json();
        const nextFigures = getPageContent(data);
        setFigures((current) => replace ? nextFigures : [...current, ...nextFigures]);
        setPageMeta(getPageMeta(data, PAGE_SIZE));
        await fetchPrimaryImages(nextFigures);
      } catch (error) {
        setApiError(toClientApiError(error, "Error connecting to backend."));
      } finally {
        loadingRef.current = false;
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [animeId, fetchPrimaryImages]
  );
  reactExports.useEffect(() => {
    if (!animeId) return;
    setFranchise(null);
    setFigures([]);
    setImageUrls({});
    setPageMeta({
      totalElements: 0,
      totalPages: 0,
      page: 0,
      size: PAGE_SIZE
    });
    const loadFranchise = async () => {
      try {
        const response = await fetch(`${FRANCHISES_ENDPOINT}/${animeId}`);
        if (response.ok) {
          setFranchise(await response.json());
        }
      } catch {
        setFranchise(null);
      }
    };
    loadFranchise();
    loadFiguresPage(0, true);
  }, [animeId, loadFiguresPage]);
  reactExports.useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        var _a;
        const hasMore = pageMeta.totalPages > 0 && pageMeta.page < pageMeta.totalPages - 1;
        if (((_a = entries[0]) == null ? void 0 : _a.isIntersecting) && hasMore && !loadingRef.current) {
          loadFiguresPage(pageMeta.page + 1);
        }
      },
      { rootMargin: "480px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadFiguresPage, pageMeta.page, pageMeta.totalPages]);
  const title = (franchise == null ? void 0 : franchise.name) || "Coleccion";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ApiErrorToast, { error: apiError, onClose: () => setApiError(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", className: "mb-8 gap-2 text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        "Volver"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold uppercase tracking-widest text-primary", children: "Coleccion" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-4xl font-bold text-foreground md:text-5xl", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-muted-foreground", children: [
          pageMeta.totalElements,
          " figuras encontradas"
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[18rem] items-center justify-center rounded-lg border bg-card text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
        "Cargando figuras..."
      ] }) : figures.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border bg-card p-10 text-center text-muted-foreground", children: "No hay figuras registradas para esta franquicia." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4", children: figures.map((figure) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: figure.id ? `/figure/${figure.id}` : "#",
          className: "overflow-hidden rounded-lg border border-border bg-card shadow-card transition-transform duration-200 hover:-translate-y-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/5] overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: figure.primaryImageUrl || (figure.id ? imageUrls[figure.id] || FALLBACK_IMAGE_URL : FALLBACK_IMAGE_URL),
                alt: figure.name || "Figure image",
                className: "h-full w-full object-contain",
                loading: "lazy",
                onError: (event) => {
                  event.currentTarget.src = FALLBACK_IMAGE_URL;
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "line-clamp-2 min-h-10 text-sm font-semibold text-foreground", children: figure.name || "Untitled figure" }) })
          ]
        },
        figure.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: sentinelRef, className: "flex h-20 items-center justify-center text-sm text-muted-foreground", children: loadingMore && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
        "Cargando mas figuras..."
      ] }) })
    ] })
  ] });
};
export {
  AnimeDetail as default
};
