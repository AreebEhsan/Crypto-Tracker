# Nova Crypto Desk

Modern React + Vite dashboard for tracking crypto markets with Mantine UI, Recharts charts, and TanStack Query data fetching.

![Screenshot placeholder](https://dummyimage.com/1280x720/0f172a/ffffff&text=Add+screenshot)

## Features
- Market overview with top coins, watchlist toggle, and movers
- Detail view with price history chart, metadata, and quick website link
- Market news feed (CryptoCompare)
- Theme toggle, responsive layout, and client-side routing

## Tech stack
- Vite 5, React 18, React Router 6
- Mantine 8 (UI), Recharts (charts)
- TanStack Query 5 for data caching/fetching
- CryptoCompare REST API

## Requirements
- Node 20.x (enforced via `package.json` engines)
- npm (lockfile: `package-lock.json`)
- CryptoCompare API key

## Quick start
```bash
npm install
npm run dev
```
The app runs at http://localhost:5173 by default.

## Environment variables
Create a `.env` file (not committed) with:
```
VITE_APP_API_KEY=your_cryptocompare_api_key
```
`VITE_` prefix means this value is bundled to the client—treat it as public. For stronger secrecy, proxy requests through a backend.

## Scripts
- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

## Deployment (Vercel)
- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- Set environment variable `VITE_APP_API_KEY`
- Node version: 20.x (respects `engines.node`)

## Project structure
```
src/
  api/          // CryptoCompare API helpers
  Components/   // UI components (capitalized; case-sensitive in prod)
  hooks/        // React Query hooks & watchlist
  routes/       // Route components
  utils/        // Formatting helpers
  main.jsx      // App entry with routing + providers
  App.jsx       // Home dashboard
```

## Notes
- Case-sensitive imports matter in deployment (folder is `Components`, not `components`).
- Bundles are currently large; consider code-splitting if size warnings become an issue.
