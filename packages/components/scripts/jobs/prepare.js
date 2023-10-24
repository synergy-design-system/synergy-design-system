import fs from 'fs/promises';
import { deleteAsync } from 'del';
import { job } from './shared.js';

export const runPrepare = job('Cleaning up artifacts...', async (dir) => {
  await Promise.all([
    deleteAsync(dir),
  ]);
  return await fs.mkdir(dir, {
    recursive: true,
  });
});
