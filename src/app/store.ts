import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "../features/weather/weatherAPI";

// The selected city lives in the URL (?city=...), so the store only holds API data.
export const store = configureStore({
  reducer: { [weatherApi.reducerPath]: weatherApi.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherApi.middleware),
});
