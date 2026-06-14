import { c as createLucideIcon, j as jsxRuntimeExports, b as cn, d as cva, a as useParams, u as useNavigate, r as reactExports } from "./index-BMjHTukZ.js";
import { b as withPagination, N as Navbar, B as Button, g as getPageContent } from "./page-BRWsXvhH.js";
import { A as ApiErrorToast, L as LoaderCircle, r as readApiErrorResponse, t as toClientApiError } from "./apiError-DnpeQjkq.js";
import { A as ArrowLeft } from "./arrow-left-DI2nARO3.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ExternalLink = createLucideIcon("ExternalLink", [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
]);
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const API_BASE_URL = "https://figure-market-core.onrender.com/api";
const FIGURES_ENDPOINT = `${API_BASE_URL}/v1/figures`;
const FIGURE_SOURCE_LISTINGS_ENDPOINT = `${API_BASE_URL}/figure-source-listings`;
const FALLBACK_IMAGE_URL = `${"/anime-figure-market/"}placeholder.svg`;
const formatPrice = (listing) => {
  if (listing.price === void 0 || listing.price === null) return "Precio no registrado";
  return `${listing.price} ${listing.currencyCode || ""}`.trim();
};
const getAvailabilityLabel = (value) => {
  if (value === true) return "Disponible";
  if (value === false) return "No disponible";
  return "Disponibilidad no indicada";
};
const FigureDetail = () => {
  const { figureId } = useParams();
  const navigate = useNavigate();
  const [figure, setFigure] = reactExports.useState(null);
  const [imageUrl, setImageUrl] = reactExports.useState(FALLBACK_IMAGE_URL);
  const [listings, setListings] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [apiError, setApiError] = reactExports.useState(null);
  const listingsUrl = reactExports.useMemo(() => {
    const endpoint = `${FIGURE_SOURCE_LISTINGS_ENDPOINT}?figureId=${encodeURIComponent(figureId || "")}`;
    return withPagination(endpoint, 0, 100, "id,asc");
  }, [figureId]);
  reactExports.useEffect(() => {
    if (!figureId) return;
    const loadFigureDetail = async () => {
      setLoading(true);
      setApiError(null);
      setFigure(null);
      setListings([]);
      setImageUrl(FALLBACK_IMAGE_URL);
      try {
        const [figureResponse, imageResponse, listingsResponse] = await Promise.all([
          fetch(`${FIGURES_ENDPOINT}/${figureId}`),
          fetch(`${FIGURES_ENDPOINT}/${figureId}/images/primary`),
          fetch(listingsUrl)
        ]);
        if (!figureResponse.ok) {
          setApiError(await readApiErrorResponse(figureResponse, "Error loading figure."));
          return;
        }
        if (!listingsResponse.ok) {
          setApiError(await readApiErrorResponse(listingsResponse, "Error loading source listings."));
          return;
        }
        const nextFigure = await figureResponse.json();
        const listingsData = await listingsResponse.json();
        setFigure(nextFigure);
        setListings(getPageContent(listingsData));
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
  }, [figureId, listingsUrl]);
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
          (figure == null ? void 0 : figure.status) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: figure.status }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "overflow-hidden rounded-lg border bg-card shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/5] bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: (figure == null ? void 0 : figure.name) || "Figure image",
              className: "h-full w-full object-cover",
              onError: (event) => {
                event.currentTarget.src = FALLBACK_IMAGE_URL;
              }
            }
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-lg border bg-card p-5 shadow-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-foreground", children: "Sources y precios" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Datos registrados por tienda o fuente para esta figura." })
            ] }),
            listings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground", children: "No hay sources ni precios registrados para esta figura." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: listings.map((listing) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-lg border bg-background p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-foreground", children: listing.sourceName || `Source ${listing.sourceId || ""}`.trim() || "Source" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: listing.sourceTitle || "Sin titulo de source" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left sm:text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-primary", children: formatPrice(listing) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: getAvailabilityLabel(listing.isAvailable) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground", children: [
                listing.listingStatus && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: listing.listingStatus }),
                listing.editionText && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: listing.editionText }),
                listing.releaseText && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: listing.releaseText })
              ] }),
              listing.sourceUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: listing.sourceUrl, target: "_blank", rel: "noreferrer", children: [
                "Abrir source",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" })
              ] }) }) })
            ] }, listing.id)) })
          ] })
        ] })
      ] })
    ] })
  ] });
};
export {
  FigureDetail as default
};
