/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../packages/primitives/src/**/*.{tsx,ts}",
  ],
  presets: [
    require("nativewind/preset"),
    require("@native-cn/primitives/tailwind"),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
