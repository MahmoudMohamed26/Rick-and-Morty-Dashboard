# Multiverse Explorer — Rick & Morty Dashboard

A responsive web application for exploring characters, episodes, and locations from the Rick and Morty universe.

## Live Demo

[View deployed app](https://rick-and-morty-dashboard-ten.vercel.app/)

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19
- **Language:** TypeScript (strict)
- **Data Fetching:** TanStack React Query + server-side `fetch` with Next.js caching
- **Styling:** Tailwind CSS v4 with `clsx` + `tailwind-merge` via `cn()` utility
- **UI Components:** shadcn/ui (v4, base-nova style) + TanStack React Table
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/MahmoudMohamed26/Rick-and-Morty-Dashboard
cd richandmorty-dashboard

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_RICK_AND_MORTY_API_URL` | Rick and Morty API base URL | `https://rickandmortyapi.com/api` |

## Architecture

### Router Choice: App Router

I chose the **App Router** over Pages Router for these reasons:

1. **Server Components** — List pages are async server components that fetch data directly, eliminating unnecessary client-side waterfalls. The server handles initial data fetching, and client components receive `initialData` for React Query hydration.
2. **Route Groups** — The `(dashboard)` group wraps all dashboard pages in a shared layout (sidebar + navbar) without affecting URL paths.
3. **Streaming & Suspense** — The architecture is ready for `loading.tsx` streaming skeletons.
4. **Next.js 16 async params** — The latest Next.js patterns (`params: Promise<{ id: string }>`) are used throughout.

### Component Architecture

```
src/
├── app/                          # Route segments (server components)
│   ├── (dashboard)/dashboard/    # Shared layout group
│   │   ├── characters/           # Character list + detail
│   │   ├── episodes/             # Episode list + detail
│   │   └── locations/            # Location list + detail
├── components/
│   ├── global/                   # Reusable app-specific components
│   │   ├── data-table.tsx        # Generic sortable/paginated table
│   │   ├── character-card.tsx    # Reusable character card
│   │   ├── info-row.tsx          # Info display row
│   │   └── rate-limit-banner.tsx # 429 error state
│   └── ui/                       # shadcn/ui primitives
├── hooks/                        # React Query hooks per entity
├── lib/
│   ├── apis/                     # Server-side fetch functions
│   ├── errors/                   # Custom ApiError class
│   ├── types/                    # TypeScript interfaces
│   └── utils/                    # Helpers (cn, extractIds)
└── config/                       # Navigation & page titles
```

### Data Flow

```
Server Component (page.tsx)
  → fetchCharacters() / fetchEpisodes() / fetchLocations()
  → passes initialData to Client Component
  → Client Component uses useCharacters() hook (React Query with initialData)
  → Subsequent navigation/refetches handled by React Query (5-min stale time)
```

### Error Handling

- **404 errors** — Return empty results (`[]`) gracefully
- **429 rate limits** — Display a `RateLimitBanner` component with a retry button
- Custom `ApiError` class carries the HTTP status code for precise error branching

### Caching

All server-side API calls use Next.js data cache with:
- `revalidate: 60` — ISR-style revalidation every 60 seconds
- `tags` — Entity-scoped cache tags (`characters`, `episodes`, `locations`, `character-{id}`, etc.)

## Features

### Core

- **Character Dashboard** — Sortable table with avatar, name, species, gender, and status
- **Pagination** — Server-side, URL-driven page controls
- **Filtering** — Name search, status dropdown, species dropdown (URL-synced via searchParams)
- **Character Detail** — Full profile with episodes list, origin, and location links
- **Episode & Location Pages** — Cross-entity linked detail views with related characters/episodes

### UX Details

- Dynamic status badges (green/red/gray for Alive/Dead/Unknown)
- Page title resolution from URL pathname
- Collapsible sidebar with icon mode
- `nextjs-toploader` for page transition progress
- Skeleton loading states for tables

## Trade-offs

| Decision | Trade-off |
|---|---|
| Table-only list views (no grid toggle) | Simpler implementation; table is better for the data-rich character/episode datasets |
| No infinite scroll | Pagination was chosen for simplicity and URL shareability |
| No GraphQL integration | REST was sufficient for the scope; GraphQL would add unnecessary complexity |
| No unit tests | Time constraint — testing infrastructure (Vitest + React Testing Library) is set up for future addition |
