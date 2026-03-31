import Link from 'next/link';
import { categories } from '@/data/menu';
import { categoryImages as CATEGORY_IMAGES } from '@/data/images';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export default function CategoryShowcase() {
  return (
    <section className="py-24 md:py-32 bg-cream" aria-labelledby="categories-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimateOnScroll animation="fade-up">
          <div className="mb-14">
            <SectionHeading title="Explore Our Menu" subtitle="Something for everyone" align="center" />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-up" delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/menu#${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl h-56 md:h-64 lg:h-72 card-hover block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
                aria-label={`${cat.name} — ${cat.items.length} items`}
              >
                <img
                  src={CATEGORY_IMAGES[cat.slug]}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  width={600}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 md:p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl" aria-hidden="true">{cat.icon}</span>
                  </div>
                  <p
                    className="font-black text-white text-base md:text-lg leading-tight"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                  >
                    {cat.name}
                  </p>
                  <p className="text-white/70 text-xs mt-0.5">{cat.items.length} items</p>
                </div>
              </Link>
            ))}
          </div>
        </AnimateOnScroll>

      </div>
    </section>
  );
}
