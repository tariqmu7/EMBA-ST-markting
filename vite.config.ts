import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import {viteSingleFile} from 'vite-plugin-singlefile';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const isOffline = mode === 'offline';
  return {
    base: isOffline ? './' : '/EMBA-ST-markting/',
    plugins: [
      react(),
      tailwindcss(),
      ...(isOffline ? [viteSingleFile({useRecommendedBuildConfig: true})] : []),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
