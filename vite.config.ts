import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(() => ({
  // base: mode === 'development' ? '/quiz-app/' : './', 
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  // server: {
  //   // port: 3000,
  //   open: true,
  // },
}));
