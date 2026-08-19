import { useRef } from 'react';
import { useReveal } from '../scripts/useReveal';

interface CTABandProps {
  base: string;
  titulo: string;
  tituloEm: string;
  ctaLabel: string;
  ctaHref: string;
  nota?: string;
}

/** Full-width closing clause with a single primary action. */
export default function CTABand({ base, titulo, tituloEm, ctaLabel, ctaHref, nota }: CTABandProps) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const href = ctaHref.startsWith('http') ? ctaHref : `${base}${ctaHref}`;

  return (
    <section ref={ref} className="border-t border-hairline bg-paper">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 px-6 py-16 md:flex-row md:items-center md:px-10 md:py-20">
        <div className="flex flex-col gap-2" data-reveal>
          <h2 className="font-heading text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.15] text-ink">
            {titulo}
            <br />
            <em className="text-navy">{tituloEm}</em>
          </h2>
          {nota && <p className="text-[0.9rem] text-inkmuted">{nota}</p>}
        </div>
        <a
          href={href}
          className="btn-primary shrink-0"
          data-reveal
          rel={ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
          target={ctaHref.startsWith('http') ? '_blank' : undefined}
        >
          {ctaLabel}
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M2.5 8 H13.5 M9.5 4 L13.5 8 L9.5 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
