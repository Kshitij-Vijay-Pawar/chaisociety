import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Link from 'next/link';

export function generateStaticParams() {
  return [{ slug: 'the-art-of-slow-brewed-chai' }];
}

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-cream-light text-forest-900">
      <SiteHeader />
      <article className="relative overflow-hidden bg-forest-900 text-cream-light px-6 pt-40 pb-24 lg:px-10 lg:pt-48 lg:pb-32">
        <div className="relative mx-auto max-w-[1200px]">
          <Link href="/blogs" className="eyebrow text-chai-light hover:underline">
            ← Back to Stories
          </Link>
          <h1 className="mt-6 font-display text-5xl font-light capitalize leading-tight sm:text-6xl">
            {slug.replace(/-/g, ' ')}
          </h1>
          <p className="mt-8 text-cream-light/80 text-base">
            This story will be published soon. Stay tuned to the Chai Society journal.
          </p>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
