import type { ReactNode } from "react";
import { Cloud, Droplets, Wind, Thermometer, Eye, Gauge, MapPin } from "lucide-react";
import { iconUrl, useGetCurrentWeatherQuery, weatherErrorText } from "../weatherAPI";
import Spinner from "../../../components/Spinner";

export default function CurrentWeather({ city }: { city: string }) {
  const { data, isFetching, isError, error } = useGetCurrentWeatherQuery(city);

  if (isFetching && !data) return <Spinner label="Loading weather…" />;

  if (isError) {
    return (
      <div role="alert" className="py-12 text-center">
        <div className="mb-4 inline-flex size-16 items-center justify-center rounded-full bg-red-500/10">
          <Cloud size={32} className="text-red-400" />
        </div>
        <p className="text-xl font-medium text-red-400">No weather for “{city}”</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-navy-400">{weatherErrorText(error)}</p>
      </div>
    );
  }

  if (!data) return null;
  const condition = data.weather[0];

  return (
    <section className={`glass animate-slide-up rounded-2xl p-5 shadow-[0_0_30px_rgb(96_165_250/0.12)] transition-opacity sm:p-8 ${isFetching ? "opacity-60" : ""}`}>
      <div className="mb-6 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
            <MapPin size={20} className="shrink-0 text-accent" aria-hidden />
            <span className="truncate">{data.name}</span>
          </h2>
          <p className="ml-7 text-sm text-navy-400">{data.sys.country}</p>
        </div>
        <div className="flex shrink-0 flex-col items-center">
          <img src={iconUrl(condition.icon, "4x")} alt="" className="-my-3 size-20 drop-shadow-lg sm:size-24" />
          <p className="text-sm text-navy-300 capitalize">{condition.description}</p>
        </div>
      </div>

      <p className="mb-6">
        <span className="bg-gradient-to-br from-accent to-accent-hover bg-clip-text text-7xl font-thin tracking-tighter text-transparent sm:text-8xl">
          {Math.round(data.main.temp)}
        </span>
        <span className="ml-1 text-3xl font-thin text-navy-400 sm:text-4xl">°C</span>
      </p>

      <dl className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <Detail icon={<Thermometer size={18} />} label="Feels like" value={`${Math.round(data.main.feels_like)}°C`} />
        <Detail icon={<Droplets size={18} />} label="Humidity" value={`${data.main.humidity}%`} />
        <Detail icon={<Wind size={18} />} label="Wind" value={`${data.wind.speed.toFixed(1)} m/s`} />
        <Detail icon={<Eye size={18} />} label="Visibility" value={`${(data.visibility / 1000).toFixed(1)} km`} />
        <Detail icon={<Gauge size={18} />} label="Pressure" value={`${data.main.pressure} hPa`} />
        <Detail icon={<Cloud size={18} />} label="Clouds" value={`${data.clouds.all}%`} />
      </dl>
    </section>
  );
}

function Detail({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-4">
      <dt className="mb-2 flex items-center gap-2 text-xs font-medium tracking-wider text-navy-400 uppercase">
        {icon}
        {label}
      </dt>
      <dd className="text-lg font-semibold">{value}</dd>
    </div>
  );
}
