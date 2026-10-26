import { Outlet } from "react-router";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
        <Outlet />
      </main>
      <footer className="border-t border-navy-800 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-center text-xs text-navy-400">
        Weather data from{" "}
        <a href="https://openweathermap.org" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
          OpenWeatherMap
        </a>
      </footer>
    </div>
  );
}
