import { useRef } from 'react';
import { useReveal } from '../scripts/useReveal';

interface PageHeaderProps {
  kicker: string;
  titulo: string;
  tituloEm: string;
  intro: string;
  /** 'paper' (default) or 'navy' ceremonial band */
  tone?: 'paper' | 'navy';
}

/** Compact acta page header — kicker with side rules, serif title, intro. */
export default function PageHeader({ kicker, titulo, tituloEm, intro, tone = 'paper' }: PageHeaderProps) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const navy = tone === 'navy';

  return (
    <header
      ref={ref}
      className={`relative overflow-hidden border-b ${
        navy ? 'border-transparent bg-navy text-paper' : 'border-hairline bg-paper'
      }`}
    >
      {navy && (
        <svg
          className="pointer-events-none absolute -right-14 -top-10 h-[440px] w-auto opacity-[0.08]"
          viewBox="0 0 300 340"
          fill="none"
          aria-hidden="true"
        >
          <path d="M150 12 L282 62 V180 C282 258 222 306 150 328 C78 306 18 258 18 180 V62 Z" stroke="#C9A96A" strokeWidth="2" />
          <path d="M150 34 L262 76 V178 C262 244 212 286 150 306 C88 286 38 244 38 178 V76 Z" stroke="#C9A96A" strokeWidth="1" />
          <path d="M150 96 V212 M104 132 H196" stroke="#C9A96A" strokeWidth="5" strokeLinecap="round" />
          <path d="M96 252 C118 238 182 238 204 252" stroke="#C9A96A" strokeWidth="2" />
        </svg>
      )}
      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-6 px-6 pb-16 pt-[150px] md:px-10 md:pb-20 md:pt-[180px]">
        <div className="flex items-center gap-5" data-reveal>
          <span className={`rule-gold w-11 ${navy ? '!bg-[#C9A96A]' : ''}`} />
          <span className={`kicker ${navy ? 'kicker-night' : ''}`}>{kicker}</span>
        </div>
        <h1
          className="max-w-[22ch] font-heading text-[clamp(2.6rem,5.6vw,4.6rem)] leading-[1.04]"
          data-reveal
        >
          {titulo}{' '}
          <em className={navy ? 'text-[#C9A96A]' : 'text-navy'}>{tituloEm}</em>
        </h1>
        <p
          className={`max-w-[62ch] text-[1.02rem] leading-[1.7] ${navy ? 'text-nightink' : 'text-inkmuted'}`}
          data-reveal
        >
          {intro}
        </p>
      </div>
    </header>
  );
}
