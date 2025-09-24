import { RefreshIcon, SunIcon } from "./Icons";
import { Link, NavLink } from "react-router-dom";

export function AppHeader({
  title,
  onRefresh,
}: {
  title: string;
  onRefresh?: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-white/60 dark:bg-slate-900/50 border-b border-white/40 dark:border-white/10">
      <div className="max-w-screen-sm mx-auto px-4 py-2.5 flex items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-base font-semibold text-slate-800 dark:text-white"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-violet-400 text-white shadow">
            <SunIcon className="w-4 h-4" />
          </span>
          {title}
        </Link>
        <nav className="ml-2 hidden sm:flex items-center gap-1 text-sm">
          <NavLink
            to="/today"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-full transition ${
                isActive
                  ? "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300"
                  : "text-slate-600 hover:bg-white/70 dark:text-slate-300 dark:hover:bg-white/10"
              }`
            }
          >
            Hôm nay
          </NavLink>
          <NavLink
            to="/hourly"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-full transition ${
                isActive
                  ? "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300"
                  : "text-slate-600 hover:bg-white/70 dark:text-slate-300 dark:hover:bg-white/10"
              }`
            }
          >
            Theo giờ
          </NavLink>
          <NavLink
            to="/weekly"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-full transition ${
                isActive
                  ? "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300"
                  : "text-slate-600 hover:bg-white/70 dark:text-slate-300 dark:hover:bg-white/10"
              }`
            }
          >
            Tuần
          </NavLink>
          <NavLink
            to="/monthly"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-full transition ${
                isActive
                  ? "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300"
                  : "text-slate-600 hover:bg-white/70 dark:text-slate-300 dark:hover:bg-white/10"
              }`
            }
          >
            Tháng
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-full transition ${
                isActive
                  ? "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300"
                  : "text-slate-600 hover:bg-white/70 dark:text-slate-300 dark:hover:bg-white/10"
              }`
            }
          >
            Giới thiệu
          </NavLink>
        </nav>
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            className="ml-auto p-2 rounded-full text-slate-700 hover:bg-white/70 dark:text-slate-200 dark:hover:bg-white/10"
            aria-label="Refresh"
          >
            <RefreshIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
}

export default AppHeader;
