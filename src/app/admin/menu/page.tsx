'use client';

import { useState, useMemo } from 'react';
import { categories } from '@/data/menu';
import type { MenuItem } from '@/types/menu';
import DataTable from '@/components/admin/DataTable';
import type { Column } from '@/components/admin/DataTable';

// Badge label map
const BADGE_LABELS: Record<string, string> = {
  vegan: 'Vegan',
  vegetarian: 'Vegetarian',
  gf: 'GF',
  'high-protein': 'High Protein',
  'dairy-free': 'Dairy-Free',
};

const BADGE_COLORS: Record<string, string> = {
  vegan: 'bg-[#7A9E7E]/10 text-[#7A9E7E]',
  vegetarian: 'bg-green-50 text-green-700',
  gf: 'bg-blue-50 text-blue-700',
  'high-protein': 'bg-purple-50 text-purple-700',
  'dairy-free': 'bg-orange-50 text-orange-700',
};

// Flatten menu for the table
interface FlatMenuItem extends MenuItem {
  category: string;
  categorySlug: string;
  id: string;
}

const flatItems: FlatMenuItem[] = categories.flatMap((cat) =>
  cat.items.map((item, i) => ({
    ...item,
    category: cat.name,
    categorySlug: cat.slug,
    id: `${cat.slug}-${i}`,
  }))
);

const ALL_CATEGORIES = ['All', ...Array.from(new Set(categories.map((c) => c.name)))];

// Disabled action button with tooltip
function DisabledAction({ label }: { label: string }) {
  return (
    <div className="relative group/tooltip">
      <button
        disabled
        className="text-xs text-[#1A1A1A]/30 font-medium cursor-not-allowed select-none"
        aria-label={`${label} — Connect database first`}
      >
        {label}
      </button>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover/tooltip:block z-10 whitespace-nowrap">
        <div className="bg-[#1A1A1A] text-[#FAF7F2] text-xs px-2.5 py-1.5 rounded-lg shadow-lg">
          Connect database first
        </div>
      </div>
    </div>
  );
}

const COLUMNS: Column<FlatMenuItem>[] = [
  {
    key: 'name',
    header: 'Name',
    render: (row) => (
      <div>
        <p className="font-medium text-[#1A1A1A] text-sm">{row.name}</p>
        <p className="text-xs text-[#1A1A1A]/40 mt-0.5 max-w-xs truncate">{row.description}</p>
      </div>
    ),
  },
  {
    key: 'category',
    header: 'Category',
    render: (row) => (
      <span className="text-sm text-[#1A1A1A]/60">{row.category}</span>
    ),
  },
  {
    key: 'price',
    header: 'Price',
    render: (row) => (
      <span className="text-sm font-medium text-[#1A1A1A]">
        {row.price !== null ? `$${row.price.toFixed(2)}` : '—'}
      </span>
    ),
  },
  {
    key: 'badges',
    header: 'Badges',
    render: (row) => (
      <div className="flex flex-wrap gap-1">
        {(row.badges ?? []).length === 0 ? (
          <span className="text-xs text-[#1A1A1A]/30">—</span>
        ) : (
          (row.badges ?? []).map((badge) => (
            <span
              key={badge}
              className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${BADGE_COLORS[badge] ?? 'bg-[#E8DDD3] text-[#2C2420]'}`}
            >
              {BADGE_LABELS[badge] ?? badge}
            </span>
          ))
        )}
      </div>
    ),
  },
  {
    key: 'popular',
    header: 'Popular',
    render: (row) => (
      row.popular === true ? (
        <span className="inline-flex items-center gap-1 text-xs text-[#E8722A] font-medium">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Yes
        </span>
      ) : (
        <span className="text-xs text-[#1A1A1A]/25">—</span>
      )
    ),
  },
  {
    key: 'available',
    header: 'Available',
    render: () => (
      // Visual-only toggle — non-functional without DB
      <label className="relative inline-flex items-center cursor-not-allowed" title="Connect database to enable">
        <input type="checkbox" defaultChecked className="sr-only peer" disabled />
        <div className="w-9 h-5 bg-[#7A9E7E] rounded-full peer peer-checked:bg-[#7A9E7E] opacity-70" />
        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
      </label>
    ),
  },
  {
    key: 'actions',
    header: 'Actions',
    render: () => (
      <div className="flex items-center gap-3">
        <DisabledAction label="Edit" />
        <DisabledAction label="Delete" />
      </div>
    ),
  },
];

export default function AdminMenuPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    let items = flatItems;
    if (activeCategory !== 'All') {
      items = items.filter((i) => i.category === activeCategory);
    }
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q)
      );
    }
    return items;
  }, [search, activeCategory]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-satoshi font-bold text-2xl text-[#1A1A1A]">Menu Management</h1>
          <p className="text-sm text-[#1A1A1A]/50 mt-1">
            {flatItems.length} items across {categories.length} categories
          </p>
        </div>

        {/* Add item — disabled */}
        <div className="relative group/add shrink-0">
          <button
            disabled
            className="flex items-center gap-2 bg-[#E8722A]/40 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-not-allowed select-none"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Item
          </button>
          <div className="absolute top-full right-0 mt-1.5 hidden group-hover/add:block z-10">
            <div className="bg-[#1A1A1A] text-[#FAF7F2] text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
              Connect database first
            </div>
          </div>
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2">
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
              activeCategory === cat
                ? 'bg-[#E8722A] text-white border-[#E8722A]'
                : 'bg-white text-[#1A1A1A]/60 border-[#E8DDD3] hover:border-[#E8722A]/40 hover:text-[#1A1A1A]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <DataTable
        columns={COLUMNS}
        rows={filtered}
        rowKey={(row) => row.id}
        emptyMessage="No menu items match your search."
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search items by name, description, or category..."
      />

      {filtered.length > 0 && (
        <p className="text-xs text-[#1A1A1A]/40 text-right">
          Showing {filtered.length} of {flatItems.length} items
        </p>
      )}
    </div>
  );
}
