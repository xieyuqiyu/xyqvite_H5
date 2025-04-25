import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// 获取 @ 别名所指向的路径
const aliasPath = path.resolve(__dirname, './src');

// 输出路径
console.log(`Alias '@' points to: ${aliasPath}`);

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': aliasPath,
    }
  }
})