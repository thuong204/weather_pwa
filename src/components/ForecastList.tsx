import { iconUrl } from "../services/weather";

type Item = { dt: number; temp: number; description: string; icon: string };

export function ForecastList({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((it) => {
        const date = new Date(it.dt * 1000);
        const label = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        return (
          <div
            key={it.dt}
            className="rounded-xl bg-white/60 dark:bg-slate-800/50 backdrop-blur-md p-3 ring-1 ring-white/50 dark:ring-white/10 text-center shadow"
          >
            <div className="text-xs text-slate-500">{label}</div>
            <img
              src={iconUrl(it.icon)}
              alt={it.description}
              className="mx-auto w-12 h-12"
            />
            <div className="text-slate-700 dark:text-slate-200 capitalize text-sm">
              {it.description}
            </div>
            <div className="text-sky-600 font-semibold">
              {Math.round(it.temp)}°
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ForecastList;
