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
                className="group text-left focus:outline-none"
              >
                <div className="relative overflow-hidden rounded-[14px] bg-muted">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={anime.imageUrl || fallbackImages[anime.name]}
                      alt={anime.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      width={640}
                      height={800}
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-foreground">{anime.name}</h3>
                  <span className="shrink-0 text-sm font-medium text-primary transition-colors group-hover:text-rausch-active">
                    Ver coleccion →
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">Explora las figuras de este universo</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AnimeHero;
