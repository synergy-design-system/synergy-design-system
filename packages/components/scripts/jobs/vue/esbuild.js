import esbuild from 'esbuild';
import { globby } from 'globby';
import vue from 'esbuild-plugin-vue3';
import { job } from '../shared.js';

export const runEsBuild = job('Vue: Running esbuild...', async (distDir) => {
  const esbuildConfig = {
    bundle: true,
    chunkNames: 'chunks/[name].[hash]',
    define: {
      'process.env.NODE_ENV': JSON.stringify('development'),
    },
    entryPoints: [
      ...(await globby('../vue/src/**/*.(ts|vue)')),
    ],
    external: undefined,
    format: 'esm',
    minify: false,
    outdir: distDir,
    packages: 'external',
    plugins: [vue()],
    sourcemap: true,
    splitting: true,
    target: 'es2020',
  };

  return await esbuild.build(esbuildConfig);
});
