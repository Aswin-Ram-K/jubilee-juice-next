import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import SignatureDishes from '@/components/menu/SignatureDishes';
import CategoryHighlights from '@/components/menu/CategoryHighlights';
import MenuShowcaseCTA from '@/components/menu/MenuShowcaseCTA';
import { categories } from '@/data/menu';

export const metadata: Metadata = {
  title: 'Menu — Jubilee Juice & Grill',
  description:
    'Explore our full menu of handcrafted burgers, smoothies, salads, seafood, and more. Fresh ingredients, open-flame cooking since 1999.',
};

const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);

export default function MenuPage() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-24 pb-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-orange/10 text-orange text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span>🍽️</span>
            <span>{totalItems}+ menu items</span>
          </div>
          <SectionHeading
            title="Our Menu"
            subtitle="Everything is crafted fresh, grilled over open flame, and made to order. From juice-dripping burgers to vibrant smoothies — there's something for every appetite."
          />
        </div>
      </section>

      {/* Signature Dishes */}
      <section className="pt-4 pb-4 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <SectionHeading
            title="Signature Dishes"
            subtitle="Our most-loved items, ordered again and again."
          />
        </div>
        <SignatureDishes />
      </section>

      {/* Category Highlights */}
      <section className="pt-4 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 mt-8">
          <SectionHeading
            title="Browse by Category"
            subtitle="Every category is packed with fresh, made-to-order options."
          />
        </div>
        <CategoryHighlights />
      </section>

      {/* Salad protein note */}
      <section className="py-10 bg-sage/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-charcoal/70 text-base leading-relaxed">
            <strong className="text-charcoal">Salad Add-Ons:</strong> Upgrade any salad with Chicken, Jumbo Shrimp, Ribeye Steak, Atlantic Salmon, or Atlantic Whitefish. Dressings: ranch, creamy vinaigrette, caesar, balsamic, honey mustard, or raspberry vinaigrette.
          </p>
        </div>
      </section>

      <MenuShowcaseCTA />
    </main>
  );
}
