import { mkdir, rm } from 'fs/promises';
import { job } from '../shared.js';

export const runPrepare = job('Synergy: Cleaning up artifacts...', async (dir) => {
  await rm(dir, { force: true, recursive: true });
  return mkdir(dir, {
    recursive: true,
  });
});
