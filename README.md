# Jubilee Juice & Grill

Full-stack restaurant ordering system for [Jubilee Juice & Grill](https://jubileejuice.com) in Chicago's West Loop. Built with Next.js 16, React 19, PostgreSQL, and Tailwind CSS.

**Live demo:** [aswin-ram-k.github.io/jubilee-juice-next](https://aswin-ram-k.github.io/jubilee-juice-next/)

## Features

- **Menu showcase** — Browse signature dishes and category highlights
- **Online ordering** — Add items to cart, adjust quantities, checkout
- **Admin dashboard** — Manage menu items, view orders, update settings
- **Dark mode** — System-aware with manual toggle, persists across sessions
- **Responsive** — Mobile-first design with 44px touch targets
- **Accessibility** — Semantic HTML, keyboard navigation, WCAG contrast ratios

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript 5 |
| Styling | Tailwind CSS 4 |
| State | Zustand (localStorage persist) |
| Database | PostgreSQL 16 + Prisma 6 |
| Auth | Auth.js v5 (planned) |
| Payments | Stripe (test mode stub) |
| Container | Docker + Docker Compose |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages (static) / Docker (server) |

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+
- PostgreSQL 16+ (or use Docker)

### Setup

```bash
# Clone
git clone https://github.com/Aswin-Ram-K/jubilee-juice-next.git
cd jubilee-juice-next

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your database credentials

# Generate Prisma client
pnpm exec prisma generate

# Start dev server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

### With Docker

```bash
# Start all services (app + Postgres + pgAdmin)
docker compose up -d

# Run migrations
docker compose exec app pnpm exec prisma migrate dev

# Seed database
docker compose exec app pnpm exec prisma db seed
```

- App: http://localhost:3000
- pgAdmin: http://localhost:5050

### Database

```bash
pnpm db:migrate    # Run migrations
pnpm db:seed       # Seed menu data (72+ items)
pnpm db:studio     # Open Prisma Studio
```

## Project Structure

```
src/
├── app/
│   ├── (marketing)/     # Static pages: home, menu, about, contact
│   ├── (ordering)/      # Interactive: order, checkout (cart context)
│   ├── admin/           # Dashboard, menu CRUD, orders, settings
│   └── api/             # Health check endpoint
├── components/          # React components by feature
├── stores/              # Zustand stores (cart, theme, drawers)
├── data/                # Static data (menu, site config, images)
├── lib/                 # Prisma client singleton
└── types/               # TypeScript type definitions
```

## Deployment

**Static (GitHub Pages):**
```bash
NEXT_OUTPUT=export pnpm build
# Output in ./out/ — deploy with peaceiris/actions-gh-pages
```

**Server (Docker/Vercel):**
```bash
pnpm build    # Standalone output
pnpm start    # Start server on port 3000
```

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build (standalone) |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript compiler check |
| `pnpm test` | Run unit tests (Vitest) |
| `pnpm test:e2e` | Run E2E tests (Playwright) |
| `pnpm db:migrate` | Run Prisma migrations |
| `pnpm db:seed` | Seed database with menu data |

## License

Private project.
