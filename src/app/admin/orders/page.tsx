'use client';

import { useState } from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import type { OrderStatus } from '@/components/admin/StatusBadge';

type Tab = 'all' | OrderStatus;

const TABS: { key: Tab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'preparing', label: 'Preparing' },
  { key: 'ready', label: 'Ready' },
  { key: 'completed', label: 'Completed' },
];

// Mock order type for when orders exist (future use)
interface Order {
  id: string;
  customer: string;
  items: string[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
}

// Placeholder — no orders yet
const ORDERS: Order[] = [];

function timeSince(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

function OrderCard({ order }: { order: Order }) {
  return (
    <div className="bg-white rounded-xl border border-[#E8DDD3] p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-satoshi font-bold text-sm text-[#1A1A1A]">#{order.id}</span>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-sm text-[#1A1A1A]/60 mt-1">{order.customer}</p>
          <p className="text-xs text-[#1A1A1A]/40 mt-2 truncate">
            {order.items.join(', ')}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-satoshi font-bold text-base text-[#1A1A1A]">
            ${order.total.toFixed(2)}
          </p>
          <p className="text-xs text-[#1A1A1A]/40 mt-0.5">{timeSince(order.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const filtered =
    activeTab === 'all' ? ORDERS : ORDERS.filter((o) => o.status === activeTab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-satoshi font-bold text-2xl text-[#1A1A1A]">Orders</h1>
        <p className="text-sm text-[#1A1A1A]/50 mt-1">
          Monitor and manage customer orders in real time.
        </p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-1 bg-white border border-[#E8DDD3] rounded-xl p-1 w-fit flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-[#E8722A] text-white shadow-sm'
                : 'text-[#1A1A1A]/50 hover:text-[#1A1A1A] hover:bg-[#FAF7F2]'
            }`}
          >
            {tab.label}
            {tab.key !== 'all' && (
              <span
                className={`ml-1.5 text-xs ${
                  activeTab === tab.key ? 'text-white/70' : 'text-[#1A1A1A]/30'
                }`}
              >
                (0)
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders list or empty state */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E8DDD3] px-6 py-20 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-full bg-[#E8DDD3] flex items-center justify-center mb-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1A1A1A"
              strokeOpacity="0.3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <p className="font-medium text-[#1A1A1A]/50 text-sm">No orders yet</p>
          <p className="text-xs text-[#1A1A1A]/30 mt-1.5 max-w-sm">
            Orders will appear here when customers start ordering. Connect a database and payment
            processor to enable live orders.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

      {/* Status badge legend */}
      <div className="bg-white rounded-xl border border-[#E8DDD3] p-5">
        <p className="text-xs font-semibold text-[#1A1A1A]/40 uppercase tracking-wider mb-3">
          Status Guide
        </p>
        <div className="flex flex-wrap gap-3">
          {(['pending', 'preparing', 'ready', 'completed', 'cancelled'] as OrderStatus[]).map(
            (status) => (
              <StatusBadge key={status} status={status} />
            )
          )}
        </div>
      </div>
    </div>
  );
}
