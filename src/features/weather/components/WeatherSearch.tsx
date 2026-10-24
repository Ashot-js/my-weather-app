import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { useAppDispatch } from "../../../app/hooks";
import { setSelectedCity } from "../weatherSlice";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (trimmed) {
      dispatch(setSelectedCity(trimmed));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
        className="w-full sm:flex-1 px-5 py-3.5 rounded-xl bg-navy-800 border border-navy-600 text-white placeholder-navy-400 focus:outline-none focus:border-accent transition-colors text-lg"
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3.5 bg-accent text-navy-950 font-semibold rounded-xl hover:bg-accent-hover transition-colors flex items-center justify-center gap-2"
      >
        <Search size={20} />
        Search
      </button>
    </form>
  );
}
