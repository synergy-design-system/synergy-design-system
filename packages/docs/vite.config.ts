/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-relative-packages */
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import { replaceCodePlugin } from 'vite-plugin-replace';
import VitePluginCustomElementsManifest from 'vite-plugin-cem';
import packageJson from '../components/package.json';
import customElementConfig from '../components/custom-elements-manifest.config.js';
import vitePluginSynergyStyles from './src/vite-plugin-synergy-styles/index.js';

const getAbsolutePath = (...pathParts: string[]) => path.join(
  path.dirname(__filename),
  ...pathParts,
);

/**
 * Create an adjusted version of the default manifests plugins.
 * This will make custom data from `package.json` work for metadata.
 */
const getCustomElementManifestPlugins = () => {
  // List of allowed plugins, taken from the
  // components custom-elements-manifest.config.js.
  const allowedPlugins = [
    'package-data',
    'infer-tag-names',
    'custom-tags',
    'translate-module-paths',
    'value-defaultValue-fix',
  ].map(i => `synergy-${i}`);

  const applyablePlugins = customElementConfig.plugins.filter(
    (plugin: { name: string; }) => plugin.name && allowedPlugins.includes(plugin.name),
  );

  return applyablePlugins.map((plugin: { name: any; }) => {
    switch (plugin.name) {
      // Adjust metadata plugin to make it work with relative package.json files
      case 'synergy-package-data': {
        return {
          ...plugin,
          packageLinkPhase({ customElementsManifest }) {
            const packageData = JSON.parse(
              fs.readFileSync(
                getAbsolutePath('../components/package.json'),
                'utf8',
              ),
            );
            const {
              name, description, version, author, homepage, license,
            } = packageData;
            customElementsManifest.package = {
              author,
              description,
              homepage,
              license,
              name,
              version,
            };
          },
        };
      }
      default: {
        return plugin;
      }
    }
  });
};

export default defineConfig(() => ({
  build: {
    lib: {
      entry: getAbsolutePath('../components/src/synergy.ts'),
      fileName: format => `${format}/components.js`,
      name: 'Synergy Components',
    },
    outDir: 'dist',
    rollupOptions: {
      output: {
        chunkFileNames: 'es/[name].js',
        dir: 'dist/components',
        format: 'esm',
      },
      plugins: [],
    },
    target: 'esnext',
  },
  plugins: [
    vitePluginSynergyStyles({
      srcDir: '../styles/src',
    }),
    VitePluginCustomElementsManifest({
      files: ['../components/src/components/**/*.component.ts'],
      lit: true,
      plugins: getCustomElementManifestPlugins(),
    }),
    replaceCodePlugin({
      replacements: [{
        from: '__PACKAGE_VERSION__',
        to: `'${packageJson.version}'`,
      }],
    }),
  ],
}));
