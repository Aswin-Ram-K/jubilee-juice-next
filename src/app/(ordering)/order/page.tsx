import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import MenuCategoryNav from '@/components/order/MenuCategoryNav';
import MenuSection from '@/components/order/MenuSection';

import MobileCartBar from '@/components/order/MobileCartBar';
import { categories } from '@/data/menu';

export const metadata: Metadata = {
  title: 'Order Online — Jubilee Juice & Grill',
  description:
    'Order fresh burgers, smoothies, salads, and more from Jubilee Juice & Grill. Pickup in-store or delivered to your door.',
};

export default function OrderPage() {
  return (
    <>
      <main className="pb-24 lg:pb-0">
        {/* Page header */}
        <section className="pt-24 pb-8 bg-cream border-b border-sand">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1
              className="font-black text-4xl md:text-5xl text-charcoal mb-2"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              Order Online
            </h1>
            <p className="text-charcoal/60 text-lg">
              Fresh, made to order. Pick up in-store or get it delivered.
            </p>
          </div>
        </section>

        {/* Sticky category nav */}
        <MenuCategoryNav categories={categories} />

        {/* Menu sections */}
        <div className="divide-y divide-sand">
          {categories.map((category) => (
            <MenuSection key={category.slug} category={category} />
          ))}
        </div>

        {/* Salad note */}
        <section className="py-10 bg-sage/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-charcoal/70 text-base leading-relaxed">
              <strong className="text-charcoal">Salad Add-Ons:</strong> Upgrade any salad with Chicken, Jumbo Shrimp, Ribeye Steak, Atlantic Salmon, or Atlantic Whitefish. Ask about dressing options.
            </p>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-espresso text-center">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h2
              className="font-black text-3xl text-white mb-4"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              Ready to checkout?
            </h2>
            <p className="text-white/70 mb-8">Review your order and complete your purchase.</p>
            <Button href="/checkout" variant="primary" size="lg">
              Go to Checkout
            </Button>
          </div>
        </section>
      </main>

      <MobileCartBar />
    </>
  );
}
