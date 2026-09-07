import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  // Pinned so the backend can name a real origin in CORS_ORIGIN and
  // OAUTH_ALLOWED_ORIGINS. Vite otherwise takes 5173 and counts upward, so which app
  // got which port depended on the order they were started in — which meant Google
  // sign-in worked or failed by luck. strictPort fails loudly instead of drifting.
  server: { port: 5276, strictPort: true },

  plugins: [
    react(),
    Sitemap({
      hostname: 'https://ilesure.com',
      dynamicRoutes: [
        '/',
        '/discover',
        '/about',
        '/agents',
        '/reviews',
        '/faq',
        '/chat',
        '/privacy-policy',
        '/terms-of-service',
        '/cookie-policy'
      ]
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion') || id.includes('gsap')) {
              return 'vendor-animation';
            }
            if (id.includes('lucide-react') || id.includes('react-icons') || id.includes('@hugeicons')) {
              return 'vendor-icons';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})
