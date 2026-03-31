import type { Metadata } from 'next';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import StorySection from '@/components/about/StorySection';
import ValuesPillars from '@/components/about/ValuesPillars';

export const metadata: Metadata = {
  title: 'Our Story — Jubilee Juice & Grill',
  description:
    "25 years in Chicago's West Loop. Learn how Jubilee Juice & Grill became the neighborhood's favorite healthy fast-casual spot.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-24 pb-16 bg-espresso text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll animation="fade-up">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <span>📍</span>
              <span>Est. 1999 · West Loop, Chicago</span>
            </div>
            <h1
              className="font-black text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              Our Story
            </h1>
            <p className="text-white/70 text-xl leading-relaxed">
              Twenty-five years of cooking with fire, feeding the neighborhood, and proving that fast food can be real food.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Story Sections */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          <AnimateOnScroll animation="fade-up">
            <StorySection
              title="A West Loop Original"
              paragraphs={[
                "Jubilee Juice & Grill opened its doors in 1999 on the corner of a neighborhood that was still finding its identity. The West Loop was industrial, raw, and real — and so was our food.",
                "We built the menu around one principle: cook honest food, sourced fresh, over an open flame. No shortcuts, no freezers full of pre-made patties. Every sandwich, every salad, every smoothie starts with real ingredients prepared the same day.",
                "Two and a half decades later, we're still here — same corner, same flame, same commitment to the neighborhood that made us.",
              ]}
              image="https://jubileejuice.com/wp-content/uploads/2021/04/Jubilee_Sign-1024x448.webp"
              imageAlt="Jubilee Juice & Grill restaurant storefront sign"
            />
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up">
            <StorySection
              title="Health Without Compromise"
              paragraphs={[
                "We've always believed that healthy eating shouldn't feel like a punishment. Our smoothies are blended with real fruit, real sherbet, and no artificial anything. Our salads are built on crisp romaine and seasonal produce. Our proteins are grilled — never fried.",
                "But health-forward doesn't mean flavor-backward. The char from our open flame, the richness of our goat cheese, the brightness of our raspberry vinaigrette — every dish is designed to make you want to come back tomorrow.",
                "From plant-based wraps to Atlantic salmon on French bread, there's something for every appetite and every goal.",
              ]}
              image="https://jubileejuice.com/wp-content/uploads/2021/04/jubilee_juice_outdoor_logo_header_1600x500.webp"
              imageAlt="Jubilee Juice & Grill outdoor dining area"
              reverse
            />
          </AnimateOnScroll>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fade-up">
            <div className="mb-12">
              <SectionHeading
                title="What We Stand For"
                subtitle="Four pillars that have guided every decision since day one."
              />
            </div>
          </AnimateOnScroll>
          <ValuesPillars />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll animation="fade-up">
            <h2
              className="font-black text-4xl md:text-5xl text-charcoal mb-4"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              Come Visit Us
            </h2>
            <p className="text-charcoal/60 text-lg mb-10 leading-relaxed">
              We&apos;re open seven days a week in the West Loop. Stop in, say hello, and let the food speak for itself.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Hours &amp; Location
              </Button>
              <Button href="/menu" variant="outline" size="lg">
                View Our Menu
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  );
}
