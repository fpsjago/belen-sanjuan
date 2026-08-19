import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import type { NavLink } from '../types';

gsap.registerPlugin(useGSAP);

interface NavProps {
  base: string;
  pathname: string;
  /** 'light' when the page opens with a navy header (nav floats over it) */
  tone?: 'dark' | 'light';
}

const LINKS: NavLink[] = [
  { label: 'Proyecto educativo', href: 'proyecto-educativo/' },
  { label: 'Niveles', href: 'niveles/' },
  { label: 'Vida escolar', href: 'vida-escolar/' },
  { label: 'Contacto', href: 'contacto/' },
];

function isActive(base: string, pathname: string, href: string): boolean {
  return pathname.startsWith(`${base}${href}`.replace(/\/$/, ''));
}

export default function Nav({ base, pathname, tone = 'dark' }: NavProps) {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState(pathname);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onLoad = () => setPath(window.location.pathname);
    document.addEventListener('astro:page-load', onLoad);
    return () => document.removeEventListener('astro:page-load', onLoad);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (open) {
        gsap.set(overlay, { display: 'flex' });
        if (reduced) {
          gsap.set(overlay, { xPercent: 0 });
          gsap.set(overlay.querySelectorAll('[data-menu-item]'), { opacity: 1, y: 0 });
          return;
        }
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo(overlay, { xPercent: 100 }, { xPercent: 0, duration: 0.55 });
        tl.fromTo(
          overlay.querySelectorAll('[data-menu-item]'),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 },
          '-=0.2',
        );
      } else {
        if (reduced) {
          gsap.set(overlay, { display: 'none' });
          return;
        }
        gsap.to(overlay, {
          xPercent: 100,
          duration: 0.45,
          ease: 'power3.in',
          onComplete: () => gsap.set(overlay, { display: 'none' }),
        });
      }
    },
    { dependencies: [open], scope: scopeRef },
  );

  return (
    <div ref={scopeRef}>
      <header
        data-navshell
        className={`nav-shell fixed top-0 left-0 right-0 z-[100] ${tone === 'light' ? 'nav-onnavy' : ''}`}
      >
        <nav
          className="mx-auto flex h-[80px] max-w-[1400px] items-center justify-between px-6 md:px-10"
          aria-label="Principal"
        >
          <a href={base} className="flex items-center gap-3.5" aria-label="Inicio, Belén Sanjuán">
            <img
              src={`${base}crest.png`}
              alt=""
              width={41}
              height={52}
              className="h-[48px] w-auto"
              data-crest-slot
            />
            <span className="flex flex-col leading-none">
              <span className="font-heading text-[1.35rem] text-inherit">Belén Sanjuán</span>
              <span className="mt-1 text-[0.58rem] font-semibold tracking-[0.24em] text-inkmuted">
                U.E.P. · FUNDADA EN 1989
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => {
              const active = isActive(base, path, l.href);
              return (
                <a
                  key={l.href}
                  href={`${base}${l.href}`}
                  aria-current={active ? 'page' : undefined}
                  className={`text-[0.8rem] font-medium tracking-[0.07em] transition-colors duration-300 ${
                    active
                      ? 'border-b border-gold pb-1 text-gold-deep'
                      : 'text-ink hover:text-gold-deep'
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
            <a
              href={`${base}admisiones/`}
              className={`nav-cta border px-6 py-3 text-[0.78rem] font-medium tracking-[0.1em] transition-colors duration-300 ${
                isActive(base, path, 'admisiones/')
                  ? 'border-navy bg-navy text-paper'
                  : 'border-navy text-navy hover:bg-navy hover:text-paper'
              }`}
            >
              ADMISIONES
            </a>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen(!open)}
          >
            <span
              className={`block h-[1.5px] w-6 bg-ink transition-transform duration-300 ${open ? 'translate-y-[7.5px] rotate-45' : ''}`}
            />
            <span
              className={`block h-[1.5px] w-6 bg-ink transition-opacity duration-300 ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-[1.5px] w-4 self-end mr-[10px] bg-ink transition-transform duration-300 ${open ? '!w-6 mr-0 -translate-y-[7.5px] -rotate-45' : ''}`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile overlay — TOP-LEVEL fixed sibling (never nested in blurred header) */}
      <div
        ref={overlayRef}
        id="menu-movil"
        className="fixed inset-0 z-[99] hidden flex-col justify-center gap-2 bg-paper px-10"
      >
        <span className="kicker mb-6" data-menu-item>
          Índice
        </span>
        {LINKS.map((l, i) => (
          <a
            key={l.href}
            data-menu-item
            href={`${base}${l.href}`}
            onClick={() => setOpen(false)}
            className="flex items-baseline gap-5 border-b border-hairline py-4"
          >
            <span className="font-heading text-[1rem] text-gold-deep">
              {['I', 'II', 'III', 'IV'][i]}
            </span>
            <span className="font-heading text-[2rem] text-ink">{l.label}</span>
          </a>
        ))}
        <a
          data-menu-item
          href={`${base}admisiones/`}
          onClick={() => setOpen(false)}
          className="mt-8 self-start btn-primary"
        >
          ADMISIONES 2026–2027
        </a>
      </div>
    </div>
  );
}
