import {
  Cloud,
  Droplets,
  Wind,
  Thermometer,
  Eye,
  Gauge,
  MapPin,
} from "lucide-react";
import { useAppSelector } from "../../../app/hooks";
import { useGetCurrentWeatherQuery } from "../weatherAPI";
import { getErrorMessage } from "../../../lib/errorUtils";

export default function CurrentWeather() {
  const city = useAppSelector((state) => state.weather.selectedCity);
  const { data, isLoading, isError, error } = useGetCurrentWeatherQuery(city, {
    skip: !city,
  });

  if (!city) {
    return (
      <div className="animate-fade-in text-center py-20 text-navy-400">
        <Cloud size={72} className="mx-auto mb-5 opacity-40" />
        <p className="text-xl font-light">
          Search for a city to see current weather
        </p>
        <p className="text-sm mt-2 text-navy-500">
          Try "London", "Tokyo", or "New York"
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="animate-fade-in text-center py-20">
        <div className="spinner" />
        <p className="mt-5 text-navy-400 text-lg">
          Loading weather data…
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="animate-fade-in text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4">
          <Cloud size={32} className="text-red-400" />
        </div>
        <p className="text-xl text-red-400 font-medium">
          Failed to load weather data
        </p>
        <p className="text-sm mt-2 text-navy-400 max-w-md mx-auto">
          {getErrorMessage(error) ||
            "Check the city name and verify your API key in .env"}
        </p>
      </div>
    );
  }

  if (!data) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

  return (
    <div className="animate-slide-up glass-strong glow-md rounded-2xl p-8">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin size={18} className="text-accent" />
            <h2 className="text-3xl font-bold">{data.name}</h2>
          </div>
          <p className="text-navy-400 text-sm ml-7">{data.sys.country}</p>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={iconUrl}
            alt={data.weather[0].description}
            className="w-24 h-24 -my-3 drop-shadow-lg"
          />
          <div>
            <p className="text-sm text-navy-400 capitalize">
              {data.weather[0].description}
            </p>
          </div>
        </div>
      </div>

      {/* Temperature */}
      <div className="mb-8">
        <span className="text-8xl font-thin tracking-tighter text-gradient">
          {Math.round(data.main.temp)}
        </span>
        <span className="text-4xl font-thin text-navy-400 ml-1">°C</span>
      </div>

      {/* Detail grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <DetailCard
          icon={<Thermometer size={18} />}
          label="Feels Like"
          value={`${Math.round(data.main.feels_like)}°C`}
          delay="stagger-1"
        />
        <DetailCard
          icon={<Droplets size={18} />}
          label="Humidity"
          value={`${data.main.humidity}%`}
          delay="stagger-2"
        />
        <DetailCard
          icon={<Wind size={18} />}
          label="Wind"
          value={`${data.wind.speed} m/s`}
          delay="stagger-3"
        />
        <DetailCard
          icon={<Eye size={18} />}
          label="Visibility"
          value={`${(data.visibility / 1000).toFixed(1)} km`}
          delay="stagger-4"
        />
        <DetailCard
          icon={<Gauge size={18} />}
          label="Pressure"
          value={`${data.main.pressure} hPa`}
          delay="stagger-5"
        />
        <DetailCard
          icon={<Cloud size={18} />}
          label="Cloudiness"
          value={`${data.clouds.all}%`}
          delay="stagger-1"
        />
      </div>
    </div>
  );
}

function DetailCard({
  icon,
  label,
  value,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delay: string;
}) {
  return (
    <div
      className={`animate-slide-up ${delay} glass rounded-xl p-4 hover:glow-accent hover:border-accent/20 transition-all duration-300`}
    >
      <div className="flex items-center gap-2 text-navy-400 mb-2">
        {icon}
        <span className="text-xs uppercase tracking-wider font-medium">
          {label}
        </span>
      </div>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
