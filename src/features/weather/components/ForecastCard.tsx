import type { DailyForecast } from "../../../types/weather";
import { iconUrl } from "../weatherAPI";

interface Props {
  day: DailyForecast;
  isToday: boolean;
  index: number;
}

export default function ForecastCard({ day, isToday, index }: Props) {
  // The date is the city's calendar day; format it as such, independent of the viewer's zone.
  const date = new Date(`${day.date}T12:00:00Z`);
  const weekday = isToday ? "Today" : date.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
  const monthDay = date.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

  return (
    <li
      className="glass animate-slide-up rounded-xl p-4 transition hover:border-accent/30"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <p className="text-sm font-medium text-navy-300">{weekday}</p>
      <p className="text-xs text-navy-400">{monthDay}</p>
      <img src={iconUrl(day.weather.icon)} alt="" className="my-1 size-12" />
      <p className="text-xl font-semibold">
        {Math.round(day.max)}°<span className="ml-1.5 text-base font-normal text-navy-400">{Math.round(day.min)}°</span>
      </p>
      <p className="truncate text-xs text-navy-400 capitalize">{day.weather.description}</p>
      <p className="mt-2 flex flex-wrap gap-x-3 border-t border-navy-700/40 pt-2 text-xs text-navy-400">
        <span>💧 {day.humidity}%</span>
        <span>💨 {day.wind.toFixed(1)} m/s</span>
      </p>
    </li>
  );
}
