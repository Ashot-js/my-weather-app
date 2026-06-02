import { useAppSelector } from "../../../app/hooks";
import { useGetForecastQuery } from "../weatherAPI";
import ForecastCard from "./ForecastCard";

export default function ForecastList() {
  const city = useAppSelector((state) => state.weather.selectedCity);
  const { data, isLoading, isError } = useGetForecastQuery(city, {
    skip: !city,
  });

  if (!city || isLoading || isError || !data) return null;

  // Take one forecast per day (every 8th entry = 24h) for a 5-day view
  const dailyForecasts = data.list
    .filter((_, index) => index % 8 === 0)
    .slice(0, 5);

  return (
    <section className="mt-10">
      <h3 className="text-xl font-semibold mb-5 flex items-center gap-2">
        <span className="w-1 h-5 bg-accent rounded-full" />
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {dailyForecasts.map((item) => (
          <ForecastCard key={item.dt} item={item} />
        ))}
      </div>
    </section>
  );
}
