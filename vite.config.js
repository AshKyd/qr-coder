import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
        additionalPrerenderRoutes: [
          "/url",
          "/wifi",
          "/vcard",
          "/calendar",
          "/geo",
          "/sms_email",
          "/phone",
          "/text",
        ],
      },
    }),
  ],
});
