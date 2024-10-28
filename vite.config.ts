// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rollupNodePolyFill from 'rollup-plugin-polyfill-node' // Lägg till polyfill-pluginen

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      util: 'rollup-plugin-polyfill-node/polyfills/util',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis', // Definierar global som globalThis
      },
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill() // Använder polyfill-pluginen för Node-funktioner
      ],
    },
  },
})
