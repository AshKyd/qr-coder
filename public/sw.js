/// <reference lib="WebWorker" />

/** @type {ServiceWorkerGlobalScope} */
const sw = /** @type {any} */ (self);

const isLocalhost =
  sw.location.hostname === "localhost" || sw.location.hostname === "127.0.0.1";

if (isLocalhost) {
  // Unload if on localhost to prevent issues in dev
  sw.addEventListener("install", () => sw.skipWaiting());
  sw.addEventListener("activate", (event) => {
    event.waitUntil(
      sw.registration.unregister().then(() => {
        console.log("Service Worker unregistered: currently on localhost.");
      }),
    );
  });
} else {
  sw.addEventListener("install", (event) => {
    sw.skipWaiting();
  });

  sw.addEventListener("activate", (event) => {
    event.waitUntil(sw.clients.claim());
  });

  sw.addEventListener("fetch", (event) => {
    // We're not doing any special caching, so just let the browser handle it
  });
}
