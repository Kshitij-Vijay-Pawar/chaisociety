import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { site } from '@/lib/site';

export const metadata = {
  title: 'About — Chai Society',
  description: 'The story behind Chai Society. Four generations of brewing, good company, and great conversations.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream-light text-forest-900">
      <SiteHeader />
      <section className="relative overflow-hidden bg-forest-900 text-cream-light px-6 pt-40 pb-24 lg:px-10 lg:pt-48 lg:pb-32">
        <div className="relative mx-auto max-w-[1400px]">
          <span className="eyebrow text-chai-light">Our Story</span>
          <h1 className="mt-6 font-display text-5xl font-light leading-tight sm:text-6xl lg:text-7xl">
            A society built around the warmth of a freshly brewed cup.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-cream-light/80">
            Chai Society was born from a simple belief: the best conversations happen over hot chai and good food. What started as cherished family recipes is now a sanctuary across {site.descriptor}.
          </p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
