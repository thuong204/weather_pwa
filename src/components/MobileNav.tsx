import { NavLink } from "react-router-dom";

export default function MobileNav() {
  const itemClass = ({ isActive }: { isActive: boolean }) =>
    `${
      isActive ? "text-sky-600" : "text-slate-500"
    } flex-1 flex flex-col items-center justify-center text-xs`;

  return (
    <nav className="sm:hidden fixed bottom-0 inset-x-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-white/40 dark:border-white/10 h-14">
      <div className="h-full max-w-screen-sm mx-auto flex">
        <NavLink to="/today" className={itemClass}>
          Hôm nay
        </NavLink>
        <NavLink to="/hourly" className={itemClass}>
          Theo giờ
        </NavLink>
        <NavLink to="/weekly" className={itemClass}>
          Tuần
        </NavLink>
        <NavLink to="/monthly" className={itemClass}>
          Tháng
        </NavLink>
      </div>
    </nav>
  );
}
