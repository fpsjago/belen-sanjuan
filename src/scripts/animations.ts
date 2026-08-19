/**
 * Global animation system — data-attribute driven, PAGE-LEVEL content only.
 * Elements inside <astro-island> are SKIPPED here: React components own their
 * reveals via per-component IntersectionObserver (React #418 rule).
 */
import { gsap, ScrollTrigger, bootLenis, killLenis } from './gsap-init';

const prefersReduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let pageObserver: IntersectionObserver | null = null;

function insideIsland(el: Element): boolean {
  return el.closest('astro-island') !== null;
}

/* ── Reveals for .astro page content (CSS class toggle, cheap IO) ── */
let proxyMapRef = new Map<Element, Element[]>();

function initPageReveals(): void {
  pageObserver?.disconnect();
  pageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          proxyMapRef.get(e.target)?.forEach((t) => t.classList.add('visible'));
          pageObserver?.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' },
  );
  proxyMapRef = new Map<Element, Element[]>();
  const proxyMap = proxyMapRef;
  document
    .querySelectorAll('[data-reveal], [data-reveal-clip], [data-mask-group]')
    .forEach((el) => {
      if (insideIsland(el)) return;
      // clip-pathed targets never intersect (Chrome) — observe the parent proxy
      let proxy: Element = el;
      if (el.hasAttribute('data-reveal-clip') && el.parentElement) {
        proxy = el.parentElement;
        const list = proxyMap.get(proxy) ?? [];
        list.push(el);
        proxyMap.set(proxy, list);
      }
      const rect = proxy.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible'); // in or above viewport — never strand passed content
        return;
      }
      pageObserver?.observe(proxy);
    });
}

/* ── Acta rail — clause index driven by [data-clause] sections ── */
function initActaRail(): void {
  const rail = document.querySelector('.acta-rail');
  if (!rail) return;
  const clauses = Array.from(document.querySelectorAll<HTMLElement>('[data-clause]'));
  if (!clauses.length) {
    rail.classList.add('hidden');
    return;
  }
  rail.classList.remove('hidden');
  const links = Array.from(rail.querySelectorAll<HTMLAnchorElement>('a[data-rail-target]'));

  clauses.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => {
        const id = section.id;
        links.forEach((l) => {
          if (l.dataset.railTarget === id) {
            l.classList.toggle('is-active', self.isActive);
            if (!self.isActive && self.progress === 1) l.classList.add('is-done');
          }
        });
      },
    });
  });
}

/* ── Gold rules that draw themselves (page-level) ── */
function initRules(): void {
  document.querySelectorAll<HTMLElement>('.rule-gold[data-draw]').forEach((el) => {
    if (insideIsland(el)) return;
    gsap.set(el, { scaleX: 0 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(el, { scaleX: 1, duration: 1.1, ease: 'power2.inOut' });
      },
    });
  });
}

/* ── Nav scroll state (class only — React Nav reads it via CSS) ── */
function initNavState(): void {
  const nav = document.querySelector('[data-navshell]');
  if (!nav) return;
  ScrollTrigger.create({
    start: 'top -60',
    end: 99999,
    onUpdate: (self) => {
      nav.classList.toggle('nav-scrolled', self.scroll() > 60);
    },
  });
  nav.classList.toggle('nav-scrolled', window.scrollY > 60);
}

function initAll(): void {
  if (prefersReduced()) {
    document
      .querySelectorAll('[data-reveal], [data-reveal-clip], [data-mask-group]')
      .forEach((el) => el.classList.add('visible'));
    initNavState();
    return;
  }
  bootLenis();
  initPageReveals();
  initActaRail();
  initRules();
  initNavState();
}

/* ── Lifecycle (ClientRouter-safe) ── */
declare global {
  interface Window {
    __bsjListeners?: boolean;
  }
}

if (!window.__bsjListeners) {
  window.__bsjListeners = true;

  document.addEventListener('astro:before-preparation', () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf('*');
    killLenis();
    pageObserver?.disconnect();
  });

  document.addEventListener('astro:page-load', () => {
    // double-rAF: wait for React hydration before touching DOM
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initAll();
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    });
  });
}
