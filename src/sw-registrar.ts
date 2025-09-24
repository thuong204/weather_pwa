// Register the PWA service worker (auto handled by vite-plugin-pwa at build)
export function registerSW() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // ignore
      });
    });
  }
}
