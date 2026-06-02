# POGODA — Weather Forecast Website

Dark blue themed weather app built with React 19, TypeScript, Redux Toolkit, React Router 7, and Tailwind CSS 3.

---

## Prerequisites

| Tool | Version | How to check |
|------|---------|--------------|
| **Node.js** | v24+ | `node --version` |
| **npm** | v10+ | `npm --version` |
| **Firebase CLI** | latest | `firebase --version` |
| **OpenWeatherMap API Key** | free tier | Sign up below |

### 1. Install Node.js

Download from https://nodejs.org (LTS recommended). npm comes bundled.

### 2. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 3. Get an OpenWeatherMap API Key

1. Go to https://openweathermap.org
2. Click **Sign Up** and create a free account
3. After logging in, go to **API Keys** (https://home.openweathermap.org/api_keys)
4. Copy the default key or generate a new one
5. The free tier includes 60 calls/minute — more than enough for development

> **Note:** It may take up to 2 hours for a new API key to activate.

---

## Quick Start (Local Development)

```bash
# 1. Navigate to the project folder
cd pogoda

# 2. Install all dependencies
npm install

# 3. Create your environment file
cp .env.example .env

# 4. Edit .env — paste your OpenWeatherMap API key
#    VITE_WEATHER_API_KEY=paste_your_key_here

# 5. Start the dev server
npm run dev
```

Opens at **http://localhost:5173**

---

## Build for Production

```bash
npm run build
```

This runs TypeScript type-checking (`tsc -b`) then produces an optimized build in the `dist/` folder.

---

## Deploy to Firebase

### One-time setup

```bash
# Login to Firebase (opens browser)
firebase login

# If you haven't created a Firebase project yet:
#   1. Go to https://console.firebase.google.com
#   2. Click "Add project" and follow the steps
#   3. Enable Firebase Hosting in the project

# Edit .firebaserc with your project ID:
#   "default": "your-firebase-project-id"
```

### Deploy

```bash
# Build + deploy in one command
npm run build && firebase deploy
```

Firebase will give you a public URL (e.g., `https://your-project-id.web.app`).

### Redeploy after changes

```bash
npm run build && firebase deploy
```

---

## Project Structure

```
pogoda/
├── public/                          # Static assets (optional)
├── src/
│   ├── app/
│   │   ├── store.ts                 # Redux store (RTK Query + weather slice)
│   │   └── hooks.ts                 # Typed useAppDispatch / useAppSelector
│   ├── features/
│   │   └── weather/
│   │       ├── weatherAPI.ts        # RTK Query endpoints (OpenWeatherMap)
│   │       ├── weatherSlice.ts      # UI state: selected city
│   │       └── components/
│   │           ├── WeatherSearch.tsx  # City search form
│   │           ├── CurrentWeather.tsx # Current conditions display
│   │           ├── ForecastCard.tsx   # Single forecast time-slot card
│   │           └── ForecastList.tsx   # 5-day forecast grid
│   ├── components/
│   │   ├── Layout.tsx               # Page shell (Header + Outlet + Footer)
│   │   └── Header.tsx               # App title / logo bar
│   ├── pages/
│   │   ├── HomePage.tsx             # Search + current weather + forecast
│   │   └── ForecastPage.tsx         # Detailed forecast by city
│   ├── lib/
│   │   └── errorUtils.ts            # RTK Query error message extractor
│   ├── types/
│   │   └── weather.ts               # TypeScript interfaces for API responses
│   ├── App.tsx                      # Root: Provider + BrowserRouter + Routes
│   ├── main.tsx                     # Entry point
│   ├── index.css                    # Tailwind directives + dark blue base styles
│   └── vite-env.d.ts                # Vite env type declarations
├── index.html                       # Vite HTML entry
├── package.json                     # Dependencies and scripts
├── vite.config.ts                   # Vite configuration
├── tsconfig.json                    # TypeScript configuration
├── tailwind.config.js               # Tailwind theme (navy / accent colors)
├── postcss.config.js                # PostCSS plugins
├── .firebaserc                      # Firebase project alias
├── firebase.json                    # Firebase Hosting config (serves dist/)
├── .gitignore
├── .env.example                     # Template for API key
└── SETUP.md                         # This file
```

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| UI | React | 19.2 |
| Language | TypeScript | 5.9 |
| Build | Vite | 7.2 |
| State | Redux Toolkit + RTK Query | 2.11 |
| Routing | React Router | 7.12 |
| Styling | Tailwind CSS | 3.4 |
| Icons | Lucide React | 0.563 |
| API | OpenWeatherMap (free tier) | 2.5 |
| Hosting | Firebase Hosting | — |

---

## Color Theme

The dark blue palette is defined in `tailwind.config.js`:

| Token | Hex | Usage |
|-------|-----|-------|
| `navy-950` | `#0a0f1e` | Page background |
| `navy-900` | `#0d1b2a` | Header background |
| `navy-800` | `#0f2744` | Card backgrounds |
| `navy-700` | `#132f5e` | Borders |
| `navy-600` | `#1a3a6b` | Hover states |
| `accent` | `#60a5fa` | Buttons, highlights |

---

## Troubleshooting

### "Invalid API key" error

- Make sure you copied the key correctly into `.env`
- The key starts with `VITE_WEATHER_API_KEY=` (no spaces around `=`)
- New API keys can take up to 2 hours to activate
- Restart the dev server after changing `.env`

### "City not found"

- Try the English name: "Moscow" not "Москва"
- For cities with common names, add the country code: "London,GB"

### `npm run build` fails with TypeScript errors

- Run `npm install` again to ensure all `@types` packages are installed
- Delete `node_modules` and `package-lock.json`, then `npm install`

### Firebase deploy fails

- Run `firebase login` to authenticate
- Make sure `.firebaserc` has your real Firebase project ID (not the placeholder)
- Run `firebase projects:list` to see your available projects
