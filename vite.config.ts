import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/anti-aggrid/', // GitHub Pages 레포지토리명에 맞춘 Base Path 설정
})
