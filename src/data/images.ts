/**
 * Real images from jubileejuice.com mapped to categories.
 * The site doesn't have per-item photos, so category-level images
 * are used for all items within that category. Unsplash fallbacks
 * are kept for categories where the real site only has generic banners.
 */

const JJ = 'https://jubileejuice.com/wp-content/uploads';

// ─── Category hero/card images (from the real website) ──────────────

export const categoryImages: Record<string, string> = {
  burgers: `${JJ}/2023/03/jubilee-juice-charred-steak.webp`,
  chicken: `${JJ}/2021/04/JubileeChickenSandwichMenu.webp`,
  smoothies: `${JJ}/2021/04/jubilee_juice_fresh_fruit_smoothies.webp`,
  salads: `${JJ}/2021/04/jubilee_juice_veggie_victory_menu_veggies_header_1600x500.webp`,
  veggie: `${JJ}/2021/04/jubilee_juice_veggie_victory_menu_veggies_header_1600x500.webp`,
  seafood: `${JJ}/2021/04/jubilee_juice_veggie_victory_menu_veggies_header_1600x500.webp`,
  deli: `${JJ}/2021/04/jubilee_Artisanal_Deli_Menu.webp`,
  sides: `${JJ}/2021/08/Jubilee-Juice-Side-Menu-650x350-1.webp`,
};

// ─── Per-item images ────────────────────────────────────────────────
// The real site has no per-item photos. We use a mix of the real
// category images and Unsplash for individual item cards so the grid
// doesn't show the same image for every item in a category.

export const itemImages: Record<string, string[]> = {
  burgers: [
    `${JJ}/2023/03/jubilee-juice-charred-steak.webp`,
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
  ],
  chicken: [
    `${JJ}/2021/04/JubileeChickenSandwichMenu.webp`,
    `${JJ}/2021/04/sandwich-1.webp`,
    'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop',
  ],
  smoothies: [
    `${JJ}/2021/04/jubilee_juice_fresh_fruit_smoothies.webp`,
    `${JJ}/2021/04/jubilee_header_image.webp`,
    `${JJ}/2021/04/smoothie_icon.webp`,
    'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop',
  ],
  salads: [
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
  ],
  veggie: [
    `${JJ}/2021/04/jubilee_juice_veggie_victory_menu_veggies_header_1600x500.webp`,
    'https://images.unsplash.com/photo-1543339308-d595c4975953?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
  ],
  seafood: [
    'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
  ],
  deli: [
    `${JJ}/2021/04/jubilee_Artisanal_Deli_Menu.webp`,
    'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop',
  ],
  sides: [
    `${JJ}/2021/08/Jubilee-Juice-Side-Menu-650x350-1.webp`,
    'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=300&fit=crop',
  ],
};

// ─── Site-wide images ───────────────────────────────────────────────

export const siteImages = {
  hero: `${JJ}/2021/04/jubilee_header_image.webp`,
  heroBanner: `${JJ}/2021/04/banner-1.webp`,
  storefront: `${JJ}/2021/04/Jubilee_Sign.webp`,
  storefrontCropped: `${JJ}/2021/04/Jubilee_Sign-1024x448.webp`,
  outdoorHeader: `${JJ}/2021/04/jubilee_juice_outdoor_logo_header_1600x500.webp`,
  foodBackground: `${JJ}/2021/04/food_background.webp`,
  foodBackgroundCropped: `${JJ}/2021/04/food_background-1024x356.webp`,
  westLoopHeader: `${JJ}/2021/07/west-loop-header-image-1600x517-1.webp`,
  titleBg: `${JJ}/2021/04/title-bg.webp`,
  burgerIcon: `${JJ}/2021/04/jubilee_juice_burger_icon.webp`,
  sandwichIcon: `${JJ}/2021/04/sandwich-1.webp`,
  smoothieIcon: `${JJ}/2021/04/smoothie_icon.webp`,
} as const;

// Helper: get an image for a menu item by category and index
export function getItemImage(categorySlug: string, itemIndex: number): string {
  const images = itemImages[categorySlug];
  if (!images || images.length === 0) {
    return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop';
  }
  return images[itemIndex % images.length];
}
