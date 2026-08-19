import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface HeroProps {
  base: string;
}

/**
 * "El Acta" — the signature. A double gold diploma frame draws itself like a
 * pen ruling a certificate; the crest settles at its head; the motto rises
 * line-masked inside; on scroll the composition drifts out (scrub).
 * Mobile (pointer:coarse / <768px): entrance plays once, no scrub.
 * Reduced motion: everything visible, static.
 */
export default function Hero({ base }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const frameOuter = section.querySelector<SVGRectElement>('[data-frame-outer]');
      const frameInner = section.querySelector<SVGRectElement>('[data-frame-inner]');
      const corners = section.querySelectorAll<SVGPathElement>('[data-corner]');
      const crest = section.querySelector('[data-hero-crest]');
      const rules = section.querySelectorAll('[data-hero-rule]');
      const kicker = section.querySelector('[data-hero-kicker]');
      const lines = section.querySelectorAll('[data-hero-line]');
      const sub = section.querySelector('[data-hero-sub]');
      const ctas = section.querySelector('[data-hero-ctas]');
      const inner = section.querySelector('[data-hero-inner]');

      const mm = gsap.matchMedia();

      mm.add(
        {
          motionOk: '(prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
          desktop: '(min-width: 769px) and (pointer: fine)',
        },
        (ctx) => {
          const { motionOk, desktop } = ctx.conditions as {
            motionOk: boolean;
            reduced: boolean;
            desktop: boolean;
          };

          if (!motionOk) {
            // Reduced motion — final state, no animation.
            gsap.set([crest, kicker, sub, ctas], { opacity: 1, y: 0 });
            gsap.set(lines, { yPercent: 0 });
            gsap.set(rules, { scaleX: 1 });
            if (frameOuter) gsap.set(frameOuter, { strokeDashoffset: 0 });
            if (frameInner) gsap.set(frameInner, { strokeDashoffset: 0 });
            gsap.set(corners, { opacity: 1 });
            return;
          }

          // ── Entrance: the pen rules the acta ──
          const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

          if (frameOuter && frameInner) {
            gsap.set([frameOuter, frameInner], { strokeDasharray: 1, strokeDashoffset: 1 });
            tl.to(frameOuter, { strokeDashoffset: 0, duration: 1.7 }, 0.15);
            tl.to(frameInner, { strokeDashoffset: 0, duration: 1.5 }, 0.55);
          }
          tl.fromTo(
            corners,
            { opacity: 0, scale: 0.6, transformOrigin: 'center' },
            { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', stagger: 0.06 },
            1.5,
          );
          tl.fromTo(
            crest,
            { opacity: 0, y: -26 },
            { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
            0.9,
          );
          tl.fromTo(
            rules,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, stagger: 0.1 },
            1.25,
          );
          tl.fromTo(
            kicker,
            { opacity: 0 },
            { opacity: 1, duration: 0.7, ease: 'power2.out' },
            1.35,
          );
          tl.to(
            lines,
            { yPercent: -110, duration: 1.05, ease: 'power4.out', stagger: 0.12 },
            1.55,
          );
          tl.fromTo(
            sub,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
            2.05,
          );
          tl.fromTo(
            ctas,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
            2.25,
          );

          // ── Exit scrub (desktop fine-pointer only) ──
          if (desktop && inner) {
            gsap.to(inner, {
              yPercent: -7,
              opacity: 0.25,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: 'bottom 35%',
                scrub: 0.8,
              },
            });
          }
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-paper px-4 pb-16 pt-[96px] md:px-7"
      aria-label="Portada"
    >
      <div className="relative w-full max-w-[1340px]" data-hero-inner>
        {/* ── The self-drawing double frame ── */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <rect
            data-frame-outer
            className="frame-outer"
            fill="none"
            stroke="#B08D4A"
            strokeWidth="1.5"
            pathLength={1}
          />
          <rect
            data-frame-inner
            className="frame-inner"
            fill="none"
            stroke="#E2D5B8"
            strokeWidth="1"
            pathLength={1}
          />
        </svg>
        {/* corner flourishes */}
        <svg className="pointer-events-none absolute left-[7px] top-[7px] h-8 w-8" viewBox="0 0 32 32" aria-hidden="true">
          <path data-corner d="M2 30 V8 Q2 2 8 2 H30" fill="none" stroke="#B08D4A" strokeWidth="1" />
        </svg>
        <svg className="pointer-events-none absolute right-[7px] top-[7px] h-8 w-8 -scale-x-100" viewBox="0 0 32 32" aria-hidden="true">
          <path data-corner d="M2 30 V8 Q2 2 8 2 H30" fill="none" stroke="#B08D4A" strokeWidth="1" />
        </svg>
        <svg className="pointer-events-none absolute bottom-[7px] left-[7px] h-8 w-8 -scale-y-100" viewBox="0 0 32 32" aria-hidden="true">
          <path data-corner d="M2 30 V8 Q2 2 8 2 H30" fill="none" stroke="#B08D4A" strokeWidth="1" />
        </svg>
        <svg className="pointer-events-none absolute bottom-[7px] right-[7px] h-8 w-8 -scale-x-100 -scale-y-100" viewBox="0 0 32 32" aria-hidden="true">
          <path data-corner d="M2 30 V8 Q2 2 8 2 H30" fill="none" stroke="#B08D4A" strokeWidth="1" />
        </svg>

        {/* ── Acta content ── */}
        <div className="flex flex-col items-center gap-8 px-6 py-16 text-center md:gap-9 md:px-16 md:py-20">
          <img
            data-hero-crest
            src={`${base}crest.png`}
            alt="Escudo de la U.E.P. Belén Sanjuán"
            width={82}
            height={104}
            className="h-[88px] w-auto opacity-0 md:h-[104px]"
            fetchPriority="high"
            loading="eager"
          />

          <div className="flex items-center gap-5 opacity-0" data-hero-kicker>
            <span className="rule-gold w-10 scale-x-0 md:w-14" data-hero-rule />
            <span className="kicker">
              MATERNAL · PRIMARIA · SECUNDARIA · DESDE MCMLXXXIX
            </span>
            <span className="rule-gold w-10 scale-x-0 md:w-14" data-hero-rule />
          </div>

          <h1 className="font-heading text-[clamp(2.9rem,7.8vw,7rem)] leading-[1.02] tracking-[-0.01em] text-ink">
            <span className="mask-line">
              <span data-hero-line className="translate-y-[110%]">
                Cultivando mentes,
              </span>
            </span>
            <span className="mask-line">
              <span data-hero-line className="translate-y-[110%] italic text-navy">
                cosechando futuros.
              </span>
            </span>
          </h1>

          <p
            data-hero-sub
            className="max-w-[58ch] text-[1.02rem] leading-[1.7] text-inkmuted opacity-0 md:text-[1.15rem]"
          >
            Treinta y siete años acompañando a familias caraqueñas desde el primer
            día de maternal hasta el título de bachiller. Educación integral, con
            nombre y apellido.
          </p>

          <div data-hero-ctas className="flex flex-col items-center gap-6 opacity-0 sm:flex-row">
            <a href={`${base}admisiones/`} className="btn-primary">
              AGENDA UNA VISITA
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M2.5 8 H13.5 M9.5 4 L13.5 8 L9.5 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href={`${base}proyecto-educativo/`} className="btn-ghost">
              Conoce el proyecto educativo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
