import Button from '@/components/ui/Button';

export default function MenuShowcaseCTA() {
  return (
    <section className="py-20 bg-espresso">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className="font-black text-4xl md:text-5xl text-white mb-4 leading-tight"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          Ready to Order?
        </h2>
        <p className="text-white/70 text-lg mb-10 leading-relaxed">
          Order directly through our site and pick up in-store, or use your favorite delivery platform.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/order" variant="primary" size="lg">
            Start Your Order
          </Button>
          <div className="flex items-center gap-3">
            <Button
              href="https://www.ubereats.com/store/jubilee-juice-grill/N_0hm0kOUCqqKHHBvKNJMg"
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white hover:text-espresso"
            >
              UberEats
            </Button>
            <Button
              href="https://www.doordash.com/store/jubilee-juice-grill-chicago-24230395/"
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white hover:text-espresso"
            >
              DoorDash
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
