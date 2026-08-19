import { useEffect, type RefObject } from 'react';

/**
 * Per-component reveal observer for React islands (#418-safe).
 * Observes [data-reveal], [data-reveal-clip] and [data-mask-group] descendants,
 * adds .visible once. Elements already in/above viewport reveal immediately.
 */
export function useReveal(ref: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = root.querySelectorAll(
      '[data-reveal], [data-reveal-clip], [data-mask-group]',
    );
    if (!targets.length) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      targets.forEach((el) => el.classList.add('visible'));
      return;
    }

    // Chrome computes IO intersection AFTER the target's own clip-path: a fully
    // clipped [data-reveal-clip] NEVER intersects. Observe an unclipped PROXY
    // (the parent) and map back to the real target.
    const proxyMap = new Map<Element, Element[]>();
    const proxyFor = (el: Element): Element => {
      if (!el.hasAttribute('data-reveal-clip')) return el;
      const parent = el.parentElement ?? el;
      const list = proxyMap.get(parent) ?? [];
      list.push(el);
      proxyMap.set(parent, list);
      return parent;
    };

    const revealFor = (proxy: Element) => {
      // the proxy may itself be a reveal target AND carry mapped clip children
      proxy.classList.add('visible');
      proxyMap.get(proxy)?.forEach((t) => t.classList.add('visible'));
    };

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            revealFor(e.target);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' },
    );

    const pending = new Set<Element>();
    targets.forEach((el) => {
      const proxy = proxyFor(el);
      const r = proxy.getBoundingClientRect();
      // reveal anything in OR ABOVE the viewport immediately — late-hydrating
      // islands otherwise strand reveals the user already scrolled past
      if (r.top < window.innerHeight) {
        el.classList.add('visible');
      } else {
        pending.add(proxy);
        io.observe(proxy);
      }
    });

    // Bulletproof fallback (SOLSTICE pattern): a passive scroll tick force-reveals
    // any still-pending target that has entered the viewport, in case an IO
    // callback is missed under smooth-scroll.
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        pending.forEach((proxy) => {
          if (proxy.getBoundingClientRect().top < window.innerHeight) {
            revealFor(proxy);
            io.unobserve(proxy);
            pending.delete(proxy);
          }
        });
        if (!pending.size) window.removeEventListener('scroll', onScroll);
      });
    };
    if (pending.size) window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}
