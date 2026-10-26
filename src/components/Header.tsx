import { CloudSun } from "lucide-react";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-navy-800 bg-navy-900/80 pt-[env(safe-area-inset-top)] backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center px-4 py-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <CloudSun size={32} className="text-accent transition-colors group-hover:text-accent-hover" aria-hidden />
          <span>
            <span className="block text-xl leading-none font-bold tracking-tight">Weather</span>
            <span className="text-xs tracking-widest text-navy-400 uppercase">Forecast</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
