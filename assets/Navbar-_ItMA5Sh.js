import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./react-vendor-Bhf2bzcN.js";
import { w as Slot } from "./radix-vendor-KSOk4oW_.js";
import { x as cva } from "./vendor-COs6rlZq.js";
import { c as cn } from "./index-DE6HQk3y.js";
import { g as ChevronDown, h as Sun, M as Moon, S as ShoppingCart, U as User } from "./icons-vendor-DLHCyI7j.js";
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const THEME_STORAGE_KEY = "milo-theme";
const Navbar = () => {
  const [showLogin, setShowLogin] = reactExports.useState(false);
  const [showWorkMenu, setShowWorkMenu] = reactExports.useState(false);
  const [showFigureAdminMenu, setShowFigureAdminMenu] = reactExports.useState(false);
  const [showCharacterAdminMenu, setShowCharacterAdminMenu] = reactExports.useState(false);
  const [isDarkMode, setIsDarkMode] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const shouldUseDark = storedTheme === "dark";
    document.documentElement.classList.toggle("dark", shouldUseDark);
    setIsDarkMode(shouldUseDark);
  }, []);
  const toggleTheme = () => {
    const nextIsDark = !isDarkMode;
    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem(THEME_STORAGE_KEY, nextIsDark ? "dark" : "light");
    setIsDarkMode(nextIsDark);
  };
  const closeMenus = () => {
    setShowWorkMenu(false);
    setShowFigureAdminMenu(false);
    setShowCharacterAdminMenu(false);
  };
  const toggleWorkMenu = () => {
    setShowWorkMenu((current) => !current);
    setShowFigureAdminMenu(false);
    setShowCharacterAdminMenu(false);
  };
  const toggleFigureAdminMenu = () => {
    setShowFigureAdminMenu((current) => !current);
    setShowWorkMenu(false);
    setShowCharacterAdminMenu(false);
  };
  const toggleCharacterAdminMenu = () => {
    setShowCharacterAdminMenu((current) => !current);
    setShowWorkMenu(false);
    setShowFigureAdminMenu(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container flex h-16 items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-primary", children: "⛩️" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-bold text-foreground", children: [
          "Anime",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Figures" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden items-center gap-6 md:flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-sm text-muted-foreground transition-colors hover:text-foreground", children: "Inicio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer", children: "Catálogo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer", children: "Novedades" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
              onClick: toggleWorkMenu,
              children: [
                "Work",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5" })
              ]
            }
          ),
          showWorkMenu && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-0 top-full mt-3 min-w-40 rounded-lg border border-border bg-card p-2 shadow-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/work/figure",
                className: "block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                onClick: closeMenus,
                children: "Figure"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/work/figure-alias",
                className: "block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                onClick: closeMenus,
                children: "Figure Alias"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/work/figure-source-listing",
                className: "block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                onClick: closeMenus,
                children: "Figure Source Listing"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/work/franchises",
                className: "block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                onClick: closeMenus,
                children: "Franchises"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/work/sources",
                className: "block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                onClick: closeMenus,
                children: "Sources"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
              onClick: toggleFigureAdminMenu,
              children: [
                "FigureAdmin",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5" })
              ]
            }
          ),
          showFigureAdminMenu && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-full mt-3 min-w-48 rounded-lg border border-border bg-card p-2 shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/figure-admin/candidate-review",
              className: "block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              onClick: closeMenus,
              children: "Candidate Review"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
              onClick: toggleCharacterAdminMenu,
              children: [
                "CharacterAdmin",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5" })
              ]
            }
          ),
          showCharacterAdminMenu && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-0 top-full mt-3 min-w-56 rounded-lg border border-border bg-card p-2 shadow-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/character-admin/characters",
                className: "block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                onClick: closeMenus,
                children: "Characters"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/character-admin/character-aliases",
                className: "block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                onClick: closeMenus,
                children: "Character Aliases"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/character-admin/character-forms",
                className: "block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                onClick: closeMenus,
                children: "Character Forms"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/character-admin/character-form-aliases",
                className: "block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                onClick: closeMenus,
                children: "Character Form Aliases"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/character-admin/figure-characters",
                className: "block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                onClick: closeMenus,
                children: "Figure Characters"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "text-muted-foreground hover:text-foreground",
            "aria-label": isDarkMode ? "Switch to light mode" : "Switch to dark mode",
            title: isDarkMode ? "Light mode" : "Dark mode",
            onClick: toggleTheme,
            children: isDarkMode ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "gap-2 border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground",
            onClick: () => setShowLogin(!showLogin),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
              "Login"
            ]
          }
        )
      ] })
    ] }),
    showLogin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-4 top-16 z-50 w-72 rounded-lg border border-border bg-card p-5 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-lg font-semibold text-foreground", children: "Iniciar Sesión" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Email", type: "email", className: "bg-muted border-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Contraseña", type: "password", className: "bg-muted border-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full bg-primary text-primary-foreground hover:bg-primary/90", children: "Entrar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
          "¿No tienes cuenta?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "cursor-pointer text-primary hover:underline", children: "Regístrate" })
        ] })
      ] })
    ] })
  ] });
};
export {
  Button as B,
  Input as I,
  Navbar as N,
  buttonVariants as b
};
