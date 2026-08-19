import { useRef } from 'react';
import { useReveal } from '../scripts/useReveal';
import type { NivelData, OptimizedImage } from '../types';

interface NivelDeepProps {
  nivel: NivelData;
  imagen: OptimizedImage;
  flip: boolean;
  accent: 'gold' | 'navy' | 'folio';
  anchorId: string;
}

const ACCENT_TEXT = { gold: 'text-gold-deep', navy: 'text-navy', folio: 'text-folio' } as const;
const ACCENT_BORDER = { gold: 'border-gold', navy: 'border-navy', folio: 'border-folio' } as const;
const ACCENT_RULE = { gold: 'bg-gold', navy: 'bg-navy', folio: 'bg-folio' } as const;

/** One level as a deep acta clause: lámina + curriculum + día típico ledger. */
export default function NivelDeep({ nivel, imagen, flip, accent, anchorId }: NivelDeepProps) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section
      ref={ref}
      id={anchorId}
      data-clause
      className={`scroll-mt-24 ${flip ? 'bg-plate' : 'bg-paper'} ${flip ? 'border-y border-hairline' : ''}`}
      aria-labelledby={`${anchorId}-titulo`}
    >
      <div
        className={`mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-12`}
      >
        <figure
          className={`lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : ''}`}
          data-reveal
        >
          <div className={`lamina ${flip ? 'rotate-[1deg]' : 'rotate-[-1deg]'}`}>
            <div className="overflow-hidden" data-reveal-clip>
              <picture>
                <source srcSet={imagen.avif} type="image/avif" />
                <source srcSet={imagen.webp} type="image/webp" />
                <img
                  src={imagen.webp}
                  alt={imagen.alt}
                  width={imagen.width}
                  height={imagen.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover"
                />
              </picture>
            </div>
            <figcaption className="lamina-caption">{nivel.imagenCaption}</figcaption>
          </div>
        </figure>

        <div className={`flex flex-col gap-6 lg:col-span-6 ${flip ? 'lg:order-1' : 'lg:col-start-7'}`}>
          <span
            className={`kicker self-start border px-4 py-2 ${ACCENT_BORDER[accent]} ${ACCENT_TEXT[accent]}`}
            data-reveal
          >
            {nivel.numeral} · {nivel.edades}
          </span>
          <h2
            id={`${anchorId}-titulo`}
            className="font-heading text-[clamp(2.1rem,4vw,3.2rem)] leading-[1.06] text-ink"
            data-reveal
          >
            {nivel.nombre}
          </h2>
          <p className="font-heading text-[1.25rem] italic text-navy" data-reveal>
            {nivel.lema}
          </p>
          <p className="max-w-[58ch] text-[0.98rem] leading-[1.72] text-inkmuted" data-reveal>
            {nivel.descripcion}
          </p>

          <ul className="grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2" data-reveal>
            {nivel.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[0.9rem] leading-[1.6] text-ink">
                <span className={`mt-[11px] h-px w-5 shrink-0 ${ACCENT_RULE[accent]}`} aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-2 border border-hairline bg-plate" data-reveal>
            <div className="flex items-baseline justify-between border-b border-hairline px-6 py-4">
              <span className="kicker !text-[0.62rem]">UN DÍA TÍPICO</span>
              <span className="text-[0.78rem] font-medium text-inkmuted">
                Jornada {nivel.horario}
              </span>
            </div>
            <ol className="flex flex-col divide-y divide-hairline/60 px-6 py-2 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:divide-y-0">
              {nivel.diaTipico.map((d) => (
                <li key={d.hora} className="flex items-baseline gap-3 py-2.5 text-[0.85rem]">
                  <span className="font-semibold text-navy">{d.hora}</span>
                  <span className="text-inkmuted">{d.actividad}</span>
                </li>
              ))}
            </ol>
            <p className="border-t border-hairline px-6 py-3 text-[0.75rem] text-inkmuted">
              {nivel.horarioNota}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
