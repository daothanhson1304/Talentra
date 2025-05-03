import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: env.APP_BASE_NAME,
    plugins: [react()],
    envPrefix: 'APP_',
    // server: {
    //   proxy: {
    //     '/api': {
    //       target: env.APP_BASE_URL,
    //       changeOrigin: true,
    //       secure: false,
    //     },
    //   },
    // },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
