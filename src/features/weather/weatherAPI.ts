import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CurrentWeatherData, ForecastData } from "../../types/weather";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query<CurrentWeatherData, string>({
      query: (city) =>
        `weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
    }),
    getForecast: builder.query<ForecastData, string>({
      query: (city) =>
        `forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
    }),
  }),
});

export const { useGetCurrentWeatherQuery, useGetForecastQuery } = weatherApi;
