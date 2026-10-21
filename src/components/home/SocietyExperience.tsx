'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EditorialRule } from '@/components/editorial';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const gallery = [
  {
    src: 'https://images.pexels.com/photos/9961871/pexels-photo-9961871.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
    alt: 'Friends laughing and eating at a restaurant',
    label: 'Your People',
  },
  {
    src: 'https://images.pexels.com/photos/16541078/pexels-photo-16541078.jpeg?auto=compress&cs=tinysrgb&h=1200&w=900',
    alt: 'Latte art being poured into a coffee cup',
    label: 'The Pour',
  },
  {
    src: 'https://images.pexels.com/photos/38921772/pexels-photo-38921772.jpeg?auto=compress&cs=tinysrgb&h=1100&w=900',
    alt: 'Two milkshakes on a cafe table',
    label: 'The Sweet',
  },
  {
    src: 'https://images.pexels.com/photos/5555754/pexels-photo-5555754.jpeg?auto=compress&cs=tinysrgb&h=1100&w=900',
    alt: 'Grilled panini on a wooden platter',
    label: 'The Plate',
  },
  {
    src: 'https://images.pexels.com/photos/3184177/pexels-photo-3184177.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
    alt: 'Friends and family enjoying a meal together',
    label: 'The Table',
  },
];

export default function SocietyExperience() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.matchMedia('(max-width: 1024px)').matches;
      const ctx = gsap.context(() => {
        if (!reduced) {
          // statement reveal
          const lines = gsap.utils.toArray<HTMLElement>('[data-soc-line] > span');
          gsap.set(lines, { yPercent: 110 });
          gsap.to(lines, {
            yPercent: 0,
            duration: 1.1,
            ease: 'power4.out',
            stagger: 0.14,
            scrollTrigger: {
              trigger: '[data-soc-statement]',
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          });
        }

        // Horizontal scroll on desktop
        if (!isMobile && track.current && !reduced) {
          const panels = gsap.utils.toArray<HTMLElement>('[data-soc-panel]');
          const totalWidth = track.current.scrollWidth - window.innerWidth;
          gsap.to(track.current, {
            x: -totalWidth,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top top',
              end: `+=${totalWidth}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
          // parallax within each panel image
          panels.forEach((p) => {
            const img = p.querySelector('[data-soc-img]');
            if (img) {
              gsap.fromTo(
                img,
                { xPercent: -8 },
                {
                  xPercent: 8,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: ref.current,
                    start: 'top top',
                    end: `+=${totalWidth}`,
                    scrub: true,
                  },
                },
              );
            }
          });
        }
      }, ref);
      return () => ctx.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-forest-800 text-cream-light"
    >
      {/* Statement */}
      <div
        data-soc-statement
        className="relative mx-auto max-w-[1600px] px-6 pt-28 lg:pt-36 pb-10 lg:pb-16"
      >
        <div className="flex items-center gap-3">
          <EditorialRule className="bg-chai-DEFAULT" />
          <span className="eyebrow text-chai-light">The Society Experience</span>
        </div>
        <h2 className="mt-8 font-display text-[12vw] font-light leading-[0.9] tracking-tight sm:text-[9vw] lg:text-[6.5vw]">
          <span data-soc-line className="block overflow-hidden">
            <span className="inline-block">Your table.</span>
          </span>
          <span data-soc-line className="block overflow-hidden">
            <span className="inline-block">Your people.</span>
          </span>
          <span data-soc-line className="block overflow-hidden">
            <span className="inline-block">
              Your <span className="italic text-chai-DEFAULT">society.</span>
            </span>
          </span>
        </h2>
        <p className="mt-8 max-w-md text-sm leading-relaxed text-cream-light/75">
          A café is a room a city lends you to do nothing in, together. These are
          the small moments our tables are made for.
        </p>
      </div>

      {/* Horizontal track (desktop) / scroll (mobile) */}
      <div className="hidden lg:block">
        <div ref={track} className="flex gap-8 pl-6 lg:pl-10 pr-[20vw]" style={{ width: 'max-content' }}>
          {gallery.map((g, i) => (
            <div
              key={g.label}
              data-soc-panel
              className={`relative shrink-0 overflow-hidden bg-forest-900 ${
                i % 2 === 0 ? 'h-[70vh] w-[42vw]' : 'h-[60vh] w-[34vw]'
              }`}
            >
              <img
                data-soc-img
                src={g.src}
                alt={g.alt}
                className="absolute inset-0 h-full w-[116%] -left-[8%] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-center gap-3 text-cream-light">
                <div className="h-px w-8 bg-chai-DEFAULT" />
                <span className="text-[0.62rem] uppercase tracking-widest-3">{g.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile stacked */}
      <div className="lg:hidden grid grid-cols-6 gap-3 px-6 pb-24">
        {gallery.map((g, i) => (
          <div
            key={g.label}
            className={`relative overflow-hidden bg-forest-900 ${
              i % 3 === 0 ? 'col-span-4 aspect-[4/5]' : i % 3 === 1 ? 'col-span-2 aspect-[3/4]' : 'col-span-6 aspect-[16/10]'
            }`}
          >
            <img src={g.src} alt={g.alt} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-cream-light">
              <div className="h-px w-6 bg-chai-DEFAULT" />
              <span className="text-[0.58rem] uppercase tracking-widest-3">{g.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
