import { Outlet } from "react-router";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-navy-800 py-4 text-center text-xs text-navy-500">
        POGODA — Powered by OpenWeatherMap
      </footer>
    </div>
  );
}
