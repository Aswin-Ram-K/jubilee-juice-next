import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

const values = [
  { icon: '🌱', title: 'Fresh Daily', body: 'Every item handcrafted from scratch, every morning' },
  { icon: '🏆', title: '25+ Years', body: "Serving Chicago's West Loop since 1999" },
  { icon: '✨', title: 'Real Ingredients', body: 'No artificial flavors, colors, or preservatives' },
] as const;

export default function PhilosophySection() {
  return (
    <section className="bg-cream py-24 md:py-32" aria-labelledby="philosophy-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h2 id="philosophy-heading" className="sr-only">Our Philosophy</h2>

        {/* Manifesto */}
        <blockquote
          className="font-black text-2xl md:text-4xl lg:text-5xl leading-tight text-charcoal"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          <AnimateOnScroll animation="fade-up" delay={0} className="block mb-1">
            We believe the best food starts with the best ingredients.
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={100} className="block mb-1">
            No shortcuts. No compromises.
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={200} className="block">
            Just real food, made fresh, every single day.
          </AnimateOnScroll>
        </blockquote>

        {/* Value cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {values.map((v, i) => (
            <AnimateOnScroll key={v.title} animation="fade-up" delay={i * 100}>
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-1 h-8 bg-sage rounded-full mx-auto mb-5" />
                <div className="text-4xl mb-4" aria-hidden="true">{v.icon}</div>
                <h3 className="font-black text-xl text-charcoal mb-2" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  {v.title}
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{v.body}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
