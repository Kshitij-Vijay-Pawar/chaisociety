import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Hero from '@/components/home/Hero';
import BrandStatement from '@/components/home/BrandStatement';
import SignatureMenu from '@/components/home/SignatureMenu';
import PinnedStory from '@/components/home/PinnedStory';
import SocietyExperience from '@/components/home/SocietyExperience';
import Manifesto from '@/components/home/Manifesto';
import StoreDiscovery from '@/components/home/StoreDiscovery';
import FinalCTA from '@/components/home/FinalCTA';

export default function Home() {
  return (
    <main className="relative bg-cream-light">
      <SiteHeader />
      <Hero />
      <BrandStatement />
      <SignatureMenu />
      <PinnedStory />
      <SocietyExperience />
      <Manifesto />
      <StoreDiscovery />
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}
