import { mkdir, rm } from 'node:fs/promises';
import { getPath, job } from '../shared.js';

export const runCleanup = job('Cleaning up artifacts...', async () => {
  const dir = getPath('./dist');
  await rm(dir, { force: true, recursive: true });
  return mkdir(dir, {
    recursive: true,
  });
});
