'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const ctx = gsap.context(() => {
        const lines = gsap.utils.toArray<HTMLElement>('[data-manif-line] > span');
        if (reduced) {
          gsap.set(lines, { yPercent: 0 });
          return;
        }
        gsap.set(lines, { yPercent: 110 });
        gsap.to(lines, {
          yPercent: 0,
          duration: 1.3,
          ease: 'power4.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
        });

        // decorative lines scale in
        gsap.from('[data-manif-rule]', {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
        });
      }, ref);
      return () => ctx.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-forest-900 text-cream-light py-32 lg:py-48 paper-texture"
    >
      <div className="absolute inset-0 bg-grain opacity-[0.06] mix-blend-overlay pointer-events-none" />

      {/* botanical circle */}
      <div className="pointer-events-none absolute -left-32 top-1/2 h-[60vh] w-[60vh] -translate-y-1/2 rounded-full border border-cream-light/[0.07]" />
      <div className="pointer-events-none absolute -right-24 top-1/4 h-[40vh] w-[40vh] rounded-full border border-chai/15" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 text-center">
        <span className="eyebrow text-chai-light">The Manifesto</span>

        <h2 className="mt-10 font-display text-[14vw] font-light leading-[0.9] tracking-tight sm:text-[10vw] lg:text-[8vw]">
          <span data-manif-line className="block overflow-hidden">
            <span className="inline-block">Good Food.</span>
          </span>
          <span data-manif-line className="block overflow-hidden">
            <span className="inline-block">Good <span className="italic text-chai-DEFAULT">Mood.</span></span>
          </span>
          <span data-manif-line className="block overflow-hidden">
            <span className="inline-block">Good Company.</span>
          </span>
        </h2>

        <div className="mt-16 flex items-center justify-center gap-4">
          <div data-manif-rule className="h-px w-16 bg-chai-DEFAULT" />
          <span className="font-display italic text-cream-light/70 text-lg">A Society of Good Taste</span>
          <div data-manif-rule className="h-px w-16 bg-chai-DEFAULT" />
        </div>
      </div>
    </section>
  );
}
