import { CloudSun } from "lucide-react";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="bg-navy-900/80 backdrop-blur border-b border-navy-800 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <CloudSun
            size={32}
            className="text-accent group-hover:text-accent-hover transition-colors"
          />
          <div>
            <h1 className="text-xl font-bold tracking-tight leading-none">
              POGODA
            </h1>
            <span className="text-navy-400 text-xs tracking-widest uppercase">
              Weather
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
