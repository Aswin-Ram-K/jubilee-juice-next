import type { Metadata } from 'next';
import Link from 'next/link';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';

export const metadata: Metadata = {
  title: 'Checkout — Jubilee Juice & Grill',
  description: 'Complete your order from Jubilee Juice & Grill.',
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-cream pb-16 pt-20 lg:pt-24">
      {/* Page header — below fixed nav */}
      <div className="bg-white border-b border-sand">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-4">
            <Link
              href="/order"
              className="inline-flex items-center gap-1.5 text-orange hover:text-[#d06422] text-sm font-medium transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Order
            </Link>
            <span className="text-sand" aria-hidden="true">/</span>
            <h1
              className="font-black text-xl text-charcoal"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              Checkout
            </h1>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Order summary — appears first on mobile */}
          <div className="lg:col-span-2 order-first lg:order-last">
            <div className="lg:sticky lg:top-24">
              <OrderSummary />
            </div>
          </div>

          {/* Checkout form */}
          <div className="lg:col-span-3">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </main>
  );
}
