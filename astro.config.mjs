import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://u-stat.app",
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), icon()],
});
