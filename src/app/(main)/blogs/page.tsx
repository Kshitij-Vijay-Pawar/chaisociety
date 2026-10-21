import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata = {
  title: 'Stories — Chai Society',
  description: 'Notes on tea culture, craft, and society from the Chai Society journal.',
};

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-cream-light text-forest-900">
      <SiteHeader />
      <section className="relative overflow-hidden bg-forest-900 text-cream-light px-6 pt-40 pb-24 lg:px-10 lg:pt-48 lg:pb-32">
        <div className="relative mx-auto max-w-[1400px]">
          <span className="eyebrow text-chai-light">The Journal</span>
          <h1 className="mt-6 font-display text-5xl font-light leading-tight sm:text-6xl lg:text-7xl">
            Notes on craft, society, and the art of slowing down.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-cream-light/80">
            Coming soon — deep dives into single-origin spices, the history of Irani café culture, and stories from our regulars.
          </p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
