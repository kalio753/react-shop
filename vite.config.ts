import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
    base: "https://kalio753.github.io/react-shop",
    plugins: [react()],
})
