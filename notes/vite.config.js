import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // 打包输出目录改为 server/public
    outDir: '../server/public',
    emptyOutDir: true,
    // 使用 esbuild 压缩
    minify: 'esbuild',
    // 移除 console
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // 不重写路径
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
})
