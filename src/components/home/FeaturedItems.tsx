import Link from 'next/link';
import { categories } from '@/data/menu';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

const ITEM_IMAGES: Record<string, string> = {
  'Jubilee Chicken': 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&h=400&fit=crop',
  'Mango Madness': 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&h=400&fit=crop',
  'Spinach & Strawberry': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
  'Avocado Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop',
};

const targetNames = Object.keys(ITEM_IMAGES);

const featuredItems = categories
  .flatMap((cat) => cat.items.map((item) => ({ ...item, categorySlug: cat.slug })))
  .filter((item) => targetNames.includes(item.name))
  .sort((a, b) => targetNames.indexOf(a.name) - targetNames.indexOf(b.name));

export default function FeaturedItems() {
  return (
    <section className="py-24 md:py-32 bg-sand/30" aria-labelledby="featured-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimateOnScroll animation="fade-up">
          <div className="mb-14">
            <SectionHeading title="What's Fresh" subtitle="Our most-loved picks" align="center" />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-up" delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item, i) => (
              <Link
                key={item.name}
                href={`/order#${item.categorySlug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md card-hover flex flex-col"
                aria-label={`View ${item.name} on menu`}
              >
                <div className="aspect-[4/3] img-zoom">
                  <img
                    src={ITEM_IMAGES[item.name]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    width={600}
                    height={400}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3
                    className="font-black text-lg text-charcoal leading-tight mb-1"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed line-clamp-2 flex-1">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-orange font-bold text-lg">
                      ${item.price != null ? item.price.toFixed(2) : 'Market'}
                    </span>
                    <span className="text-sage text-sm font-medium group-hover:text-orange transition-colors duration-200">
                      Order Now →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </AnimateOnScroll>

      </div>
    </section>
  );
}
