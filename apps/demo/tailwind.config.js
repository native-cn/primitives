/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "../../packages/primitives/src/**/*.{tsx,ts}",
  ],
  presets: [require("@native-cn/primitives/tailwind")],
  theme: {
    extend: {},
  },
  plugins: [],
}
