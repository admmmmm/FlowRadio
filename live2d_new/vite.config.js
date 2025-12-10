import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5173,
    host: true,
    open: false
  },
  assetsInclude: ['**/*.wasm'],
  optimizeDeps: {
    exclude: ['@pixi/live2d-display']
  },
  build: {
    outDir: 'dist'
  }
})
