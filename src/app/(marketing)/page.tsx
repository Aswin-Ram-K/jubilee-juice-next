import type { Metadata } from 'next';
import ScrollHero from '@/components/home/ScrollHero';
import PhilosophySection from '@/components/home/PhilosophySection';
import FeaturedItems from '@/components/home/FeaturedItems';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import OrderCTA from '@/components/home/OrderCTA';
import LocationPreview from '@/components/home/LocationPreview';

export const metadata: Metadata = {
  title: "Jubilee Juice & Grill — Healthy Fast Food in Chicago's West Loop",
  description:
    "Chicago's favorite healthy fast food — handcrafted burgers, smoothies, salads & more in the West Loop since 1999.",
};

export default function HomePage() {
  return (
    <main>
      <ScrollHero />
      <PhilosophySection />
      <FeaturedItems />
      <CategoryShowcase />
      <OrderCTA />
      <LocationPreview />
    </main>
  );
}
