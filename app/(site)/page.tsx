import { HeroSection, EliteHorsesSection } from "@/components/modules/site/home";
import EndingSoonSection from "@/components/modules/site/home/ending-soon/EndingSoonSection";
import FeaturedHorsesSection from "@/components/modules/site/home/featured-horses/FeaturedHorsesSection";
import NewlyListedSection from "@/components/modules/site/home/newly-listed/NewlyListedSection";
import PartnersSection from "@/components/modules/site/home/partners/PartnersSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EliteHorsesSection />
      <FeaturedHorsesSection />
      <EndingSoonSection />
      <NewlyListedSection />
      <PartnersSection />
    </>
  );
}