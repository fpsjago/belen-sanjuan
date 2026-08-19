import { useRef, useState, type FormEvent } from 'react';
import { useReveal } from '../scripts/useReveal';

interface ContactoCuerpoProps {
  base: string;
  whatsappHref: string;
}

type FormStatus = 'idle' | 'error' | 'enviado';

interface FormErrors {
  nombre?: string;
  telefono?: string;
  nivel?: string;
}

const FAMILIA_LINKS = [
  { titulo: 'Calendario escolar', nota: 'Lapsos, feriados y actos del año' },
  { titulo: 'Circulares', nota: 'Comunicados oficiales al día' },
  { titulo: 'Lista de útiles', nota: 'Por grado, lista para descargar' },
  { titulo: 'Uniformes', nota: 'Guía por nivel y proveedores' },
];

export default function ContactoCuerpo({ base, whatsappHref }: ContactoCuerpoProps) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<FormErrors>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: FormErrors = {};
    if (!String(data.get('nombre') ?? '').trim()) next.nombre = 'Escribe tu nombre.';
    if (!String(data.get('telefono') ?? '').trim()) next.telefono = 'Necesitamos un teléfono para responderte.';
    if (!String(data.get('nivel') ?? '')) next.nivel = 'Selecciona el nivel de interés.';
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus('error');
      return;
    }
    // [Integración de envío pendiente: Web3Forms / correo del colegio]
    setStatus('enviado');
  }

  return (
    <div ref={ref}>
      <section id="contacto" data-clause className="bg-paper" aria-labelledby="contacto-t">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-12">
          {/* ── Info ledger ── */}
          <div className="flex flex-col lg:col-span-5">
            <h2 id="contacto-t" className="sr-only">
              Datos de contacto
            </h2>
            {[
              {
                label: 'DIRECCIÓN',
                valor: '[Dirección completa de la sede] · Caracas, Venezuela',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="#B08D4A" strokeWidth="1.5" aria-hidden="true">
                    <path d="M11 2 C7 2 4 5 4 9 C4 14 11 20 11 20 C11 20 18 14 18 9 C18 5 15 2 11 2 Z" />
                    <circle cx="11" cy="9" r="2.6" />
                  </svg>
                ),
              },
              {
                label: 'WHATSAPP · ADMISIONES',
                valor: '[+58 XXX-XXXXXXX]',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="#B08D4A" strokeWidth="1.5" aria-hidden="true">
                    <path d="M11 2 C6 2 2 5.9 2 10.8 C2 12.6 2.6 14.3 3.6 15.8 L2.4 20 L6.7 18.9 C8 19.6 9.5 20 11 20 C16 20 20 15.9 20 11 C20 6 16 2 11 2 Z" />
                  </svg>
                ),
              },
              {
                label: 'CORREO',
                valor: '[correo@colegiobelensanjuan.com]',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="#B08D4A" strokeWidth="1.5" aria-hidden="true">
                    <rect x="2.5" y="4.5" width="17" height="13" />
                    <path d="M3 5.5 L11 12 L19 5.5" />
                  </svg>
                ),
              },
              {
                label: 'HORARIO DE ATENCIÓN',
                valor: 'Lunes a viernes · 7:00 am – 3:00 pm',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="#B08D4A" strokeWidth="1.5" aria-hidden="true">
                    <circle cx="11" cy="11" r="8.5" />
                    <path d="M11 6 V11 L14.5 13.5" strokeLinecap="round" />
                  </svg>
                ),
              },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                className={`flex gap-5 py-6 ${i < arr.length - 1 ? 'border-b border-hairline' : ''}`}
                data-reveal
                // eslint-disable-next-line react/forbid-dom-props
                style={{ '--reveal-delay': `${i * 0.07}s` } as React.CSSProperties}
              >
                <span className="mt-1 shrink-0">{row.icon}</span>
                <div className="flex flex-col gap-1">
                  <span className="kicker !text-[0.6rem]">{row.label}</span>
                  <span className="text-[0.98rem] leading-[1.6] text-ink">{row.valor}</span>
                </div>
              </div>
            ))}

            <figure className="lamina mt-8" data-reveal>
              <div className="lamina-pending aspect-[16/10]">
                <span className="px-4 text-center text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
                  Mapa · ubicación de la sede
                  <br />
                  [pendiente dirección exacta]
                </span>
              </div>
              <figcaption className="lamina-caption">CÓMO LLEGAR</figcaption>
            </figure>
          </div>

          {/* ── Form plate ── */}
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <form
              onSubmit={onSubmit}
              noValidate
              className="lamina flex flex-col gap-6 border-t-[3px] border-t-navy !p-8 md:!p-11"
            >
              <div className="flex flex-col gap-2">
                <h2 className="font-heading text-[2rem] text-ink">Escríbenos</h2>
                <p className="text-[0.9rem] text-inkmuted">
                  Cuéntanos la edad de tu hijo y te contamos el paso siguiente.
                </p>
              </div>

              {status === 'enviado' ? (
                <div className="flex flex-col items-center gap-4 py-10 text-center" role="status">
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                    <circle cx="22" cy="22" r="20" stroke="#B08D4A" strokeWidth="1.5" />
                    <path d="M14 22.5 L19.5 28 L30 16.5" stroke="#1F2E55" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="font-heading text-[1.5rem] text-ink">Mensaje recibido.</p>
                  <p className="max-w-[40ch] text-[0.9rem] text-inkmuted">
                    Te respondemos el mismo día hábil. Si prefieres no esperar,
                    escríbenos directo por WhatsApp.
                  </p>
                  <a href={whatsappHref} rel="noopener noreferrer" target="_blank" className="btn-ghost">
                    Abrir WhatsApp
                  </a>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="f-nombre" className="field-label">
                        Nombre del representante *
                      </label>
                      <input
                        id="f-nombre"
                        name="nombre"
                        type="text"
                        autoComplete="name"
                        className="field"
                        aria-invalid={errors.nombre ? 'true' : undefined}
                        aria-describedby={errors.nombre ? 'f-nombre-err' : undefined}
                      />
                      {errors.nombre && (
                        <p id="f-nombre-err" className="mt-1.5 text-[0.75rem] text-folio">
                          {errors.nombre}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="f-telefono" className="field-label">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        id="f-telefono"
                        name="telefono"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+58"
                        className="field"
                        aria-invalid={errors.telefono ? 'true' : undefined}
                        aria-describedby={errors.telefono ? 'f-telefono-err' : undefined}
                      />
                      {errors.telefono && (
                        <p id="f-telefono-err" className="mt-1.5 text-[0.75rem] text-folio">
                          {errors.telefono}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="f-nivel" className="field-label">
                        Nivel de interés *
                      </label>
                      <select
                        id="f-nivel"
                        name="nivel"
                        className="field appearance-none"
                        defaultValue=""
                        aria-invalid={errors.nivel ? 'true' : undefined}
                        aria-describedby={errors.nivel ? 'f-nivel-err' : undefined}
                      >
                        <option value="" disabled>
                          Selecciona…
                        </option>
                        <option value="maternal">Maternal y Preescolar</option>
                        <option value="primaria">Primaria</option>
                        <option value="secundaria">Secundaria</option>
                      </select>
                      {errors.nivel && (
                        <p id="f-nivel-err" className="mt-1.5 text-[0.75rem] text-folio">
                          {errors.nivel}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="f-edad" className="field-label">
                        Edad del estudiante
                      </label>
                      <input id="f-edad" name="edad" type="text" inputMode="numeric" placeholder="Ej. 7 años" className="field" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="f-mensaje" className="field-label">
                      Mensaje
                    </label>
                    <textarea
                      id="f-mensaje"
                      name="mensaje"
                      rows={5}
                      placeholder="¿Qué te gustaría saber del colegio?"
                      className="field resize-y"
                    />
                  </div>

                  {status === 'error' && Object.keys(errors).length > 0 && (
                    <p className="border border-folio/40 bg-folio/5 px-4 py-3 text-[0.82rem] text-folio" role="alert">
                      Revisa los campos marcados: faltan datos para poder responderte.
                    </p>
                  )}

                  <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                    <p className="max-w-[30ch] text-[0.75rem] leading-[1.55] text-inkmuted">
                      Tus datos solo se usan para responderte. Nada de listas de correo
                      sin permiso.
                    </p>
                    <button type="submit" className="btn-primary">
                      ENVIAR MENSAJE
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ── Familias de la casa ── */}
      <section id="familias" data-clause className="border-t border-hairline bg-plate" aria-labelledby="familias-t">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-24">
          <h2 id="familias-t" className="font-heading text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.1] text-ink" data-reveal>
            Para las familias <em className="text-navy">de la casa.</em>
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FAMILIA_LINKS.map((l, i) => (
              <a
                key={l.titulo}
                href={`${base}contacto/#familias`}
                className="group flex flex-col gap-2 border border-hairline bg-paper p-7 transition-colors duration-300 hover:border-gold"
                data-reveal
                // eslint-disable-next-line react/forbid-dom-props
                style={{ '--reveal-delay': `${i * 0.07}s` } as React.CSSProperties}
              >
                <span className="font-heading text-[1.35rem] text-ink">{l.titulo}</span>
                <span className="flex items-center gap-2 text-[0.82rem] text-inkmuted transition-colors duration-300 group-hover:text-gold-deep">
                  {l.nota}
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M2.5 8 H13.5 M9.5 4 L13.5 8 L9.5 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
          <p className="mt-6 text-[0.75rem] text-inkmuted" data-reveal>
            [Los accesos de familias se activan cuando el colegio entregue los documentos.]
          </p>
        </div>
      </section>
    </div>
  );
}
