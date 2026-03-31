'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/stores/cart';
import { useOrderPortalStore } from '@/stores/orderPortal';
import { useCartDrawerStore } from '@/stores/cartDrawer';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

// Pages that start with a dark hero/background behind the transparent header
const DARK_HERO_PAGES = ['/'];

interface HeaderProps {
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export default function Header({ onMobileMenuToggle, isMobileMenuOpen = false }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const openPortal = useOrderPortalStore((s) => s.open);
  const toggleCart = useCartDrawerStore((s) => s.toggle);
  const cartDrawerOpen = useCartDrawerStore((s) => s.isOpen);
  const cartCount = useCartStore((s) => s.cartCount());

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const isOrderingFlow = pathname === '/order' || pathname === '/checkout';
  const hasDarkHero = DARK_HERO_PAGES.includes(pathname);

  // When over a dark hero and not yet scrolled, use light text
  // Once scrolled (cream bg visible) or on pages without dark hero, use dark text
  const isLightMode = hasDarkHero && !scrolled;

  const textColor = isLightMode ? 'text-white' : 'text-charcoal';
  const textColorMuted = isLightMode ? 'text-white/60' : 'text-charcoal/60';
  const navActiveColor = 'text-orange';
  const navColor = isLightMode ? 'text-white/80 hover:text-white' : 'text-charcoal hover:text-orange';
  const iconColor = isLightMode ? 'text-white hover:text-white/70' : 'text-charcoal hover:text-orange';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || isOrderingFlow ? 'bg-cream/90 backdrop-blur-md shadow-sm' : ''
      } ${cartDrawerOpen ? 'blur-sm brightness-75 pointer-events-none' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo — hidden on ordering flow pages */}
          {!isOrderingFlow ? (
            <Link href="/" className="flex items-center gap-0.5 shrink-0" aria-label="Jubilee Juice & Grill">
              <span
                className={`font-black text-2xl leading-none transition-colors duration-500 ${textColor}`}
                style={{ fontFamily: "'Satoshi', sans-serif", textShadow: isLightMode ? '0 1px 8px rgba(0,0,0,0.4)' : '0 1px 4px rgba(0,0,0,0.08)' }}
              >
                Jubilee
              </span>
              <span className={`text-base font-medium ml-1 hidden sm:inline transition-colors duration-500 ${textColorMuted}`}>
                Juice &amp; Grill
              </span>
            </Link>
          ) : (
            <Link href="/" className={`text-sm font-medium transition-colors duration-500 ${textColorMuted} hover:${textColor}`} aria-label="Back to home">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline -mt-0.5 mr-1"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </Link>
          )}

          {/* Desktop Nav — hidden on ordering flow */}
          {!isOrderingFlow && (
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-500 ${
                    isActive(link.href) ? navActiveColor : navColor
                  }`}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Right controls */}
          <div className="flex items-center gap-1">
            {/* Theme toggle */}
            <ThemeToggle />

            {/* Cart button */}
            <button
              onClick={toggleCart}
              aria-label={`Open cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
              className={`relative p-3 transition-colors duration-500 ${iconColor}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-orange text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Desktop CTA — context-dependent */}
            {isOrderingFlow ? (
              <Link
                href="/checkout"
                className="hidden lg:inline-flex items-center justify-center rounded-full bg-orange text-white font-semibold px-6 py-2.5 text-sm hover:bg-[#d06422] transition-colors duration-200"
              >
                Checkout
              </Link>
            ) : (
              <button
                onClick={openPortal}
                className="hidden lg:inline-flex items-center justify-center rounded-full bg-orange text-white font-semibold px-6 py-2.5 text-sm hover:bg-[#d06422] transition-colors duration-200"
              >
                Order Now
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={onMobileMenuToggle}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className={`lg:hidden flex flex-col gap-1.5 p-2.5 rounded-md transition-colors duration-500 ${iconColor}`}
            >
              <span className="block w-6 h-0.5 bg-current transition-all duration-300" />
              <span className="block w-6 h-0.5 bg-current transition-all duration-300" />
              <span className="block w-4 h-0.5 bg-current transition-all duration-300" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
