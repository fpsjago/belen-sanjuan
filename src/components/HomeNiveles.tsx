import { useRef } from 'react';
import { useReveal } from '../scripts/useReveal';
import type { NivelData } from '../types';

interface HomeNivelesProps {
  base: string;
  niveles: NivelData[];
}

const ACCENTS = ['border-t-gold', 'border-t-navy', 'border-t-folio'] as const;

export default function HomeNiveles({ base, niveles }: HomeNivelesProps) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section
      ref={ref}
      id="niveles"
      data-clause
      className="registry-lines relative overflow-hidden bg-paper"
      aria-labelledby="niveles-titulo"
    >
      <span className="bgtypo left-[-2%] top-[8%] text-[clamp(10rem,26vw,24rem)]" aria-hidden="true">
        I
      </span>
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col gap-5" data-reveal>
            <span className="kicker">CLÁUSULA I · NUESTROS NIVELES</span>
            <h2
              id="niveles-titulo"
              className="font-heading text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1.05] text-ink"
            >
              Una etapa a la vez,
              <br />
              <em className="text-navy">un mismo camino.</em>
            </h2>
          </div>
          <a
            href={`${base}niveles/`}
            className="btn-ghost self-start md:self-auto"
            data-reveal
            data-reveal-delay
          >
            Ver los tres niveles
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M2.5 8 H13.5 M9.5 4 L13.5 8 L9.5 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-7">
          {niveles.map((n, i) => (
            <article
              key={n.nombre}
              className={`lamina flex flex-col border-t-[3px] ${ACCENTS[i] ?? 'border-t-gold'}`}
              data-reveal
              // eslint-disable-next-line react/forbid-dom-props
              style={{ '--reveal-delay': `${i * 0.12}s` } as React.CSSProperties}
            >
              <div className="flex flex-col gap-4 p-7 md:p-8">
                <div className="flex items-baseline justify-between">
                  <span className="kicker">{n.edades}</span>
                  <span className="font-heading text-[1.3rem] text-gold" aria-hidden="true">
                    {n.numeral}
                  </span>
                </div>
                <h3 className="font-heading text-[1.9rem] leading-tight text-ink">{n.nombre}</h3>
                <span className="rule-gold w-9" data-draw />
                <p className="text-[0.94rem] leading-[1.7] text-inkmuted">{n.descripcion}</p>
                <a
                  href={`${base}niveles/#${n.nombre.toLowerCase().split(' ')[0]}`}
                  className="btn-ghost mt-auto pt-2 text-[0.8rem]"
                >
                  Conocer {n.nombre.toLowerCase().split(' ')[0]}
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M2.5 8 H13.5 M9.5 4 L13.5 8 L9.5 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
