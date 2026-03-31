'use client';

import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav';
import OrderPortal from './OrderPortal';
import CartDrawer from '@/components/order/CartDrawer';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Header
        onMobileMenuToggle={() => setMobileMenuOpen((o) => !o)}
        isMobileMenuOpen={mobileMenuOpen}
      />
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <OrderPortal />
      <CartDrawer />
      {children}
      <Footer />
    </>
  );
}
