# Setup Guide for crypto-tracker

Welcome to the **crypto-tracker** — a mobile-first, responsive cryptocurrency tracker and converter. It provides live coin prices, 24h and 7d trends, and conversion features using the [CoinMarketCap API](https://coinmarketcap.com/api/).

---

## Prerequisites

Before you begin, make sure the following are installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)
- [Git](https://git-scm.com/)
- [CoinMarketCap API Key](https://coinmarketcap.com/api/)

---

## Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/kumarshivu-dev/crypto-tracker
cd crypto-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file at the root of your project:

```env
NEXT_PUBLIC_CMC_BASE_URL = BASE_URL
NEXT_PUBLIC_CMC_API_KEY = YOUR_API_KEY
```

### 4. Run the Development Server

```bash
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000) to see the app.

---

## API Proxy Layer

All external CoinMarketCap API requests are routed through custom backend proxy endpoints:

This proxy setup:

- Keeps your API key private
- Prevent CORS Error

---

## 📦 Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm start
```

---

## Deployment on Vercel

1. Push your repo to GitHub
2. Visit [https://vercel.com](https://vercel.com/)
3. Import your GitHub project
4. Add this environment variable:

```
NEXT_PUBLIC_CMC_BASE_URL = BASE_URL
NEXT_PUBLIC_CMC_API_KEY = YOUR_API_KEY
```

5. Click **Deploy**

---
