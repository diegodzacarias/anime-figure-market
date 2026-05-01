import { useState } from "react";
import { Link } from "react-router-dom";
import { User, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);

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
          <Link to="/apis" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            APIS
          </Link>
        </div>

        <div className="flex items-center gap-3">
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
