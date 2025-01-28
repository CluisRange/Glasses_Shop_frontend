import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/Glasses_Shop_frontend", 
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/glassesimgs": {
        target: "http://localhost:9000/glassesimgs",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/glassesimgs/, ""),
      }
    }
  },
  plugins: [react()],
})