import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

const ForecastPage = lazy(() => import("./pages/ForecastPage"));

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="forecast/:city"
              element={
                <Suspense fallback={<ForecastFallback />}>
                  <ForecastPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

function ForecastFallback() {
  return (
    <div className="animate-fade-in text-center py-20">
      <div className="spinner" />
      <p className="mt-5 text-navy-400 text-lg">Loading forecast page…</p>
    </div>
  );
}
