// 두 HTML 입구를 함께 빌드하고 하위 저장소 경로에도 상대 주소를 사용합니다.
import { defineConfig } from 'vite';
import { resolve } from 'node:path';
export default defineConfig({
  base: './',
  build: { rollupOptions: { input: {
    main: resolve(import.meta.dirname, 'index.html'),
    react: resolve(import.meta.dirname, 'react.html')
  } } }
});
