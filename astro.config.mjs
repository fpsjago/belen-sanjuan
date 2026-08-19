// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://fpsjago.github.io',
  base: '/belen-sanjuan',
  compressHTML: true,
  integrations: [react(), sitemap()],
  build: { assets: '_assets' },
  vite: { plugins: [tailwindcss()] },
  fonts: [
    {
      name: 'Instrument Serif',
      cssVariable: '--font-display',
      provider: fontProviders.fontsource(),
      weights: ['400'],
      styles: ['normal', 'italic'],
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
    },
    {
      name: 'Archivo',
      cssVariable: '--font-body',
      provider: fontProviders.fontsource(),
      weights: ['400', '500', '600'],
      styles: ['normal'],
      fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
    },
  ],
  image: {
    service: {
      config: {
        jpeg: { mozjpeg: true, quality: 80 },
        webp: { effort: 6, quality: 80 },
        avif: { effort: 7, quality: 70, chromaSubsampling: '4:2:0' },
        png: { compressionLevel: 9 },
      },
    },
  },
});