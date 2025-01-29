import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api': {
        target: 'https://socially-102k.onrender.com',//   https://socially-102k.onrender.com  http://localhost:4000
        changeOrigin: true,
      }
    }
  }
})
