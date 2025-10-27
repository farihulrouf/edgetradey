import { type Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D6CE9", // warna custommu
        "primary-hover": "#155BBB", // optional hover
      },
    },
  },
  plugins: [],
}

export default config
