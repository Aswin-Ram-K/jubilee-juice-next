'use client';

import { useOrderPortalStore } from '@/stores/orderPortal';
import Button from '@/components/ui/Button';
import { siteImages } from '@/data/images';

export default function ScrollHero() {
  const openPortal = useOrderPortalStore((s) => s.open);

  return (
    <section className="relative min-h-screen flex items-end" aria-label="Hero">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={siteImages.heroBanner}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-28 lg:pb-32">
        <div className="max-w-3xl">
          <h1
            className="hero-animate hero-delay-1 font-black text-5xl md:text-7xl lg:text-8xl leading-none text-white"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            Real Food.<br />
            Real Flavor.<br />
            <span className="text-orange">Since &apos;99.</span>
          </h1>
          <p className="hero-animate hero-delay-2 mt-6 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
            Handcrafted burgers, smoothies &amp; salads in Chicago&apos;s West Loop.
          </p>
          <div className="hero-animate hero-delay-3 mt-8 flex flex-wrap gap-4">
            <Button href="/menu" variant="primary" className="cta-pulse">Explore Menu</Button>
            <button
              onClick={openPortal}
              className="inline-flex items-center justify-center rounded-full border-2 border-white text-white font-semibold px-7 py-3.5 text-base hover:bg-white hover:text-charcoal transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-white/60 text-xs uppercase tracking-widest">Scroll</span>
        <div className="scroll-indicator float-slow text-white/80" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  );
}
