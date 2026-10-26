import type { DailyForecast, ForecastItem } from "../../types/weather";

/**
 * Turns the 3-hour forecast into one entry per day in the city's own time zone:
 * the day's real high and low, plus the conditions closest to local midday.
 * Today is included, so the free 5-day forecast really shows 5 days.
 */
export function getDailyForecast(list: ForecastItem[], timezoneOffset: number, days = 5): DailyForecast[] {
  const byDay = new Map<string, { item: ForecastItem; hour: number }[]>();
  for (const item of list) {
    const local = new Date((item.dt + timezoneOffset) * 1000); // read with getUTC* = city time
    const date = local.toISOString().slice(0, 10);
    byDay.set(date, [...(byDay.get(date) ?? []), { item, hour: local.getUTCHours() }]);
  }

  return [...byDay.entries()].slice(0, days).map(([date, slots]) => {
    const midday = slots.reduce((best, s) => (Math.abs(s.hour - 13) < Math.abs(best.hour - 13) ? s : best)).item;
    return {
      date,
      min: Math.min(...slots.map((s) => s.item.main.temp_min)),
      max: Math.max(...slots.map((s) => s.item.main.temp_max)),
      weather: midday.weather[0],
      humidity: midday.main.humidity,
      wind: midday.wind.speed,
    };
  });
}
