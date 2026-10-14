import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
    // radix-ui's scroll-lock helpers import tslib; resolve it from the project
    // root so a stale or partially linked install can't break the build
    dedupe: ['tslib'],
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/leaflet')) return 'leaflet';
          if (id.includes('node_modules/react-dom')) return 'vendor';
          if (id.includes('node_modules/react-router-dom') || id.includes('node_modules/react/')) return 'vendor';
        }
      }
    }
  },
})
