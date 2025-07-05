# Crypto-Tracker — Cryptocurrency Tracker & Converter

**crypto-tracker** is a mobile-first, responsive cryptocurrency tracking and conversion app. It provides live market data using the [CoinMarketCap API](https://coinmarketcap.com/api/), including price movements, trends, and real-time crypto-to-crypto conversions.

---

## Tech Stack

| Layer         | Tech Used                            | Purpose                       |
| ------------- | ------------------------------------ | ----------------------------- |
| Frontend      | Next.js (App Router) + TailwindCSS   | SPA UI & routing              |
| API Layer     | Next.js API Routes (Proxy Layer)     | Secures CoinMarketCap API key |
| Data Fetching | `fetch`                              | Realtime updates              |
| State Mgmt    | Local `useState` + controlled inputs | Lightweight for current scope |
| UI Libraries  | TanStack Table, Lucide React         | Table rendering & icons       |
| Animation     | CSS transitions + loading spinner    | Smooth UX                     |
| Notifications | `react-hot-toast`                    | Error/success toasts          |

---

## Why This Architecture?

- **Next.js App Router**: Simplifies routing, layouts, and API route co-location. Great for performance and future SSR.
- **API Proxy (Backend for Frontend)**: Prevents API key exposure on the client side and enables centralized error handling and caching logic.
- **Modular Design**: Components are reusable, small in scope, and easy to test/maintain.
- **Mobile-first + TailwindCSS**: Guarantees responsiveness from the start.
- **Minimal Dependencies**: Keeps the bundle small, aiding performance and maintainability.

---

## Features

### Homepage

- Real-time list of top cryptocurrencies
- Displays:
  - Coin name & symbol
  - Coin logo
  - Current market price
  - 24-hour and 7-day percentage change (with color coding)
- Pagination support
- Skeleton loader animation while data loads

### Crypto Converter

- Convert one cryptocurrency to another
- Fetches live conversion rate from CoinMarketCap
- Error handling for empty or invalid inputs

---

## 🧱 Architecture Overview

The app follows a clean, modular structure using **Next.js App Router** with API routes for secure backend proxying.

### Key Decisions:

- **API Key Security**: CoinMarketCap API is accessed via serverless API routes in `/app/api/` to prevent exposing the key.
- **Performance**: Mobile-first design with Tailwind ensures speed and responsiveness.
- **Scalability**: Component-driven UI with reusable logic and clear state management.
- **Maintainability**: Logic is separated into hooks, utils, and components for clean and extendable code.

---

## Animations

- **CSS-based skeleton loader** for table loading
- Hover transitions for table rows and converter form
- Toast notifications for errors and conversions

---

## Deployment

Deploy easily using [Vercel](https://vercel.com/):

1. Push your code to GitHub
2. Import repo in Vercel
3. Add your environment variable:

```
NEXT_PUBLIC_CMC_BASE_URL = BASE_URL
NEXT_PUBLIC_CMC_API_KEY = YOUR_API_KEY
```

4. Click **Deploy**

---

## Documentation Files

- [`setup.md`](./setup.md) — Step-by-step local & deployment setup
- [`assumptions.md`](./assumptions.md) — Project assumptions
- [`todo.md`](./todo.md) — Pending improvements

---

## Acknowledgements

- [CoinMarketCap API](https://coinmarketcap.com/api/)
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [TanStack Table](https://tanstack.com/table)
- [React Hot Toast](https://react-hot-toast.com/)

---
