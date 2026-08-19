import { useRef } from 'react';
import { useReveal } from '../scripts/useReveal';
import type { OptimizedImage } from '../types';

interface HomeDireccionProps {
  comunidad: OptimizedImage;
}

export default function HomeDireccion({ comunidad }: HomeDireccionProps) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section
      ref={ref}
      id="direccion"
      data-clause
      className="border-y border-hairline bg-plate"
      aria-labelledby="direccion-titulo"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-12 md:gap-10 md:px-10 md:py-28">
        <figure className="md:col-span-4" data-reveal>
          <div className="lamina rotate-[-0.9deg]">
            <div className="overflow-hidden" data-reveal-clip>
              <picture>
                <source srcSet={comunidad.avif} type="image/avif" />
                <source srcSet={comunidad.webp} type="image/webp" />
                <img
                  src={comunidad.webp}
                  alt={comunidad.alt}
                  width={comunidad.width}
                  height={comunidad.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover"
                />
              </picture>
            </div>
            <figcaption className="lamina-caption">LA FAMILIA BELÉN SANJUÁN</figcaption>
          </div>
        </figure>

        <div className="flex flex-col gap-7 md:col-span-7 md:col-start-6">
          <span className="kicker" data-reveal>
            CLÁUSULA IV · PALABRAS DE LA DIRECCIÓN
          </span>
          <p
            id="direccion-titulo"
            className="font-heading text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.5] text-ink"
            data-reveal
          >
            <span className="float-left pr-3.5 pt-1 font-heading text-[4.4rem] leading-[0.8] text-gold" aria-hidden="true">
              C
            </span>
            ada mañana recibimos algo más valioso que estudiantes: recibimos la
            confianza de sus familias. A ellas les debemos un colegio donde la
            exigencia académica y el cariño no compitan. Se necesiten.
          </p>
          <div className="flex flex-col gap-1.5 border-t border-hairline pt-6" data-reveal>
            <span className="font-heading text-[1.35rem] italic text-navy">[Nombre Apellido]</span>
            <span className="text-[0.64rem] font-semibold tracking-[0.22em] text-inkmuted">
              DIRECCIÓN GENERAL · U.E.P. BELÉN SANJUÁN
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
