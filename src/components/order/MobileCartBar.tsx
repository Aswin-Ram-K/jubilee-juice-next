'use client';

import { useCartStore } from '@/stores/cart';
import { useCartDrawerStore } from '@/stores/cartDrawer';

export default function MobileCartBar() {
  const cartCount = useCartStore((s) => s.cartCount);
  const total = useCartStore((s) => s.total);
  const open = useCartDrawerStore((s) => s.open);

  const count = cartCount();
  const totalAmt = total();

  if (count === 0) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden px-4 pb-4">
      <button
        onClick={open}
        className="w-full bg-espresso text-white flex items-center justify-between px-5 py-4 rounded-2xl shadow-xl active:scale-95 transition-transform"
      >
        <div className="flex items-center gap-3">
          <span className="bg-orange text-white text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full">
            {count}
          </span>
          <span className="font-semibold text-base">View Cart</span>
        </div>
        <span className="font-black text-lg" style={{ fontFamily: "'Satoshi', sans-serif" }}>
          ${totalAmt.toFixed(2)}
        </span>
      </button>
    </div>
  );
}
