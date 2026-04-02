import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const figures = [
  { id: 1, name: "Guerrero Berserker - Edición Limitada", price: "$189.99", tag: "Nuevo" },
  { id: 2, name: "Ninja Legendario - Modo Sabio", price: "$149.99", tag: "Popular" },
  { id: 3, name: "Capitán Pirata - Gear 5", price: "$219.99", tag: "Pre-orden" },
  { id: 4, name: "Espadachín del Infierno - Armadura Completa", price: "$299.99", tag: "Exclusivo" },
];

const MarketplaceSection = () => {
  return (
    <section className="border-t border-border bg-muted/30 py-16">
      <div className="container">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-secondary">
          Marketplace
        </h2>
        <h3 className="mb-8 text-3xl font-bold text-foreground">
          Figuras Destacadas
        </h3>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {figures.map((fig) => (
            <div
              key={fig.id}
              className="group rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-primary/40 hover:shadow-card"
            >
              <div className="mb-4 flex h-48 items-center justify-center rounded-md bg-muted">
                <span className="text-4xl opacity-30">🗡️</span>
              </div>
              <span className="inline-block rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">
                {fig.tag}
              </span>
              <h4 className="mt-2 text-sm font-medium text-foreground">{fig.name}</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-secondary">{fig.price}</span>
                <Button size="sm" variant="outline" className="gap-1 border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground">
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Añadir
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;
