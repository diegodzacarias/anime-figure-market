import { a as useParams, u as useNavigate, r as reactExports, b as usePreferences, j as jsxRuntimeExports } from "./index-DgSoNkx-.js";
import { N as Navbar, B as Button } from "./Navbar-Bn5NoM40.js";
import { A as ApiErrorToast, L as LoaderCircle, r as readApiErrorResponse, t as toClientApiError } from "./apiError-s-ZUEyF3.js";
import { B as Badge } from "./badge-B5TvgG3w.js";
import { A as ArrowLeft } from "./arrow-left-By6uroo0.js";
import { E as ExternalLink } from "./external-link-C_tc2Tyn.js";
const API_BASE_URL = "https://figure-market-core.onrender.com/api";
const FIGURES_ENDPOINT = `${API_BASE_URL}/v1/figures`;
const FIGURE_SOURCE_LISTINGS_ENDPOINT = `${API_BASE_URL}/figure-source-listings`;
const FALLBACK_IMAGE_URL = `${"/anime-figure-market/"}placeholder.svg`;
const TOP_LISTINGS_LIMIT = 4;
const formatOriginalPrice = (listing) => {
  if (listing.price === void 0 || listing.price === null) return "Precio no registrado";
  return `${listing.price} ${listing.currencyCode || ""}`.trim();
};
const formatConvertedPrice = (listing) => {
  if (listing.convertedPrice === void 0 || listing.convertedPrice === null) {
    return "Conversion no disponible";
  }
  return `${listing.convertedPrice} ${listing.convertedCurrencyCode || ""}`.trim();
};
const getAvailabilityLabel = (value) => {
  if (value === true) return "Disponible";
  if (value === false) return "No disponible";
  return "Disponibilidad no indicada";
};
const getSourceName = (listing) => listing.sourceName || `Source ${listing.sourceId || ""}`.trim() || "Source";
const SourceListingCard = ({ listing, compact = false }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-lg border bg-background p-4", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-foreground", children: getSourceName(listing) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-1 text-sm text-muted-foreground ${compact ? "line-clamp-1" : "line-clamp-2"}`, children: listing.sourceTitle || "Sin titulo de source" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 text-left sm:text-right", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-primary", children: formatConvertedPrice(listing) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Original: ",
        formatOriginalPrice(listing)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: getAvailabilityLabel(listing.isAvailable) })
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground", children: [
    listing.listingStatus && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: listing.listingStatus }),
    listing.exchangeRateSource && !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      "FX: ",
      listing.exchangeRateSource
    ] }),
    !compact && listing.editionText && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: listing.editionText }),
    !compact && listing.releaseText && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: listing.releaseText })
  ] }),
  listing.sourceUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: listing.sourceUrl, target: "_blank", rel: "noreferrer", children: [
    "Abrir source",
    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" })
  ] }) }) })
] });
const buildTopRankingUrl = (figureId, currencyCode, limit) => {
  const params = new URLSearchParams({
    figureId,
    currencyCode,
    limit: limit.toString()
  });
  return `${FIGURE_SOURCE_LISTINGS_ENDPOINT}/price-ranking/top?${params.toString()}`;
};
const buildOtherRankingUrl = (figureId, currencyCode, excludedTopLimit) => {
  const params = new URLSearchParams({
    figureId,
    currencyCode,
    excludedTopLimit: excludedTopLimit.toString()
  });
  return `${FIGURE_SOURCE_LISTINGS_ENDPOINT}/price-ranking/others?${params.toString()}`;
};
const FigureDetail = () => {
  const { figureId } = useParams();
  const navigate = useNavigate();
  const allSourcesRef = reactExports.useRef(null);
  const { currencyCode } = usePreferences();
  const [figure, setFigure] = reactExports.useState(null);
  const [imageUrl, setImageUrl] = reactExports.useState(FALLBACK_IMAGE_URL);
  const [topListings, setTopListings] = reactExports.useState([]);
  const [otherListings, setOtherListings] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [rankingLoading, setRankingLoading] = reactExports.useState(true);
  const [apiError, setApiError] = reactExports.useState(null);
  const totalListings = topListings.length + otherListings.length;
  const topRankingUrl = reactExports.useMemo(
    () => figureId ? buildTopRankingUrl(figureId, currencyCode, TOP_LISTINGS_LIMIT) : "",
    [currencyCode, figureId]
  );
  const otherRankingUrl = reactExports.useMemo(
    () => figureId ? buildOtherRankingUrl(figureId, currencyCode, TOP_LISTINGS_LIMIT) : "",
    [currencyCode, figureId]
  );
  reactExports.useEffect(() => {
    if (!figureId) return;
    const loadFigureDetail = async () => {
      setLoading(true);
      setApiError(null);
      setFigure(null);
      setImageUrl(FALLBACK_IMAGE_URL);
      try {
        const figureResponse = await fetch(`${FIGURES_ENDPOINT}/${figureId}`);
        if (!figureResponse.ok) {
          setApiError(await readApiErrorResponse(figureResponse, "Error loading figure."));
          return;
        }
        const nextFigure = await figureResponse.json();
        setFigure(nextFigure);
        if (nextFigure.primaryImageUrl) {
          setImageUrl(nextFigure.primaryImageUrl);
          return;
        }
        const imageResponse = await fetch(`${FIGURES_ENDPOINT}/${figureId}/images/primary`);
        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          setImageUrl(imageData.imageUrl || FALLBACK_IMAGE_URL);
        }
      } catch (error) {
        setApiError(toClientApiError(error, "Error connecting to backend."));
      } finally {
        setLoading(false);
      }
    };
    loadFigureDetail();
  }, [figureId]);
  reactExports.useEffect(() => {
    if (!figureId || !topRankingUrl || !otherRankingUrl) return;
    const loadPriceRanking = async () => {
      setRankingLoading(true);
      setApiError(null);
      setTopListings([]);
      setOtherListings([]);
      try {
        const [topResponse, otherResponse] = await Promise.all([
          fetch(topRankingUrl),
          fetch(otherRankingUrl)
        ]);
        if (!topResponse.ok) {
          setApiError(await readApiErrorResponse(topResponse, "Error loading top price ranking."));
          return;
        }
        if (!otherResponse.ok) {
          setApiError(await readApiErrorResponse(otherResponse, "Error loading other price listings."));
          return;
        }
        setTopListings(await topResponse.json());
        setOtherListings(await otherResponse.json());
      } catch (error) {
        setApiError(toClientApiError(error, "Error connecting to backend."));
      } finally {
        setRankingLoading(false);
      }
    };
    loadPriceRanking();
  }, [figureId, otherRankingUrl, topRankingUrl]);
  const scrollToAllSources = () => {
    var _a;
    (_a = allSourcesRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ApiErrorToast, { error: apiError, onClose: () => setApiError(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "ghost",
          className: "mb-8 gap-2 text-muted-foreground hover:text-foreground",
          onClick: () => navigate(-1),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            "Volver"
          ]
        }
      ),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[24rem] items-center justify-center rounded-lg border bg-card text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
        "Cargando detalle..."
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold uppercase tracking-widest text-primary", children: "Figure" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mx-auto mt-2 max-w-4xl text-3xl font-bold text-foreground md:text-5xl", children: (figure == null ? void 0 : figure.name) || "Untitled figure" }),
          ((figure == null ? void 0 : figure.status) || (figure == null ? void 0 : figure.sourceReferenceUrl)) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center justify-center gap-2", children: [
            (figure == null ? void 0 : figure.status) && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: figure.status }),
            (figure == null ? void 0 : figure.sourceReferenceUrl) && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: figure.sourceReferenceUrl, target: "_blank", rel: "noreferrer", children: [
              "Referencia",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.9fr)] lg:items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "overflow-hidden rounded-lg border bg-card shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/5] bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: (figure == null ? void 0 : figure.name) || "Figure image",
              className: "h-full w-full object-contain",
              onError: (event) => {
                event.currentTarget.src = FALLBACK_IMAGE_URL;
              }
            }
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-lg border bg-card p-5 shadow-card lg:sticky lg:top-24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-foreground", children: "Top precios convertidos" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: totalListings > 0 ? `Mostrando ${topListings.length} principales de ${totalListings} sources.` : "Datos registrados por tienda o fuente para esta figura." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                totalListings > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: totalListings }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: currencyCode })
              ] })
            ] }) }),
            rankingLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-40 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
              "Cargando ranking..."
            ] }) : topListings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground", children: "No hay sources ni precios registrados para esta figura." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: topListings.map((listing) => /* @__PURE__ */ jsxRuntimeExports.jsx(SourceListingCard, { listing, compact: true }, listing.id)) }),
            otherListings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "mt-5 w-full",
                onClick: scrollToAllSources,
                children: [
                  "Ver otros listings (",
                  otherListings.length,
                  ")"
                ]
              }
            )
          ] })
        ] }),
        otherListings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: allSourcesRef, className: "mt-10 rounded-lg border bg-card p-5 shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-foreground", children: "Otros listings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
              "Listings restantes, excluyendo el Top ",
              TOP_LISTINGS_LIMIT,
              ", ordenados por precio convertido."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 lg:grid-cols-2", children: otherListings.map((listing) => /* @__PURE__ */ jsxRuntimeExports.jsx(SourceListingCard, { listing }, listing.id)) })
        ] })
      ] })
    ] })
  ] });
};
export {
  FigureDetail as default
};
