'use client';

import { site } from '@/data/site';
import { hours } from '@/data/hours';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

export default function LocationPreview() {
  const todayName = DAY_NAMES[new Date().getDay()];

  return (
    <section className="bg-cream py-20 md:py-28" aria-labelledby="location-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: Info */}
          <AnimateOnScroll animation="slide-left">
            <div>
              <h2
                id="location-heading"
                className="font-black text-4xl md:text-5xl text-charcoal leading-tight mb-8"
                style={{ fontFamily: "'Satoshi', sans-serif" }}
              >
                Visit Us
              </h2>

              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-charcoal/40 mb-2">Address</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(site.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal hover:text-orange transition-colors duration-200 text-lg font-medium leading-relaxed"
                >
                  {site.address}
                </a>
              </div>

              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-charcoal/40 mb-2">Phone</p>
                <a
                  href={`tel:${site.phone.replace(/\D/g, '')}`}
                  className="text-charcoal hover:text-orange transition-colors duration-200 text-lg font-medium"
                >
                  {site.phone}
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-charcoal/40 mb-4">Hours</p>
                <ul className="flex flex-col gap-2">
                  {hours.map((row) => {
                    const isToday = row.day === todayName;
                    return (
                      <li
                        key={row.day}
                        className="flex items-center justify-between py-1.5 border-b border-charcoal/10 last:border-0"
                      >
                        <span className={`text-sm font-medium ${isToday ? 'text-orange font-semibold' : 'text-charcoal/80'}`}>
                          {row.day}
                        </span>
                        <span className={`text-sm ${isToday ? 'text-orange font-semibold' : 'text-charcoal/60'}`}>
                          {row.open} – {row.close}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right: Map */}
          <AnimateOnScroll animation="slide-right" delay={100}>
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-video lg:aspect-auto lg:h-[480px] w-full hover-lift">
              <iframe
                src={site.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map showing location of ${site.name}`}
              />
            </div>
          </AnimateOnScroll>

        </div>
      </div>
    </section>
  );
}
