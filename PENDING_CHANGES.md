# Cambios pendientes — sincronización con `figure-market-core`

> Generado el 2026-06-25. Basado en los commits recientes del backend, principalmente `fa27efa` (DEV-05) y `e5d31fe` (DEV-10).

---

## CRÍTICOS (rompen funcionalidad actualmente)

### 1. Campo de paginación `number` → `page` — afecta TODOS los listados

**Archivo:** `src/lib/page.ts`

El backend migró de Spring `Page<T>` a su propio `PageResponse<T>`. El campo que indica el número de página actual cambió de `number` a `page`. El resultado es que la paginación siempre queda atascada en la página 0 en todos los listados del proyecto.

```ts
// ANTES (línea 5)
number?: number;

// DESPUÉS
page?: number;
```

```ts
// ANTES (línea 42, dentro de getPageMeta)
page: data?.number ?? 0,

// DESPUÉS
page: data?.page ?? 0,
```

Además, los campos de Spring que ya no existen (`pageable`, `first`, `last`, `numberOfElements`) pueden eliminarse del tipo si están declarados.

---

### 2. Rutas de `figure-aliases` sin `/v1` — 404 en todos los alias

**Archivo:** `src/api/figureAliasApi.ts`

Todas las funciones del archivo construyen rutas sin el segmento `/v1`. Con el backend corregido, todas devuelven 404.

Afecta: listar aliases, historial de scraping, crear, editar y borrar un alias.

- Cambiar el prefijo de todas las rutas de `/figure-aliases` a `/v1/figure-aliases`.

---

### 3. Constante `FIGURE_ALIASES_ENDPOINT` sin `/v1`

**Archivo:** `src/api/figureAliasGeneratorApi.ts`, línea 5

```ts
// ANTES
const FIGURE_ALIASES_ENDPOINT = "/figure-aliases";

// DESPUÉS
const FIGURE_ALIASES_ENDPOINT = "/v1/figure-aliases";
```

Afecta: preview de aliases generados, generación de aliases, queries de scraping, la pantalla `FigureAliasGeneratorPage` completa.

---

### 4. URL de `figure-source-listings` sin `/v1` en el back-office

**Archivo:** `src/pages/FigureSourceListingPage.tsx`, línea 33

```ts
// ANTES
const FIGURE_SOURCE_LISTINGS_ENDPOINT = `${API_BASE_URL}/figure-source-listings`;

// DESPUÉS
const FIGURE_SOURCE_LISTINGS_ENDPOINT = `${API_BASE_URL}/v1/figure-source-listings`;
```

Afecta: carga paginada, crear, editar y borrar source listings desde el admin.

---

### 5. URL de `figure-source-listings` sin `/v1` en la vista pública

**Archivo:** `src/pages/FigureDetail.tsx`, línea 16

```ts
// ANTES
const FIGURE_SOURCE_LISTINGS_ENDPOINT = `${API_BASE_URL}/figure-source-listings`;

// DESPUÉS
const FIGURE_SOURCE_LISTINGS_ENDPOINT = `${API_BASE_URL}/v1/figure-source-listings`;
```

Afecta: los endpoints `/price-ranking/top` y `/price-ranking/others` que se usan para mostrar precios en la página pública de una figura. Sin este fix, no se muestra ningún precio.

---

## MEDIOS (no rompen pero deben corregirse)

### 6. Tests que validan rutas antiguas sin `/v1`

**Archivo:** `src/api/backendChangesApi.test.ts`

Tres tests verifican las URLs de figure-aliases sin `/v1`. Una vez aplicados los cambios 2 y 3, estos tests fallarán:

- Línea 32: espera `/api/figure-aliases/figure/7` → debe ser `/api/v1/figure-aliases/figure/7`
- Línea 51: espera `/api/figure-aliases/25/scraping-history` → debe ser `/api/v1/figure-aliases/25/scraping-history`
- Línea 121: espera `/api/figure-aliases/figure/7/scraping-query-details` → debe ser `/api/v1/figure-aliases/figure/7/scraping-query-details`

---

### 7. HTTP 409 (slug/nombre duplicado) no muestra error inline en el formulario

**Archivos:** `src/pages/FigurePage.tsx` y `src/pages/SourcePage.tsx`

El backend ahora devuelve 409 con `error: "SLUG_ALREADY_EXISTS"` o `"SOURCE_NAME_ALREADY_EXISTS"` cuando hay un conflicto. El error llega al `ApiErrorToast` global y se muestra correctamente, pero no actualiza el mensaje inline junto al campo que causó el conflicto dentro del dialog.

Mejora sugerida: en el `handleSubmit` de cada página, detectar `status === 409` y setear el mensaje de validación del campo correspondiente (ej. `setSlugMessage("Este slug ya está en uso")`) además del toast global.

---

## FUNCIONALIDAD FALTANTE

### 8. Flujo asíncrono de scraping jobs no implementado

El backend agregó soporte para lanzar jobs de scraping de forma asíncrona:

- `POST /api/v1/scraping/sources/{sourceCode}/figures/{figureId}/jobs` → 202 Accepted con `{ runId }`
- `GET /api/v1/scraping/jobs/{runId}` → estado del job (`status`, `totalFound`, `totalSaved`, etc.)

El endpoint síncrono existente puede devolver 503 cuando `scraping.sync.enabled=false`.

**Qué falta implementar:**

1. En `src/api/scrapingRunnerApi.ts`: agregar función `startScrapingJob(sourceCode, figureId)` que llama al POST y retorna el `runId`.
2. En `src/api/scrapingRunnerApi.ts`: agregar función `getScrapingJobStatus(runId)` que llama al GET.
3. En `src/pages/ScrapingRunnerPage.tsx`: lógica de polling que llame a `getScrapingJobStatus` cada N segundos hasta que `status` sea `COMPLETED` o `FAILED`, mostrando progreso en pantalla.

El `ScrapingJobResponse` completo:
```ts
{
  success: boolean;
  data: {
    runId: string;
    figureId: number;
    source: string;
    status: "RUNNING" | "COMPLETED" | "FAILED";
    startedAt: string;
    finishedAt: string | null;
    queryCount: number;
    totalFound: number;
    totalSaved: number;
    errorMessage: string | null;
  }
}
```

---

## Lo que ya funciona correctamente

- `apiError.ts`: el parser de errores (`readApiErrorResponse`) ya maneja correctamente los 409 y 503 nuevos — llegan bien al toast.
- `FigureSourceListingPriceDTO`: el tipo local en `FigureDetail.tsx` ya tiene `convertedPrice`, `convertedCurrencyCode`, `exchangeRate`, `exchangeRateSource`.
- `primaryImageUrl` en FigureDTO: `FigureDetail.tsx` ya lo consume con fallback al endpoint de imágenes.
- `SourceResponseDTO`: los campos adicionales `createdAt`/`updatedAt` del nuevo DTO son ignorados sin problema; el tipo local sigue siendo válido.
- `PageControls`: el componente recibe `page` como prop explícita — una vez corregido el punto 1, funcionará sin cambios adicionales.
