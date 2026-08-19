import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import type { OptimizedImage } from '../types';

const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/*.{jpg,jpeg,png,webp}',
  { eager: true },
);

/** Build an AVIF+WebP OptimizedImage from a filename in src/assets/images. */
export async function optimized(
  filename: string,
  alt: string,
  width?: number,
): Promise<OptimizedImage> {
  const key = `/src/assets/images/${filename}`;
  const mod = modules[key];
  if (!mod) throw new Error(`Imagen no encontrada: ${filename}`);
  const meta = mod.default;
  const w = width ?? Math.min(meta.width, 1200);
  const h = Math.round((meta.height / meta.width) * w);
  const [avif, webp] = await Promise.all([
    getImage({ src: meta, format: 'avif', quality: 65, width: w }),
    getImage({ src: meta, format: 'webp', quality: 80, width: w }),
  ]);
  return { avif: avif.src, webp: webp.src, width: w, height: h, alt };
}
