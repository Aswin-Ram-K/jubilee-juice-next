import type { ReactNode } from 'react';

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  emptyMessage?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

export default function DataTable<T>({
  columns,
  rows,
  rowKey,
  emptyMessage = 'No data available.',
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded-xl border border-[#E8DDD3] overflow-hidden">
      {onSearchChange !== undefined && (
        <div className="px-5 py-4 border-b border-[#E8DDD3]">
          <div className="relative max-w-sm">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/30"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchValue ?? ''}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 text-sm border border-[#E8DDD3] rounded-lg bg-[#FAF7F2] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:ring-2 focus:ring-[#E8722A]/30 focus:border-[#E8722A]"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E8DDD3] bg-[#FAF7F2]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-5 py-3 text-left text-xs font-semibold text-[#1A1A1A]/50 uppercase tracking-wider ${col.className ?? ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center text-[#1A1A1A]/40 text-sm">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={rowKey(row)}
                  className="border-b border-[#E8DDD3] last:border-0 hover:bg-[#FAF7F2]/60 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className={`px-5 py-3.5 ${col.className ?? ''}`}>
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
