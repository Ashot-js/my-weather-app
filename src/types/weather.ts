export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeatherData {
  weather: WeatherCondition[];
  main: { temp: number; feels_like: number; pressure: number; humidity: number };
  visibility: number;
  wind: { speed: number };
  clouds: { all: number };
  sys: { country: string };
  name: string;
}

export interface ForecastItem {
  /** Unix time (UTC seconds) of the 3-hour slot. */
  dt: number;
  main: { temp: number; temp_min: number; temp_max: number; humidity: number };
  weather: WeatherCondition[];
  wind: { speed: number };
}

export interface ForecastData {
  list: ForecastItem[];
  /** `timezone` is the city's offset from UTC in seconds. */
  city: { name: string; country: string; timezone: number };
}

/** One day of the forecast, in the city's local time. */
export interface DailyForecast {
  /** Local calendar date, YYYY-MM-DD. */
  date: string;
  min: number;
  max: number;
  /** Conditions around local midday. */
  weather: WeatherCondition;
  humidity: number;
  wind: number;
}
