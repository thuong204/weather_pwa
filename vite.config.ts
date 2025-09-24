import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "Weather PWA",
        short_name: "Weather",
        description: "Xem thời tiết hiện tại và dự báo ngắn hạn",
        theme_color: "#0ea5e9",
        background_color: "#0b1220",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/(?:api\.)?openweathermap\.org\/.*$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "owm-cache",
              expiration: { maxEntries: 60, maxAgeSeconds: 3600 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
});
