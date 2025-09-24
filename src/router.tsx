import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import TodayPage from "./pages/TodayPage";
import HourlyPage from "./pages/HourlyPage";
import WeeklyPage from "./pages/WeeklyPage";
import MonthlyPage from "./pages/MonthlyPage";
import AboutPage from "./pages/AboutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <TodayPage /> },
      { path: "today", element: <TodayPage /> },
      { path: "hourly", element: <HourlyPage /> },
      { path: "weekly", element: <WeeklyPage /> },
      { path: "monthly", element: <MonthlyPage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
]);

export default router;
