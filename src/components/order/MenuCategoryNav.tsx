'use client';

import { useEffect, useRef, useState } from 'react';
import type { MenuCategory } from '@/types/menu';

interface MenuCategoryNavProps {
  categories: MenuCategory[];
}

export default function MenuCategoryNav({ categories }: MenuCategoryNavProps) {
  const [activeSlug, setActiveSlug] = useState<string>(categories[0]?.slug ?? '');
  const navRef = useRef<HTMLDivElement>(null);
  const scrollingRef = useRef(false);

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    categories.forEach(({ slug }) => {
      const section = document.getElementById(slug);
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !scrollingRef.current) {
              setActiveSlug(slug);
            }
          });
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [categories]);

  // Scroll active pill into view in nav
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const active = nav.querySelector<HTMLButtonElement>(`[data-slug="${activeSlug}"]`);
    if (!active) return;
    active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeSlug]);

  function scrollToSection(slug: string) {
    const section = document.getElementById(slug);
    if (!section) return;
    scrollingRef.current = true;
    setActiveSlug(slug);
    const offset = 88; // sticky nav height
    const top = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    setTimeout(() => {
      scrollingRef.current = false;
    }, 800);
  }

  return (
    <div className="sticky top-16 z-30 bg-cream/95 backdrop-blur-sm border-b border-sand shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={navRef}
          className="flex gap-2 overflow-x-auto scrollbar-none py-3"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map(({ slug, name, icon }) => (
            <button
              key={slug}
              data-slug={slug}
              onClick={() => scrollToSection(slug)}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                activeSlug === slug
                  ? 'bg-orange text-white shadow-sm'
                  : 'bg-white text-charcoal/70 hover:text-charcoal hover:bg-sand border border-sand'
              }`}
            >
              <span aria-hidden="true">{icon}</span>
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
