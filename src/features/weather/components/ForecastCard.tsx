import type { ForecastItem } from "../../../types/weather";

interface ForecastCardProps {
  item: ForecastItem;
}

export default function ForecastCard({ item }: ForecastCardProps) {
  const date = new Date(item.dt * 1000);
  const day = date.toLocaleDateString("en-US", { weekday: "short" });
  const monthDay = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="bg-navy-800/40 rounded-xl p-4 border border-navy-700/30 hover:border-navy-600/50 hover:bg-navy-800/60 transition-all">
      <p className="text-sm font-medium text-navy-300">{day}</p>
      <p className="text-xs text-navy-500">
        {monthDay} · {time}
      </p>
      <img
        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
        alt={item.weather[0].description}
        className="w-12 h-12 my-1"
      />
      <p className="text-xl font-semibold">{Math.round(item.main.temp)}°C</p>
      <p className="text-xs text-navy-400 capitalize truncate">
        {item.weather[0].description}
      </p>
      <div className="flex items-center gap-3 mt-2 pt-2 border-t border-navy-700/30 text-xs text-navy-400">
        <span>💧 {item.main.humidity}%</span>
        <span>💨 {item.wind.speed}m/s</span>
      </div>
    </div>
  );
}
