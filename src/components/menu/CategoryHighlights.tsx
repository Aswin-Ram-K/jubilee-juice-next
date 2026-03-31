import Link from 'next/link';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

const CATEGORIES = [
  {
    icon: '🍔',
    name: 'Craft Burgers',
    slug: 'burgers',
    description: 'Handcrafted burgers made with premium ingredients on fresh-baked buns.',
    count: 7,
  },
  {
    icon: '🍗',
    name: 'Chicken Sandwiches',
    slug: 'chicken',
    description: 'Juicy marinated chicken sandwiches — grilled, sauced, and stacked.',
    count: 10,
  },
  {
    icon: '🥤',
    name: 'Fresh Fruit Smoothies',
    slug: 'smoothies',
    description: 'Blended fresh daily with real fruit, sherbet, and natural juices.',
    count: 16,
  },
  {
    icon: '🥗',
    name: 'Seasonal Salads',
    slug: 'salads',
    description: 'Crisp romaine with seasonal ingredients. Add your choice of protein.',
    count: 8,
  },
  {
    icon: '🌿',
    name: 'Veggie Victory',
    slug: 'veggie',
    description: 'Plant-forward options that never sacrifice flavor.',
    count: 6,
  },
  {
    icon: '🐟',
    name: 'From The Sea',
    slug: 'seafood',
    description: 'Ocean-fresh fillets and jumbo shrimp — simply seasoned and beautifully prepared.',
    count: 4,
  },
  {
    icon: '🥖',
    name: 'Artisanal Deli',
    slug: 'deli',
    description: 'Classic deli sandwiches with premium cold cuts on fresh French bread.',
    count: 2,
  },
  {
    icon: '🍟',
    name: 'Signature Sides',
    slug: 'sides',
    description: 'The perfect companions — from crispy waffle fries to housemade hummus.',
    count: 15,
  },
] as const;

export default function CategoryHighlights() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CATEGORIES.map((cat, i) => (
            <AnimateOnScroll key={cat.slug} animation="fade-up" delay={i * 60}>
              <Link
                href={`/order#${cat.slug}`}
                className="group flex items-start gap-5 p-6 rounded-2xl border border-sand hover:border-orange hover:bg-cream hover-lift"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-sand rounded-2xl flex items-center justify-center text-2xl group-hover:bg-orange/10 transition-colors">
                  {cat.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <h3 className="font-black text-lg text-charcoal group-hover:text-orange transition-colors" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                      {cat.name}
                    </h3>
                    <span className="flex-shrink-0 bg-sand text-charcoal/60 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                      {cat.count} items
                    </span>
                  </div>
                  <p className="text-charcoal/60 text-sm leading-relaxed mb-3">{cat.description}</p>
                  <span className="text-orange text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    View &amp; Order <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
