import { site } from '@/data/site';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

const deliveryOptions = [
  { name: 'Uber Eats', icon: '🛵', href: site.delivery.ubereats, description: 'Fast delivery to your door' },
  { name: 'DoorDash', icon: '🚗', href: site.delivery.doordash, description: 'Track your order live' },
  { name: 'Direct Order', icon: '📱', href: '/order', description: 'Order directly from us' },
] as const;

export default function OrderCTA() {
  return (
    <section className="bg-espresso py-20 md:py-28" aria-labelledby="order-cta-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <AnimateOnScroll animation="fade-up">
          <h2
            id="order-cta-heading"
            className="font-black text-3xl md:text-5xl text-white leading-tight"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            Get It Delivered
          </h2>
          <p className="mt-4 text-white/60 text-lg max-w-md mx-auto">
            Order from your favorite platform
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-up" delay={150}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            {deliveryOptions.map((option) => {
              const isExternal = option.href.startsWith('http');
              return (
                <a
                  key={option.name}
                  href={option.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="group w-full sm:w-64 bg-white rounded-2xl p-6 md:p-8 text-center card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
                >
                  <div className="text-4xl mb-3" aria-hidden="true">{option.icon}</div>
                  <h3
                    className="font-black text-charcoal text-lg mb-1"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                  >
                    {option.name}
                  </h3>
                  <p className="text-charcoal/50 text-sm mb-4">{option.description}</p>
                  <span className="text-orange font-semibold text-sm group-hover:text-[#d06422] transition-colors duration-200">
                    Order Now →
                  </span>
                </a>
              );
            })}
          </div>
        </AnimateOnScroll>

      </div>
    </section>
  );
}
