import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
