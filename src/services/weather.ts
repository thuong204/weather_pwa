export type Coordinates = { latitude: number; longitude: number };

type CurrentWeather = {
  name: string;
  weather: { description: string; icon: string }[];
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
};

type ForecastItem = {
  dt: number;
  main: { temp: number };
  weather: { description: string; icon: string }[];
};

type ForecastResponse = { list: ForecastItem[] };

const OWM_BASE = "https://api.openweathermap.org/data/2.5";

export async function fetchCurrentWeatherByCity(
  city: string,
  units: "metric" | "imperial" = "metric"
) {
  const key = import.meta.env.VITE_OWM_KEY as string | undefined;
  if (!key) throw new Error("Thiếu VITE_OWM_KEY trong biến môi trường");
  const url = `${OWM_BASE}/weather?q=${encodeURIComponent(
    city
  )}&appid=${key}&units=${units}&lang=vi`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Không lấy được dữ liệu thời tiết");
  const data: CurrentWeather = await res.json();
  return data;
}

export async function fetchCurrentWeatherByCoords(
  coords: Coordinates,
  units: "metric" | "imperial" = "metric"
) {
  const key = import.meta.env.VITE_OWM_KEY as string | undefined;
  if (!key) throw new Error("Thiếu VITE_OWM_KEY trong biến môi trường");
  const url = `${OWM_BASE}/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}&units=${units}&lang=vi`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Không lấy được dữ liệu thời tiết");
  const data: CurrentWeather = await res.json();
  return data;
}

export async function fetchForecastByCity(
  city: string,
  units: "metric" | "imperial" = "metric"
) {
  const key = import.meta.env.VITE_OWM_KEY as string | undefined;
  if (!key) throw new Error("Thiếu VITE_OWM_KEY trong biến môi trường");
  const url = `${OWM_BASE}/forecast?q=${encodeURIComponent(
    city
  )}&appid=${key}&units=${units}&lang=vi`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Không lấy được dữ liệu dự báo");
  const data: ForecastResponse = await res.json();
  return data.list; // trả về toàn bộ 5 ngày (3h/slot)
}

export async function fetchForecastByCoords(
  coords: Coordinates,
  units: "metric" | "imperial" = "metric"
) {
  const key = import.meta.env.VITE_OWM_KEY as string | undefined;
  if (!key) throw new Error("Thiếu VITE_OWM_KEY trong biến môi trường");
  const url = `${OWM_BASE}/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}&units=${units}&lang=vi`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Không lấy được dữ liệu dự báo");
  const data: ForecastResponse = await res.json();
  return data.list;
}

export function getGeolocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator))
      return reject(new Error("Thiết bị không hỗ trợ định vị"));
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}

export function iconUrl(icon: string) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
