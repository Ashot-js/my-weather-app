import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";

interface Props {
  initial: string;
  onSearch: (city: string) => void;
}

export default function WeatherSearch({ initial, onSearch }: Props) {
  const [city, setCity] = useState(initial);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} role="search" className="flex flex-col gap-3">
      <input
        type="search"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name…"
        aria-label="City name"
        enterKeyHint="search"
        maxLength={80}
        className="w-full rounded-xl border border-navy-600 bg-navy-800 px-5 py-3.5 text-lg text-white placeholder-navy-400 transition-colors focus:border-accent focus:outline-none"
      />
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-navy-950 transition-colors hover:bg-accent-hover"
      >
        <Search size={20} aria-hidden />
        Search
      </button>
    </form>
  );
}
