import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      inject: {
        data: {
          NODE_ENV: process.env.NODE_ENV
        }
      }
    })
  ],
  define: { 'process.env.NODE_ENV': '"production"' },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      UI: fileURLToPath(new URL('./src/components/UI', import.meta.url))
    }
  }
})
