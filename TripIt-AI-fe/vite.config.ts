import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), tailwindcss()],
    base: '/',
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'terser' : false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom']
          }
        }
      },
      brotliSize: true,
      target: 'esnext',
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: ['.js', '.ts', '.tsx', '.json'],
    },
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    server: {
      port: 3000,
      host: true
    },
    preview: {
      port: 4173,
      host: true
    }
  }
})
