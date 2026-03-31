import Link from 'next/link';
import Image from 'next/image';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

const SIGNATURE_DISHES = [
  {
    name: 'Jubilee Chicken',
    category: 'Chicken Sandwiches',
    categorySlug: 'chicken',
    price: 12.99,
    description: 'Goat cheese, fresh lettuce, tomato, and house dressing on a toasted bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
  },
  {
    name: 'Buffalo Chicken',
    category: 'Chicken Sandwiches',
    categorySlug: 'chicken',
    price: 12.49,
    description: 'Smothered in hot sauce, blue cheese, fresh lettuce, tomato, and dressing.',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop',
  },
  {
    name: 'Strawberry Heaven',
    category: 'Fresh Fruit Smoothies',
    categorySlug: 'smoothies',
    price: 7.99,
    description: 'Strawberries, bananas, frozen yogurt, and fresh apple juice blended daily.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop',
  },
  {
    name: 'Jubilee Salad',
    category: 'Seasonal Salads',
    categorySlug: 'salads',
    price: 11.49,
    description: 'Crisp romaine, pears, walnuts, blue cheese, and raspberry vinaigrette.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
  },
  {
    name: 'Mixed Veggie Wrap',
    category: 'Veggie Victory',
    categorySlug: 'veggie',
    price: 12.49,
    description: 'Grilled asparagus, portabella, eggplant, zucchini, red peppers, Greek feta in a spinach tortilla.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
  },
  {
    name: 'Grilled Atlantic Salmon',
    category: 'From The Sea',
    categorySlug: 'seafood',
    price: 16.99,
    description: 'Ocean fresh fillet with herb-infused olive oil and lemon, served on French bread with a side salad.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
  },
] as const;

export default function SignatureDishes() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SIGNATURE_DISHES.map((dish, i) => (
            <AnimateOnScroll key={dish.name} animation="fade-up" delay={i * 80}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover flex flex-col h-full">
                <div className="relative h-52 img-zoom">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-orange text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs font-semibold text-orange uppercase tracking-wider mb-1">
                    {dish.category}
                  </span>
                  <h3 className="font-black text-xl text-charcoal mb-2" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                    {dish.name}
                  </h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed flex-1">{dish.description}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-sand">
                    <span className="font-black text-xl text-charcoal" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                      ${dish.price.toFixed(2)}
                    </span>
                    <Link
                      href={`/order#${dish.categorySlug}`}
                      className="text-orange text-sm font-semibold hover:text-[#d06422] transition-colors inline-flex items-center gap-1"
                    >
                      Order this <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
