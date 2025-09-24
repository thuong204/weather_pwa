import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import MobileNav from "../components/MobileNav";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-app text-slate-900 dark:text-white">
      <AppHeader title="Weather" />
      <main className="flex-1">
        <Outlet />
      </main>
      <AppFooter />
      <MobileNav />
    </div>
  );
}
