import fs from 'fs/promises';
import { deleteAsync } from 'del';
import { job } from './shared.js';

export const runPrepare = job('Cleaning up artifacts...', async (outDir, distDir) => {
  await Promise.all([
    deleteAsync(outDir),
    deleteAsync(distDir),
  ]);
  await fs.mkdir(outDir, {
    recursive: true,
  });
});
