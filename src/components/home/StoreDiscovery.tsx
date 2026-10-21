'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { stores } from '@/lib/stores';
import { EditorialRule } from '@/components/editorial';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function StoreDiscovery() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const ctx = gsap.context(() => {
        if (reduced) return;
        gsap.from('[data-store-item]', {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });
        gsap.to('[data-store-img]', {
          yPercent: -10,
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
      className="relative overflow-hidden bg-cream-light text-forest-900 py-28 lg:py-36"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-8 px-6 lg:px-10">
        {/* Image */}
        <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
          <div className="relative aspect-[4/3] overflow-hidden bg-forest-900 lg:aspect-[5/4]">
            <img
              data-store-img
              src={stores[0].image}
              alt={stores[0].alt}
              className="absolute inset-0 h-[118%] w-full -top-[9%] object-cover"
            />
            <div className="absolute bottom-5 left-5 flex items-center gap-3 text-cream-light">
              <MapPin size={16} className="text-chai-light" />
              <span className="text-[0.62rem] uppercase tracking-widest-3">{stores[0].name}</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="col-span-12 lg:col-span-5 order-1 lg:order-2 flex flex-col justify-center">
          <div data-store-item className="flex items-center gap-3">
            <EditorialRule />
            <span className="eyebrow text-chai-DEFAULT">Find Us</span>
          </div>
          <h2 data-store-item className="mt-6 font-display text-6xl font-light leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">
            Find your <span className="italic text-chai-DEFAULT">society.</span>
          </h2>
          <p data-store-item className="mt-8 max-w-md text-base leading-relaxed text-forest-700">
            Three rooms across the country, each with its own light and its own regulars.
            Pull up a chair — we keep one warm.
          </p>

          <div data-store-item className="mt-10 grid gap-4">
            {stores.map((s) => (
              <div key={s.id} className="flex items-center justify-between border-b border-forest-900/15 pb-4">
                <div>
                  <div className="font-display text-xl">{s.city}</div>
                  <div className="mt-1 text-xs text-forest-600">{s.hours}</div>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(s.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[0.62rem] uppercase tracking-widest-2 font-semibold"
                >
                  Directions
                  <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            ))}
          </div>

          <Link
            href="/contact"
            data-store-item
            className="group mt-10 inline-flex items-center gap-2 self-start bg-forest-900 px-7 py-4 text-[0.68rem] uppercase tracking-widest-2 font-semibold text-cream-light transition-colors duration-300 hover:bg-chai-DEFAULT"
          >
            Find a Store
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
