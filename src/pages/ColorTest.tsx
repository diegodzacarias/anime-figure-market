import { CSSProperties, type ComponentType } from "react";
import { ExternalLink, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";

/**
 * Banco de pruebas de color. Muestra alternativas al rojo Rausch clasico de Airbnb,
 * cada una como una seccion con los componentes reales del sitio (botones, pills,
 * badges de precio, enlaces, precio, corazon) coloreados con esa paleta, para poder
 * comparar en contexto antes de adoptar una como token global.
 *
 * Grupo 1 = planas (estilo Airbnb, relleno solido). Grupo 2 = rompen el plano con
 * degradado + glow neon (mas energia anime, se aleja del look Airbnb).
 */

type Palette = {
  name: string;
  tagline: string;
  accent: string; // acento representativo solido (enlaces, chips, corazon, texto)
  accentHover: string; // estado :hover / press para las variantes planas
  soft: string; // tinte suave para badges suaves y foco
  gradient?: [string, string]; // si existe: botones/pills/precio usan degradado + glow
  glow?: string; // color rgba del glow neon
};

const flatPalettes: Palette[] = [
  {
    name: "Alternativa 1 — Teal Estudio",
    tagline: "Fresco y tech, se distingue del rojo por completo.",
    accent: "#0D9488",
    accentHover: "#0F766E",
    soft: "#F0FDFA",
  },
  {
    name: "Alternativa 2 — Amatista Anime",
    tagline: "Purpura vibrante, tematica otaku sin gritar.",
    accent: "#9333EA",
    accentHover: "#7E22CE",
    soft: "#FAF5FF",
  },
  {
    name: "Alternativa 3 — Atardecer Coral",
    tagline: "Naranja calido: mantiene energia, baja agresividad.",
    accent: "#EA580C",
    accentHover: "#C2410C",
    soft: "#FFF7ED",
  },
  {
    name: "Alternativa 4 — Neon Fucsia Synthwave",
    tagline: "Magenta neon de portada vaporwave / idol.",
    accent: "#C026D3",
    accentHover: "#A21CAF",
    soft: "#FDF4FF",
  },
  {
    name: "Alternativa 5 — Cian Ciberpunk",
    tagline: "Cian electrico estilo mecha / cabello anime.",
    accent: "#0891B2",
    accentHover: "#0E7490",
    soft: "#ECFEFF",
  },
  {
    name: "Alternativa 6 — Cafe Caramelo",
    tagline: "Marron claro calido, tono caramelo acogedor.",
    accent: "#A16648",
    accentHover: "#85502F",
    soft: "#FAF0E6",
  },
  {
    name: "Alternativa 7 — Club Universitario (crema)",
    tagline: "Tematica los cremas: crema de fondo, granate de acento.",
    accent: "#8C2332",
    accentHover: "#6E1B27",
    soft: "#FBF3E0",
  },
];

const gradientPalettes: Palette[] = [
  {
    name: "Degradado 1 — Atardecer Neon",
    tagline: "Naranja a rosa, cielo de ending romantico.",
    accent: "#F43F5E",
    accentHover: "#E11D48",
    soft: "#FFF1F2",
    gradient: ["#FB923C", "#EC4899"],
    glow: "rgba(244, 63, 94, 0.42)",
  },
  {
    name: "Degradado 2 — Mahou Violeta",
    tagline: "Violeta a rosa neon, transformacion magical girl.",
    accent: "#8B5CF6",
    accentHover: "#7C3AED",
    soft: "#F5F3FF",
    gradient: ["#8B5CF6", "#EC4899"],
    glow: "rgba(139, 92, 246, 0.45)",
  },
  {
    name: "Degradado 3 — Medianoche Violeta",
    tagline: "Oscuro: indigo profundo a violeta, noche de batalla.",
    accent: "#6D28D9",
    accentHover: "#5B21B6",
    soft: "#F5F3FF",
    gradient: ["#312E81", "#7C3AED"],
    glow: "rgba(76, 29, 149, 0.5)",
  },
  {
    name: "Degradado 4 — Cian Nocturno",
    tagline: "Oscuro: cian electrico a casi-negro, HUD cyberpunk.",
    accent: "#0E7490",
    accentHover: "#155E75",
    soft: "#ECFEFF",
    gradient: ["#0891B2", "#0F172A"],
    glow: "rgba(8, 145, 178, 0.5)",
  },
  {
    name: "Degradado 5 — Vino Carmesi",
    tagline: "Rojizo oscuro: sangre a carmesi, vampiro / mecha.",
    accent: "#DC2626",
    accentHover: "#B91C1C",
    soft: "#FEF2F2",
    gradient: ["#7F1D1D", "#DC2626"],
    glow: "rgba(220, 38, 38, 0.45)",
  },
  {
    name: "Degradado 6 — Caramelo Fundido",
    tagline: "Caramelo claro a chocolate, dulce y calido.",
    accent: "#8A5A38",
    accentHover: "#6F4A2F",
    soft: "#FAF0E6",
    gradient: ["#C88A5A", "#6F4A2F"],
    glow: "rgba(139, 90, 56, 0.4)",
  },
];

type PaletteVars = CSSProperties & { [key: `--ct-${string}`]: string };

const Swatch = ({ hex, label }: { hex: string; label: string }) => (
  <div className="flex items-center gap-2">
    <span
      className="h-9 w-9 shrink-0 rounded-lg border border-border"
      style={{ background: hex }}
    />
    <div className="leading-tight">
      <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
        {label}
      </p>
      <p className="font-mono text-[13px] text-foreground">{hex}</p>
    </div>
  </div>
);

/* ===== Adornos para el precio (alternativas al laurel de Airbnb) ===== */

type OrnamentProps = { flip?: boolean };

const ornCls = (flip: boolean) => `h-14 w-6 text-primary ${flip ? "-scale-x-100" : ""}`;

/** Destello de 4 puntas (estilo "kirakira" anime). */
const Sparkle = ({ cx, cy, s }: { cx: number; cy: number; s: number }) => {
  const i = s * 0.28;
  return (
    <path
      d={`M${cx} ${cy - s} C ${cx} ${cy - i} ${cx + i} ${cy} ${cx + s} ${cy} C ${cx + i} ${cy} ${cx} ${cy + i} ${cx} ${cy + s} C ${cx} ${cy + i} ${cx - i} ${cy} ${cx - s} ${cy} C ${cx - i} ${cy} ${cx} ${cy - i} ${cx} ${cy - s} Z`}
      fill="currentColor"
    />
  );
};

/** Laurel Airbnb actual (referencia). */
const Laurel = ({ flip = false }: OrnamentProps) => (
  <svg viewBox="0 0 24 60" className={ornCls(flip)} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
    <path d="M18 4C7 15 7 45 18 56" />
    <path d="M17 12c-6 1-8 5-6 9" />
    <path d="M15.5 22c-6 1-8 5-6 9" />
    <path d="M14.5 32c-6 1-8 5-6 9" />
    <path d="M15 42c-5 1-7 5-5 8" />
  </svg>
);

/** Rama de cerezo con flores. */
const Sakura = ({ flip = false }: OrnamentProps) => (
  <svg viewBox="0 0 24 60" className={ornCls(flip)} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
    <path d="M20 5C11 16 9 40 16 55" />
    <path d="M15 20c-4-1-7 1-9 4" />
    <path d="M13 36c-4 0-7 2-8 5" />
    <circle cx="5" cy="24" r="2.4" fill="currentColor" stroke="none" />
    <circle cx="4" cy="41" r="2.4" fill="currentColor" stroke="none" />
    <circle cx="16" cy="11" r="2.4" fill="currentColor" stroke="none" />
    <circle cx="17" cy="49" r="2" fill="currentColor" stroke="none" />
  </svg>
);

/** Destellos "kirakira" (3 estrellas de brillo). */
const Kirakira = ({ flip = false }: OrnamentProps) => (
  <svg viewBox="0 0 24 60" className={ornCls(flip)} aria-hidden="true">
    <Sparkle cx={13} cy={14} s={7} />
    <Sparkle cx={7} cy={32} s={5} />
    <Sparkle cx={14} cy={46} s={4} />
  </svg>
);

/** Líneas de acción de manga (speed lines). */
const SpeedLines = ({ flip = false }: OrnamentProps) => (
  <svg viewBox="0 0 24 60" className={ornCls(flip)} fill="none" stroke="currentColor" strokeLinecap="round" aria-hidden="true">
    <path d="M22 12H9" strokeWidth="2.4" />
    <path d="M22 22H4" strokeWidth="2" />
    <path d="M22 32H11" strokeWidth="1.6" />
    <path d="M22 42H5" strokeWidth="2" />
    <path d="M22 52H12" strokeWidth="1.4" />
  </svg>
);

/** Rayo de energía (shonen). */
const Lightning = ({ flip = false }: OrnamentProps) => (
  <svg viewBox="0 0 24 60" className={ornCls(flip)} aria-hidden="true">
    <path d="M14 3 L5 34 L11 34 L8 57 L20 25 L13 25 Z" fill="currentColor" />
  </svg>
);

/** Estrella fugaz con estela. */
const ShootingStar = ({ flip = false }: OrnamentProps) => (
  <svg viewBox="0 0 24 60" className={ornCls(flip)} aria-hidden="true">
    <Sparkle cx={16} cy={12} s={6} />
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6">
      <path d="M13 18 L4 44" />
      <path d="M18 20 L11 40" />
      <path d="M9 24 L5 36" />
    </g>
  </svg>
);

const ornaments: { name: string; tagline: string; Comp: ComponentType<OrnamentProps> }[] = [
  { name: "Laurel (actual)", tagline: "El de Airbnb, referencia.", Comp: Laurel },
  { name: "Sakura", tagline: "Rama de cerezo, muy anime.", Comp: Sakura },
  { name: "Kirakira", tagline: "Destellos brillantes shoujo.", Comp: Kirakira },
  { name: "Lineas de accion", tagline: "Speed lines de manga.", Comp: SpeedLines },
  { name: "Rayo", tagline: "Energia shonen.", Comp: Lightning },
  { name: "Estrella fugaz", tagline: "Estrella con estela.", Comp: ShootingStar },
];

const PaletteSection = ({ palette }: { palette: Palette }) => {
  const grad = palette.gradient;
  const gradientCss = grad ? `linear-gradient(135deg, ${grad[0]}, ${grad[1]})` : palette.accent;

  const style: PaletteVars = {
    "--ct-accent": palette.accent,
    "--ct-accent-hover": palette.accentHover,
    "--ct-soft": palette.soft,
    "--ct-btn-bg": gradientCss,
    "--ct-btn-bg-hover": grad ? gradientCss : palette.accentHover,
    "--ct-price-fill": gradientCss,
    "--ct-glow-rest": grad && palette.glow ? `0 6px 20px ${palette.glow}` : "none",
    "--ct-glow-hover": grad && palette.glow ? `0 10px 34px ${palette.glow}` : "none",
    "--ct-glow-sm": grad && palette.glow ? `0 2px 12px ${palette.glow}` : "none",
  };

  return (
    <section
      style={style}
      className="rounded-[20px] border border-border bg-card p-6 shadow-airbnb md:p-8"
    >
      <header className="mb-6">
        <h2 className="text-xl font-bold text-foreground">{palette.name}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{palette.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-5">
          {grad ? (
            <>
              <Swatch hex={grad[0]} label="Degradado ini" />
              <Swatch hex={grad[1]} label="Degradado fin" />
              <Swatch hex={palette.accent} label="Acento solido" />
            </>
          ) : (
            <>
              <Swatch hex={palette.accent} label="Acento" />
              <Swatch hex={palette.accentHover} label="Hover / press" />
              <Swatch hex={palette.soft} label="Tinte suave" />
            </>
          )}
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Botones */}
        <div>
          <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
            Botones
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="ct-btn flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium text-white transition-all"
            >
              Ver en tienda
              <ExternalLink className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="ct-outline flex h-11 items-center justify-center rounded-lg border px-5 text-sm font-medium transition-colors"
            >
              Ver coleccion →
            </button>
            <button
              type="button"
              className="ct-link text-sm font-semibold transition-colors"
            >
              Referencia →
            </button>
          </div>
        </div>

        {/* Badges / pills */}
        <div>
          <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
            Badges y pills
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="ct-pill inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold text-white">
              Mejor precio
            </span>
            <span className="ct-soft-pill inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold">
              <Heart className="h-3.5 w-3.5 fill-current" />
              Franquicia
            </span>
            <span className="ct-chip inline-flex items-center rounded-full border px-3 py-1 text-[12px] font-medium">
              G.E.M.
            </span>
          </div>
        </div>

        {/* Precio y acento */}
        <div>
          <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
            Precio destacado
          </p>
          <div className="flex items-end gap-3">
            <p className="ct-price text-4xl font-bold leading-none tracking-tight">$189.00</p>
            <span className="ct-heart text-2xl leading-none">♥</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Mejor precio entre 6 tiendas</p>
        </div>

        {/* Enlaces / foco */}
        <div>
          <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
            Enlace y foco
          </p>
          <p className="text-sm text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <span className="ct-link cursor-pointer font-semibold transition-colors">
              Registrate
            </span>
          </p>
          <input
            className="ct-input mt-3 h-11 w-full rounded-lg border border-border bg-muted px-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground"
            placeholder="Foco con el acento (haz clic aqui)"
          />
        </div>
      </div>
    </section>
  );
};

const ColorTest = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Reglas de color por seccion via CSS vars (permite estados :hover / :focus reales). */}
      <style>{`
        .ct-btn { background: var(--ct-btn-bg); box-shadow: var(--ct-glow-rest); }
        .ct-btn:hover { background: var(--ct-btn-bg-hover); box-shadow: var(--ct-glow-hover); }
        .ct-outline { border-color: var(--ct-accent); color: var(--ct-accent); }
        .ct-outline:hover { background: var(--ct-soft); }
        .ct-link { color: var(--ct-accent); }
        .ct-link:hover { color: var(--ct-accent-hover); }
        .ct-pill { background: var(--ct-btn-bg); box-shadow: var(--ct-glow-sm); }
        .ct-soft-pill { background: var(--ct-soft); color: var(--ct-accent); }
        .ct-chip { border-color: var(--ct-accent); color: var(--ct-accent); }
        .ct-price {
          background: var(--ct-price-fill);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .ct-heart { color: var(--ct-accent); }
        .ct-input:focus { border-color: var(--ct-accent); box-shadow: 0 0 0 3px var(--ct-soft); }
      `}</style>

      <main className="mx-auto max-w-[1120px] px-6 py-8 md:py-10">
        <Breadcrumbs
          items={[
            { label: "Inicio", to: "/" },
            { label: "ColorTest" },
          ]}
        />

        <div className="mb-8">
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
            Banco de pruebas
          </p>
          <h1 className="mt-1 text-2xl font-bold leading-tight text-foreground md:text-[28px]">
            Alternativas de <span className="text-primary">color de acento</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Cada seccion reemplaza el rojo Rausch por una paleta distinta, aplicada a los
            componentes reales del sitio. Comparalas en contexto y dime cual adoptamos como
            token global.
          </p>
        </div>

        {/* ===== Adornos para el precio (detalle de figura) ===== */}
        <section className="mb-10">
          <div className="mb-4">
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
              Detalle de figura
            </p>
            <h2 className="mt-1 text-xl font-bold text-foreground">Adornos para el precio</h2>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Alternativas al laurel de Airbnb, con onda anime. Cada uno flanquea el "Mejor precio"
              tal como en el detalle de figura. Dime cual adoptamos.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ornaments.map(({ name, tagline, Comp }) => (
              <div
                key={name}
                className="rounded-[16px] border border-border bg-card p-6 shadow-airbnb"
              >
                <div className="flex items-center justify-center gap-2">
                  <Comp />
                  <div className="text-center">
                    <p className="text-3xl font-bold leading-none text-foreground">$189.00</p>
                    <p className="mt-1.5 text-sm font-medium text-foreground">Mejor precio</p>
                  </div>
                  <Comp flip />
                </div>
                <div className="mt-5 border-t border-border pt-3 text-center">
                  <p className="text-sm font-semibold text-foreground">{name}</p>
                  <p className="text-[13px] text-muted-foreground">{tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Referencia: el acento actual (Rausch) */}
        <section className="mb-8 rounded-[20px] border border-dashed border-border p-6 md:p-8">
          <h2 className="text-lg font-bold text-foreground">Actual — Rausch (referencia)</h2>
          <p className="mt-1 text-sm text-muted-foreground">El rojo clasico de Airbnb en uso hoy.</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-rausch-active"
            >
              Ver en tienda
              <ExternalLink className="h-4 w-4" />
            </button>
            <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground">
              Mejor precio
            </span>
            <p className="text-3xl font-bold text-primary">$189.00</p>
            <span className="text-2xl text-primary">♥</span>
          </div>
        </section>

        {/* Grupo 1: planas */}
        <div className="mb-4">
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
            Planas — estilo Airbnb
          </p>
          <h2 className="mt-1 text-xl font-bold text-foreground">Relleno solido, sin brillo</h2>
        </div>
        <div className="space-y-8">
          {flatPalettes.map((palette) => (
            <PaletteSection key={palette.name} palette={palette} />
          ))}
        </div>

        {/* Grupo 2: degradado + glow */}
        <div className="mb-4 mt-12 border-t border-border pt-10">
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
            Rompiendo el plano
          </p>
          <h2 className="mt-1 text-xl font-bold text-foreground">Con degradado y glow neon</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Se aleja del look Airbnb plano a cambio de mas energia anime. El boton principal, las
            pills y el precio usan un degradado con un halo de color suave.
          </p>
        </div>
        <div className="space-y-8">
          {gradientPalettes.map((palette) => (
            <PaletteSection key={palette.name} palette={palette} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ColorTest;
