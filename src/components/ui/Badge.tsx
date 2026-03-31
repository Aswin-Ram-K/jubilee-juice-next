import type { DietaryBadge } from '@/types/menu';

interface BadgeProps {
  type: DietaryBadge;
}

const config: Record<DietaryBadge, { label: string; icon: string; classes: string }> = {
  vegan: { label: 'Vegan', icon: '🌱', classes: 'bg-green-100 text-green-800 border border-green-200' },
  vegetarian: { label: 'Vegetarian', icon: '🥬', classes: 'bg-green-50 text-green-700 border border-green-200' },
  gf: { label: 'Gluten-Free', icon: '🌾', classes: 'bg-blue-50 text-blue-700 border border-blue-200' },
  'high-protein': { label: 'High Protein', icon: '💪', classes: 'bg-orange-50 text-orange-700 border border-orange-200' },
  'dairy-free': { label: 'Dairy-Free', icon: '🥛', classes: 'bg-purple-50 text-purple-700 border border-purple-200' },
};

export default function Badge({ type }: BadgeProps) {
  const { label, icon, classes } = config[type];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${classes}`}>
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </span>
  );
}
