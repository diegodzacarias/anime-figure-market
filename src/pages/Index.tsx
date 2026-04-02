import Navbar from "@/components/Navbar";
import AnimeHero from "@/components/AnimeHero";
import MarketplaceSection from "@/components/MarketplaceSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AnimeHero />
      <MarketplaceSection />
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 AnimeFigures. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Index;
