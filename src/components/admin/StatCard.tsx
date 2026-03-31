import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
  accent?: 'orange' | 'sage' | 'sand' | 'espresso';
}

const accentMap = {
  orange: 'bg-[#E8722A]/10 text-[#E8722A]',
  sage: 'bg-[#7A9E7E]/10 text-[#7A9E7E]',
  sand: 'bg-[#E8DDD3] text-[#2C2420]',
  espresso: 'bg-[#2C2420]/10 text-[#2C2420]',
} as const;

export default function StatCard({
  label,
  value,
  icon,
  trend,
  trendUp,
  accent = 'orange',
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E8DDD3] p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accentMap[accent]}`}>
          {icon}
        </div>
        {trend !== undefined && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              trendUp
                ? 'bg-[#7A9E7E]/10 text-[#7A9E7E]'
                : 'bg-[#E8DDD3] text-[#2C2420]/60'
            }`}
          >
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-satoshi font-bold text-[#1A1A1A]">{value}</p>
        <p className="text-sm text-[#1A1A1A]/50 mt-0.5">{label}</p>
      </div>
    </div>
  );
}
