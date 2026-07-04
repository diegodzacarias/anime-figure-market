# Mobile — Catálogo público

> Análisis del estado actual y trabajo necesario para que las rutas `/`, `/anime/:id` y `/figure/:id` se vean bien en móvil. Las páginas de administración (`/work/*`, `/figure-admin/*`, `/character-admin/*`) quedan fuera del alcance.

---

## Estado actual (resumen)

El catálogo tiene responsividad parcial. Los grids y algunos componentes internos ya usan clases `sm:`/`md:`/`lg:`, pero hay tres problemas estructurales que hacen que la experiencia móvil sea deficiente:

1. El **Navbar no tiene menú móvil** — los links desaparecen completamente bajo 768 px.
2. Las **cards de anime tienen altura fija** (`h-[420px]`) que no escala.
3. El **padding del container** (2 rem fijo) consume demasiado espacio en pantallas pequeñas.

No hace falta reestructurar nada. Son cambios quirúrgicos en componentes existentes.

---

## Problemas encontrados

### 1. Navbar sin menú móvil — BLOQUEANTE

**Archivo:** `src/components/Navbar.tsx`

El bloque central de navegación tiene `hidden ... md:flex`. Por debajo de 768 px desaparece sin reemplazo: no hay hamburguesa, no hay drawer, no hay nada. El usuario no puede navegar entre páginas del catálogo desde un celular.

**Lo que falta:**

- Ícono hamburguesa visible solo en mobile (`md:hidden`).
- Un `Sheet` (ya existe en `src/components/ui/sheet.tsx`) que abra un drawer lateral con los mismos links del centro: Inicio, Catálogo, Novedades. Los links de admin (Work, FigureAdmin, CharacterAdmin) pueden omitirse del menú móvil ya que no son catálogo público.
- El drawer debe cerrarse al navegar (al hacer click en un link).

**Nota:** No se necesita tocar el centro del Navbar para desktop, solo agregar la rama mobile junto al lado derecho.

---

### 2. Cards de anime con altura fija — VISUAL

**Archivo:** `src/components/AnimeHero.tsx`

Cada card usa `h-[420px]` fijo. En un iPhone 14 (390 px de ancho), una card en grilla de 1 columna ocupa casi toda la pantalla de alto, lo que hace el scroll pesado y el contenido lento de explorar.

**Lo que falta:**

- Reemplazar `h-[420px]` por una relación de aspecto con `aspect-[3/4]` (o similar). Esto hace que la card sea proporcional al ancho disponible en lugar de fija en píxeles.
- Alternativamente, usar `h-[260px] sm:h-[340px] md:h-[420px]` si se prefiere mantener la altura explícita por rangos.
- Verificar que `object-cover` siga funcionando correctamente con el cambio (debería, ya que cubre el contenedor).

---

### 3. Padding del container en pantallas muy pequeñas — POLISH

**Archivo:** `tailwind.config.ts`

El container tiene `padding: "2rem"` sin variante para pantallas pequeñas. En un teléfono de 375 px esto deja solo ~311 px de ancho útil (375 − 2×32 px). En pantallas de 320 px el contenido se aprieta demasiado.

**Lo que falta:**

```ts
// tailwind.config.ts
container: {
  center: true,
  padding: {
    DEFAULT: "1rem",   // 16px en mobile
    sm: "1.5rem",      // 24px desde 640px
    lg: "2rem",        // 32px desde 1024px
  },
  screens: { "2xl": "1400px" },
},
```

Cambio de una línea con impacto global en todas las páginas del catálogo.

---

### 4. Grid de AnimeDetail sin breakpoint medio — MINOR

**Archivo:** `src/pages/AnimeDetail.tsx`

La grilla de figuras salta de `grid-cols-1` (mobile) a `sm:grid-cols-2` (640 px) y luego a `lg:grid-cols-4` (1024 px). En tablets (768–1023 px) muestra solo 2 columnas, lo que deja mucho espacio vacío. Esto es aceptable pero subóptimo.

**Mejora opcional:**

```html
grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4
```

Nota: cambiar el default de `grid-cols-1` a `grid-cols-2` puede ser mejor experiencia en mobile también — las cards de figura son compactas y caben bien en 2 columnas desde 375 px.

---

### 5. FigureDetail — ya funciona razonablemente — SIN CAMBIOS

**Archivo:** `src/pages/FigureDetail.tsx`

El layout de 2 columnas (imagen + panel de precio) ya colapsa a columna única por debajo de `lg` (1024 px). Los `SourceListingCard` usan `flex-col → sm:flex-row`. El panel derecho tiene padding suficiente. Esta página no necesita trabajo adicional para ser usable en móvil.

---

## Plan de trabajo

| # | Tarea | Archivo(s) | Prioridad |
|---|-------|-----------|-----------|
| 1 | Agregar hamburguesa + Sheet drawer en Navbar | `src/components/Navbar.tsx` | Alta — sin esto no hay navegación móvil |
| 2 | Cambiar altura fija de cards de anime a `aspect-ratio` | `src/components/AnimeHero.tsx` | Alta — visual bloqueante en fold |
| 3 | Reducir padding del container en mobile | `tailwind.config.ts` | Media — afecta todo pero no bloquea |
| 4 | Ajustar grid de figuras (agregar `md:grid-cols-3`) | `src/pages/AnimeDetail.tsx` | Baja — mejora tablet, no bloquea mobile |

---

## No se necesita

- Reestructurar rutas ni el router.
- Crear nuevas páginas o layouts alternativos.
- Agregar librerías externas (el `Sheet` ya existe en shadcn/ui).
- Tocar ninguna página de administración.
- Cambiar el sistema de estado ni la capa de API.

El trabajo es CSS + un componente de drawer. Estimado realista: medio día de trabajo.
