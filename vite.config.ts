import { resolve } from 'pathe';
import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dtsPlugin({
      insertTypesEntry: true
    })
  ],

  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'fenValidator',
      fileName: 'fen-validator',
      formats: ['cjs', 'es', 'iife', 'umd']
    }
  }
});
