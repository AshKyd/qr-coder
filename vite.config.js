import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { routeMeta } from "./src/route-meta.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const routes = [
  "/wifi",
  "/vcard",
  "/calendar",
  "/geo",
  "/sms_email",
  "/phone",
  "/text",
];

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsInlineLimit: 10240,
  },
  plugins: [
    preact({
      prerender: {
        enabled: true,
        renderTarget: "#app",
        prerenderScript: path.resolve(__dirname, "src/index.jsx"),
        additionalPrerenderRoutes: routes,
      },
    }),
    {
      name: "generate-sitemap",
      closeBundle() {
        // Only run when generating the client build
        if (!process.argv.includes("build")) return;
        const outDir = path.resolve(__dirname, "dist");

        const allRoutes = ["/", ...routes];

        const baseUrl = "https://qrcoder.app"; // Replace with your actual domain

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route === "/" ? "" : route}</loc>
    <changefreq>weekly</changefreq>
  </url>`,
  )
  .join("\n")}
</urlset>`;

        fs.writeFileSync(path.resolve(outDir, "sitemap.xml"), sitemap);
        console.log("✓ Generated sitemap.xml");

        // Inject route-specific meta tags into prerendered HTML files
        const htmlFiles = allRoutes.map((route) => {
          const filePath =
            route === "/" ? "index.html" : `${route.substring(1)}/index.html`;
          return { route, path: path.resolve(outDir, filePath) };
        });

        for (const { route, path: filePath } of htmlFiles) {
          if (fs.existsSync(filePath)) {
            let html = fs.readFileSync(filePath, "utf-8");
            const meta = routeMeta[route] || routeMeta["/"];

            if (meta) {
              html = html.replace(
                /<title>.*<\/title>/,
                `<title>${meta.title}</title>`,
              );
              html = html.replace(
                /<meta\s+name="description"\s+content="[^"]*"/,
                `<meta name="description" content="${meta.description}"`,
              );
              html = html.replace(
                /<meta\s+property="og:title"\s+content="[^"]*"/,
                `<meta property="og:title" content="${meta.title}"`,
              );
              html = html.replace(
                /<meta\s+property="og:description"\s+content="[^"]*"/,
                `<meta property="og:description" content="${meta.description}"`,
              );
              fs.writeFileSync(filePath, html);
            }
          }
        }
        console.log("✓ Injected per-route meta tags into prerendered HTML");
      },
    },
  ],
});
