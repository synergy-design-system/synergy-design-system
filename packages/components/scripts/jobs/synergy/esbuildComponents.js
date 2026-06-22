import { glob } from 'node:fs/promises';
import esbuild from 'esbuild';
import { replace } from 'esbuild-plugin-replace';
import { job } from '../shared.js';

/**
 * Run esbuild for the components package
 * @param {String} distDir The dist directory where to build to
 * @param {String} __PACKAGE_VERSION__ The string __PACKAGE_VERSION__ will be replaced with this
 */
export const runEsBuildComponents = job('Synergy: Running esbuild...', async (distDir, __PACKAGE_VERSION__ = '') => {
  const esbuildConfig = {
    bundle: true,
    chunkNames: 'chunks/[name].[hash]',
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    entryPoints: [
      // The whole shebang
      './src/synergy.ts',
      // The auto-loader
      './src/synergy-autoloader.ts',
      // Components
      ...(await Array.fromAsync(glob('./src/components/**/*.ts', { exclude: ['**/*.style.ts', '**/*.test.ts'] }))),
      // Translations
      ...(await Array.fromAsync(glob('./src/translations/**/*.ts'))),
      // Theme stylesheets
      ...(await Array.fromAsync(glob('./src/themes/**/*.ts', { exclude: ['**/*.test.ts'] }))),
      // Public utilities
      ...(await Array.fromAsync(glob('./src/utilities/**/*.ts', { exclude: ['**/*.style.ts', '**/*.test.ts'] }))),
    ],
    external: undefined,
    format: 'esm',
    minify: false,
    outdir: distDir,
    packages: 'external',
    plugins: [
      replace({
        __PACKAGE_VERSION__,
      }),
    ],
    sourcemap: true,
    splitting: true,
    target: 'es2017',
  };

  return esbuild.build(esbuildConfig);
});
