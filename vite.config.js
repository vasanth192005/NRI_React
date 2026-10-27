import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Bundle CJS-only deps into the SSR build so Node can import it
  ssr: { noExternal: ['react-helmet-async'] },
});
