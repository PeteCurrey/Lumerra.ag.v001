import { WaterCausticHero } from '@/components/sections/WaterCausticHero';
import { TrustStrip } from '@/components/home/TrustStrip';
import { CategorySelector } from '@/components/home/CategorySelector';
import { FeaturedModels } from '@/components/home/FeaturedModels';
import { LumerraPromise } from '@/components/home/LumerraPromise';
import { ProductCinema } from '@/components/sections/ProductCinema';
import { ConciergeTeaser } from '@/components/home/ConciergeTeaser';
import { JournalPreview } from '@/components/home/JournalPreview';
import { TrustPress } from '@/components/home/TrustPress';
import { FooterStory } from '@/components/home/FooterStory';

export default function Home() {
  return (
    <>
      <WaterCausticHero />
      <TrustStrip />
      <CategorySelector />
      <FeaturedModels />
      <LumerraPromise />
      <ProductCinema />
      <ConciergeTeaser />
      <JournalPreview />
      <TrustPress />
      <FooterStory />
    </>
  );
}
