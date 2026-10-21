'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { nav, site } from '@/lib/site';
import { categories } from '@/lib/products';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const [year, setYear] = useState<number | string>(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;
      gsap.from('[data-footer]', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: ref },
  );

  return (
    <footer
      ref={ref}
      className="relative bg-forest-900 text-cream-light paper-texture overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-10 pt-24 pb-10">
        {/* Wordmark */}
        <div data-footer className="border-b border-cream-light/15 pb-12">
          <p className="eyebrow text-chai-light">A Society of Good Taste</p>


        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-10 pt-12 md:grid-cols-4">
          <div data-footer>
            <p className="eyebrow text-cream-light/60">Explore</p>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-underline text-sm text-cream-light/85 hover:text-cream-light">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-footer>
            <p className="eyebrow text-cream-light/60">Menu</p>
            <ul className="mt-5 space-y-3">
              {categories.slice(0, 6).map((c) => (
                <li key={c}>
                  <Link href={`/products?cat=${encodeURIComponent(c)}`} className="link-underline text-sm text-cream-light/85 hover:text-cream-light">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-footer>
            <p className="eyebrow text-cream-light/60">Visit</p>
            <ul className="mt-5 space-y-3">
              <li><Link href="/stores" className="link-underline text-sm text-cream-light/85 hover:text-cream-light">Find a Store</Link></li>
              <li><Link href="/contact" className="link-underline text-sm text-cream-light/85 hover:text-cream-light">Contact</Link></li>
              <li className="pt-2 text-sm text-cream-light/70">{site.descriptor}</li>
            </ul>
          </div>

          <div data-footer>
            <p className="eyebrow text-cream-light/60">Follow</p>
            <ul className="mt-5 space-y-3">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-cream-light/85 hover:text-cream-light"
                  >
                    {s.label}
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div data-footer className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream-light/15 pt-6 md:flex-row md:items-center">
          <p className="text-[0.7rem] uppercase tracking-widest-2 text-cream-light/55">
            © {year} {site.brand}. All rights reserved.
          </p>
          <p className="font-display italic text-cream-light/70 text-sm">
            {site.tagline}
          </p>
        </div>
      </div>

      {/* decorative ring */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-cream-light/10" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full border border-chai/20" />
    </footer>
  );
}
