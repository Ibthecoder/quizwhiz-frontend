import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://quizwhiz-backend-1.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
