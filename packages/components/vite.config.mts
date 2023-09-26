import customElementConfig from './custom-elements-manifest.config';
import packageJson from "./package.json";
import { replaceCodePlugin } from "vite-plugin-replace";
import VitePluginCustomElementsManifest from 'vite-plugin-cem';
import path from 'path';

export default (({ command }: { command: string; }) => {
  return {
    plugins: [
      VitePluginCustomElementsManifest(customElementConfig as any),
      replaceCodePlugin({
        replacements: [
          {
            from: "__PACKAGE_VERSION__",
            to: `'${packageJson.version}'`,
          },
        ],
      }),
    ],
    build: {
      outDir: 'dist',
      lib: {
        entry: path.resolve(__dirname, 'src/components.ts'),
        name: 'Solid Components',
        fileName: format => `${format}/components.js`
      },
      rollupOptions: {
        output: {
          // Modern JS bundles (no JS compilation, ES module output)
          format: 'esm',
          chunkFileNames: 'es/[name].js',
          dir: 'dist/components'
        },
        plugins: [
        ]
      }
    }
  };
});
