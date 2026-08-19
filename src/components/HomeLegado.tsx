import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReveal } from '../scripts/useReveal';
import type { HitoData } from '../types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface HomeLegadoProps {
  base: string;
  hitos: HitoData[];
  whatsappHref: string;
}

const PASOS = [
  { num: '01', titulo: 'Visita el campus', texto: 'Recorrido guiado y conversación con la dirección. Una hora que responde casi todo.' },
  { num: '02', titulo: 'Entrega de recaudos', texto: 'Planilla, notas anteriores y documentos del representante. La lista completa te la damos en la visita.' },
  { num: '03', titulo: 'Encuentro con el estudiante', texto: 'Evaluación diagnóstica según el nivel, para conocerlo. Y la bienvenida a la familia BSJ.' },
];

/**
 * Clause V — Legado (ledger timeline) + Admisiones close with the drawn gold
 * seal ring around the WhatsApp CTA.
 */
export default function HomeLegado({ base, hitos, whatsappHref }: HomeLegadoProps) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const seal = root.querySelector<SVGCircleElement>('[data-seal-ring]');
      const sealInner = root.querySelector<SVGCircleElement>('[data-seal-ring-inner]');
      const ledger = root.querySelector<HTMLElement>('[data-ledger-line]');
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (ledger) {
        if (reduced) {
          gsap.set(ledger, { scaleX: 1 });
        } else {
          gsap.set(ledger, { scaleX: 0, transformOrigin: 'left center' });
          ScrollTrigger.create({
            trigger: ledger,
            start: 'top 85%',
            once: true,
            onEnter: () => gsap.to(ledger, { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }),
          });
        }
      }

      if (seal && sealInner) {
        if (reduced) {
          gsap.set([seal, sealInner], { strokeDashoffset: 0 });
          return;
        }
        gsap.set([seal, sealInner], { strokeDasharray: 1, strokeDashoffset: 1 });
        ScrollTrigger.create({
          trigger: seal,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(seal, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' });
            gsap.to(sealInner, { strokeDashoffset: 0, duration: 1.2, delay: 0.3, ease: 'power2.inOut' });
          },
        });
      }
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="legado"
      data-clause
      className="relative overflow-hidden bg-paper"
      aria-labelledby="legado-titulo"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        {/* ── Legado ledger ── */}
        <div className="flex flex-col gap-5" data-reveal>
          <span className="kicker">CLÁUSULA V · LEGADO Y ADMISIÓN</span>
          <h2 id="legado-titulo" className="font-heading text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1.05] text-ink">
            Un legado que <em className="text-navy">sigue creciendo.</em>
          </h2>
        </div>

        <div className="relative mt-14">
          <div data-ledger-line className="absolute left-0 right-0 top-[13px] hidden h-px bg-gold md:block" aria-hidden="true" />
          <ol className="grid grid-cols-1 gap-9 md:grid-cols-4">
            {hitos.map((h, i) => (
              <li
                key={h.anio}
                className="flex flex-col gap-3"
                data-reveal
                // eslint-disable-next-line react/forbid-dom-props
                style={{ '--reveal-delay': `${i * 0.12}s` } as React.CSSProperties}
              >
                <span
                  className={`relative z-10 h-[26px] w-[26px] rounded-full border ${
                    h.destacado ? 'border-gold bg-gold' : 'border-gold bg-paper'
                  }`}
                  aria-hidden="true"
                />
                <span className={`font-heading text-[2.1rem] leading-none ${h.destacado ? 'text-gold-deep' : 'text-navy'}`}>
                  {h.anio}
                </span>
                <p className="max-w-[30ch] text-[0.88rem] leading-[1.65] text-inkmuted">{h.hito}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* ── Admisiones close ── */}
        <div className="mt-24 grid grid-cols-1 items-center gap-14 border-t border-hairline pt-20 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <span className="kicker" data-reveal>
              ADMISIONES · AÑO ESCOLAR 2026–2027
            </span>
            <h3 className="font-heading text-[clamp(2rem,4vw,3.2rem)] leading-[1.06] text-ink" data-reveal>
              Formar parte empieza
              <br />
              <em className="text-navy">con una conversación.</em>
            </h3>
            <p className="max-w-[52ch] text-[0.98rem] leading-[1.7] text-inkmuted" data-reveal>
              Sin procesos fríos ni planillas interminables. Escríbenos, agenda tu
              visita y conoce el colegio por dentro. La respuesta llega el mismo
              día hábil.
            </p>
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center" data-reveal>
              {/* WhatsApp CTA sealed inside the drawn ring */}
              <span className="relative inline-flex">
                <svg className="pointer-events-none absolute -inset-[13px] h-[calc(100%+26px)] w-[calc(100%+26px)]" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <ellipse data-seal-ring cx="50" cy="50" rx="49" ry="47" fill="none" stroke="#B08D4A" strokeWidth="0.8" opacity="0.75" pathLength={1} vectorEffect="non-scaling-stroke" />
                  <ellipse data-seal-ring-inner cx="50" cy="50" rx="46.5" ry="43.5" fill="none" stroke="#E2D5B8" strokeWidth="0.6" opacity="0.8" pathLength={1} vectorEffect="non-scaling-stroke" />
                </svg>
                <a href={whatsappHref} rel="noopener noreferrer" target="_blank" className="btn-primary">
                  <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M9 1.5 C4.9 1.5 1.5 4.7 1.5 8.7 C1.5 10.2 2 11.6 2.8 12.8 L1.8 16.2 L5.3 15.3 C6.4 15.9 7.7 16.2 9 16.2 C13.1 16.2 16.5 12.8 16.5 8.7 C16.5 4.7 13.1 1.5 9 1.5 Z" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M6.2 6.5 C6.4 5.9 7 5.9 7.3 6.4 L7.9 7.5 C8 7.8 8 8.1 7.8 8.3 L7.4 8.8 C7.9 9.8 8.8 10.6 9.8 11 L10.3 10.5 C10.5 10.3 10.8 10.3 11 10.4 L12.2 11 C12.7 11.3 12.7 11.9 12.2 12.2 C11.6 12.6 10.9 12.8 10.2 12.6 C8 12.1 6.2 10.4 5.7 8.2 C5.5 7.6 5.8 6.9 6.2 6.5 Z" fill="currentColor" />
                  </svg>
                  ESCRÍBENOS POR WHATSAPP
                </a>
              </span>
              <a href={`${base}admisiones/`} className="btn-ghost">
                Requisitos y proceso
              </a>
            </div>
          </div>

          <ol className="flex flex-col lg:col-span-5 lg:col-start-8" data-reveal>
            {PASOS.map((p, i) => (
              <li
                key={p.num}
                className={`flex gap-6 py-6 ${i < PASOS.length - 1 ? 'border-b border-hairline' : ''}`}
              >
                <span className="font-heading text-[1.9rem] leading-none text-gold" aria-hidden="true">
                  {p.num}
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[1rem] font-semibold text-ink">{p.titulo}</span>
                  <p className="text-[0.87rem] leading-[1.65] text-inkmuted">{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
