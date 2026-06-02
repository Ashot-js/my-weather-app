import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ForecastPage from "./pages/ForecastPage";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="forecast/:city" element={<ForecastPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
