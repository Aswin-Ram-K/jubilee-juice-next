import Link from 'next/link';
import { site } from '@/data/site';
import { hours } from '@/data/hours';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-espresso text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Col 1: Logo + tagline + social */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="font-black text-2xl text-white leading-none" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                Jubilee
              </p>
              <p className="text-sm text-white/50 mt-0.5">Juice &amp; Grill</p>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">{site.tagline}</p>
            <div className="flex items-center gap-4">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/50 hover:text-orange transition-colors duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/50 hover:text-orange transition-colors duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href={site.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="text-white/50 hover:text-orange transition-colors duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links + Order Online */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-white text-sm transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Order Online</h3>
              <div className="flex flex-col gap-2">
                <a href={site.delivery.ubereats} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white text-sm transition-colors duration-150 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange inline-block" />
                  Uber Eats
                </a>
                <a href={site.delivery.doordash} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white text-sm transition-colors duration-150 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange inline-block" />
                  DoorDash
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Hours */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Hours</h3>
            <ul className="flex flex-col gap-2">
              {hours.map((row) => (
                <li key={row.day} className="flex items-start justify-between gap-2 text-sm">
                  <span className="text-white/70 shrink-0">{row.day.slice(0, 3)}</span>
                  <span className="text-white/50">{row.open} – {row.close}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Find Us</h3>
            <address className="not-italic flex flex-col gap-3">
              <div className="flex items-start gap-2 text-sm text-white/70">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 text-orange" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{site.address}</span>
              </div>
              <a href={`tel:${site.phone.replace(/\D/g, '')}`} className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-orange" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.59 1.25h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.92-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16.92z" />
                </svg>
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors duration-150 break-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-orange" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {site.email}
              </a>
            </address>
          </div>

        </div>

        {/* Divider + copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {currentYear} {site.name}. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">West Loop, Chicago, IL</p>
        </div>

      </div>
    </footer>
  );
}
