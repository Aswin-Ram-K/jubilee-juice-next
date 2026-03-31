'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/stores/cart';
import { useCartDrawerStore } from '@/stores/cartDrawer';

export default function CartDrawer() {
  const isOpen = useCartDrawerStore((s) => s.isOpen);
  const close = useCartDrawerStore((s) => s.close);

  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal);
  const tax = useCartStore((s) => s.tax);
  const deliveryFee = useCartStore((s) => s.deliveryFee);
  const total = useCartStore((s) => s.total);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [close]);

  const fmt = (n: number) => `$${n.toFixed(2)}`;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-charcoal/50 z-40 backdrop-blur-sm"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-cream z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-sand bg-white">
          <h2
            className="font-black text-xl text-charcoal"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            Your Order
            {items.length > 0 && (
              <span className="ml-2 bg-orange text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </h2>
          <button
            onClick={close}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-sand transition-colors text-charcoal/60 hover:text-charcoal"
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="text-5xl mb-4">🛒</div>
              <p className="font-black text-xl text-charcoal mb-2" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                Your cart is empty
              </p>
              <p className="text-charcoal/50 text-sm mb-6">Add some items from the menu to get started.</p>
              <button
                onClick={close}
                className="inline-flex items-center gap-2 bg-orange text-white font-semibold px-6 py-3 rounded-full hover:bg-[#d06422] transition-colors"
              >
                Browse &amp; Order
              </button>
            </div>
          ) : (
            <div className="px-4 py-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-charcoal text-sm leading-snug truncate">
                      {item.name}
                    </p>
                    <p className="text-charcoal/50 text-xs mt-0.5">${item.price.toFixed(2)} each</p>
                  </div>
                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-11 h-11 flex items-center justify-center rounded-xl bg-sand hover:bg-orange hover:text-white text-charcoal font-bold transition-colors text-lg"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      –
                    </button>
                    <span className="font-black text-charcoal w-5 text-center" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-11 h-11 flex items-center justify-center rounded-xl bg-sand hover:bg-orange hover:text-white text-charcoal font-bold transition-colors text-lg"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex-shrink-0 text-right min-w-[56px]">
                    <p className="font-black text-sm text-charcoal" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                      {fmt(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-charcoal/40 hover:text-red-500 transition-colors mt-0.5"
                      aria-label={`Remove ${item.name}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer: Totals + Checkout */}
        {items.length > 0 && (
          <div className="border-t border-sand bg-white px-6 py-5 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-charcoal/60">
                <span>Subtotal</span>
                <span>{fmt(subtotal())}</span>
              </div>
              <div className="flex justify-between text-charcoal/60">
                <span>Tax (10.25%)</span>
                <span>{fmt(tax())}</span>
              </div>
              <div className="flex justify-between text-charcoal/60">
                <span>Delivery fee</span>
                <span>{deliveryFee() === 0 ? <span className="text-sage font-semibold">Free</span> : fmt(deliveryFee())}</span>
              </div>
              <div className="flex justify-between font-black text-base text-charcoal pt-2 border-t border-sand" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                <span>Total</span>
                <span>{fmt(total())}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              onClick={close}
              className="flex items-center justify-center w-full bg-orange text-white font-semibold py-4 rounded-2xl hover:bg-[#d06422] transition-colors text-base"
            >
              Checkout
            </Link>
            <p className="text-xs text-charcoal/40 text-center">
              {deliveryFee() > 0 ? `Add ${fmt(30 - subtotal())} more for free delivery` : 'You qualify for free delivery!'}
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
