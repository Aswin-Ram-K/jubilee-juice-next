@AGENTS.md

# Jubilee Juice & Grill — Next.js Full-Stack

## Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript 5)
- **Styling:** Tailwind CSS v4 (`@theme` directive)
- **State:** Zustand with localStorage persist (cart, theme, drawers)
- **Database:** PostgreSQL 16 + Prisma 6 (10 tables, seed with 72+ menu items)
- **Auth:** Auth.js v5 (planned, not yet installed)
- **Payments:** Stripe test mode (stubs only)
- **Container:** Docker multi-stage + Docker Compose (app + Postgres + pgAdmin)
- **CI/CD:** GitHub Actions (lint, typecheck, test, Docker build, Pages deploy)
- **Hosting:** GitHub Pages (static export) at aswin-ram-k.github.io/jubilee-juice-next/

## Architecture
- `(marketing)/` route group: homepage, menu showcase, about, contact (no cart context)
- `(ordering)/` route group: /order, /checkout (cart context)
- `admin/` protected routes: dashboard, menu CRUD, orders, settings, login
- Dual output: `NEXT_OUTPUT=export` for GitHub Pages, default `standalone` for Docker
- Dark mode default via CSS variable swap on `html.dark` class
- Dynamic header: white text over dark heroes, transitions to dark on scroll
- Header blurs when CartDrawer is open
- OrderPortal modal for 3 ordering options (Direct, UberEats, DoorDash)
- CartDrawer global (in SiteShell, works on all pages)

## Design System
- **Colors:** cream (#FAF7F2), charcoal (#1A1A1A), orange (#E8722A), sage (#7A9E7E), sand (#E8DDD3), espresso (#2C2420)
- **Dark mode:** cream→#121212, charcoal→#F5F5F5, orange→#F09040, sand→#2A2420, espresso→#0A0A0A
- **Fonts:** Satoshi (headings, Fontshare), DM Sans (body, Google Fonts)
- **Animations:** card-hover, img-zoom, hover-lift, cta-pulse, float-slow, stagger-children, text-reveal
- **Touch targets:** minimum 44px on all interactive elements

## Key Files
- `src/data/menu.ts` — 72+ menu items across 8 categories
- `src/data/images.ts` — Centralized image map (real JJ photos + Unsplash fallbacks)
- `src/stores/cart.ts` — Zustand cart with persist
- `src/stores/theme.ts` — Dark/light mode with system preference detection
- `prisma/schema.prisma` — 10-table schema (Category, MenuItem, Order, Payment, Customer, User, SiteConfig, etc.)
- `prisma/seed.ts` — Seeds all menu data + admin user
