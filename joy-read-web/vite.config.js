import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
import devtoolsJosn from 'vite-plugin-devtools-json'
import Sonda from 'sonda/vite';

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pathResolve = (dir) => path.resolve(__dirname, dir)
// https://vite.dev/config/
export default defineConfig({
  build: { 
    chunkSizeWarningLimit: 800,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-libs': ['vue', 'vue-router', 'pinia', 'axios', 'lodash-es', '@element-plus/icons-vue'],
          'element-plus': ['element-plus'],
          'fluent-editor': ['quill', '@opentiny/fluent-editor'],
        },
      }
    },
  },
  server: {
    host: '',
    port: '3001',
    strictPort: false,
    // proxy: {
    //   '/api': {
    //     target: 'http://127.0.0.1:3000',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
  resolve: {
    alias: {
      '@src': pathResolve('src'),
      '@components': pathResolve('src/components'),
      '@views': pathResolve('src/views'),
      '@routes': pathResolve('src/routes'),
      '@utils': pathResolve('src/utils'),
      '@apis': pathResolve('src/apis'),
      '@store': pathResolve('src/store'),
      '@assets': pathResolve('src/assets'),
      '@directives': pathResolve('src/directives'),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    legacy({
      targets: ['ie >= 11', 'chrome 52', 'Android 4.1', 'iOS 7.1'],
      modernPolyfills: true,
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    devtoolsJosn(),
    Sonda(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
