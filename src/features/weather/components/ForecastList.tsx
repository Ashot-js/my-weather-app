import { useGetForecastQuery } from "../weatherAPI";
import { getDailyForecast } from "../forecastUtils";
import ForecastCard from "./ForecastCard";

export default function ForecastList({ city }: { city: string }) {
  const { data, isError } = useGetForecastQuery(city);
  if (isError || !data) return null; // CurrentWeather already shows loading and errors

  const days = getDailyForecast(data.list, data.city.timezone);

  return (
    <section>
      <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold">
        <span className="h-5 w-1 rounded-full bg-accent" />
        {days.length}-Day Forecast
      </h3>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {days.map((day, i) => (
          <ForecastCard key={day.date} day={day} isToday={i === 0} index={i} />
        ))}
      </ul>
    </section>
  );
}
