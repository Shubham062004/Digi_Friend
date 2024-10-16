import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Add the React plugin here
  build: {
    outDir: 'dist', // This should match the output directory Vercel expects
    sourcemap: true, // Add this to help with debugging build issues
  },
  server: {
    port: 3000, // Vercel uses port 3000
  },
});