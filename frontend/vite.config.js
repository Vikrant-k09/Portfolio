import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../', '');
  const backendPort = env.PORT || '5050';

  return {
    plugins: [react()],
    envDir: '..',
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        '/api': {
          target: env.VITE_PROXY_TARGET || `http://localhost:${backendPort}`,
          changeOrigin: true
        }
      }
    },
    preview: {
      host: '0.0.0.0',
      port: 4173
    },
    build: {
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            motion: ['framer-motion'],
            three: ['three', '@react-three/fiber', '@react-three/drei', 'simplex-noise']
          }
        }
      }
    }
  };
});
