import { useAppSelector } from "../../../app/hooks";
import { useGetForecastQuery } from "../weatherAPI";
import { getDailyForecast } from "../forecastUtils";
import ForecastCard from "./ForecastCard";

const DELAYS = ["stagger-1", "stagger-2", "stagger-3", "stagger-4", "stagger-5"];

export default function ForecastList() {
  const city = useAppSelector((state) => state.weather.selectedCity);
  const { data, isLoading, isError } = useGetForecastQuery(city, {
    skip: !city,
  });

  if (!city || isLoading || isError || !data) return null;

  // One representative entry per upcoming day (5-day view)
  const dailyForecasts = getDailyForecast(data.list);

  return (
    <section className="mt-10">
      <h3 className="animate-fade-in text-xl font-semibold mb-5 flex items-center gap-2">
        <span className="w-1 h-5 bg-accent rounded-full" />
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {dailyForecasts.map((item, i) => (
          <ForecastCard key={item.dt} item={item} delay={DELAYS[i]} />
        ))}
      </div>
    </section>
  );
}
