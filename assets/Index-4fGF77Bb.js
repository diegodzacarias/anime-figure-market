import { u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-DjNhWZNZ.js";
import { w as withPageSize, g as getPageContent, B as Button, S as ShoppingCart, N as Navbar } from "./page-IXUKuqvC.js";
const berserkImg = "/anime-figure-market/assets/berserk-XUP7V0Hn.jpg";
const narutoImg = "/anime-figure-market/assets/naruto-DacTZOzb.jpg";
const onepieceImg = "/anime-figure-market/assets/onepiece-DNe8N-Mi.jpg";
const BASE_URL = "https://figure-market-core.onrender.com/api";
async function getFranchises() {
  const res = await fetch(withPageSize(`${BASE_URL}/v1/franchises`));
  if (!res.ok) {
    throw new Error("Error fetching franchises");
  }
  const data = await res.json();
  return getPageContent(data);
}
const fallbackImages = {
  Berserk: berserkImg,
  Naruto: narutoImg,
  "One Piece": onepieceImg
};
const AnimeHero = () => {
  const navigate = useNavigate();
  const [animeList, setAnimeList] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const loadFranchises = async () => {
      try {
        const data = await getFranchises();
        setAnimeList(data);
      } catch (error) {
        console.error("Error fetching franchises:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFranchises();
  }, []);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-center text-sm font-semibold uppercase tracking-widest text-primary", children: "Explora por universo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mb-10 text-center text-4xl font-bold text-foreground md:text-5xl", children: [
        "Elige tu ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Anime" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground", children: "Cargando franquicias..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-center text-sm font-semibold uppercase tracking-widest text-primary", children: "Explora por universo" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mb-10 text-center text-4xl font-bold text-foreground md:text-5xl", children: [
      "Elige tu ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Anime" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-3", children: animeList.map((anime) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => navigate(`/anime/${anime.id}`),
        className: "group relative overflow-hidden rounded-lg shadow-card transition-all duration-300 hover:scale-[1.03] hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-primary",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: anime.imageUrl || fallbackImages[anime.name],
              alt: anime.name,
              className: "h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-110",
              width: 640,
              height: 896
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "anime-card-overlay absolute inset-0 flex flex-col items-center justify-end p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-foreground", children: anime.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-3 rounded-full bg-primary/20 px-4 py-1 text-xs font-medium text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground", children: "Ver colección →" })
          ] })
        ]
      },
      anime.id
    )) })
  ] }) });
};
const figures = [
  { id: 1, name: "Guerrero Berserker - Edición Limitada", price: "$189.99", tag: "Nuevo" },
  { id: 2, name: "Ninja Legendario - Modo Sabio", price: "$149.99", tag: "Popular" },
  { id: 3, name: "Capitán Pirata - Gear 5", price: "$219.99", tag: "Pre-orden" },
  { id: 4, name: "Espadachín del Infierno - Armadura Completa", price: "$299.99", tag: "Exclusivo" }
];
const MarketplaceSection = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border bg-muted/30 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-sm font-semibold uppercase tracking-widest text-secondary", children: "Marketplace" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-8 text-3xl font-bold text-foreground", children: "Figuras Destacadas" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4", children: figures.map((fig) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "group rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-primary/40 hover:shadow-card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex h-48 items-center justify-center rounded-md bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl opacity-30", children: "🗡️" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary", children: fig.tag }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-2 text-sm font-medium text-foreground", children: fig.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-secondary", children: fig.price }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "gap-1 border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-3.5 w-3.5" }),
              "Añadir"
            ] })
          ] })
        ]
      },
      fig.id
    )) })
  ] }) });
};
const Index = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimeHero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MarketplaceSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border py-8 text-center text-sm text-muted-foreground", children: "© 2026 AnimeFigures. Todos los derechos reservados." })
  ] });
};
export {
  Index as default
};
