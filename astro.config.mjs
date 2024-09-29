import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";
import { CONFIG, LANGUAGES_CODE } from "./src/lib/config";

// https://astro.build/config
export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  site: CONFIG.website,
  trailingSlash: "ignore",
  compressHTML: false,
  i18n: {
    defaultLocale: "en",
    locales: CONFIG.locals,
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    tailwind(),
    react(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: LANGUAGES_CODE,
      },
    }),
  ],
  output: "hybrid",
});
