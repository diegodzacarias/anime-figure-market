import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import berserkImg from "@/assets/berserk.jpg";
import narutoImg from "@/assets/naruto.jpg";
import onepieceImg from "@/assets/onepiece.jpg";
import { getFranchises } from "@/api/franchiseApi";

/**
 * Sistema Airbnb (ver design-references/airbnb-DESIGN.md). Hero modesto (h1 28px como el
 * homepage de Airbnb) sobre canvas blanco, y las franquicias renderizadas como
 * `property-card`: foto rounded-[14px], badge flotante, y meta debajo. Usa tokens globales.
 */

type Franchise = {
  id: number | string;
  name: string;
  imageUrl?: string;
};

const fallbackImages: Record<string, string> = {
  Berserk: berserkImg,
  Naruto: narutoImg,
  "One Piece": onepieceImg,
};

const AnimeHero = () => {
  const navigate = useNavigate();
  const [animeList, setAnimeList] = useState<Franchise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  return (
    <section className="py-14 md:py-16">
      <div className="mx-auto max-w-[1120px] px-6">
        <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
          Explora por universo
        </p>
        <h1 className="mt-1 text-2xl font-bold leading-tight text-foreground md:text-[28px]">
          Elige tu <span className="text-primary">Anime</span>
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Compara precios de figuras entre tiendas, por franquicia.
        </p>

        {loading ? (
          <div className="mt-10 flex min-h-52 items-center justify-center rounded-[14px] bg-muted text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Cargando franquicias...
          </div>
        ) : animeList.length === 0 ? (
          <div className="mt-10 rounded-[14px] border border-border p-10 text-center text-sm text-muted-foreground">
            No hay franquicias registradas todavia.
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {animeList.map((anime) => (
              <button
                key={anime.id}
                type="button"
                onClick={() => navigate(`/anime/${anime.id}`)}
                className="group flex flex-col overflow-hidden rounded-[16px] border border-border bg-card text-left shadow-airbnb transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={anime.imageUrl || fallbackImages[anime.name]}
                    alt={anime.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    width={640}
                    height={800}
                  />
                </div>
                <div className="flex items-center justify-center px-5 py-5 text-center">
                  <h3 className="text-xl font-bold text-foreground md:text-2xl">{anime.name}</h3>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AnimeHero;
