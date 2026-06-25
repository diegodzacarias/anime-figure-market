import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import ApiErrorToast from "@/components/ui/api-error-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ApiErrorResponse, readApiErrorResponse, toClientApiError } from "@/lib/apiError";
import { formatDateTime } from "@/lib/date";
import { usePreferences, type CurrencyCode } from "@/lib/preferences";

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

type SourceListingCardProps = {
  listing: FigureSourceListingPrice;
  compact?: boolean;
};

const SourceListingCard = ({ listing, compact = false }: SourceListingCardProps) => (
  <article className="rounded-lg border bg-background p-4">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-foreground">{getSourceName(listing)}</h3>
        <p className={`mt-1 text-sm text-muted-foreground ${compact ? "line-clamp-1" : "line-clamp-2"}`}>
          {listing.sourceTitle || "Sin titulo de source"}
        </p>
      </div>
      <div className="shrink-0 text-left sm:text-right">
        <p className="text-lg font-bold text-primary">{formatConvertedPrice(listing)}</p>
        <p className="text-xs text-muted-foreground">Original: {formatOriginalPrice(listing)}</p>
        <p className="text-xs text-muted-foreground">{getAvailabilityLabel(listing.isAvailable)}</p>
      </div>
    </div>

    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
      {listing.listingStatus && <Badge variant="outline">{listing.listingStatus}</Badge>}
      {listing.exchangeRateSource && !compact && <span>FX: {listing.exchangeRateSource}</span>}
      {!compact && listing.editionText && <span>{listing.editionText}</span>}
      {!compact && listing.releaseText && <span>{listing.releaseText}</span>}
      {!compact && listing.preorderDate && <span>Preorder: {formatDateTime(listing.preorderDate)}</span>}
      {!compact && listing.estimatedReleaseDate && (
        <span>Release est.: {formatDateTime(listing.estimatedReleaseDate)}</span>
      )}
      {!compact && listing.capturedAt && <span>Captured: {formatDateTime(listing.capturedAt)}</span>}
    </div>

    {listing.sourceUrl && (
      <div className="mt-4">
        <Button asChild variant="outline" size="sm" className="gap-2">
          <a href={listing.sourceUrl} target="_blank" rel="noreferrer">
            Abrir source
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </div>
    )}
  </article>
);

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
    <div className="min-h-screen bg-background">
      <Navbar />
      <ApiErrorToast error={apiError} onClose={() => setApiError(null)} />

      <main className="container py-10">
        <Button
          type="button"
          variant="ghost"
          className="mb-8 gap-2 text-muted-foreground hover:text-foreground"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>

        {loading ? (
          <div className="flex min-h-[24rem] items-center justify-center rounded-lg border bg-card text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Cargando detalle...
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Figure</p>
              <h1 className="mx-auto mt-2 max-w-4xl text-3xl font-bold text-foreground md:text-5xl">
                {figure?.name || "Untitled figure"}
              </h1>
              {(figure?.status || figure?.sourceReferenceUrl) && (
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  {figure?.status && <Badge variant="secondary">{figure.status}</Badge>}
                  {figure?.sourceReferenceUrl && (
                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <a href={figure.sourceReferenceUrl} target="_blank" rel="noreferrer">
                        Referencia
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.9fr)] lg:items-start">
              <section className="overflow-hidden rounded-lg border bg-card shadow-card">
                <div className="aspect-[4/5] bg-muted">
                  <img
                    src={imageUrl}
                    alt={figure?.name || "Figure image"}
                    className="h-full w-full object-contain"
                    onError={(event) => {
                      event.currentTarget.src = FALLBACK_IMAGE_URL;
                    }}
                  />
                </div>
              </section>

              <section className="rounded-lg border bg-card p-5 shadow-card lg:sticky lg:top-24">
                <div className="mb-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">Top precios convertidos</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {totalListings > 0
                          ? `Mostrando ${topListings.length} principales de ${totalListings} sources.`
                          : "Datos registrados por tienda o fuente para esta figura."}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {totalListings > 0 && <Badge variant="secondary">{totalListings}</Badge>}
                      <Badge variant="outline">{currencyCode}</Badge>
                    </div>
                  </div>
                </div>

                {rankingLoading ? (
                  <div className="flex min-h-40 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cargando ranking...
                  </div>
                ) : topListings.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                    No hay sources ni precios registrados para esta figura.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {topListings.map((listing) => (
                      <SourceListingCard key={listing.id} listing={listing} compact />
                    ))}
                  </div>
                )}

                {otherListings.length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-5 w-full"
                    onClick={scrollToAllSources}
                  >
                    Ver otros listings ({otherListings.length})
                  </Button>
                )}
              </section>
            </div>

            {otherListings.length > 0 && (
              <section ref={allSourcesRef} className="mt-10 rounded-lg border bg-card p-5 shadow-card">
                <div className="mb-5">
                  <h2 className="text-xl font-semibold text-foreground">Otros listings</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Listings restantes, excluyendo el Top {TOP_LISTINGS_LIMIT}, ordenados por precio convertido.
                  </p>
                </div>

                <div className="grid gap-3 lg:grid-cols-2">
                  {otherListings.map((listing) => (
                    <SourceListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default FigureDetail;
