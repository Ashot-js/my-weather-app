import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

// Old links to /forecast/<city> now open the home page for that city.
function ForecastRedirect() {
  const { city = "" } = useParams();
  return <Navigate to={`/?city=${encodeURIComponent(city)}`} replace />;
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="forecast/:city" element={<ForecastRedirect />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
