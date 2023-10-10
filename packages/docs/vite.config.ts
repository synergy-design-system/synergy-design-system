/* eslint-disable import/no-relative-packages */
import path from 'path';
import { replaceCodePlugin } from 'vite-plugin-replace';
import VitePluginCustomElementsManifest from 'vite-plugin-cem';
import packageJson from '../components/package.json';
import customElementConfig from '../components/custom-elements-manifest.config';

export default (() => ({
  build: {
    lib: {
      entry: path.resolve(__dirname, '../components/src/sick.ts'),
      fileName: format => `${format}/components.js`,
      name: 'SDS Components',
    },
    outDir: 'dist',
    rollupOptions: {
      output: {
        chunkFileNames: 'es/[name].js',
        dir: 'dist/components',
        // Modern JS bundles (no JS compilation, ES module output)
        format: 'esm',
      },
      plugins: [
      ],
    },
  },
  plugins: [
    VitePluginCustomElementsManifest({
      ...customElementConfig,
      globs: ['../components/src/components/**/*.component.ts'],
      plugins: customElementConfig.plugins.filter(
        plugin => plugin.name && ['sick-package-data', 'sick-infer-tag-names', 'sick-custom-tags', 'sick-translate-module-paths'].includes(plugin.name),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any[],
    }),
    replaceCodePlugin({
      replacements: [
        {
          from: '__PACKAGE_VERSION__',
          to: `'${packageJson.version}'`,
        },
      ],
    }),
  ],
}));
