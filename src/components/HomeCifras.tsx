import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { CifraData } from '../types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CIFRAS: CifraData[] = [
  { valor: 37, display: '37', etiqueta: 'AÑOS FORMANDO' },
  { valor: 3, display: '3', etiqueta: 'NIVELES · 1 CAMPUS' },
  { valor: 16, display: '16', etiqueta: 'AÑOS DE CRECIMIENTO · DE 1 A 17' },
  { valor: null, display: '[N°]', etiqueta: 'ESTUDIANTES ACTIVOS', pendiente: true },
];

export default function HomeCifras() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const cells = root.querySelectorAll('[data-cifra-cell]');
      const nums = root.querySelectorAll<HTMLElement>('[data-cifra-num]');

      if (reduced) {
        gsap.set(cells, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(cells, { opacity: 0, y: 30 });

      const play = () => {
        gsap.to(cells, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
        });
        nums.forEach((el) => {
          const target = parseInt(el.dataset.target ?? '', 10);
          if (Number.isNaN(target)) return;
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = String(Math.round(obj.v));
            },
          });
        });
      };

      // fire-if-in-view counter pattern (animations.md §3)
      const rect = root.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        play();
        return;
      }
      ScrollTrigger.create({ trigger: root, start: 'top 82%', once: true, onEnter: play });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="border-y border-hairline bg-paper" aria-label="El colegio en cifras">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 lg:grid-cols-4">
        {CIFRAS.map((c, i) => (
          <div
            key={c.etiqueta}
            data-cifra-cell
            className={`flex flex-col gap-1.5 px-8 py-9 md:px-12 ${
              i < CIFRAS.length - 1 ? 'lg:border-r lg:border-hairline' : ''
            } ${i % 2 === 0 ? 'border-r border-hairline lg:border-r' : ''} ${i < 2 ? 'border-b border-hairline lg:border-b-0' : ''}`}
          >
            <span className="font-heading text-[2.9rem] leading-none text-navy">
              {c.pendiente ? (
                <span className="text-[1.8rem] text-inkmuted">{c.display}</span>
              ) : (
                <span data-cifra-num data-target={c.valor ?? 0}>
                  0
                </span>
              )}
            </span>
            <span className="text-[0.66rem] font-semibold tracking-[0.18em] text-inkmuted">
              {c.etiqueta}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
