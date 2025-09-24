import { useEffect, useMemo, useState } from "react";
import DailySummary from "../components/DailySummary";
import { SearchIcon, GpsFixedIcon } from "../components/Icons";
import {
  fetchForecastByCity,
  fetchForecastByCoords,
  fetchCurrentWeatherByCity,
  fetchCurrentWeatherByCoords,
  getGeolocation,
} from "../services/weather";

export default function WeeklyPage() {
  const [city, setCity] = useState("Da Nang");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forecast, setForecast] = useState<any[]>([]);

  const canSubmit = useMemo(() => city.trim().length > 0, [city]);

  async function loadByCity(targetCity: string) {
    setLoading(true);
    setError(null);
    try {
      const [_, f] = await Promise.all([
        fetchCurrentWeatherByCity(targetCity),
        fetchForecastByCity(targetCity),
      ]);
      setForecast(f);
    } catch (e: any) {
      setError(e.message ?? "Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  }

  async function loadByGeo() {
    setLoading(true);
    setError(null);
    try {
      const coords = await getGeolocation();
      const [_, f] = await Promise.all([
        fetchCurrentWeatherByCoords(coords),
        fetchForecastByCoords(coords),
      ]);
      setForecast(f);
    } catch (e: any) {
      setError(e.message ?? "Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadByCity(city);
  }, []);

  const days = Object.values(
    forecast.reduce((acc: any, x: any) => {
      const d = new Date(x.dt * 1000);
      const key = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate()
      ).toISOString();
      acc[key] ||= {
        date: key,
        tempMin: Infinity,
        tempMax: -Infinity,
        icon: x.weather[0]?.icon ?? "01d",
        description: x.weather[0]?.description ?? "",
      };
      acc[key].tempMin = Math.min(acc[key].tempMin, x.main.temp);
      acc[key].tempMax = Math.max(acc[key].tempMax, x.main.temp);
      const hour = d.getHours();
      if (hour === 12) {
        acc[key].icon = x.weather[0]?.icon ?? "01d";
        acc[key].description = x.weather[0]?.description ?? "";
      }
      return acc;
    }, {})
  ).slice(0, 7) as any;

  return (
    <div className="max-w-screen-sm mx-auto px-3 py-4 sm:px-4">
      <h1 className="text-lg font-semibold mb-3">Tuần tới</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit) loadByCity(city);
        }}
        className="mb-4 flex items-center gap-2"
      >
        <div className="flex-1 flex items-center gap-2 rounded-full bg-white dark:bg-slate-800 px-3 py-2 ring-1 ring-slate-200/70 dark:ring-white/10">
          <SearchIcon className="w-5 h-5 text-slate-400" />
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Nhập thành phố"
            className="w-full bg-transparent outline-none placeholder:text-slate-400"
          />
        </div>
        <button
          type="button"
          onClick={loadByGeo}
          disabled={loading}
          className="p-2 rounded-full bg-white dark:bg-slate-800 ring-1 ring-slate-200/70 dark:ring-white/10 hover:bg-slate-100 dark:hover:bg-slate-700"
          aria-label="Sử dụng vị trí"
        >
          <GpsFixedIcon className="w-5 h-5" />
        </button>
      </form>

      {error && (
        <div className="mb-4 text-sm text-red-700 bg-red-50 dark:bg-red-900/30 dark:text-red-300 rounded-lg p-3">
          {error}
        </div>
      )}

      <DailySummary days={days} />
    </div>
  );
}
