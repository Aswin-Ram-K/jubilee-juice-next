import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

const PILLARS = [
  {
    icon: '🌿',
    title: 'Fresh Ingredients',
    description:
      'Every ingredient is sourced fresh — produce arrives daily and nothing sits. You taste the difference in every bite.',
  },
  {
    icon: '🔥',
    title: 'Open Flame',
    description:
      'Our signature char comes from cooking over real open flame. It\'s a technique we\'ve refined over 25 years — sear, smoke, savor.',
  },
  {
    icon: '🏘️',
    title: 'Community Roots',
    description:
      'We\'ve been part of the West Loop fabric since 1999. Our regulars aren\'t just customers — they\'re neighbors, and we cook for them that way.',
  },
  {
    icon: '💚',
    title: 'Health Forward',
    description:
      'Real food doesn\'t need to be complicated. We prove that eating well and eating deliciously aren\'t mutually exclusive.',
  },
] as const;

export default function ValuesPillars() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {PILLARS.map((pillar, i) => (
        <AnimateOnScroll key={pillar.title} animation="fade-up" delay={i * 100}>
          <div className="bg-white rounded-2xl p-7 border border-sand hover:border-orange/40 transition-colors">
            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-2xl mb-4">
              {pillar.icon}
            </div>
            <h4
              className="font-black text-xl text-charcoal mb-3"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              {pillar.title}
            </h4>
            <p className="text-charcoal/60 leading-relaxed">{pillar.description}</p>
          </div>
        </AnimateOnScroll>
      ))}
    </div>
  );
}
