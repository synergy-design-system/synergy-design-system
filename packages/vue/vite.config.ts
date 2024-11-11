import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import nodeExternals from 'rollup-plugin-node-externals'
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    outDir: 'dist',
    minify: false,
    rollupOptions: {
      external: ['vue'],
      input: ['src/index.ts'],
      output: [{
        format: 'es',
        entryFileNames: '[name].js',
        preserveModules: true,
        exports: 'auto',
        strict: true,
      }],
      preserveEntrySignatures: 'exports-only',
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('syn-'),
        },
      },
    }),
    dts({
      include: ['src'],
      tsconfigPath: "./tsconfig.json",
      outDir: ["./dist"],
    }),
    nodeExternals(),
  ],
});
