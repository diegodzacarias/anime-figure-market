import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, User, ShoppingCart, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const THEME_STORAGE_KEY = "milo-theme";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showWorkMenu, setShowWorkMenu] = useState(false);
  const [showFigureAdminMenu, setShowFigureAdminMenu] = useState(false);
  const [showCharacterAdminMenu, setShowCharacterAdminMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
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

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">⛩️</span>
          <span className="text-xl font-bold text-foreground">
            Anime<span className="text-primary">Figures</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Inicio
          </Link>
          <span className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer">
            Catálogo
          </span>
          <span className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer">
            Novedades
          </span>
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={toggleWorkMenu}
            >
              Work
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {showWorkMenu && (
              <div className="absolute left-0 top-full mt-3 min-w-40 rounded-lg border border-border bg-card p-2 shadow-card">
                <Link
                  to="/work/figure"
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={closeMenus}
                >
                  Figure
                </Link>
                <Link
                  to="/work/figure-alias"
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={closeMenus}
                >
                  Figure Alias
                </Link>
                <Link
                  to="/work/figure-source-listing"
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={closeMenus}
                >
                  Figure Source Listing
                </Link>
                <Link
                  to="/work/franchises"
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={closeMenus}
                >
                  Franchises
                </Link>
                <Link
                  to="/work/sources"
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={closeMenus}
                >
                  Sources
                </Link>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={toggleFigureAdminMenu}
            >
              FigureAdmin
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {showFigureAdminMenu && (
              <div className="absolute left-0 top-full mt-3 min-w-48 rounded-lg border border-border bg-card p-2 shadow-card">
                <Link
                  to="/figure-admin/candidate-review"
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={closeMenus}
                >
                  Candidate Review
                </Link>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={toggleCharacterAdminMenu}
            >
              CharacterAdmin
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {showCharacterAdminMenu && (
              <div className="absolute left-0 top-full mt-3 min-w-56 rounded-lg border border-border bg-card p-2 shadow-card">
                <Link
                  to="/character-admin/characters"
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={closeMenus}
                >
                  Characters
                </Link>
                <Link
                  to="/character-admin/character-aliases"
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={closeMenus}
                >
                  Character Aliases
                </Link>
                <Link
                  to="/character-admin/character-forms"
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={closeMenus}
                >
                  Character Forms
                </Link>
                <Link
                  to="/character-admin/character-form-aliases"
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={closeMenus}
                >
                  Character Form Aliases
                </Link>
                <Link
                  to="/character-admin/figure-characters"
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={closeMenus}
                >
                  Figure Characters
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={isDarkMode ? "Light mode" : "Dark mode"}
            onClick={toggleTheme}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground"
            onClick={() => setShowLogin(!showLogin)}
          >
            <User className="h-4 w-4" />
            Login
          </Button>
        </div>
      </div>

      {/* Login dropdown */}
      {showLogin && (
        <div className="absolute right-4 top-16 z-50 w-72 rounded-lg border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Iniciar Sesión</h3>
          <div className="space-y-3">
            <Input placeholder="Email" type="email" className="bg-muted border-border" />
            <Input placeholder="Contraseña" type="password" className="bg-muted border-border" />
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Entrar
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              ¿No tienes cuenta?{" "}
              <span className="cursor-pointer text-primary hover:underline">Regístrate</span>
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
