import { iconUrl } from "../services/weather";

type Props = {
  city: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  description: string;
  icon: string;
};

export function WeatherCard({
  city,
  temp,
  feelsLike,
  humidity,
  wind,
  description,
  icon,
}: Props) {
  return (
    <div className="rounded-2xl bg-white/60 dark:bg-slate-800/50 backdrop-blur-md shadow-xl p-4 sm:p-6 ring-1 ring-white/50 dark:ring-white/10">
      <div className="flex items-center gap-4">
        <img className="w-16 h-16" src={iconUrl(icon)} alt={description} />
        <div className="flex-1">
          <div className="text-xl font-semibold text-slate-900 dark:text-white">
            {city}
          </div>
          <div className="text-slate-600 dark:text-slate-300 capitalize">
            {description}
          </div>
        </div>
        <div className="text-3xl font-bold text-sky-600">
          {Math.round(temp)}°
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-slate-600 dark:text-slate-300">
        <div>
          <div className="font-medium">Cảm giác</div>
          <div>{Math.round(feelsLike)}°</div>
        </div>
        <div>
          <div className="font-medium">Độ ẩm</div>
          <div>{humidity}%</div>
        </div>
        <div>
          <div className="font-medium">Gió</div>
          <div>{Math.round(wind)} m/s</div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
