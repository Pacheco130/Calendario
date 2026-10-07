import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ruta base para GitHub Pages: https://pacheco130.github.io/Calendario/
  base: '/Calendario/',
})
