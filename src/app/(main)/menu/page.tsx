'use client';

import { useMemo, useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { products, categories, type Category } from '@/lib/products';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { EditorialRule } from '@/components/editorial';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function ProductsView() {
  const params = useSearchParams();
  const initialCat = (params.get('cat') as Category | null) ?? null;
  const [active, setActive] = useState<Category | 'All'>('All');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialCat && (categories as string[]).includes(initialCat)) {
      setActive(initialCat);
    }
  }, [initialCat]);

  const filtered = useMemo(
    () => (active === 'All' ? products : products.filter((p) => p.category === active)),
    [active],
  );

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-prod-card]');
        if (reduced) {
          gsap.set(cards, { opacity: 1, y: 0 });
          return;
        }
        gsap.from(cards, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: {
            trigger: '[data-prod-grid]',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }, ref);
      return () => ctx.revert();
    },
    { scope: ref, dependencies: [active] },
  );

  return (
    <main ref={ref} className="min-h-screen bg-cream-light text-forest-900">
      <SiteHeader />

      {/* Hero band */}
      <section className="relative overflow-hidden bg-forest-900 text-cream-light px-6 pt-40 pb-20 lg:px-10 lg:pt-48 lg:pb-28">
        <div className="absolute inset-0 bg-grain opacity-[0.06] mix-blend-overlay pointer-events-none" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-[60vh] w-[60vh] rounded-full bg-chai-DEFAULT/15 blur-[120px]" />
        <div className="relative mx-auto max-w-[1600px]">
          <div className="flex items-center gap-3">
            <EditorialRule className="bg-chai-DEFAULT" />
            <span className="eyebrow text-chai-light">The Full Menu</span>
          </div>
          <h1 className="mt-6 font-display text-[14vw] font-light leading-[0.88] tracking-tight sm:text-[10vw] lg:text-[7vw]">
            Everything we <span className="italic text-chai-DEFAULT">brew</span>,
            <br />bake &amp; plate.
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-cream-light/75">
            Nine categories. A small list, made well. Prices are inclusive of all taxes.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-[60px] z-30 border-b border-forest-900/10 bg-cream-light/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] gap-2 overflow-x-auto px-6 py-4 scrollbar-none lg:px-10">
          {(['All', ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`shrink-0 px-4 py-2 text-[0.65rem] uppercase tracking-widest-2 font-medium transition-colors ${
                active === c
                  ? 'bg-forest-900 text-cream-light'
                  : 'text-forest-700 hover:text-forest-900'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="mx-auto max-w-[1600px] px-6 py-16 lg:px-10 lg:py-24">
        <div
          data-prod-grid
          className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((p) => (
            <article
              key={p.id}
              data-prod-card
              className="group relative flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-forest-900">
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.06] group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 flex items-center gap-2 text-cream-light">
                  <div className="h-px w-6 bg-chai-DEFAULT transition-all duration-500 group-hover:w-10" />
                  <span className="text-[0.58rem] uppercase tracking-widest-3">{p.category}</span>
                </div>
                <span className="absolute right-4 top-4 font-display text-2xl text-chai-light">
                  ₹{p.price}
                </span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-light leading-tight">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-forest-700">{p.description}</p>
                </div>
                <Link
                  href={`/products?cat=${encodeURIComponent(p.category)}`}
                  aria-label={`View ${p.category}`}
                  className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-forest-900/20 text-forest-900 transition-all duration-300 group-hover:border-chai-DEFAULT group-hover:bg-chai-DEFAULT group-hover:text-cream-light"
                >
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-32 text-center font-display text-3xl text-forest-600">
            Nothing here yet — try another category.
          </p>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream-light" />}>
      <ProductsView />
    </Suspense>
  );
}
