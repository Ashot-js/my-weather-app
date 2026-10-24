import type { ForecastItem } from "../../../types/weather";

interface ForecastCardProps {
  item: ForecastItem;
  delay?: string;
}

export default function ForecastCard({ item, delay = "" }: ForecastCardProps) {
  const datePart = (item.dt_txt || "").split(" ")[0] || "";
  const [year, month, dayNum] = datePart.split("-").map(Number);
  const date = datePart
    ? new Date(year, (month || 1) - 1, dayNum || 1)
    : new Date(item.dt * 1000);
  const day = date.toLocaleDateString("en-US", { weekday: "short" });
  const monthDay = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className={`animate-slide-up ${delay} glass rounded-xl p-4 hover:scale-[1.04] hover:glow-accent hover:border-accent/30 transition-all duration-300 cursor-default`}
    >
      <p className="text-sm font-medium text-navy-300">{day}</p>
      <p className="text-xs text-navy-500">{monthDay}</p>
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
