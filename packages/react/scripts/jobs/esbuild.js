import esbuild from 'esbuild';
import { globby } from 'globby';
import { job } from './shared.js';

export const runEsBuild = job('Running esbuild...', async (distDir) => {
  const esbuildConfig = {
    bundle: true,
    chunkNames: 'chunks/[name].[hash]',
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    entryPoints: [
      './src/index.ts',
      // Components
      ...(await globby('./src/**/!(*.(style|test)).ts')),
    ],
    external: undefined,
    format: 'esm',
    minify: false,
    outdir: distDir,
    packages: 'external',
    splitting: true,
    target: 'es2017',
  };

  await esbuild.build(esbuildConfig);
});
