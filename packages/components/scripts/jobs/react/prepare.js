import fs from 'fs/promises';
import { deleteAsync } from 'del';
import { job } from '../shared.js';

export const runPrepare = job('React: Cleaning up artifacts...', async (outDir, distDir) => {
  await Promise.all([
    deleteAsync(outDir, { force: true }),
    deleteAsync(distDir, { force: true }),
  ]);

  await fs.mkdir(outDir, {
    recursive: true,
  });
  await fs.mkdir(distDir, {
    recursive: true,
  });
});
