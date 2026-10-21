'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Reveal headline lines / words with a clip-path mask as they scroll into view.
 * Expects elements with the `data-reveal` attribute inside the scope.
 */
export function useRevealOnScroll(scope: React.RefObject<HTMLElement>) {
  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const els = gsap.utils.toArray<HTMLElement>('[data-reveal]');
      els.forEach((el) => {
        const words = el.querySelectorAll('[data-reveal-word]');
        const targets = words.length ? words : [el];
        if (reduced) {
          gsap.set(targets, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1 });
          return;
        }
        gsap.set(targets, { clipPath: 'inset(0 0 100% 0)', y: 0 });
        gsap.to(targets, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        });
      });
    },
    { scope, dependencies: [] },
  );
}
