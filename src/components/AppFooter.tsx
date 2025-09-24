export function AppFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200/70 dark:border-white/10 bg-white/80 dark:bg-slate-900/60">
      <div className="max-w-screen-sm mx-auto px-4 py-4 text-xs text-slate-500 flex items-center justify-between">
        <div>Weather PWA · Dữ liệu: OpenWeatherMap</div>
        <div>© {new Date().getFullYear()}</div>
      </div>
    </footer>
  );
}

export default AppFooter;
