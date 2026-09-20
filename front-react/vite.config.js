import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    port: 5555, // Укажите нужный номер порта
    strictPort: true, // (Необязательно) Если порт занят, Vite выдаст ошибку, а не станет искать другой
  }
})
