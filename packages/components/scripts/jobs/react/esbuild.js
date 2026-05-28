import { glob } from 'node:fs/promises';
import esbuild from 'esbuild';
import { job } from '../shared.js';

export const runEsBuild = job('React: Running esbuild...', async (distDir) => {
  const esbuildConfig = {
    bundle: true,
    chunkNames: 'chunks/[name].[hash]',
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    entryPoints: [
      ...(await Array.fromAsync(glob('../react/src/**/*.ts'))),
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

  return esbuild.build(esbuildConfig);
});
