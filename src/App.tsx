import { useEffect, useMemo, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import DailySummary from "./components/DailySummary";
import HourlyTimeline from "./components/HourlyTimeline";
import { SearchIcon, GpsFixedIcon } from "./components/Icons";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import {
  fetchCurrentWeatherByCity,
  fetchCurrentWeatherByCoords,
  fetchForecastByCity,
  fetchForecastByCoords,
  getGeolocation,
} from "./services/weather";

function App() {
  const [city, setCity] = useState("Da Nang");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [current, setCurrent] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);

  const canSubmit = useMemo(() => city.trim().length > 0, [city]);

  async function loadByCity(targetCity: string) {
    setLoading(true);
    setError(null);
    try {
      const [c, f] = await Promise.all([
        fetchCurrentWeatherByCity(targetCity),
        fetchForecastByCity(targetCity),
      ]);
      setCurrent(c);
      setForecast(
        f.map((x) => ({
          dt: x.dt,
          temp: x.main.temp,
          description: x.weather[0]?.description ?? "",
          icon: x.weather[0]?.icon ?? "01d",
          main: x.main,
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
      const [c, f] = await Promise.all([
        fetchCurrentWeatherByCoords(coords),
        fetchForecastByCoords(coords),
      ]);
      setCurrent(c);
      setForecast(
        f.map((x) => ({
          dt: x.dt,
          temp: x.main.temp,
          description: x.weather[0]?.description ?? "",
          icon: x.weather[0]?.icon ?? "01d",
          main: x.main,
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
    <div className="min-h-screen flex flex-col bg-surface text-slate-900 dark:text-white">
      <AppHeader title="Weather" onRefresh={() => loadByCity(city)} />

      <main className="flex-1">
        <div className="max-w-screen-sm mx-auto px-3 py-4 sm:px-4">
          {/* Search field */}
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
                placeholder="Nhập thành phố (VD: Ho Chi Minh)"
                className="w-full bg-transparent outline-none placeholder:text-slate-400"
              />
            </div>
            <button
              type="button"
              onClick={loadByGeo}
              disabled={loading}
              className="p-2 rounded-full bg-white dark:bg-slate-800 ring-1 ring-slate-200/70 dark:ring-white/10 hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Use my location"
            >
              <GpsFixedIcon className="w-5 h-5" />
            </button>
          </form>

          {error && (
            <div className="mb-4 text-sm text-red-700 bg-red-50 dark:bg-red-900/30 dark:text-red-300 rounded-lg p-3">
              {error}
            </div>
          )}

          {current && (
            <div className="mb-6">
              <div className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                Thời tiết hiện tại
              </div>
              <WeatherCard
                city={current.name}
                temp={current.main.temp}
                feelsLike={current.main.feels_like}
                humidity={current.main.humidity}
                wind={current.wind.speed}
                description={current.weather[0]?.description ?? ""}
                icon={current.weather[0]?.icon ?? "01d"}
              />
            </div>
          )}

          {/* Hôm nay theo giờ */}
          {forecast.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Hôm nay
              </div>
              <HourlyTimeline
                hours={forecast
                  .filter(
                    (h) =>
                      new Date(h.dt * 1000).toDateString() ===
                      new Date().toDateString()
                  )
                  .slice(0, 8)
                  .map((x) => ({
                    dt: x.dt,
                    temp: x.temp,
                    icon: x.icon,
                    description: x.description,
                  }))}
              />
            </div>
          )}

          {/* Tuần tới (tóm tắt theo ngày) */}
          {forecast.length > 0 && (
            <div className="mt-6 space-y-2">
              <div className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Tuần tới
              </div>
              <DailySummary
                days={
                  Object.values(
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
                        icon: x.icon,
                        description: x.description,
                      };
                      acc[key].tempMin = Math.min(
                        acc[key].tempMin,
                        x.main.temp
                      );
                      acc[key].tempMax = Math.max(
                        acc[key].tempMax,
                        x.main.temp
                      );
                      const hour = d.getHours();
                      if (hour === 12) {
                        acc[key].icon = x.icon;
                        acc[key].description = x.description;
                      }
                      return acc;
                    }, {})
                  ).slice(0, 7) as any
                }
              />
            </div>
          )}
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

export default App;
