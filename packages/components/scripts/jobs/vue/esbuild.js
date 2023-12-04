import esbuild from 'esbuild';
import { globby } from 'globby';
import vue from 'esbuild-plugin-vue3';
import { job } from '../shared.js';

/**
 * @todo: This is currently disabled. We ship the vue files directly instead.
 * Enabling this will be tackled in another ticket after v1.0.0
 */
export const runEsBuild = job('Vue: Running esbuild...', async (distDir) => {
  // @todo: currently, we will have to use a minified bundle without sourcemap
  // This is, because vues sfc-compiler will append absolute paths to the generated
  // bundle files, e.g. something like // sfc-template: ABSOLUTE_PATH
  // This leads to local paths being exposed to the internet, leaking internal information.
  // Also, we will always create new checksums with this.
  // This should be fixed asap after release 1.0.0!
  const esbuildConfig = {
    bundle: true,
    chunkNames: 'chunks/[name].[hash]',
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    entryPoints: [
      ...(await globby('../vue/src/**/*.(ts|vue)')),
    ],
    external: undefined,
    format: 'esm',
    minify: true, // <- see comment above
    outdir: distDir,
    packages: 'external',
    plugins: [vue({
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('syn-') && !tag.startsWith('syn-vue-'),
      },
    })],
    sourcemap: false, // <- see comment above
    splitting: true,
    target: 'es2020',
  };

  return await esbuild.build(esbuildConfig);
});
