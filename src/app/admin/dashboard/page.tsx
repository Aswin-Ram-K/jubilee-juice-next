import Link from 'next/link';
import StatCard from '@/components/admin/StatCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

// Mock data — replace with real DB queries once connected
const STATS = [
  {
    label: "Today's Orders",
    value: '0',
    accent: 'orange' as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    label: 'Revenue',
    value: '$0.00',
    accent: 'sage' as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    label: 'Pending Orders',
    value: '0',
    accent: 'sand' as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: 'Active Menu Items',
    value: '72',
    accent: 'espresso' as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="9" y1="16" x2="13" y2="16" />
      </svg>
    ),
  },
] as const;

const QUICK_ACTIONS = [
  { label: 'Manage Menu', href: '/admin/menu', description: 'View and edit menu items' },
  { label: 'View Orders', href: '/admin/orders', description: 'Monitor incoming orders' },
  { label: 'Settings', href: '/admin/settings', description: 'Configure business settings' },
] as const;

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="font-satoshi font-bold text-2xl text-[#1A1A1A]">Dashboard</h1>
        <p className="text-sm text-[#1A1A1A]/50 mt-1">
          Welcome back. Here&apos;s an overview of today&apos;s activity.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            accent={stat.accent}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E8DDD3] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E8DDD3] flex items-center justify-between">
            <h2 className="font-satoshi font-bold text-base text-[#1A1A1A]">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-xs text-[#E8722A] hover:text-[#d4611f] font-medium transition-colors"
            >
              View all
            </Link>
          </div>

          {/* Empty state */}
          <div className="px-5 py-16 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#E8DDD3] flex items-center justify-center mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[#1A1A1A]/40">No orders yet</p>
            <p className="text-xs text-[#1A1A1A]/30 mt-1">
              Orders will appear here once customers start placing them.
            </p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-xl border border-[#E8DDD3] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E8DDD3]">
            <h2 className="font-satoshi font-bold text-base text-[#1A1A1A]">Quick Actions</h2>
          </div>
          <div className="p-4 space-y-2">
            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center justify-between p-3 rounded-lg border border-[#E8DDD3] hover:border-[#E8722A]/30 hover:bg-[#E8722A]/5 transition-colors group"
              >
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A] group-hover:text-[#E8722A] transition-colors">
                    {action.label}
                  </p>
                  <p className="text-xs text-[#1A1A1A]/40 mt-0.5">{action.description}</p>
                </div>
                <svg
                  className="text-[#1A1A1A]/20 group-hover:text-[#E8722A] transition-colors shrink-0"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            ))}
          </div>

          {/* Dev mode notice */}
          <div className="mx-4 mb-4 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
            <p className="text-xs text-yellow-700 font-medium">Dev Mode</p>
            <p className="text-xs text-yellow-600 mt-0.5">
              Connect a database to enable live order tracking and revenue data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
