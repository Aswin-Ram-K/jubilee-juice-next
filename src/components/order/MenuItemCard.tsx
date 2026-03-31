'use client';

import Image from 'next/image';
import Badge from '@/components/ui/Badge';
import { useCartStore } from '@/stores/cart';
import { useCartDrawerStore } from '@/stores/cartDrawer';
import type { MenuItem } from '@/types/menu';

interface MenuItemCardProps {
  item: MenuItem;
  categorySlug: string;
  image: string;
}

export default function MenuItemCard({ item, categorySlug, image }: MenuItemCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openDrawer = useCartDrawerStore((s) => s.open);

  function handleAdd() {
    if (item.price === null) return;
    addItem({
      id: `${categorySlug}-${item.name}`,
      name: item.name,
      price: item.price,
      categorySlug,
    });
    openDrawer();
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-sand hover:border-orange/40 card-hover flex flex-col">
      <div className="relative h-44 bg-sand img-zoom">
        <Image
          src={image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {item.popular && (
          <div className="absolute top-2 left-2">
            <span className="bg-orange text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
              Popular
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h4
          className="font-black text-base text-charcoal leading-snug mb-1"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          {item.name}
        </h4>
        <p className="text-charcoal/55 text-sm leading-relaxed flex-1 mb-3">{item.description}</p>
        {item.badges && item.badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.badges.map((badge) => (
              <Badge key={badge} type={badge} />
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-sand">
          <span className="font-black text-lg text-charcoal" style={{ fontFamily: "'Satoshi', sans-serif" }}>
            {item.price !== null ? `$${item.price.toFixed(2)}` : 'Market price'}
          </span>
          {item.price !== null && (
            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-1.5 bg-orange text-white text-sm font-semibold px-4 py-3 rounded-xl hover:bg-[#d06422] active:scale-95 transition-all duration-150 min-h-[44px]"
              aria-label={`Add ${item.name} to cart`}
            >
              <span aria-hidden="true">+</span>
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
