type Day = {
  date: string;
  tempMin: number;
  tempMax: number;
  icon: string;
  description: string;
};

export function DailySummary({ days }: { days: Day[] }) {
  return (
    <div className="grid [grid-template-columns:repeat(auto-fit,minmax(11rem,1fr))] gap-3">
      {days.map((d) => {
        const label = new Date(d.date).toLocaleDateString("vi-VN", {
          weekday: "short",
          day: "2-digit",
          month: "2-digit",
        });
        return (
          <div
            key={d.date}
            className="rounded-2xl bg-white/60 dark:bg-slate-800/50 backdrop-blur-md ring-1 ring-white/50 dark:ring-white/10 shadow p-4 text-center"
          >
            <div className="text-xs text-slate-500 mb-1">{label}</div>
            <img
              className="mx-auto w-14 h-14"
              src={`https://openweathermap.org/img/wn/${d.icon}.png`}
              alt={d.description}
            />
            <div className="mt-1 text-slate-700 dark:text-slate-200 capitalize text-sm line-clamp-1">
              {d.description}
            </div>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300 text-sm font-semibold">
                {Math.round(d.tempMax)}°
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300 text-xs">
                {Math.round(d.tempMin)}°
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DailySummary;
