# Weather — Forecast

Current weather and a 5-day forecast for any city. The city is kept in the URL
(`/?city=Tokyo`), so a reload keeps it and links can be shared.

**Live:** https://pogoda-weather-app.web.app

**Stack:** React 19, TypeScript, Redux Toolkit (RTK Query), React Router 7, Tailwind CSS 4, Vite — Firebase Hosting.
Data: OpenWeatherMap free API (`/weather` and the 3-hour `/forecast`, grouped into days in the city's own time zone).

## Run locally

```bash
npm install
cp .env.example .env    # VITE_WEATHER_API_KEY=<free key from home.openweathermap.org/api_keys>
npm run dev             # http://localhost:5173
```

The key ends up in the browser bundle — normal for a static site; use a free key with no billing.

## Check and deploy

```bash
npm run lint
npm run build
npx firebase deploy --only hosting
```
