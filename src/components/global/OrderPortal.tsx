'use client';

import { useEffect, useRef } from 'react';
import { useOrderPortalStore } from '@/stores/orderPortal';
import { site } from '@/data/site';
import Link from 'next/link';

export default function OrderPortal() {
  const { isOpen, close } = useOrderPortalStore();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Escape key handler
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) close();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[59] bg-espresso/60 transition-opacity duration-300"
        aria-hidden="true"
        onClick={close}
      />

      {/* Modal */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-portal-heading"
        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      >
        <div className="bg-cream rounded-2xl shadow-2xl max-w-lg w-full p-8 relative">

          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-charcoal/50 hover:text-charcoal hover:bg-sand/50 transition-colors duration-200"
            aria-label="Close ordering options"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Heading */}
          <div className="mb-6">
            <h2
              id="order-portal-heading"
              className="font-black text-2xl text-charcoal mb-1"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              How would you like to order?
            </h2>
            <p className="text-sm text-charcoal/60">Choose your preferred ordering method</p>
          </div>

          {/* Option cards */}
          <div className="flex flex-col gap-3">
            {/* Order Direct */}
            <Link
              href="/order"
              onClick={close}
              className="bg-white rounded-xl p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-sand/50 no-underline"
            >
              <div className="w-12 h-12 rounded-full bg-sand/50 flex items-center justify-center text-2xl shrink-0">📱</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-charcoal leading-tight" style={{ fontFamily: "'Satoshi', sans-serif" }}>Order Direct</p>
                <p className="text-sm text-charcoal/60 mt-0.5">Browse our menu &amp; build your order</p>
              </div>
              <span className="text-orange text-lg shrink-0">→</span>
            </Link>

            {/* Uber Eats */}
            <a
              href={site.delivery.ubereats}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-sand/50 no-underline"
            >
              <div className="w-12 h-12 rounded-full bg-sand/50 flex items-center justify-center text-2xl shrink-0">🛵</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-charcoal leading-tight" style={{ fontFamily: "'Satoshi', sans-serif" }}>Uber Eats</p>
                <p className="text-sm text-charcoal/60 mt-0.5">Fast delivery to your door</p>
              </div>
              <span className="text-orange text-lg shrink-0">→</span>
            </a>

            {/* DoorDash */}
            <a
              href={site.delivery.doordash}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-sand/50 no-underline"
            >
              <div className="w-12 h-12 rounded-full bg-sand/50 flex items-center justify-center text-2xl shrink-0">🚗</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-charcoal leading-tight" style={{ fontFamily: "'Satoshi', sans-serif" }}>DoorDash</p>
                <p className="text-sm text-charcoal/60 mt-0.5">Track your order live</p>
              </div>
              <span className="text-orange text-lg shrink-0">→</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
