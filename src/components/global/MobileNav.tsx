'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useOrderPortalStore } from '@/stores/orderPortal';
import { site } from '@/data/site';

const ORDERING_PATHS = ['/order', '/checkout'];

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const openPortal = useOrderPortalStore((s) => s.open);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll when open
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  // Close on route change and clean up scroll lock
  useEffect(() => {
    onClose();
    document.body.classList.remove('overflow-hidden');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className={`fixed inset-0 z-40 transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ backgroundColor: 'rgba(44, 36, 32, 0.97)' }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/10">
        <span className="font-black text-2xl text-white" style={{ fontFamily: "'Satoshi', sans-serif" }}>
          Jubilee
        </span>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="p-2 text-white/70 hover:text-white transition-colors rounded-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col px-6 py-8 gap-2" aria-label="Mobile navigation links">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-2xl font-semibold text-white/90 hover:text-orange transition-colors duration-150 py-3 border-b border-white/10"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            {link.label}
          </Link>
        ))}
        {ORDERING_PATHS.includes(pathname) ? (
          <Link
            href="/checkout"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-orange text-white font-semibold px-8 py-4 text-lg hover:bg-[#d06422] transition-colors duration-200"
          >
            Checkout
          </Link>
        ) : (
          <button
            onClick={() => { onClose(); setTimeout(() => openPortal(), 300); }}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-orange text-white font-semibold px-8 py-4 text-lg hover:bg-[#d06422] transition-colors duration-200"
          >
            Order Now
          </button>
        )}
      </nav>

      {/* Social links */}
      <div className="absolute bottom-8 left-0 right-0 px-6">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Follow Us</p>
        <div className="flex items-center gap-5">
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/60 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/60 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
