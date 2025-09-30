# James Bayless — Portfolio Platform

A polished, animated portfolio experience for James Bayless with a secure control room for curating projects. Built on Next.js App Router with Prisma + SQLite, Tailwind CSS v4, Framer Motion, and NextAuth credential-based authentication.

## Features

- **Immersive landing experience** with animated hero, highlight metrics, and cinematic project cards.
- **Dynamic projects** sourced from Prisma (SQLite locally, Supabase-ready) and rendered with deep-dive case study pages.
- **Bayless Enterprises venture spotlight** section with dedicated color treatments for Bayless Enterprises, Koality CRM, and Canopy Land Solutions.
- **Curated GitHub showcase** managed via the admin panel so you can add imagery, colors, and descriptions for your favourite repos.
- **Authenticated admin control room** to create, update, reorder, and delete portfolio projects in real time.
- **Responsive design system** tuned for large displays down to mobile, using Tailwind v4 and custom gradients.
- **Framer Motion interactions** for subtle motion, blurred lighting effects, and scroll-triggered reveals.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env` and provide real values:

```
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="generate-a-secure-random-string"
ADMIN_EMAIL="you@example.com"
# Choose ONE of the following for authentication
# ADMIN_PASSWORD stores a plain text password for local/dev usage
ADMIN_PASSWORD="changeme"
# ADMIN_PASSWORD_HASH expects a bcrypt hash (takes precedence if provided)
# ADMIN_PASSWORD_HASH="$2a$10$..."
```

### 3. Database setup

Create the SQLite database and seed the starter projects:

```bash
npx prisma migrate dev
npx prisma db seed
```

### 4. Run the app

```bash
npm run dev
```

Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin/login` for the control room.

## Admin Control Room

- Uses NextAuth credentials provider; credentials are sourced from environment variables.
- Once authenticated, you can:
  - Publish new projects (auto-generates slugs from titles).
  - Edit existing content, tags, URLs, and featured ordering.
  - Delete projects with confirmation.
- API routes are guarded server-side; unauthenticated requests receive `401` responses.

## Tech Stack

- **Next.js 15** (App Router, TypeScript, React 19)
- **Tailwind CSS v4** with custom theming
- **Framer Motion** for animation
- **Prisma ORM** with SQLite (swapable to Postgres/Supabase)
- **NextAuth** credentials authentication
- **Lucide Icons** and custom UI components

## Switching to Supabase

SQLite keeps local development simple. To move to Supabase:

1. Create a Supabase project and copy the connection string.
2. Update `DATABASE_URL` with the Supabase connection.
3. Run `npx prisma migrate deploy` to apply migrations.
4. (Optional) Replace NextAuth credentials provider with Supabase Auth by wiring a new provider in `src/lib/auth.ts`.

## Deployment Notes

- Generate a strong `NEXTAUTH_SECRET` before deploying.
- Replace placeholder contact links (e.g., Calendly, email) with live destinations.
- Consider moving Prisma client generation back to the default `node_modules` output if you prefer smaller git diffs (update `prisma/schema.prisma`).
- Provide production-ready asset URLs for project imagery.

## Scripts

- `npm run dev` — start local dev server
- `npm run build` — generate production build
- `npm run start` — start production server
- `npm run lint` — lint the project with ESLint

## Content refresh

- Update the project cards via the control room at `/admin`
- Use the GitHub Highlights tab in the control room to add color-coded repo cards with custom imagery
- Re-run `npx prisma db seed` after editing `prisma/seed.ts` to sync defaults
- GitHub highlight cards are database-driven; update them anytime via the admin control room

Enjoy shipping signature work!
