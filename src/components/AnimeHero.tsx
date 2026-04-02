import { useNavigate } from "react-router-dom";
import berserkImg from "@/assets/berserk.jpg";
import narutoImg from "@/assets/naruto.jpg";
import onepieceImg from "@/assets/onepiece.jpg";

const animeList = [
  { id: "berserk", name: "Berserk", image: berserkImg, subtitle: "La Espada del Guerrero Negro" },
  { id: "naruto", name: "Naruto", image: narutoImg, subtitle: "El Camino del Ninja" },
  { id: "one-piece", name: "One Piece", image: onepieceImg, subtitle: "La Gran Era Pirata" },
];

const AnimeHero = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-primary">
          Explora por universo
        </h2>
        <h1 className="mb-10 text-center text-4xl font-bold text-foreground md:text-5xl">
          Elige tu <span className="text-primary">Anime</span>
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {animeList.map((anime) => (
            <button
              key={anime.id}
              onClick={() => navigate(`/anime/${anime.id}`)}
              className="group relative overflow-hidden rounded-lg shadow-card transition-all duration-300 hover:scale-[1.03] hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <img
                src={anime.image}
                alt={anime.name}
                className="h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                width={640}
                height={896}
              />
              <div className="anime-card-overlay absolute inset-0 flex flex-col items-center justify-end p-6">
                <h3 className="text-2xl font-bold text-foreground">{anime.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{anime.subtitle}</p>
                <span className="mt-3 rounded-full bg-primary/20 px-4 py-1 text-xs font-medium text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  Ver colección →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimeHero;
