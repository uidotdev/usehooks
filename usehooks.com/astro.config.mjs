import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import customTheme from "./theme.json";
import tailwind from "@astrojs/tailwind";

// import vercel from "@astrojs/vercel/edge";

import mdx from "@astrojs/mdx";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://usehooks.com",
  trailingSlash: "never",
  integrations: [react(), tailwind(), mdx(), sitemap()],
  output: "static",
  // adapter: vercel(),
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: customTheme,
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: false
    }
  }
});