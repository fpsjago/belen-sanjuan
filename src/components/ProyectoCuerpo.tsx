import { useRef } from 'react';
import { useReveal } from '../scripts/useReveal';
import type { OptimizedImage } from '../types';

interface ProyectoCuerpoProps {
  base: string;
  libros: OptimizedImage;
  cuaderno: OptimizedImage;
}

const PILARES = [
  { num: 'I', nombre: 'La mente', texto: 'Rigor académico con seguimiento individual. Leer, razonar y argumentar antes que memorizar. La pregunta vale tanto como la respuesta.' },
  { num: 'II', nombre: 'El cuerpo', texto: 'Deporte y hábitos de salud dentro del currículo, no como premio. Un niño que se mueve, duerme y come bien, aprende mejor.' },
  { num: 'III', nombre: 'El carácter', texto: 'Valores vividos, no recitados: responsabilidad, honestidad y el hábito de servir a otros. Se practican en el aula, en la cancha y en la calle.' },
  { num: 'IV', nombre: 'La fe', texto: 'Vida espiritual que acompaña el crecimiento: misas, pastoral y una comunidad que reza junta y se sostiene en los momentos difíciles.' },
];

const AULA = [
  { nivel: 'EN MATERNAL', accent: 'text-gold-deep', texto: 'El proyecto de la semana puede ser el mercado: se juega a comprar, se cuenta el vuelto, se dibuja la fruta y se agradece la comida. Cuatro pilares, una mañana.' },
  { nivel: 'EN PRIMARIA', accent: 'text-navy', texto: 'Cada lapso cierra con una muestra: los estudiantes presentan su proyecto a las familias. Investigar, hacer y contar, desde los seis años.' },
  { nivel: 'EN SECUNDARIA', accent: 'text-folio', texto: 'El proyecto de grado une todo: una investigación real, con tutor, defendida ante jurado. El ensayo general de la universidad.' },
];

const VALORES = ['Respeto', 'Responsabilidad', 'Solidaridad', 'Excelencia', 'Identidad venezolana'];

export default function ProyectoCuerpo({ base, libros, cuaderno }: ProyectoCuerpoProps) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  return (
    <div ref={ref}>
      {/* ═══ I · LA MAESTRA ═══ */}
      <section id="maestra" data-clause className="bg-paper" aria-labelledby="maestra-t">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-4" data-reveal>
            <figure className="lamina rotate-[-1deg]">
              <div className="lamina-pending aspect-[3/4]">
                <span className="px-6 text-center text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
                  Retrato histórico
                  <br />
                  Maestra Belén Sanjuán
                  <br />
                  [pendiente del archivo]
                </span>
              </div>
              <figcaption className="lamina-caption">BELÉN SANJUÁN · MAESTRA VENEZOLANA, 1916–2004</figcaption>
            </figure>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-7 lg:col-start-6">
            <span className="kicker" data-reveal>
              I · NUESTRO NOMBRE, NUESTRA BRÚJULA
            </span>
            <h2 id="maestra-t" className="font-heading text-[clamp(2rem,4vw,3.2rem)] leading-[1.08] text-ink" data-reveal>
              Una maestra que entendió que se educa
              <em className="text-navy"> a la persona completa.</em>
            </h2>
            <p className="max-w-[62ch] text-[0.98rem] leading-[1.75] text-inkmuted" data-reveal>
              Discípula de Luis Beltrán Prieto Figueroa, la maestra Belén Sanjuán
              defendió toda su vida una idea simple y radical: la escuela no forma
              alumnos, forma ciudadanos. Su método, la educación integral, une lo
              académico con lo físico, lo artístico, lo moral y lo social.
              [Reseña histórica por validar con el colegio.]
            </p>
            <blockquote className="border-l-[3px] border-gold py-1 pl-6" data-reveal>
              <p className="font-heading text-[1.35rem] italic leading-[1.5] text-navy">
                "La educación debe preparar para la vida, no solamente para el examen."
              </p>
              <cite className="mt-2 block text-[0.66rem] font-semibold not-italic tracking-[0.2em] text-inkmuted">
                [CITA REFERENCIAL · CONFIRMAR TEXTO EXACTO]
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ═══ II · LOS PILARES ═══ */}
      <section id="pilares" data-clause className="bg-navy text-paper" aria-labelledby="pilares-p-t">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <h2 id="pilares-p-t" className="font-heading text-[clamp(2rem,4vw,3.2rem)] leading-[1.08]" data-reveal>
            II. Los cuatro pilares <em className="text-[#C9A96A]">de la formación integral.</em>
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {PILARES.map((p, i) => (
              <article
                key={p.num}
                className="flex flex-col gap-3.5 border border-[#3A4A78] p-8"
                data-reveal
                // eslint-disable-next-line react/forbid-dom-props
                style={{ '--reveal-delay': `${i * 0.09}s` } as React.CSSProperties}
              >
                <span className="font-heading text-[2.6rem] leading-none text-[#C9A96A]" aria-hidden="true">
                  {p.num}
                </span>
                <h3 className="font-heading text-[1.5rem]">{p.nombre}</h3>
                <p className="text-[0.88rem] leading-[1.7] text-nightink">{p.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ III · EN EL AULA ═══ */}
      <section id="aula" data-clause className="bg-paper" aria-labelledby="aula-t">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <h2 id="aula-t" className="font-heading text-[clamp(2rem,4vw,3.2rem)] leading-[1.08] text-ink" data-reveal>
            III. Cómo se ve <em className="text-navy">en el aula.</em>
          </h2>
          <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            <div className="flex flex-col gap-7 lg:col-span-7">
              {AULA.map((a, i) => (
                <article
                  key={a.nivel}
                  className="lamina flex flex-col gap-3 !p-8"
                  data-reveal
                  // eslint-disable-next-line react/forbid-dom-props
                  style={{ '--reveal-delay': `${i * 0.08}s` } as React.CSSProperties}
                >
                  <span className={`kicker ${a.accent}`}>{a.nivel}</span>
                  <p className="max-w-[68ch] text-[0.95rem] leading-[1.75] text-ink">{a.texto}</p>
                </article>
              ))}
            </div>
            <div className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9">
              <figure className="lamina rotate-[1deg]" data-reveal>
                <div className="overflow-hidden" data-reveal-clip>
                  <picture>
                    <source srcSet={libros.avif} type="image/avif" />
                    <source srcSet={libros.webp} type="image/webp" />
                    <img src={libros.webp} alt={libros.alt} width={libros.width} height={libros.height} loading="lazy" decoding="async" className="w-full object-cover" />
                  </picture>
                </div>
                <figcaption className="lamina-caption">EL HÁBITO DE LEER</figcaption>
              </figure>
              <figure className="lamina rotate-[-0.8deg]" data-reveal>
                <div className="overflow-hidden" data-reveal-clip>
                  <picture>
                    <source srcSet={cuaderno.avif} type="image/avif" />
                    <source srcSet={cuaderno.webp} type="image/webp" />
                    <img src={cuaderno.webp} alt={cuaderno.alt} width={cuaderno.width} height={cuaderno.height} loading="lazy" decoding="async" className="w-full object-cover" />
                  </picture>
                </div>
                <figcaption className="lamina-caption">LA PÁGINA EN BLANCO</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VALORES BAND ═══ */}
      <section className="border-y border-hairline bg-plate">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 py-14 md:px-10">
          {VALORES.map((v, i) => (
            <span key={v} className="flex items-center gap-10">
              {i > 0 && <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />}
              <span className="font-heading text-[1.5rem] italic text-navy">{v}</span>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
