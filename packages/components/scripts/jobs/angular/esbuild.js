import esbuild from 'esbuild';
import { globby } from 'globby';
import { job } from '../shared.js';

export const runEsBuild = job('Angular: Running esbuild...', async (distDir) => {
  const esbuildConfig = {
    bundle: true,
    chunkNames: 'chunks/[name].[hash]',
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    entryPoints: [
      ...(await globby('../angular/src/**/!(*.(style|test)).ts')),
    ],
    external: undefined,
    format: 'esm',
    minify: false,
    outdir: distDir,
    packages: 'external',
    sourcemap: true,
    splitting: true,
    target: 'es2020',
  };

  return await esbuild.build(esbuildConfig);
});
