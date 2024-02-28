import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3000,
    proxy: {
      '/api/v1': {
        target: 'http://172.20.10.9:8000',
        changeOrigin: true
      }
    }
  },
  base: "/",
  plugins: [react()],
})

// python manage.py runserver 172.20.10.9
// поменять в SaveClientMinio URI по которому сохраняется изображение
// в XCode поменять в ServiceAPI ip-адрес сервера
// поменять в конфиге vite