import { c as createLucideIcon, a as useParams, j as jsxRuntimeExports, L as Link } from "./index-WzxPZzqU.js";
import { N as Navbar, B as Button } from "./Navbar-DY2ajiLQ.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ArrowLeft = createLucideIcon("ArrowLeft", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
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
