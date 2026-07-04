import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import ApiErrorToast from "@/components/ui/api-error-toast";
import { ApiErrorResponse, readApiErrorResponse, toClientApiError } from "@/lib/apiError";
import { formatDateTime } from "@/lib/date";
import { usePreferences, type CurrencyCode } from "@/lib/preferences";

/**
 * PRUEBA DE DISEÑO — sistema Airbnb (design-references/airbnb-DESIGN.md).
 * Restructura de layout tipo "listing detail" de Airbnb (no solo reskin):
 *   - canvas blanco #ffffff · ink #222222 · body #3f3f3f · muted #6a6a6a
 *   - hairline #dddddd · surface-soft #f7f7f7 · acento Rausch #ff385c
 * Patrones aplicados: imagen suave rounded, titulo modesto, `reservation-card`
 * sticky a la derecha, el momento tipografico de 64px (rating-display) usado
 * para el MEJOR PRECIO con laureles, y tiendas como filas con divisor hairline.
 * Tokens explicitos scoped a esta pagina (no toca el theme global).
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://figure-market-core.onrender.com/api";

const FIGURES_ENDPOINT = `${API_BASE_URL}/v1/figures`;
const FIGURE_SOURCE_LISTINGS_ENDPOINT = `${API_BASE_URL}/v1/figure-source-listings`;
const FALLBACK_IMAGE_URL = `${import.meta.env.BASE_URL}placeholder.svg`;
const TOP_LISTINGS_LIMIT = 4;

type Figure = {
  id?: number;
  name?: string;
  slug?: string;
  scene?: string | null;
  lineName?: string | null;
  material?: string | null;
  status?: string | null;
  sourceReferenceUrl?: string | null;
  primaryImageUrl?: string | null;
};

type FigureImage = {
  imageUrl?: string | null;
  altText?: string | null;
};

type FigureSourceListingPrice = {
  id?: number;
  figureId?: number;
  figureName?: string | null;
  figureSlug?: string | null;
  sourceId?: number;
  sourceItemId?: string | null;
  sourceName?: string | null;
  sourceTitle?: string | null;
  sourceUrl?: string | null;
  price?: number | null;
  currencyCode?: string | null;
  convertedPrice?: number | null;
  convertedCurrencyCode?: string | null;
  exchangeRate?: number | null;
  exchangeRateSource?: string | null;
  preorderDate?: string | null;
  estimatedReleaseDate?: string | null;
  listingStatus?: string | null;
  isAvailable?: boolean | null;
  editionText?: string | null;
  releaseText?: string | null;
  capturedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

const formatOriginalPrice = (listing: FigureSourceListingPrice) => {
  if (listing.price === undefined || listing.price === null) return "Precio no registrado";

  return `${listing.price} ${listing.currencyCode || ""}`.trim();
};

const formatConvertedPrice = (listing: FigureSourceListingPrice) => {
  if (listing.convertedPrice === undefined || listing.convertedPrice === null) {
    return "Conversion no disponible";
  }

  return `${listing.convertedPrice} ${listing.convertedCurrencyCode || ""}`.trim();
};

const getAvailabilityLabel = (value: FigureSourceListingPrice["isAvailable"]) => {
  if (value === true) return "Disponible";
  if (value === false) return "No disponible";
  return "Disponibilidad no indicada";
};

const getSourceName = (listing: FigureSourceListingPrice) =>
  listing.sourceName || `Source ${listing.sourceId || ""}`.trim() || "Source";

const buildTopRankingUrl = (figureId: string, currencyCode: CurrencyCode, limit: number) => {
  const params = new URLSearchParams({
    figureId,
    currencyCode,
    limit: limit.toString(),
  });

  return `${FIGURE_SOURCE_LISTINGS_ENDPOINT}/price-ranking/top?${params.toString()}`;
};

const buildOtherRankingUrl = (figureId: string, currencyCode: CurrencyCode, excludedTopLimit: number) => {
  const params = new URLSearchParams({
    figureId,
    currencyCode,
    excludedTopLimit: excludedTopLimit.toString(),
  });

  return `${FIGURE_SOURCE_LISTINGS_ENDPOINT}/price-ranking/others?${params.toString()}`;
};

/** Laurel wreath ornament flanking the rating-display number — Airbnb's signature moment. */
const Laurel = ({ flip = false }: { flip?: boolean }) => (
  <svg
    viewBox="0 0 24 60"
    className={`h-14 w-6 text-[#222222] ${flip ? "-scale-x-100" : ""}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M18 4C7 15 7 45 18 56" />
    <path d="M17 12c-6 1-8 5-6 9" />
    <path d="M15.5 22c-6 1-8 5-6 9" />
    <path d="M14.5 32c-6 1-8 5-6 9" />
    <path d="M15 42c-5 1-7 5-5 8" />
  </svg>
);

/** A store price row — Airbnb amenity/list-row style with a hairline divider. */
type StoreRowProps = {
  listing: FigureSourceListingPrice;
  best?: boolean;
  detailed?: boolean;
};

const StoreRow = ({ listing, best = false, detailed = false }: StoreRowProps) => (
  <article className="flex items-start justify-between gap-4 border-b border-[#ebebeb] py-5 last:border-b-0">
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="truncate text-base font-semibold text-[#222222]">{getSourceName(listing)}</h3>
        {best && (
          <span className="rounded-full border border-[#dddddd] bg-white px-2.5 py-0.5 text-[11px] font-semibold text-[#222222] shadow-airbnb">
            Mejor precio
          </span>
        )}
      </div>
      <p className="mt-1 line-clamp-2 text-sm text-[#6a6a6a]">
        {listing.sourceTitle || "Sin titulo de source"}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#6a6a6a]">
        <span className="inline-flex items-center gap-1.5">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              listing.isAvailable === true
                ? "bg-[#008a05]"
                : listing.isAvailable === false
                  ? "bg-[#c13515]"
                  : "bg-[#c1c1c1]"
            }`}
          />
          {getAvailabilityLabel(listing.isAvailable)}
        </span>
        {listing.listingStatus && <span>· {listing.listingStatus}</span>}
        {detailed && listing.exchangeRateSource && <span>· FX {listing.exchangeRateSource}</span>}
        {detailed && listing.editionText && <span>· {listing.editionText}</span>}
        {detailed && listing.preorderDate && <span>· Preorder {formatDateTime(listing.preorderDate)}</span>}
        {detailed && listing.estimatedReleaseDate && (
          <span>· Release {formatDateTime(listing.estimatedReleaseDate)}</span>
        )}
      </div>
    </div>

    <div className="shrink-0 text-right">
      <p className={`text-lg font-semibold ${best ? "text-[#ff385c]" : "text-[#222222]"}`}>
        {formatConvertedPrice(listing)}
      </p>
      <p className="text-[13px] text-[#6a6a6a]">Origen {formatOriginalPrice(listing)}</p>
      {listing.sourceUrl && (
        <a
          href={listing.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#222222] px-4 py-1.5 text-[13px] font-medium text-[#222222] transition-colors hover:bg-[#f7f7f7]"
        >
          Ver tienda
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  </article>
);

const FigureDetail = () => {
  const { figureId } = useParams<{ figureId: string }>();
  const navigate = useNavigate();
  const allSourcesRef = useRef<HTMLElement | null>(null);
  const { currencyCode } = usePreferences();
  const [figure, setFigure] = useState<Figure | null>(null);
  const [imageUrl, setImageUrl] = useState(FALLBACK_IMAGE_URL);
  const [topListings, setTopListings] = useState<FigureSourceListingPrice[]>([]);
  const [otherListings, setOtherListings] = useState<FigureSourceListingPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [rankingLoading, setRankingLoading] = useState(true);
  const [apiError, setApiError] = useState<ApiErrorResponse | null>(null);

  const totalListings = topListings.length + otherListings.length;
  const bestListing = topListings[0] ?? null;
  const topRankingUrl = useMemo(
    () => (figureId ? buildTopRankingUrl(figureId, currencyCode, TOP_LISTINGS_LIMIT) : ""),
    [currencyCode, figureId]
  );
  const otherRankingUrl = useMemo(
    () => (figureId ? buildOtherRankingUrl(figureId, currencyCode, TOP_LISTINGS_LIMIT) : ""),
    [currencyCode, figureId]
  );

  useEffect(() => {
    if (!figureId) return;

    const loadFigureDetail = async () => {
      setLoading(true);
      setApiError(null);
      setFigure(null);
      setImageUrl(FALLBACK_IMAGE_URL);

      try {
        const figureResponse = await fetch(`${FIGURES_ENDPOINT}/${figureId}`);

        if (!figureResponse.ok) {
          setApiError(await readApiErrorResponse(figureResponse, "Error loading figure."));
          return;
        }

        const nextFigure = (await figureResponse.json()) as Figure;

        setFigure(nextFigure);

        if (nextFigure.primaryImageUrl) {
          setImageUrl(nextFigure.primaryImageUrl);
          return;
        }

        const imageResponse = await fetch(`${FIGURES_ENDPOINT}/${figureId}/images/primary`);

        if (imageResponse.ok) {
          const imageData = (await imageResponse.json()) as FigureImage;
          setImageUrl(imageData.imageUrl || FALLBACK_IMAGE_URL);
        }
      } catch (error) {
        setApiError(toClientApiError(error, "Error connecting to backend."));
      } finally {
        setLoading(false);
      }
    };

    loadFigureDetail();
  }, [figureId]);

  useEffect(() => {
    if (!figureId || !topRankingUrl || !otherRankingUrl) return;

    const loadPriceRanking = async () => {
      setRankingLoading(true);
      setApiError(null);
      setTopListings([]);
      setOtherListings([]);

      try {
        const [topResponse, otherResponse] = await Promise.all([
          fetch(topRankingUrl),
          fetch(otherRankingUrl),
        ]);

        if (!topResponse.ok) {
          setApiError(await readApiErrorResponse(topResponse, "Error loading top price ranking."));
          return;
        }

        if (!otherResponse.ok) {
          setApiError(await readApiErrorResponse(otherResponse, "Error loading other price listings."));
          return;
        }

        setTopListings((await topResponse.json()) as FigureSourceListingPrice[]);
        setOtherListings((await otherResponse.json()) as FigureSourceListingPrice[]);
      } catch (error) {
        setApiError(toClientApiError(error, "Error connecting to backend."));
      } finally {
        setRankingLoading(false);
      }
    };

    loadPriceRanking();
  }, [figureId, otherRankingUrl, topRankingUrl]);

  const scrollToAllSources = () => {
    allSourcesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white text-[#222222]">
      <Navbar />
      <ApiErrorToast error={apiError} onClose={() => setApiError(null)} />

      <main className="mx-auto max-w-[1120px] px-6 py-8 md:py-10">
        <button
          type="button"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#222222] transition-colors hover:text-[#6a6a6a]"
          onClick={() => navigate(-1)}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f2f2]">
            <ArrowLeft className="h-4 w-4" />
          </span>
          Volver
        </button>

        {loading ? (
          <div className="flex min-h-[24rem] items-center justify-center rounded-[20px] bg-[#f7f7f7] text-sm text-[#6a6a6a]">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Cargando detalle...
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#6a6a6a]">Figura</p>
              <h1 className="mt-1 max-w-3xl text-2xl font-bold leading-tight text-[#222222] md:text-[28px]">
                {figure?.name || "Untitled figure"}
              </h1>
              {(figure?.status || figure?.sourceReferenceUrl) && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {figure?.status && (
                    <span className="rounded-full border border-[#dddddd] px-3 py-1 text-[13px] font-medium text-[#222222]">
                      {figure.status}
                    </span>
                  )}
                  {figure?.sourceReferenceUrl && (
                    <a
                      href={figure.sourceReferenceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#222222] underline underline-offset-2 hover:text-[#6a6a6a]"
                    >
                      Referencia
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(20rem,1fr)] lg:items-start lg:gap-12">
              {/* Columna izquierda: imagen + listado de tiendas */}
              <div>
                <div className="relative overflow-hidden rounded-[20px] bg-[#f7f7f7]">
                  <div className="aspect-[4/5]">
                    <img
                      src={imageUrl}
                      alt={figure?.name || "Figure image"}
                      className="h-full w-full object-contain"
                      onError={(event) => {
                        event.currentTarget.src = FALLBACK_IMAGE_URL;
                      }}
                    />
                  </div>
                  {bestListing && (
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold text-[#222222] shadow-airbnb">
                      <span className="text-[#ff385c]">♥</span>
                      Mejor precio {formatConvertedPrice(bestListing)}
                    </span>
                  )}
                </div>

                <section className="mt-10">
                  <h2 className="text-xl font-bold text-[#222222]">Compara tiendas</h2>
                  <p className="mt-1 text-sm text-[#6a6a6a]">
                    {totalListings > 0
                      ? `${totalListings} ${totalListings === 1 ? "tienda comparada" : "tiendas comparadas"}, ordenadas por precio convertido.`
                      : "Datos registrados por tienda o fuente para esta figura."}
                  </p>

                  {rankingLoading ? (
                    <div className="mt-4 flex min-h-40 items-center justify-center rounded-[14px] bg-[#f7f7f7] text-sm text-[#6a6a6a]">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cargando ranking...
                    </div>
                  ) : topListings.length === 0 ? (
                    <div className="mt-4 rounded-[14px] border border-[#dddddd] p-8 text-center text-sm text-[#6a6a6a]">
                      No hay tiendas ni precios registrados para esta figura.
                    </div>
                  ) : (
                    <div className="mt-2 border-t border-[#ebebeb]">
                      {topListings.map((listing, index) => (
                        <StoreRow key={listing.id} listing={listing} best={index === 0} />
                      ))}
                    </div>
                  )}

                  {otherListings.length > 0 && (
                    <button
                      type="button"
                      className="mt-6 inline-flex h-12 items-center justify-center rounded-lg border border-[#222222] px-6 text-base font-medium text-[#222222] transition-colors hover:bg-[#f7f7f7]"
                      onClick={scrollToAllSources}
                    >
                      Ver otras {otherListings.length} tiendas
                    </button>
                  )}
                </section>

                {otherListings.length > 0 && (
                  <section ref={allSourcesRef} className="mt-10 border-t border-[#dddddd] pt-8">
                    <h2 className="text-xl font-bold text-[#222222]">Otras tiendas</h2>
                    <p className="mt-1 text-sm text-[#6a6a6a]">
                      Restantes, excluyendo el Top {TOP_LISTINGS_LIMIT}, ordenadas por precio convertido.
                    </p>
                    <div className="mt-2 border-t border-[#ebebeb]">
                      {otherListings.map((listing) => (
                        <StoreRow key={listing.id} listing={listing} detailed />
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Columna derecha: reservation-card sticky con el mejor precio */}
              <aside className="lg:sticky lg:top-24">
                <div className="rounded-[16px] border border-[#dddddd] p-6 shadow-airbnb">
                  {rankingLoading ? (
                    <div className="flex min-h-52 items-center justify-center text-sm text-[#6a6a6a]">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cargando precio...
                    </div>
                  ) : bestListing ? (
                    <>
                      <div className="flex items-center justify-center gap-2 pb-4 text-center">
                        <Laurel />
                        <div>
                          <p className="text-4xl font-bold leading-none tracking-tight text-[#222222] md:text-5xl">
                            {formatConvertedPrice(bestListing)}
                          </p>
                          <p className="mt-2 text-sm font-medium text-[#222222]">Mejor precio</p>
                        </div>
                        <Laurel flip />
                      </div>

                      <div className="border-t border-[#ebebeb] pt-4">
                        <p className="text-base font-semibold text-[#222222]">{getSourceName(bestListing)}</p>
                        <p className="mt-1 line-clamp-2 text-sm text-[#6a6a6a]">
                          {bestListing.sourceTitle || "Sin titulo de source"}
                        </p>
                        <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-[#6a6a6a]">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              bestListing.isAvailable === true ? "bg-[#008a05]" : "bg-[#c1c1c1]"
                            }`}
                          />
                          {getAvailabilityLabel(bestListing.isAvailable)}
                        </p>
                      </div>

                      {bestListing.sourceUrl && (
                        <a
                          href={bestListing.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#ff385c] text-base font-medium text-white transition-colors hover:bg-[#e00b41]"
                        >
                          Ver en tienda
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}

                      <dl className="mt-5 space-y-2 border-t border-[#ebebeb] pt-4 text-sm">
                        <div className="flex items-center justify-between">
                          <dt className="text-[#6a6a6a]">Precio origen</dt>
                          <dd className="text-[#222222]">{formatOriginalPrice(bestListing)}</dd>
                        </div>
                        {bestListing.exchangeRateSource && (
                          <div className="flex items-center justify-between">
                            <dt className="text-[#6a6a6a]">Tipo de cambio</dt>
                            <dd className="text-[#222222]">{bestListing.exchangeRateSource}</dd>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <dt className="text-[#6a6a6a]">Moneda</dt>
                          <dd className="text-[#222222]">{currencyCode}</dd>
                        </div>
                      </dl>
                    </>
                  ) : (
                    <div className="py-6 text-center text-sm text-[#6a6a6a]">
                      No hay precios registrados para esta figura todavia.
                    </div>
                  )}
                </div>

                {totalListings > 0 && (
                  <p className="mt-3 text-center text-[13px] text-[#6a6a6a]">
                    Precio elegido entre {totalListings} {totalListings === 1 ? "tienda" : "tiendas"}.
                  </p>
                )}
              </aside>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default FigureDetail;
