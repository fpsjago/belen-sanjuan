import { useRef } from 'react';
import { useReveal } from '../scripts/useReveal';
import type { EventoData, OptimizedImage } from '../types';

interface VidaCuerpoProps {
  base: string;
  mundial: OptimizedImage;
  cancha: OptimizedImage;
  comunidad: OptimizedImage;
  virutas: OptimizedImage;
  libros: OptimizedImage;
  eventos: EventoData[];
}

const PILARES = [
  {
    titulo: 'Deportes',
    texto: 'Baloncesto, fútbol y atletismo en nuestra cancha techada. Competencias intercolegiales y el Mundial BSJ cada año.',
    icon: (
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="#C9A96A" strokeWidth="1.6" aria-hidden="true">
        <circle cx="19" cy="19" r="13" />
        <path d="M19 6 V32 M6.5 15 C13 18 25 18 31.5 15 M6.5 23 C13 20 25 20 31.5 23" />
      </svg>
    ),
  },
  {
    titulo: 'Fe y pastoral',
    texto: 'Misas, convivencias por grado y una vida espiritual que acompaña sin imponer. Parte del corazón del colegio.',
    icon: (
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="#C9A96A" strokeWidth="1.6" aria-hidden="true">
        <path d="M19 7 V31 M12 14 H26" strokeLinecap="round" />
        <path d="M9 31 C13 26 25 26 29 31" />
      </svg>
    ),
  },
  {
    titulo: 'Arte y tradiciones',
    texto: 'Música, teatro y las fiestas tradicionales venezolanas celebradas en grande, del Carnaval a la Navidad.',
    icon: (
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="#C9A96A" strokeWidth="1.6" aria-hidden="true">
        <path d="M9 29 C9 17 16 9 29 9 C29 22 22 29 11 29 Z" />
        <path d="M9 29 C14 22 19 17 26 12" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    titulo: 'Obra social',
    texto: 'Jornadas de donación y servicio lideradas por los propios estudiantes. Dar también se aprende, y se practica.',
    icon: (
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="#C9A96A" strokeWidth="1.6" aria-hidden="true">
        <path d="M19 32 C19 32 7 24.5 7 15.5 C7 11 10.5 8 14.5 8 C17 8 19 10 19 10 C19 10 21 8 23.5 8 C27.5 8 31 11 31 15.5 C31 24.5 19 32 19 32 Z" />
      </svg>
    ),
  },
];

export default function VidaCuerpo({ base, mundial, cancha, comunidad, virutas, libros, eventos }: VidaCuerpoProps) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  return (
    <div ref={ref}>
      {/* ═══ I · PILARES ═══ */}
      <section id="pilares" data-clause className="bg-paper" aria-labelledby="pilares-t">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <h2 id="pilares-t" className="font-heading text-[clamp(2rem,4vw,3.2rem)] leading-[1.08] text-ink" data-reveal>
            I. Cuatro maneras <em className="text-navy">de crecer.</em>
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2">
            {PILARES.map((p, i) => (
              <article
                key={p.titulo}
                className="grid grid-cols-[96px_1fr] border border-hairline bg-plate"
                data-reveal
                // eslint-disable-next-line react/forbid-dom-props
                style={{ '--reveal-delay': `${(i % 2) * 0.1}s` } as React.CSSProperties}
              >
                <div className="flex items-center justify-center bg-navy">{p.icon}</div>
                <div className="flex flex-col gap-2 p-7">
                  <h3 className="font-heading text-[1.5rem] text-ink">{p.titulo}</h3>
                  <p className="text-[0.9rem] leading-[1.7] text-inkmuted">{p.texto}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ II · EL AÑO BSJ ═══ */}
      <section id="anio" data-clause className="bg-navy text-paper" aria-labelledby="anio-t">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end" data-reveal>
            <h2 id="anio-t" className="font-heading text-[clamp(2rem,4vw,3.2rem)] leading-[1.08]">
              II. El año <em className="text-[#C9A96A]">Belén Sanjuán.</em>
            </h2>
            <span className="kicker kicker-night">TRADICIONES QUE LOS EGRESADOS RECUERDAN</span>
          </div>
          <ol className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {eventos.map((e, i) => (
              <li
                key={e.nombre}
                className="flex flex-col gap-2.5 border-l border-[#3A4A78] pl-6"
                data-reveal
                // eslint-disable-next-line react/forbid-dom-props
                style={{ '--reveal-delay': `${i * 0.1}s` } as React.CSSProperties}
              >
                <span className="kicker kicker-night !text-[0.62rem]">{e.mes}</span>
                <span className="font-heading text-[1.6rem]">{e.nombre}</span>
                <p className="text-[0.86rem] leading-[1.65] text-nightink">{e.descripcion}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ III · GALERÍA ═══ */}
      <section id="galeria" data-clause className="bg-paper" aria-labelledby="galeria-t">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end" data-reveal>
            <h2 id="galeria-t" className="font-heading text-[clamp(2rem,4vw,3.2rem)] leading-[1.08] text-ink">
              III. Galería
            </h2>
            <a
              href="https://www.instagram.com/colegiobelensanjuan/"
              rel="noopener noreferrer"
              target="_blank"
              className="btn-ghost"
            >
              Síguenos en Instagram
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
            <figure className="lamina col-span-2 row-span-2 rotate-[-0.7deg]" data-reveal>
              <div className="overflow-hidden" data-reveal-clip>
                <picture>
                  <source srcSet={mundial.avif} type="image/avif" />
                  <source srcSet={mundial.webp} type="image/webp" />
                  <img src={mundial.webp} alt={mundial.alt} width={mundial.width} height={mundial.height} loading="lazy" decoding="async" className="w-full object-cover" />
                </picture>
              </div>
              <figcaption className="lamina-caption">MUNDIAL BSJ</figcaption>
            </figure>

            {[
              { img: comunidad, cap: 'FAMILIA BSJ', rot: 'rotate-[0.8deg]' },
              { img: cancha, cap: 'CANCHA TECHADA', rot: 'rotate-[-0.9deg]' },
              { img: virutas, cap: 'TALLER', rot: 'rotate-[0.6deg]' },
              { img: libros, cap: 'BIBLIOTECA', rot: 'rotate-[-0.5deg]' },
            ].map(({ img, cap, rot }, i) => (
              <figure
                key={cap}
                className={`lamina ${rot}`}
                data-reveal
                // eslint-disable-next-line react/forbid-dom-props
                style={{ '--reveal-delay': `${i * 0.08}s` } as React.CSSProperties}
              >
                <div className="overflow-hidden" data-reveal-clip>
                  <picture>
                    <source srcSet={img.avif} type="image/avif" />
                    <source srcSet={img.webp} type="image/webp" />
                    <img src={img.webp} alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
                  </picture>
                </div>
                <figcaption className="lamina-caption">{cap}</figcaption>
              </figure>
            ))}

            {/* honest pending slots for the client shoot */}
            {['MISA Y CONVIVENCIAS', 'ACTO DE GRADO'].map((cap, i) => (
              <figure
                key={cap}
                className="lamina"
                data-reveal
                // eslint-disable-next-line react/forbid-dom-props
                style={{ '--reveal-delay': `${i * 0.08}s` } as React.CSSProperties}
              >
                <div className="lamina-pending aspect-[4/3]">
                  <span className="px-4 text-center text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
                    Lámina · {cap}
                    <br />
                    pendiente sesión
                  </span>
                </div>
                <figcaption className="lamina-caption">{cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
