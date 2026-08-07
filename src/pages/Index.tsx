import { Link } from "react-router-dom";
import { config } from "@/config";
import Navbar from "@/components/Navbar";
import AnimeHero from "@/components/AnimeHero";

const Index = () => {
  const { platformName } = config;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <AnimeHero />

      <footer className="mt-8 border-t border-border">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-3 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 {platformName}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="cursor-pointer transition-colors hover:text-foreground">
              Privacidad
            </Link>
            <span className="text-border">·</span>
            <Link to="/terms" className="cursor-pointer transition-colors hover:text-foreground">
              Términos
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
