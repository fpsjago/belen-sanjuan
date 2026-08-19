import { useRef, useState, useId } from 'react';
import { useReveal } from '../scripts/useReveal';
import type { FaqData } from '../types';

interface AdmisionesCuerpoProps {
  base: string;
  faqs: FaqData[];
  whatsappHref: string;
}

const PASOS = [
  {
    num: '01',
    titulo: 'Visita el campus',
    texto: 'Recorrido guiado por aulas, cancha y espacios de cada nivel, y una conversación con la dirección para responder todo.',
    dato: 'DURACIÓN · 1 HORA',
  },
  {
    num: '02',
    titulo: 'Entrega de recaudos',
    texto: 'Planilla de inscripción, notas del plantel anterior y documentos del representante. Te damos la lista completa en la visita.',
    dato: 'EN LÍNEA O EN SEDE',
  },
  {
    num: '03',
    titulo: 'Encuentro con el estudiante',
    texto: 'Evaluación diagnóstica adaptada al nivel: para conocer cómo aprende, no para dejar fuera. Y la bienvenida a la familia BSJ.',
    dato: 'RESPUESTA EN [N] DÍAS',
  },
];

const RECAUDOS: Array<{ nivel: string; numeral: string; accent: string; items: string[] }> = [
  {
    nivel: 'MATERNAL Y PREESCOLAR',
    numeral: 'I',
    accent: 'text-gold-deep',
    items: ['Partida de nacimiento', 'Tarjeta de vacunas al día', 'Informe pediátrico reciente', 'Cédulas de los representantes'],
  },
  {
    nivel: 'PRIMARIA',
    numeral: 'II',
    accent: 'text-navy',
    items: ['Boleta o notas del año anterior', 'Constancia de retiro del plantel anterior', 'Partida de nacimiento y fotos carnet', 'Cédulas de los representantes'],
  },
  {
    nivel: 'SECUNDARIA',
    numeral: 'III',
    accent: 'text-folio',
    items: ['Notas certificadas de años cursados', 'Constancia de promoción', 'Cédula del estudiante y representantes', 'Carta de buena conducta'],
  },
];

const FECHAS = [
  { mes: '[Mes]', evento: 'Apertura del proceso de admisión' },
  { mes: '[Mes]', evento: 'Jornadas de puertas abiertas por nivel' },
  { mes: '[Mes]', evento: 'Cierre de inscripciones para nuevas familias' },
  { mes: 'Septiembre', evento: 'Inicio del año escolar 2026–2027', destacado: true },
];

export default function AdmisionesCuerpo({ base, faqs, whatsappHref }: AdmisionesCuerpoProps) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqId = useId();

  return (
    <div ref={ref}>
      {/* ═══ I · PASOS ═══ */}
      <section id="proceso" data-clause className="bg-paper" aria-labelledby="proceso-t">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <h2 id="proceso-t" className="font-heading text-[clamp(2rem,4vw,3.2rem)] leading-[1.08] text-ink" data-reveal>
            I. El proceso, <em className="text-navy">paso a paso.</em>
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-3">
            {PASOS.map((p, i) => (
              <article
                key={p.num}
                className="lamina flex flex-col gap-4 !p-8"
                data-reveal
                // eslint-disable-next-line react/forbid-dom-props
                style={{ '--reveal-delay': `${i * 0.1}s` } as React.CSSProperties}
              >
                <span className="font-heading text-[3.2rem] leading-none text-gold" aria-hidden="true">
                  {p.num}
                </span>
                <h3 className="font-heading text-[1.5rem] text-ink">{p.titulo}</h3>
                <p className="text-[0.92rem] leading-[1.7] text-inkmuted">{p.texto}</p>
                <span className="kicker mt-auto pt-2 !text-[0.62rem]">{p.dato}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ II · RECAUDOS ═══ */}
      <section id="recaudos" data-clause className="border-y border-hairline bg-plate" aria-labelledby="recaudos-t">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end" data-reveal>
            <h2 id="recaudos-t" className="font-heading text-[clamp(2rem,4vw,3.2rem)] leading-[1.08] text-ink">
              II. Recaudos <em className="text-navy">por nivel.</em>
            </h2>
            <p className="text-[0.8rem] text-inkmuted">Lista referencial · [confirmar con administración]</p>
          </div>
          <div className="mt-12 grid grid-cols-1 border border-hairline md:grid-cols-3" data-reveal>
            {RECAUDOS.map((r, i) => (
              <div
                key={r.nivel}
                className={`flex flex-col gap-5 p-8 ${i < RECAUDOS.length - 1 ? 'border-b border-hairline md:border-b-0 md:border-r' : ''}`}
              >
                <span className={`kicker ${r.accent}`}>
                  {r.numeral} · {r.nivel}
                </span>
                <ul className="flex flex-col gap-3">
                  {r.items.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-[0.9rem] leading-[1.6] text-ink">
                      <span className="mt-[11px] h-px w-4 shrink-0 bg-gold" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ III · FECHAS + INVERSIÓN ═══ */}
      <section id="fechas" data-clause className="bg-paper" aria-labelledby="fechas-t">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-6">
            <h2 id="fechas-t" className="font-heading text-[clamp(1.9rem,3.4vw,2.7rem)] leading-[1.1] text-ink" data-reveal>
              III. Fechas clave
            </h2>
            <ol className="flex flex-col" data-reveal>
              {FECHAS.map((f, i) => (
                <li
                  key={i}
                  className={`flex items-baseline gap-6 py-5 ${i < FECHAS.length - 1 ? 'border-b border-hairline' : ''}`}
                >
                  <span className={`min-w-[120px] font-heading text-[1.35rem] ${f.destacado ? 'text-gold-deep' : 'text-navy'}`}>
                    {f.mes}
                  </span>
                  <span className="text-[0.94rem] text-inkmuted">{f.evento}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-5 lg:col-start-8">
            <h2 className="font-heading text-[clamp(1.9rem,3.4vw,2.7rem)] leading-[1.1] text-ink" data-reveal>
              Inversión
            </h2>
            <div className="lamina border-t-[3px] border-t-gold !p-8" data-reveal>
              <dl className="flex flex-col">
                {[
                  ['Inscripción anual', '[Monto]'],
                  ['Mensualidad maternal', '[Monto]'],
                  ['Mensualidad primaria', '[Monto]'],
                  ['Mensualidad secundaria', '[Monto]'],
                ].map(([k, v], i, arr) => (
                  <div
                    key={k}
                    className={`flex items-baseline justify-between py-3.5 ${i < arr.length - 1 ? 'border-b border-hairline/70' : ''}`}
                  >
                    <dt className="text-[0.92rem] text-inkmuted">{k}</dt>
                    <dd className="font-semibold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="text-[0.8rem] leading-[1.6] text-inkmuted" data-reveal>
              Descuento por hermanos y convenios disponibles. Montos publicados según
              la regulación vigente. Pregunta en administración.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ IV · FAQ ═══ */}
      <section id="preguntas" data-clause className="border-t border-hairline bg-plate" aria-labelledby="faq-t">
        <div className="mx-auto max-w-[900px] px-6 py-20 md:py-28">
          <h2 id="faq-t" className="text-center font-heading text-[clamp(2rem,4vw,3.2rem)] leading-[1.08] text-ink" data-reveal>
            IV. Preguntas <em className="text-navy">frecuentes.</em>
          </h2>
          <div className="mt-12 border-t border-hairline" data-reveal>
            {faqs.map((f, i) => {
              const open = openFaq === i;
              const tid = `${faqId}-t${i}`;
              const pid = `${faqId}-p${i}`;
              return (
                <div key={f.pregunta} className="border-b border-hairline">
                  <button
                    id={tid}
                    aria-expanded={open}
                    aria-controls={pid}
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-[1.02rem] font-medium text-ink">{f.pregunta}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                      className={`shrink-0 text-gold-deep transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
                    >
                      <path d="M8 2 V14 M2 8 H14" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div
                    id={pid}
                    role="region"
                    aria-labelledby={tid}
                    className={`overflow-hidden transition-[max-height,padding] duration-300 ease-out ${open ? 'max-h-60 pb-5' : 'max-h-0'}`}
                  >
                    <p className="max-w-[65ch] text-[0.92rem] leading-[1.7] text-inkmuted">{f.respuesta}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CIERRE ═══ */}
      <section className="bg-navy text-paper">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 px-6 py-16 md:flex-row md:items-center md:px-10 md:py-20">
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.12]">
              Los cupos por grado son limitados.
            </h2>
            <p className="text-[0.92rem] text-nightink">
              Escríbenos hoy. La respuesta llega el mismo día hábil.
            </p>
          </div>
          <a
            href={whatsappHref}
            rel="noopener noreferrer"
            target="_blank"
            className="btn-primary shrink-0 !bg-[#C9A96A] !text-night hover:!bg-[#d6b87e]"
          >
            <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M9 1.5 C4.9 1.5 1.5 4.7 1.5 8.7 C1.5 10.2 2 11.6 2.8 12.8 L1.8 16.2 L5.3 15.3 C6.4 15.9 7.7 16.2 9 16.2 C13.1 16.2 16.5 12.8 16.5 8.7 C16.5 4.7 13.1 1.5 9 1.5 Z" stroke="currentColor" strokeWidth="1.4" />
              <path d="M6.2 6.5 C6.4 5.9 7 5.9 7.3 6.4 L7.9 7.5 C8 7.8 8 8.1 7.8 8.3 L7.4 8.8 C7.9 9.8 8.8 10.6 9.8 11 L10.3 10.5 C10.5 10.3 10.8 10.3 11 10.4 L12.2 11 C12.7 11.3 12.7 11.9 12.2 12.2 C11.6 12.6 10.9 12.8 10.2 12.6 C8 12.1 6.2 10.4 5.7 8.2 C5.5 7.6 5.8 6.9 6.2 6.5 Z" fill="currentColor" />
            </svg>
            INICIAR ADMISIÓN
          </a>
        </div>
      </section>
    </div>
  );
}
