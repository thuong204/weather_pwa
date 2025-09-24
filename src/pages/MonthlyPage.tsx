export default function MonthlyPage() {
  return (
    <div className="max-w-screen-sm mx-auto px-3 py-6 sm:px-4">
      <h1 className="text-lg font-semibold mb-2">Tháng này</h1>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Nguồn OpenWeatherMap gói miễn phí không cung cấp dữ liệu dự báo theo
        tháng. Bạn có thể nâng cấp API hoặc dùng nguồn khác để hiển thị biểu đồ
        tháng.
      </p>
    </div>
  );
}
