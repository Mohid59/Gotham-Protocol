import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// When building for GitHub Pages (project site), assets live under /<repo>/.
// The deploy workflow sets GH_PAGES=true; Vercel/Netlify/local use root "/".
const base = process.env.GH_PAGES === 'true' ? '/Gotham-Protocol/' : '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/gsap')) return 'gsap'
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion')) return 'motion'
          if (id.includes('node_modules/react-router')) return 'router'
          if (id.includes('node_modules/@supabase') || id.includes('node_modules/@tanstack')) return 'data'
        },
      },
    },
  },
})
