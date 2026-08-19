import { useEffect, useRef } from 'react';

interface FooterProps {
  base: string;
}

const COLS: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: 'COLEGIO',
    links: [
      { label: 'Proyecto educativo', href: 'proyecto-educativo/' },
      { label: 'Niveles', href: 'niveles/' },
      { label: 'Vida escolar', href: 'vida-escolar/' },
    ],
  },
  {
    title: 'FAMILIAS',
    links: [
      { label: 'Admisiones', href: 'admisiones/' },
      { label: 'Contacto', href: 'contacto/' },
    ],
  },
];

export default function Footer({ base }: FooterProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    root.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="bg-night text-nightink">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="flex flex-col gap-5 md:col-span-5" data-reveal>
            <div className="flex items-center gap-4">
              <span className="bg-paper p-1">
                <img src={`${base}crest.png`} alt="" width={38} height={48} className="h-12 w-auto" />
              </span>
              <span className="font-heading text-[1.6rem] text-paper">Belén Sanjuán</span>
            </div>
            <p className="max-w-[36ch] text-[0.9rem] leading-relaxed">
              Unidad Educativa Privada. Maternal, primaria y secundaria en un solo
              campus. Caracas, Venezuela.
            </p>
          </div>

          {COLS.map((col) => (
            <nav
              key={col.title}
              aria-label={col.title}
              className="flex flex-col gap-3 md:col-span-2"
              data-reveal
            >
              <span className="text-[0.62rem] font-semibold tracking-[0.22em] text-nightmuted">
                {col.title}
              </span>
              {col.links.map((l) => (
                <a
                  key={l.href}
                  href={`${base}${l.href}`}
                  className="text-[0.88rem] transition-colors duration-300 hover:text-paper"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          ))}

          <div className="flex flex-col gap-3 md:col-span-3" data-reveal>
            <span className="text-[0.62rem] font-semibold tracking-[0.22em] text-nightmuted">
              CONTACTO
            </span>
            <span className="text-[0.88rem]">[Dirección de la sede] · Caracas</span>
            <span className="text-[0.88rem]">[Teléfono / WhatsApp]</span>
            <a
              href="https://www.instagram.com/colegiobelensanjuan/"
              rel="noopener noreferrer"
              target="_blank"
              className="inline-flex items-center gap-2 text-[0.88rem] transition-colors duration-300 hover:text-paper"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
              </svg>
              Instagram
            </a>
          </div>
        </div>

        <div
          className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[#2a3a63] pt-7 text-[0.72rem] text-nightmuted md:flex-row md:items-center"
          data-reveal
        >
          <span>© {year} U.E.P. Belén Sanjuán · Todos los derechos reservados</span>
          <span className="font-heading text-[0.95rem] italic text-nightink">
            Cultivando mentes, cosechando futuros
          </span>
          <a
            href="https://www.fullstackevolved.com"
            rel="noopener noreferrer"
            target="_blank"
            className="transition-colors duration-300 hover:text-paper"
          >
            Sitio por Full Stack Evolved
          </a>
        </div>
      </div>
    </footer>
  );
}
