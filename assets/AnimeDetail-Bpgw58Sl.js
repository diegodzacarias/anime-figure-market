import { j as jsxRuntimeExports, L as Link } from "./react-vendor-Bhf2bzcN.js";
import { N as Navbar, B as Button } from "./Navbar-_ItMA5Sh.js";
import { A as useParams } from "./vendor-COs6rlZq.js";
import { A as ArrowLeft } from "./icons-vendor-DLHCyI7j.js";
import "./radix-vendor-KSOk4oW_.js";
import "./index-DE6HQk3y.js";
import "./query-vendor-CRnINZg8.js";
const animeNames = {
  berserk: "Berserk",
  naruto: "Naruto",
  "one-piece": "One Piece"
};
const AnimeDetail = () => {
  const { animeId } = useParams();
  const animeName = animeNames[animeId || ""] || animeId;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", className: "mb-8 gap-2 text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        "Volver"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-lg border border-border bg-card p-16 text-center shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-4 text-5xl font-bold text-foreground", children: animeName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground", children: "🚧 To be continued... 🚧" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 max-w-md text-sm text-muted-foreground", children: [
          "Aquí se consumirá una API para mostrar datos de ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: animeName }),
          ". Próximamente: personajes, episodios y más."
        ] })
      ] })
    ] })
  ] });
};
export {
  AnimeDetail as default
};
