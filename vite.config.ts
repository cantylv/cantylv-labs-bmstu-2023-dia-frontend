import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3000,
    proxy: {
      '/api/v1': {
        target: 'http://0.0.0.0:8000',
        changeOrigin: true
      }
    }
  },
  base: "/labs-bmstu-2023-dia-frontend/",
  plugins: [react()],
})