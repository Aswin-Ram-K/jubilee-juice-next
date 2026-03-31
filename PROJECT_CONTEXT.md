# Project Context — Jubilee Juice & Grill (Next.js)

## What This Is
Full-stack restaurant website for Jubilee Juice & Grill, a real restaurant at 140 N Halsted St, Chicago's West Loop, operating since 1999. Migrated from an Astro 6 static site to Next.js 16 full-stack.

## Migration Decision: Astro → Next.js

**What was decided:** Complete rewrite from Astro 6 (static, vanilla JS) to Next.js 16 (App Router, React 19, PostgreSQL, Docker).

**Why:** The original Astro site was a beautiful static frontend but had no backend, no database, no auth, no payment processing. To build a production ordering system, the project needed a full-stack framework. Next.js 16 with App Router was chosen as the 2026 industry standard for React full-stack — validated by three specialist agents (architecture, database, DevOps).

**Alternatives considered:**
| Option | Pros | Cons |
|--------|------|------|
| Astro + separate Node API | Keep existing frontend | Two services, more complexity |
| Astro + Supabase serverless | Simplest | Vendor lock-in to Supabase |
| Next.js full-stack (chosen) | Single codebase, industry standard | Full rewrite needed |

## Dual Output Architecture

**What was decided:** The site supports two build modes via `NEXT_OUTPUT` env var — `standalone` for Docker/server and `export` for GitHub Pages static hosting.

**Why:** No client is signed on yet, so the site needs to be demonstrable via GitHub Pages (free, no server). But the architecture must be ready for production deployment with real ordering when a client signs. The dual-mode config (`next.config.ts` line 27) switches output, basePath, and image optimization based on the env var. The deploy-pages.yml workflow removes API routes before static export since they're incompatible.

## Dark Mode as Default

**What was decided:** Dark mode is the default theme. Light mode is the alternate, toggled via a sun/moon icon in the header.

**Why:** The user preferred dark mode as the primary experience. The implementation uses CSS variable swapping on `html.dark` — the `@theme` tokens in globals.css are overridden in a `html.dark {}` block, so all 40+ components automatically flip without individual `dark:` prefixes. An inline script in `<head>` prevents FOUC by applying `.dark` before first paint.

## Menu/Ordering Separation

**What was decided:** `/menu` is a read-only showcase highlighting signatures and categories. `/order` is the interactive ordering page with add-to-cart. The header "Order Now" opens a modal portal with 3 options.

**Why:** Menu browsing and ordering are different intents. Casual browsers shouldn't feel pressured by cart buttons. The Order Portal modal routes users to their preferred ordering method (direct, UberEats, DoorDash).

## Database Schema (10 tables)

**What was decided:** PostgreSQL with Prisma ORM. All money stored as integer cents. Order items snapshot name and price at time of order. Separate Payment table from Order. Immutable OrderStatusLog audit trail.

**Why:** Restaurant menus change prices frequently — snapshotting prevents historical order corruption. Separate Payment enables partial refunds and retry tracking. The audit log was flagged by the data engineer agent as critical for dispute resolution. Integer cents matches Stripe's internal representation.

## Real Images + Unsplash Fallbacks

**What was decided:** Real photos from jubileejuice.com are used for category-level images and the hero. Unsplash fills individual item cards since the real site has no per-item photos.

**Why:** Scraped 26 images from the live site via Chrome DevTools MCP. The site only has category banners and branding photos, not individual dish photography. The centralized `src/data/images.ts` maps real images first per category, with Unsplash providing variety so grids don't show the same image for every item.

## Current State (2026-03-31)
- 13 routes building clean, deployed to GitHub Pages
- Dark mode default, light mode alternate
- Cart drawer works globally on all pages
- Admin panel functional with mock data (no DB connected)
- Docker Compose ready with env var credentials (not hardcoded)
- CI pipeline: lint → typecheck → test → Docker build
- Industry compliance audit completed (security headers, CSP, credential management)
