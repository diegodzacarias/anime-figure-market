import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const animeNames: Record<string, string> = {
  berserk: "Berserk",
  naruto: "Naruto",
  "one-piece": "One Piece",
};

const AnimeDetail = () => {
  const { animeId } = useParams<{ animeId: string }>();
  const animeName = animeNames[animeId || ""] || animeId;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-20">
        <Link to="/">
          <Button variant="ghost" className="mb-8 gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </Link>

        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-16 text-center shadow-card">
          <h1 className="mb-4 text-5xl font-bold text-foreground">{animeName}</h1>
          <p className="text-xl text-muted-foreground">
            🚧 To be continued... 🚧
          </p>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Aquí se consumirá una API para mostrar datos de <span className="text-primary font-semibold">{animeName}</span>. 
            Próximamente: personajes, episodios y más.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
