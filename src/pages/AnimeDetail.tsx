import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import ApiErrorToast from "@/components/ui/api-error-toast";
import { Button } from "@/components/ui/button";
import { ApiErrorResponse, readApiErrorResponse, toClientApiError } from "@/lib/apiError";
import { getPageContent, getPageMeta } from "@/lib/page";
import type { PageMeta } from "@/lib/page";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://figure-market-core.onrender.com/api";

const FIGURES_SEARCH_ENDPOINT = `${API_BASE_URL}/v1/figures/search`;
const FRANCHISES_ENDPOINT = `${API_BASE_URL}/v1/franchises`;
const PAGE_SIZE = 20;
const FALLBACK_IMAGE_URL = `${import.meta.env.BASE_URL}placeholder.svg`;

type Figure = {
  id?: number;
  name?: string;
  slug?: string;
  status?: string;
  primaryImageUrl?: string | null;
};

type FigureImage = {
  imageUrl?: string | null;
};

type Franchise = {
  id?: number;
  name?: string;
  slug?: string;
};

const buildFiguresUrl = (franchiseId: string, page: number) => {
  const params = new URLSearchParams({
    franchiseId,
    page: page.toString(),
    size: PAGE_SIZE.toString(),
    sort: "name,asc",
  });

  return `${FIGURES_SEARCH_ENDPOINT}?${params.toString()}`;
};

const AnimeDetail = () => {
  const { animeId } = useParams<{ animeId: string }>();
  const [franchise, setFranchise] = useState<Franchise | null>(null);
  const [figures, setFigures] = useState<Figure[]>([]);
  const [imageUrls, setImageUrls] = useState<Record<number, string>>({});
  const [pageMeta, setPageMeta] = useState<PageMeta>({
    totalElements: 0,
    totalPages: 0,
    page: 0,
    size: PAGE_SIZE,
  });
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [apiError, setApiError] = useState<ApiErrorResponse | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  const fetchPrimaryImages = useCallback(async (nextFigures: Figure[]) => {
    const figuresWithIds = nextFigures.filter((figure) => figure.id && !figure.primaryImageUrl);
    if (figuresWithIds.length === 0) return;

    const entries = await Promise.all(
      figuresWithIds.map(async (figure) => {
        try {
          const response = await fetch(`${API_BASE_URL}/v1/figures/${figure.id}/images/primary`);

          if (!response.ok) {
            return [figure.id as number, FALLBACK_IMAGE_URL] as const;
          }

          const data = (await response.json()) as FigureImage;
          return [figure.id as number, data.imageUrl || FALLBACK_IMAGE_URL] as const;
        } catch {
          return [figure.id as number, FALLBACK_IMAGE_URL] as const;
        }
      })
    );

    setImageUrls((current) => ({
      ...current,
      ...Object.fromEntries(entries),
    }));
  }, []);

  const loadFiguresPage = useCallback(
    async (pageToLoad: number, replace = false) => {
      if (!animeId || loadingRef.current) return;

      loadingRef.current = true;
      if (replace) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      try {
        const response = await fetch(buildFiguresUrl(animeId, pageToLoad));

        if (!response.ok) {
          setApiError(await readApiErrorResponse(response, "Error loading figures."));
          return;
        }

        const data = await response.json();
        const nextFigures = getPageContent<Figure>(data);

        setFigures((current) => (replace ? nextFigures : [...current, ...nextFigures]));
        setPageMeta(getPageMeta<Figure>(data, PAGE_SIZE));
        await fetchPrimaryImages(nextFigures);
      } catch (error) {
        setApiError(toClientApiError(error, "Error connecting to backend."));
      } finally {
        loadingRef.current = false;
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [animeId, fetchPrimaryImages]
  );

  useEffect(() => {
    if (!animeId) return;

    setFranchise(null);
    setFigures([]);
    setImageUrls({});
    setPageMeta({
      totalElements: 0,
      totalPages: 0,
      page: 0,
      size: PAGE_SIZE,
    });

    const loadFranchise = async () => {
      try {
        const response = await fetch(`${FRANCHISES_ENDPOINT}/${animeId}`);

        if (response.ok) {
          setFranchise(await response.json());
        }
      } catch {
        setFranchise(null);
      }
    };

    loadFranchise();
    loadFiguresPage(0, true);
  }, [animeId, loadFiguresPage]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hasMore = pageMeta.totalPages > 0 && pageMeta.page < pageMeta.totalPages - 1;

        if (entries[0]?.isIntersecting && hasMore && !loadingRef.current) {
          loadFiguresPage(pageMeta.page + 1);
        }
      },
      { rootMargin: "480px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadFiguresPage, pageMeta.page, pageMeta.totalPages]);

  const title = franchise?.name || "Coleccion";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ApiErrorToast error={apiError} onClose={() => setApiError(null)} />

      <main className="container py-10">
        <Link to="/">
          <Button variant="ghost" className="mb-8 gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </Link>

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Coleccion
          </p>
          <h1 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {pageMeta.totalElements} figuras encontradas
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-[18rem] items-center justify-center rounded-lg border bg-card text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Cargando figuras...
          </div>
        ) : figures.length === 0 ? (
          <div className="rounded-lg border bg-card p-10 text-center text-muted-foreground">
            No hay figuras registradas para esta franquicia.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {figures.map((figure) => (
              <Link
                key={figure.id}
                to={figure.id ? `/figure/${figure.id}` : "#"}
                className="overflow-hidden rounded-lg border border-border bg-card shadow-card transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={
                      figure.primaryImageUrl ||
                      (figure.id ? imageUrls[figure.id] || FALLBACK_IMAGE_URL : FALLBACK_IMAGE_URL)
                    }
                    alt={figure.name || "Figure image"}
                    className="h-full w-full object-contain"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = FALLBACK_IMAGE_URL;
                    }}
                  />
                </div>
                <div className="p-4">
                  <h2 className="line-clamp-2 min-h-10 text-sm font-semibold text-foreground">
                    {figure.name || "Untitled figure"}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div ref={sentinelRef} className="flex h-20 items-center justify-center text-sm text-muted-foreground">
          {loadingMore && (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Cargando mas figuras...
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AnimeDetail;
