import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/submit-form': {
        target: 'http://localhost:5000', // Your Express server's URL
        changeOrigin: true,
      },
    },
  },
});
