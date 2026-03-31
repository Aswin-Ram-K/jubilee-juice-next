import type { ReactNode } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminMobileTopBar from '@/components/admin/AdminMobileTopBar';

// TODO: Add NextAuth middleware to protect /admin/* routes once a database is connected.
// For now, all admin pages are publicly accessible in development mode.

export const metadata = {
  title: {
    default: 'Admin — Jubilee Juice & Grill',
    template: '%s | Jubilee Admin',
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#FAF7F2]">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <AdminSidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden">
          <AdminMobileTopBar />
        </div>

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
