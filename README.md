# U.E.P. Belén Sanjuán — Sitio Web

Sitio institucional del Colegio Belén Sanjuán (Caracas, Venezuela): maternal,
primaria y secundaria. Concepto de diseño: **"El Acta"** — el sitio se comporta
como un acta ceremonial (marco de diploma que se dibuja solo, cláusulas con
numeración romana, sellos y láminas de archivo).

## Stack

- **Astro 7** (static) + **React 19** (islands) + **TypeScript strict**
- **Tailwind CSS v4** (`@theme` en `src/styles/global.css`)
- **GSAP + Lenis** (firma: marco auto-dibujado, rail de cláusulas, contadores, sello)
- Fuentes autoalojadas vía Astro Fonts API: Instrument Serif + Archivo
- Runtime: **bun**

## Comandos

```bash
bun install
bun run dev        # localhost:4321
bun run build      # → dist/
bun run preview    # sirve dist/
```

## Páginas (7 rutas)

| Ruta | Contenido |
|---|---|
| `/` | Hero acta, cifras, niveles, proyecto, vida escolar, dirección, legado + admisión |
| `/niveles/` | Maternal, primaria y secundaria a fondo (día típico, jornada) |
| `/admisiones/` | Proceso, recaudos por nivel, fechas, inversión, FAQ |
| `/vida-escolar/` | Pilares, el año BSJ, galería |
| `/proyecto-educativo/` | La maestra Belén Sanjuán, pilares, en el aula, valores |
| `/contacto/` | Datos, formulario con estados, accesos de familias |
| `/404` | Folio no encontrado |

## Contenido editable

- **Colecciones** (`src/content/`): `niveles/`, `eventos/`, `faqs/`, `hitos/` — JSON con schema Zod.
- **Constantes del sitio** (`src/lib/site.ts`): número de WhatsApp, Instagram.
- **Imágenes** (`src/assets/images/`): se optimizan a AVIF+WebP en build.

## Pendientes del cliente

Ver `PENDIENTES-CLIENTE.md` — todo lo `[entre corchetes]` en el sitio.

## Calidad verificada

- Lighthouse (móvil emulado): **95-97 / 100 / 100 / 100** en las 6 páginas
- 0 errores de consola, 0 overflow horizontal, 0 reveals varados (12 barridos, 2 viewports, scroll táctil real)
- WCAG AA: contraste verificado, focus visible, skip link, `prefers-reduced-motion`
- Formulario con estados de error/éxito diseñados

---
Sitio por [Full Stack Evolved](https://www.fullstackevolved.com)
