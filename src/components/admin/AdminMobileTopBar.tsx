'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Menu', href: '/admin/menu' },
  { label: 'Orders', href: '/admin/orders' },
  { label: 'Settings', href: '/admin/settings' },
] as const;

export default function AdminMobileTopBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string): boolean {
    if (href === '/admin/dashboard') {
      return pathname === '/admin/dashboard' || pathname === '/admin';
    }
    return pathname.startsWith(href);
  }

  return (
    <>
      <header className="bg-[#2C2420] text-[#FAF7F2] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#E8722A] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </div>
          <span className="font-satoshi font-bold text-sm">Jubilee Admin</span>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Toggle navigation"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </header>

      {open && (
        <nav className="bg-[#2C2420] border-t border-white/10 px-3 pb-3">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mt-1 ${
                  active
                    ? 'bg-[#E8722A] text-white'
                    : 'text-[#FAF7F2]/70 hover:bg-white/10 hover:text-[#FAF7F2]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/"
            className="block px-3 py-2.5 text-xs text-[#FAF7F2]/40 hover:text-[#FAF7F2]/60 transition-colors mt-2"
          >
            Back to Site
          </Link>
        </nav>
      )}
    </>
  );
}
