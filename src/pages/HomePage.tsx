import { useSearchParams } from "react-router";
import WeatherSearch from "../features/weather/components/WeatherSearch";
import CurrentWeather from "../features/weather/components/CurrentWeather";
import ForecastList from "../features/weather/components/ForecastList";

const DEFAULT_CITY = "Yerevan";

export default function HomePage() {
  // The city is part of the URL: it survives a reload and the link can be shared.
  const [params, setParams] = useSearchParams();
  const city = params.get("city")?.trim() || DEFAULT_CITY;

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">Weather Forecast</h2>
        <p className="text-navy-400 sm:text-lg">Real-time conditions for any city worldwide</p>
      </div>

      <WeatherSearch key={city} initial={city} onSearch={(c) => setParams({ city: c })} />

      <div className="mt-8 space-y-10">
        <CurrentWeather city={city} />
        <ForecastList city={city} />
      </div>
    </>
  );
}
