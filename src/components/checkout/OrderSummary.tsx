'use client';

import Link from 'next/link';
import { useCartStore } from '@/stores/cart';

export default function OrderSummary() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const subtotal = useCartStore((s) => s.subtotal);
  const tax = useCartStore((s) => s.tax);
  const deliveryFee = useCartStore((s) => s.deliveryFee);
  const total = useCartStore((s) => s.total);

  const fmt = (n: number) => `$${n.toFixed(2)}`;

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-sand p-8 text-center">
        <div className="text-4xl mb-4">🛒</div>
        <p className="font-black text-xl text-charcoal mb-2" style={{ fontFamily: "'Satoshi', sans-serif" }}>
          Your cart is empty
        </p>
        <p className="text-charcoal/50 text-sm mb-6">Head back to the menu to add items.</p>
        <Link
          href="/order"
          className="inline-flex items-center gap-2 bg-orange text-white font-semibold px-6 py-3 rounded-full hover:bg-[#d06422] transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-sand overflow-hidden">
      <div className="px-6 py-5 border-b border-sand flex items-center justify-between">
        <h2
          className="font-black text-xl text-charcoal"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          Order Summary
        </h2>
        <Link
          href="/order"
          className="text-sm text-orange font-semibold hover:text-[#d06422] transition-colors"
        >
          Edit Order
        </Link>
      </div>

      {/* Items */}
      <div className="px-4 py-4 space-y-3 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-2">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-charcoal text-sm leading-snug">{item.name}</p>
              <p className="text-charcoal/50 text-xs mt-0.5">{fmt(item.price)} each</p>
            </div>
            {/* Quantity controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-sand hover:bg-orange hover:text-white text-charcoal font-bold transition-colors"
                aria-label={`Decrease quantity of ${item.name}`}
              >
                –
              </button>
              <span className="font-bold text-charcoal w-4 text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-sand hover:bg-orange hover:text-white text-charcoal font-bold transition-colors"
                aria-label={`Increase quantity of ${item.name}`}
              >
                +
              </button>
            </div>
            <span className="font-black text-sm text-charcoal flex-shrink-0 w-14 text-right" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              {fmt(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-sand px-6 py-5 space-y-2">
        <div className="flex justify-between text-sm text-charcoal/60">
          <span>Subtotal</span>
          <span>{fmt(subtotal())}</span>
        </div>
        <div className="flex justify-between text-sm text-charcoal/60">
          <span>Tax (10.25%)</span>
          <span>{fmt(tax())}</span>
        </div>
        <div className="flex justify-between text-sm text-charcoal/60">
          <span>Delivery fee</span>
          <span>
            {deliveryFee() === 0 ? (
              <span className="text-sage font-semibold">Free</span>
            ) : (
              fmt(deliveryFee())
            )}
          </span>
        </div>
        <div
          className="flex justify-between text-base font-black text-charcoal pt-3 border-t border-sand"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          <span>Total</span>
          <span>{fmt(total())}</span>
        </div>
        {deliveryFee() > 0 && (
          <p className="text-xs text-charcoal/40 text-center pt-1">
            Add {fmt(30 - subtotal())} more for free delivery
          </p>
        )}
      </div>
    </div>
  );
}
