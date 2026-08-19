import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReveal } from '../scripts/useReveal';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface HomeProyectoProps {
  base: string;
}

const PILARES = [
  { num: 'I', nombre: 'La mente', texto: 'Rigor académico con seguimiento individual. Leer, razonar y argumentar antes que memorizar.' },
  { num: 'II', nombre: 'El cuerpo', texto: 'Deporte y hábitos de salud dentro del currículo. Un niño que se mueve, aprende mejor.' },
  { num: 'III', nombre: 'El carácter', texto: 'Valores vividos, no recitados: responsabilidad, honestidad y el hábito de servir.' },
  { num: 'IV', nombre: 'La fe', texto: 'Vida espiritual que acompaña el crecimiento: misas, pastoral y una comunidad que reza junta.' },
];

export default function HomeProyecto({ base }: HomeProyectoProps) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const laurel = root.querySelectorAll<SVGPathElement>('[data-laurel]');
      if (!laurel.length) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        gsap.set(laurel, { strokeDashoffset: 0 });
        return;
      }
      gsap.set(laurel, { strokeDasharray: 1, strokeDashoffset: 1 });
      ScrollTrigger.create({
        trigger: root,
        start: 'top 60%',
        once: true,
        onEnter: () => {
          gsap.to(laurel, {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: 'power2.inOut',
            stagger: 0.2,
          });
        },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="proyecto"
      data-clause
      className="relative overflow-hidden bg-navy text-paper"
      aria-labelledby="proyecto-titulo"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 py-24 md:grid-cols-12 md:gap-10 md:px-10 md:py-32">
        <div className="flex flex-col gap-6 md:col-span-5" data-reveal>
          <span className="kicker kicker-night">CLÁUSULA II · NUESTRO PROYECTO</span>
          <h2
            id="proyecto-titulo"
            className="font-heading text-[clamp(2.2rem,4.4vw,3.5rem)] leading-[1.08]"
          >
            La educación integral no es un método.
            <br />
            <em className="text-[#C9A96A]">Es una convicción.</em>
          </h2>
          {/* laurel flourish — draws on enter */}
          <svg width="150" height="44" viewBox="0 0 150 44" fill="none" aria-hidden="true" className="mt-2">
            <path data-laurel d="M4 22 C40 8 110 8 146 22" stroke="#C9A96A" strokeWidth="1.2" pathLength={1} />
            <path data-laurel d="M20 22 C26 15 26 10 22 5 M34 19 C40 12 40 8 37 3 M116 19 C110 12 110 8 113 3 M130 22 C124 15 124 10 128 5" stroke="#C9A96A" strokeWidth="1" pathLength={1} />
          </svg>
        </div>

        <div className="flex flex-col justify-center gap-9 md:col-span-6 md:col-start-7">
          <p className="text-[1.02rem] leading-[1.75] text-nightink" data-reveal>
            Llevamos el nombre de la maestra Belén Sanjuán, pionera de la educación
            integral en Venezuela: formar la mente, el cuerpo, el carácter y la fe.
            No por separado, sino como una sola persona que crece.
          </p>
          <div className="grid grid-cols-1 gap-x-9 gap-y-7 sm:grid-cols-2">
            {PILARES.map((p, i) => (
              <div
                key={p.num}
                className="flex flex-col gap-2 border-t border-[#3A4A78] pt-5"
                data-reveal
                // eslint-disable-next-line react/forbid-dom-props
                style={{ '--reveal-delay': `${i * 0.09}s` } as React.CSSProperties}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-heading text-[1.35rem] text-[#C9A96A]">{p.num}</span>
                  <span className="font-heading text-[1.25rem]">{p.nombre}</span>
                </div>
                <p className="text-[0.88rem] leading-[1.65] text-nightink">{p.texto}</p>
              </div>
            ))}
          </div>
          <a href={`${base}proyecto-educativo/`} className="btn-ghost self-start !border-[#C9A96A] !text-[#C9A96A]" data-reveal>
            Leer el proyecto completo
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M2.5 8 H13.5 M9.5 4 L13.5 8 L9.5 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
