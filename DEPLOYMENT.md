# Despliegue

## Vercel (actual)
```bash
bunx vercel --prod
```
Framework: Astro (auto-detectado). Build: `bun run build` · Output: `dist/`.
`base: '/'` — no requiere subpath.

## Dominio propio
1. Añadir dominio en Vercel → seguir instrucciones DNS.
2. Actualizar `site:` en `astro.config.mjs` (canónicas + sitemap + OG).
3. `bun run build && bunx vercel --prod`.

## Netlify (alternativa)
Build command `bun run build`, publish `dist/`.
