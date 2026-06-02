import { useParams, Link } from "react-router";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { useGetForecastQuery } from "../features/weather/weatherAPI";
import ForecastCard from "../features/weather/components/ForecastCard";

export default function ForecastPage() {
  const { city } = useParams<{ city: string }>();
  const { data, isLoading, isError } = useGetForecastQuery(city ?? "", {
    skip: !city,
  });

  if (!city) {
    return (
      <div className="text-center py-20 text-navy-400">
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

      <div className="flex items-center gap-3 mb-8">
        <CalendarDays size={28} className="text-accent" />
        <h2 className="text-3xl font-bold">
          5-Day Forecast for{" "}
          <span className="text-accent">{decodeURIComponent(city)}</span>
        </h2>
      </div>

      {isLoading && (
        <div className="text-center py-20">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-[3px] border-navy-600 border-t-accent" />
          <p className="mt-5 text-navy-400 text-lg">Loading forecast…</p>
        </div>
      )}

      {isError && (
        <div className="text-center py-16">
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
          {data.list.map((item) => (
            <ForecastCard key={item.dt} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
