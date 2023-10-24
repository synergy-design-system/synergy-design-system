import esbuild from 'esbuild';
import { replace } from 'esbuild-plugin-replace';
import { globby } from 'globby';
import { job } from './shared.js';

/**
 * Run esbuild for the components package
 * @param {String} distDir The dist directory where to build to
 * @param {String} __PACKAGE_VERSION__ The string __PACKAGE_VERSION__ will be replaced with this
 */
export const runEsBuildComponents = job('Running esbuild...', async (distDir, __PACKAGE_VERSION__ = '') => {
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
      ...(await globby('./src/components/**/!(*.(style|test)).ts')),
      // Translations
      ...(await globby('./src/translations/**/*.ts')),
      // Public utilities
      ...(await globby('./src/utilities/**/!(*.(style|test)).ts')),
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
    splitting: true,
    target: 'es2017',
  };

  return await esbuild.build(esbuildConfig);
});
