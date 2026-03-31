import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import MenuItemCard from './MenuItemCard';
import { getItemImage } from '@/data/images';
import type { MenuCategory } from '@/types/menu';

interface MenuSectionProps {
  category: MenuCategory;
}

export default function MenuSection({ category }: MenuSectionProps) {

  return (
    <section id={category.slug} className="py-12 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-orange/10 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
            {category.icon}
          </div>
          <div>
            <h2
              className="font-black text-2xl md:text-3xl text-charcoal leading-tight"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              {category.name}
            </h2>
            <p className="text-charcoal/50 text-sm mt-0.5">
              {category.items.length} {category.items.length === 1 ? 'item' : 'items'}
              {category.description ? ` · ${category.description}` : ''}
            </p>
          </div>
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {category.items.map((item, i) => (
            <AnimateOnScroll key={item.name} animation="fade-up" delay={i * 50}>
              <MenuItemCard
                item={item}
                categorySlug={category.slug}
                image={getItemImage(category.slug, i)}
              />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
