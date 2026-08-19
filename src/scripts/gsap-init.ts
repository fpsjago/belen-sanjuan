import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function bootLenis(): void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
  lenis = new Lenis({
    duration: 1.25,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.1,
    touchMultiplier: 2,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
}

function tick(time: number): void {
  lenis?.raf(time * 1000);
}

export function killLenis(): void {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
  gsap.ticker.remove(tick);
}

export { gsap, ScrollTrigger, lenis };
