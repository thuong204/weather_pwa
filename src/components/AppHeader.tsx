import { RefreshIcon } from "./Icons";
import { Link, NavLink } from "react-router-dom";

export function AppHeader({
  title,
  onRefresh,
}: {
  title: string;
  onRefresh?: () => void;
}) {
  return (
    <header className="sticky top-0 z-10 bg-primary text-white shadow-md">
      <div className="max-w-screen-sm mx-auto px-4 py-3 flex items-center gap-3">
        <Link to="/" className="text-base font-semibold">
          {title}
        </Link>
        <nav className="ml-4 hidden sm:flex items-center gap-4 text-sm">
          <NavLink
            to="/today"
            className={({ isActive }) =>
              isActive ? "underline" : "opacity-90 hover:opacity-100"
            }
          >
            Hôm nay
          </NavLink>
          <NavLink
            to="/hourly"
            className={({ isActive }) =>
              isActive ? "underline" : "opacity-90 hover:opacity-100"
            }
          >
            Theo giờ
          </NavLink>
          <NavLink
            to="/weekly"
            className={({ isActive }) =>
              isActive ? "underline" : "opacity-90 hover:opacity-100"
            }
          >
            Tuần
          </NavLink>
          <NavLink
            to="/monthly"
            className={({ isActive }) =>
              isActive ? "underline" : "opacity-90 hover:opacity-100"
            }
          >
            Tháng
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "underline" : "opacity-90 hover:opacity-100"
            }
          >
            Giới thiệu
          </NavLink>
        </nav>
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            className="ml-auto p-2 rounded-full hover:bg-white/20 active:bg-white/30"
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
