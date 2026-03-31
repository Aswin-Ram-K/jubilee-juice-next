export type DietaryBadge = 'vegan' | 'vegetarian' | 'gf' | 'high-protein' | 'dairy-free';

export interface MenuItem {
  name: string;
  description: string;
  price: number | null;
  image?: string;
  badges?: DietaryBadge[];
  popular?: boolean;
}

export interface MenuCategory {
  name: string;
  slug: string;
  description: string;
  icon: string;
  items: MenuItem[];
}
