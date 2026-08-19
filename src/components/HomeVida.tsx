import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReveal } from '../scripts/useReveal';
import type { OptimizedImage } from '../types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface HomeVidaProps {
  base: string;
  mundial: OptimizedImage;
  cancha: OptimizedImage;
  lapices: OptimizedImage;
  virutas: OptimizedImage;
}

/**
 * Clause III — the collage desk. Client prints mounted as rotated láminas with
 * archival-tape corners, parallaxing at different depths (desktop scrub).
 */
export default function HomeVida({ base, mundial, cancha, lapices, virutas }: HomeVidaProps) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        root.querySelectorAll<HTMLElement>('[data-depth]').forEach((el) => {
          const depth = parseFloat(el.dataset.depth ?? '0');
          gsap.to(el, {
            yPercent: depth * -100,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="vida"
      data-clause
      className="relative overflow-hidden bg-paper"
      aria-labelledby="vida-titulo"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex flex-col gap-5" data-reveal>
          <span className="kicker">CLÁUSULA III · VIDA ESCOLAR</span>
          <h2 id="vida-titulo" className="font-heading text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1.05] text-ink">
            La vida entre clases <em className="text-navy">también educa.</em>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-2 lg:col-span-6">
          {/* Mundial — the big print */}
          <figure
            className="lamina lg:rotate-[-1.3deg]"
            data-reveal
            data-depth="0.06"
          >
            <div className="overflow-hidden" data-reveal-clip>
              <picture>
                <source srcSet={mundial.avif} type="image/avif" />
                <source srcSet={mundial.webp} type="image/webp" />
                <img
                  src={mundial.webp}
                  alt={mundial.alt}
                  width={mundial.width}
                  height={mundial.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover transition-transform duration-700 hover:scale-[1.025]"
                />
              </picture>
            </div>
            <figcaption className="lamina-caption">
              MUNDIAL BELÉN SANJUÁN · EL ENCUENTRO DEPORTIVO-CULTURAL DEL AÑO
            </figcaption>
          </figure>

          <figure
            className="lamina hidden rotate-[0.9deg] lg:mt-6 lg:ml-16 lg:block lg:max-w-[400px]"
            data-reveal
            data-depth="0.15"
          >
            <div className="overflow-hidden" data-reveal-clip>
              <picture>
                <source srcSet={virutas.avif} type="image/avif" />
                <source srcSet={virutas.webp} type="image/webp" />
                <img
                  src={virutas.webp}
                  alt={virutas.alt}
                  width={virutas.width}
                  height={virutas.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover"
                />
              </picture>
            </div>
            <figcaption className="lamina-caption">TALLER · MANOS A LA OBRA</figcaption>
          </figure>
          </div>

          <div className="flex flex-col gap-10 lg:col-span-6">
            <div className="grid grid-cols-2 gap-7">
              {/* Cancha */}
              <figure className="lamina rotate-[1.1deg]" data-reveal data-depth="0.12">
                <div className="overflow-hidden" data-reveal-clip>
                  <picture>
                    <source srcSet={cancha.avif} type="image/avif" />
                    <source srcSet={cancha.webp} type="image/webp" />
                    <img
                      src={cancha.webp}
                      alt={cancha.alt}
                      width={cancha.width}
                      height={cancha.height}
                      loading="lazy"
                      decoding="async"
                      className="w-full object-cover"
                    />
                  </picture>
                </div>
                <figcaption className="lamina-caption">CANCHA TECHADA</figcaption>
              </figure>
              {/* Lápices detail */}
              <figure className="lamina rotate-[-0.8deg] lg:mt-8" data-reveal data-depth="0.18">
                <div className="overflow-hidden" data-reveal-clip>
                  <picture>
                    <source srcSet={lapices.avif} type="image/avif" />
                    <source srcSet={lapices.webp} type="image/webp" />
                    <img
                      src={lapices.webp}
                      alt={lapices.alt}
                      width={lapices.width}
                      height={lapices.height}
                      loading="lazy"
                      decoding="async"
                      className="w-full object-cover"
                    />
                  </picture>
                </div>
                <figcaption className="lamina-caption">ARTE Y OFICIO</figcaption>
              </figure>
            </div>

            <ul className="flex flex-col divide-y divide-hairline border-y border-hairline" data-reveal>
              {[
                ['Deportes', 'Baloncesto, fútbol y atletismo, con competencias intercolegiales todo el año.'],
                ['Fe y solidaridad', 'Misas, convivencias y jornadas de donación que forman el corazón tanto como la mente.'],
                ['Cultura y tradiciones', 'Música, teatro y las fiestas venezolanas celebradas en grande.'],
              ].map(([t, d]) => (
                <li key={t} className="flex flex-col gap-1 py-4">
                  <span className="font-heading text-[1.25rem] text-ink">{t}</span>
                  <span className="text-[0.9rem] leading-[1.65] text-inkmuted">{d}</span>
                </li>
              ))}
            </ul>

            <a href={`${base}vida-escolar/`} className="btn-ghost self-start" data-reveal>
              Conocer la vida escolar
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M2.5 8 H13.5 M9.5 4 L13.5 8 L9.5 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
