import { useEffect, useMemo, useState } from "react";
import { SearchIcon, GpsFixedIcon } from "../components/Icons";
import HourlyTimeline from "../components/HourlyTimeline";
import {
  fetchCurrentWeatherByCity,
  fetchCurrentWeatherByCoords,
  fetchForecastByCity,
  fetchForecastByCoords,
  getGeolocation,
} from "../services/weather";

export default function HourlyPage() {
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
      setForecast(
        f.map((x: any) => ({
          dt: x.dt,
          temp: x.main.temp,
          description: x.weather[0]?.description ?? "",
          icon: x.weather[0]?.icon ?? "01d",
          main: x.main,
          wind: x.wind,
          pop: x.pop,
          rain: x.rain,
        }))
      );
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
      setForecast(
        f.map((x: any) => ({
          dt: x.dt,
          temp: x.main.temp,
          description: x.weather[0]?.description ?? "",
          icon: x.weather[0]?.icon ?? "01d",
          main: x.main,
          wind: x.wind,
          pop: x.pop,
          rain: x.rain,
        }))
      );
    } catch (e: any) {
      setError(e.message ?? "Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadByCity(city);
  }, []);

  return (
    <div className="max-w-screen-sm mx-auto px-3 py-4 sm:px-4">
      <h1 className="text-lg font-semibold mb-3">Theo giờ</h1>

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

      {forecast.length > 0 && (
        <HourlyTimeline
          hours={forecast
            .filter((x: any) => {
              const now = Date.now();
              const t = x.dt * 1000;
              return t >= now && t <= now + 24 * 60 * 60 * 1000;
            })
            .slice(0, 8)
            .map((x: any) => ({
              dt: x.dt,
              temp: x.temp,
              feelsLike: x.main?.feels_like,
              humidity: x.main?.humidity,
              wind: x.wind?.speed,
              pop: x.pop,
              rain: x.rain?.["3h"],
              icon: x.icon,
              description: x.description,
            }))}
        />
      )}
    </div>
  );
}
