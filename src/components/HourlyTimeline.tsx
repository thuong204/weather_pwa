type Hour = {
  dt: number;
  temp: number;
  feelsLike?: number;
  humidity?: number;
  wind?: number;
  pop?: number;
  rain?: number;
  icon: string;
  description: string;
};

export function HourlyTimeline({ hours }: { hours: Hour[] }) {
  return (
    <div className="grid [grid-template-columns:repeat(auto-fit,minmax(9.5rem,1fr))] gap-3">
      {hours.map((h) => {
        const t = new Date(h.dt * 1000);
        const label = t.toLocaleTimeString("vi-VN", { hour: "2-digit" });
        const popPercent = Math.round((h.pop ?? 0) * 100);
        return (
          <div
            key={h.dt}
            className="rounded-2xl bg-white/60 dark:bg-slate-800/50 backdrop-blur-md p-3 text-center ring-1 ring-white/50 dark:ring-white/10 shadow"
          >
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>{label}</span>
              {h.pop != null && (
                <span className="px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300 text-[10px]">
                  {popPercent}%
                </span>
              )}
            </div>
            <img
              className="mx-auto w-12 h-12"
              src={`https://openweathermap.org/img/wn/${h.icon}.png`}
              alt={h.description}
            />
            <div className="text-sky-600 font-semibold text-lg">
              {Math.round(h.temp)}°
            </div>
            <div className="text-[11px] text-slate-500 capitalize truncate">
              {h.description}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1 text-[10px] text-slate-600 dark:text-slate-300">
              {h.feelsLike != null && (
                <div className="rounded bg-white/60 dark:bg-white/10 px-1 py-0.5">
                  CG: {Math.round(h.feelsLike)}°
                </div>
              )}
              {h.humidity != null && (
                <div className="rounded bg-white/60 dark:bg-white/10 px-1 py-0.5">
                  Ẩm: {h.humidity}%
                </div>
              )}
              {h.wind != null && (
                <div className="rounded bg-white/60 dark:bg-white/10 px-1 py-0.5">
                  Gió: {Math.round(h.wind)}m/s
                </div>
              )}
              {h.rain != null && h.rain > 0 && (
                <div className="rounded bg-white/60 dark:bg-white/10 px-1 py-0.5">
                  Mưa: {h.rain}mm
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default HourlyTimeline;
