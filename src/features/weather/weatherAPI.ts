import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CurrentWeatherData, ForecastData } from "../../types/weather";

// OpenWeatherMap free plan. The key ships in the browser bundle — unavoidable for a
// static site; it is a free key with no billing attached.
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const cityQuery = (city: string) => `?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.openweathermap.org/data/2.5/" }),
  keepUnusedDataFor: 600, // weather changes slowly; reuse results for 10 minutes
  endpoints: (builder) => ({
    getCurrentWeather: builder.query<CurrentWeatherData, string>({
      query: (city) => `weather${cityQuery(city)}`,
    }),
    getForecast: builder.query<ForecastData, string>({
      query: (city) => `forecast${cityQuery(city)}`,
    }),
  }),
});

export const { useGetCurrentWeatherQuery, useGetForecastQuery } = weatherApi;

export const iconUrl = (icon: string, size: "2x" | "4x" = "2x") => `https://openweathermap.org/img/wn/${icon}@${size}.png`;

/** A message for people, not developers, from an RTK Query error. */
export function weatherErrorText(error: unknown): string {
  const status = (error as { status?: number | string } | undefined)?.status;
  if (status === 404) return "City not found. Check the spelling or try a nearby larger city.";
  if (status === 401 || status === 429) return "The weather service is temporarily unavailable. Please try again later.";
  if (status === "FETCH_ERROR") return "No connection. Check your internet and try again.";
  return "Something went wrong. Please try again.";
}
