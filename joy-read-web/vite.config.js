import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pathResolve = (dir) => path.resolve(__dirname, dir)

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '',
    port: '3001',
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http:127.0.0.1:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@src': pathResolve('src'),
      '@components': pathResolve('src/components'),
      '@views': pathResolve('src/views'),
      '@routes': pathResolve('src/routes'),
      '@utils': pathResolve('src/utils'),
      '@apis': pathResolve('src/apis'),
      '@models': pathResolve('src/models'),
    },
  },
  plugins: [
    vue(),
    legacy({
      targets: ['default', 'not IE 11'],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
