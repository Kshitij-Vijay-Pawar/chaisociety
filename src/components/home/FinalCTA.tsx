'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Coffee, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const ctx = gsap.context(() => {
        if (reduced) {
          gsap.set('[data-cta-line] > span', { yPercent: 0, opacity: 1 });
          gsap.set('[data-cta-item]', { y: 0, opacity: 1 });
          return;
        }

        // Kinetic text reveal
        const lines = gsap.utils.toArray<HTMLElement>('[data-cta-line] > span');
        gsap.set(lines, { yPercent: 110, opacity: 0 });
        gsap.to(lines, {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });

        // Staggered interactive card & badge elements
        const items = gsap.utils.toArray<HTMLElement>('[data-cta-item]');
        gsap.set(items, { y: 35, opacity: 0 });
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.25,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });

        // Gentle ambient floating effect for background glow
        gsap.to('[data-cta-glow]', {
          scale: 1.25,
          opacity: 0.22,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }, ref);

      return () => ctx.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      aria-label="Final Invitation Call to Action"
      className="relative overflow-hidden bg-forest-950 text-cream-light py-24 sm:py-32 lg:py-40"
    >
      {/* Background grain and ambient organic glow spheres */}
      <div className="absolute inset-0 bg-grain opacity-[0.06] mix-blend-overlay pointer-events-none" />
      <div
        data-cta-glow
        className="pointer-events-none absolute -left-20 top-1/4 h-[55vh] w-[55vh] rounded-full bg-chai-DEFAULT/15 blur-[120px]"
      />
      <div
        data-cta-glow
        className="pointer-events-none absolute -right-20 bottom-10 h-[60vh] w-[60vh] rounded-full bg-forest-700/25 blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        {/* Main invitation card container */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-3xl border border-cream-light/10 bg-gradient-to-b from-forest-900/90 to-forest-950/95 p-8 sm:p-14 lg:p-20 shadow-2xl backdrop-blur-md"
        >
          {/* Subtle top ambient radial highlight */}
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-64 w-[85%] rounded-full bg-chai-DEFAULT/20 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Editorial Eyebrow Tag */}
            <div data-cta-item className="inline-flex items-center gap-2.5 rounded-full border border-chai-DEFAULT/30 bg-chai-DEFAULT/10 px-4 py-1.5 backdrop-blur-sm">
              <Sparkles size={13} className="text-chai-light" />
              <span className="text-[0.65rem] font-medium tracking-[0.25em] uppercase text-chai-light">
                The Society Invitation
              </span>
            </div>

            {/* Display Headline with typography animations */}
            <h2 className="mt-8 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[0.94] tracking-tight">
              <span data-cta-line className="block overflow-hidden">
                <span className="inline-block">Your new favourite</span>
              </span>
              <span data-cta-line className="block overflow-hidden">
                <span className="inline-block">
                  spot is <span className="italic text-chai-DEFAULT">calling.</span>
                </span>
              </span>
            </h2>

            {/* Descriptive paragraph */}
            <p
              data-cta-item
              className="mt-6 sm:mt-8 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-cream-light/80 font-normal"
            >
              Step away from the rush. Slow-simmered artisanal chai, stone-ground matcha,
              and crafted bakery plates made to be shared in good company.
            </p>

            {/* Responsive Actions: Primary Menu & Secondary Store Discovery */}
            <div
              data-cta-item
              className="mt-9 sm:mt-11 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto"
            >
              <Link
                href="/menu"
                className="group relative inline-flex items-center justify-center gap-2.5 bg-chai-DEFAULT px-8 sm:px-10 py-4 text-xs font-semibold tracking-widest-2 uppercase text-cream-light transition-all duration-300 hover:bg-chai-light hover:shadow-[0_8px_24px_rgba(200,107,43,0.35)] active:scale-95"
              >
                <span>Explore the Menu</span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 border border-cream-light/25 bg-cream-light/5 px-8 sm:px-9 py-4 text-xs font-semibold tracking-widest-2 uppercase text-cream-light backdrop-blur-sm transition-all duration-300 hover:border-cream-light/60 hover:bg-cream-light/10 active:scale-95"
              >
                <MapPin size={15} className="text-chai-light" />
                <span>Visit Us & Directions</span>
              </Link>
            </div>

            {/* Social proof & perks row */}
            <div
              data-cta-item
              className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-cream-light/10 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 text-left sm:text-center"
            >
              <div className="flex sm:flex-col items-center sm:justify-center gap-3 sm:gap-1.5">
                <CheckCircle2 size={16} className="text-chai-DEFAULT shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-cream-light uppercase tracking-wider">
                    Fresh Daily Brews
                  </div>
                  <div className="text-[0.7rem] text-cream-light/60">
                    Hand-crafted small batches
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:justify-center gap-3 sm:gap-1.5">
                <Coffee size={16} className="text-chai-DEFAULT shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-cream-light uppercase tracking-wider">
                    Cozy Atmosphere
                  </div>
                  <div className="text-[0.7rem] text-cream-light/60">
                    Warm seating & serene music
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:justify-center gap-3 sm:gap-1.5">
                <Sparkles size={16} className="text-chai-DEFAULT shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-cream-light uppercase tracking-wider">
                    Lake City Bhopal
                  </div>
                  <div className="text-[0.7rem] text-cream-light/60">
                    Flagship opening very soon
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
