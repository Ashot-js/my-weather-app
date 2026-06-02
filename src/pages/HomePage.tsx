import WeatherSearch from "../features/weather/components/WeatherSearch";
import CurrentWeather from "../features/weather/components/CurrentWeather";
import ForecastList from "../features/weather/components/ForecastList";

export default function HomePage() {
  return (
    <div>
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold mb-2 tracking-tight">
          Weather Forecast
        </h2>
        <p className="text-navy-400 text-lg">
          Real-time conditions for any city worldwide
        </p>
      </div>

      <WeatherSearch />

      <div className="mt-8">
        <CurrentWeather />
        <ForecastList />
      </div>
    </div>
  );
}
