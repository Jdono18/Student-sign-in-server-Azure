import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {  // route handling in vue app (route with /api in path sent to express server running at port 3000)
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
