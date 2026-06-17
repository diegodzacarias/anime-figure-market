import { u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-BBtVfQu2.js";
import { N as Navbar } from "./Navbar-BMQL-z9P.js";
import { w as withPagination, g as getPageContent } from "./page-DEGBjxB5.js";
const berserkImg = "/anime-figure-market/assets/berserk-XUP7V0Hn.jpg";
const narutoImg = "/anime-figure-market/assets/naruto-DacTZOzb.jpg";
const onepieceImg = "/anime-figure-market/assets/onepiece-DNe8N-Mi.jpg";
const BASE_URL = "https://figure-market-core.onrender.com/api";
async function getFranchises() {
  const res = await fetch(withPagination(`${BASE_URL}/v1/franchises`, 0, 1e3, "name,asc"));
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-center text-2xl font-extrabold text-primary-foreground drop-shadow-lg", children: anime.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-3 rounded-full bg-background/90 px-4 py-1 text-xs font-semibold text-foreground shadow-card transition-colors group-hover:bg-primary group-hover:text-primary-foreground", children: "Ver colección →" })
          ] })
        ]
      },
      anime.id
    )) })
  ] }) });
};
const Index = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimeHero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border py-8 text-center text-sm text-muted-foreground", children: "© 2026 AnimeFigures. Todos los derechos reservados." })
  ] });
};
export {
  Index as default
};
