import { routeMeta } from "../route-meta.js";

const baseUrl = "https://qr.kyd.au";

/**
 * Updates the document title, description, Open Graph and canonical tags for
 * a route. Used for client-side navigation; the build step does the same for
 * the prerendered HTML.
 */
export function applyRouteMeta(routePath) {
  if (typeof document === "undefined") return;
  const meta = routeMeta[routePath] || routeMeta["/"];
  if (!meta) return;

  const setContent = (selector, value) =>
    document.querySelector(selector)?.setAttribute("content", value);

  document.title = meta.title;
  setContent('meta[name="description"]', meta.description);
  setContent('meta[property="og:title"]', meta.title);
  setContent('meta[property="og:description"]', meta.description);

  const url = `${baseUrl}${routePath === "/" ? "/" : routePath}`;
  setContent('meta[property="og:url"]', url);
  document
    .querySelector('link[rel="canonical"]')
    ?.setAttribute("href", url);
}
