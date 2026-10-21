'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EditorialRule } from '@/components/editorial';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function BrandStatement() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const ctx = gsap.context(() => {
        const lines = gsap.utils.toArray<HTMLElement>('[data-stmt-line] > span');
        if (reduced) {
          gsap.set(lines, { yPercent: 0 });
          return;
        }
        gsap.set(lines, { yPercent: 110 });
        gsap.to(lines, {
          yPercent: 0,
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        });

        // image parallax
        gsap.to('[data-stmt-img]', {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
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
      className="relative overflow-hidden bg-cream-light text-forest-900 py-28 lg:py-40"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-6 px-6 lg:px-10">
        {/* Left image column */}
        <div className="col-span-12 lg:col-span-5 lg:col-start-1 order-2 lg:order-1">
          <div className="relative aspect-[3/4] overflow-hidden bg-forest-900">
            <img
              data-stmt-img
              src="https://images.pexels.com/photos/29305701/pexels-photo-29305701.jpeg?auto=compress&cs=tinysrgb&h=1400&w=1100"
              alt="Glass of masala chai and bowl of curry on a wooden table"
              className="absolute inset-0 h-[116%] w-full -top-[8%] object-cover"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-3 text-cream-light">
              <div className="h-px w-8 bg-cream-light/70" />
              <span className="text-[0.6rem] uppercase tracking-widest-3">No.02 — The Mood</span>
            </div>
          </div>
        </div>

        {/* Right text column */}
        <div className="col-span-12 lg:col-span-6 lg:col-start-7 order-1 lg:order-2 flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <EditorialRule />
            <span className="eyebrow text-chai-DEFAULT">The Statement</span>
          </div>

          <h2 className="mt-8 font-display text-[11vw] font-light leading-[0.92] tracking-tight sm:text-[8vw] lg:text-[5.2vw]">
            <span data-stmt-line className="block overflow-hidden">
              <span className="inline-block">Not just a cup.</span>
            </span>
            <span data-stmt-line className="block overflow-hidden">
              <span className="inline-block">
                A whole <span className="italic text-chai-DEFAULT">mood.</span>
              </span>
            </span>
          </h2>

          <p className="mt-10 max-w-xl text-base leading-relaxed text-forest-700 lg:text-lg">
            Chai is a reason to sit longer. Coffee is a reason to begin again. Matcha
            is a reason to be still. Around our tables, food is the conversation and
            conversation is the food — a small society of good taste, brewing since
            the first morning we opened the shutters.
          </p>

          <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-forest-900/15 pt-6">
            {[
              ['Slow', 'Brewed'],
              ['Soulful', 'Served'],
              ['Shared', 'Stayed'],
            ].map(([a, b]) => (
              <div key={a}>
                <div className="font-display text-xl text-forest-900">{a}</div>
                <div className="text-[0.62rem] uppercase tracking-widest-2 text-forest-600">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
