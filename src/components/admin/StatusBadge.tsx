export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';

interface StatusBadgeProps {
  status: OrderStatus;
}

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: {
    label: 'Pending',
    className: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  },
  preparing: {
    label: 'Preparing',
    className: 'bg-[#E8722A]/10 text-[#E8722A] border border-[#E8722A]/20',
  },
  ready: {
    label: 'Ready',
    className: 'bg-[#7A9E7E]/10 text-[#7A9E7E] border border-[#7A9E7E]/20',
  },
  completed: {
    label: 'Completed',
    className: 'bg-green-50 text-green-700 border border-green-200',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-50 text-red-600 border border-red-200',
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}
