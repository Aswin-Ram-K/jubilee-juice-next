'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type AnimationType = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right';

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
}

export default function AnimateOnScroll({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    // Always observe — let the IntersectionObserver handle everything,
    // including elements already in the viewport (it fires immediately for those)
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-animate={animation}
      className={`${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ '--delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
