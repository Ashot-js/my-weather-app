import { useParams, Link } from "react-router";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { useGetForecastQuery } from "../features/weather/weatherAPI";
import ForecastCard from "../features/weather/components/ForecastCard";

const DELAYS = ["stagger-1", "stagger-2", "stagger-3", "stagger-4", "stagger-5"];

export default function ForecastPage() {
  const { city } = useParams<{ city: string }>();
  const { data, isLoading, isError } = useGetForecastQuery(city ?? "", {
    skip: !city,
  });

  if (!city) {
    return (
      <div className="animate-fade-in text-center py-20 text-navy-400">
        <p>No city specified.</p>
        <Link to="/" className="text-accent hover:underline mt-2 inline-block">
          Go back to search
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-navy-400 hover:text-white transition-colors mb-6 group"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Back to Home
      </Link>

      <div className="animate-slide-down flex items-center gap-3 mb-8">
        <CalendarDays size={28} className="text-accent" />
        <h2 className="text-3xl font-bold">
          5-Day Forecast for{" "}
          <span className="text-gradient">{decodeURIComponent(city)}</span>
        </h2>
      </div>

      {isLoading && (
        <div className="animate-fade-in text-center py-20">
          <div className="spinner" />
          <p className="mt-5 text-navy-400 text-lg">Loading forecast…</p>
        </div>
      )}

      {isError && (
        <div className="animate-fade-in text-center py-16">
          <p className="text-xl text-red-400">
            Failed to load forecast data.
          </p>
          <p className="text-sm mt-2 text-navy-400">
            Verify your API key or try a different city.
          </p>
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.list.map((item, i) => (
            <ForecastCard
              key={item.dt}
              item={item}
              delay={DELAYS[i % DELAYS.length]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
