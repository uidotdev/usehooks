/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      boxShadow: {
        sm: "var(--focus-object)",
      },
      colors: {
        brand: {
          coal: "#0f0d0e",
          gray: "#262522",
          charcoal: "#231F20",
          charcoalMuted: "#1B1918",
          orange: "#FC7428",
          yellow: "#FCBA28",
          pink: "#F38BA3",
          green: "#0BA95B",
          purple: "#7B5EA7",
          beige: "#F9F4DA",
          blue: "#12B5E5",
          red: "#ED203D",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
