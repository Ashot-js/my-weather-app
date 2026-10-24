import type { ForecastItem } from "../../types/weather";

/**
 * Turn the raw 3-hour forecast list into one representative entry per day,
 * skipping today so the result is a clean upcoming-days forecast.
 * Prefers the 15:00 (then 12:00) slot as the daily snapshot.
 */
export function getDailyForecast(list: ForecastItem[], days = 5): ForecastItem[] {
  if (!list.length) return [];

  const byDay = new Map<string, ForecastItem[]>();
  for (const item of list) {
    const date = (item.dt_txt || "").split(" ")[0];
    if (!date) continue;
    const bucket = byDay.get(date) ?? [];
    bucket.push(item);
    byDay.set(date, bucket);
  }

  const dates = Array.from(byDay.keys()).sort();
  // The first date is today — the forecast should show upcoming days only.
  const upcoming = dates.slice(1, 1 + days);

  return upcoming
    .map((date) => {
      const items = byDay.get(date) ?? [];
      return (
        items.find((i) => (i.dt_txt || "").includes("15:00:00")) ??
        items.find((i) => (i.dt_txt || "").includes("12:00:00")) ??
        items[0]
      );
    })
    .filter((item): item is ForecastItem => Boolean(item));
}
