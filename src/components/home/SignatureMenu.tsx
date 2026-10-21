'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { products } from '@/lib/products';
import { EditorialRule } from '@/components/editorial';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// curated subset for the homepage editorial grid
const picks = [
  products.find((p) => p.id === 'masala-chai')!,
  products.find((p) => p.id === 'iced-matcha')!,
  products.find((p) => p.id === 'filter-coffee')!,
  products.find((p) => p.id === 'bun-maska')!,
  products.find((p) => p.id === 'chocolate-shake')!,
  products.find((p) => p.id === 'panini')!,
];

// asymmetric grid spans
const spans = [
  'col-span-12 md:col-span-7 aspect-[4/3]',
  'col-span-12 md:col-span-5 aspect-[3/4]',
  'col-span-6 md:col-span-4 aspect-square',
  'col-span-6 md:col-span-4 aspect-square',
  'col-span-12 md:col-span-4 aspect-square',
  'col-span-12 md:col-span-8 aspect-[16/9]',
];

export default function SignatureMenu() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>('[data-menu-card]');
        if (reduced) {
          gsap.set(items, { opacity: 1, y: 0 });
          return;
        }
        gsap.from(items, {
          y: 60,
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
      }, ref);
      return () => ctx.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative bg-cream-warm/40 text-forest-900 py-28 lg:py-36 overflow-hidden"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        {/* Heading */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <EditorialRule />
              <span className="eyebrow text-chai-DEFAULT">The Signature Menu</span>
            </div>
            <h2 className="mt-6 max-w-2xl font-display text-5xl font-light leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              A short list of <span className="italic text-chai-DEFAULT">long</span> favourites.
            </h2>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 border-b border-forest-900 pb-2 text-[0.7rem] uppercase tracking-widest-2 font-semibold"
          >
            Discover the Menu
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Editorial grid */}
        <div className="mt-16 grid grid-cols-12 gap-4 lg:gap-6">
          {picks.map((p, i) => (
            <Link
              key={p.id}
              href={`/products?cat=${encodeURIComponent(p.category)}`}
              data-menu-card
              className={`group relative block overflow-hidden bg-forest-900 ${spans[i]}`}
            >
              <img
                src={p.image}
                alt={p.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.07] group-hover:opacity-85"
              />
              {/* gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/10 to-transparent" />

              {/* top label */}
              <div className="absolute left-4 top-4 flex items-center gap-2 text-cream-light">
                <div className="h-px w-6 bg-chai-DEFAULT transition-all duration-500 group-hover:w-10" />
                <span className="text-[0.58rem] uppercase tracking-widest-3">{p.category}</span>
              </div>

              {/* bottom content */}
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-5 text-cream-light">
                <div className="translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
                  <h3 className="font-display text-2xl font-light leading-tight lg:text-3xl">
                    {p.name}
                  </h3>
                  <p className="mt-1.5 max-w-xs text-xs text-cream-light/75 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {p.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-display text-xl text-chai-light">₹{p.price}</span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream-light/40 text-cream-light transition-all duration-500 group-hover:border-chai-DEFAULT group-hover:bg-chai-DEFAULT">
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
