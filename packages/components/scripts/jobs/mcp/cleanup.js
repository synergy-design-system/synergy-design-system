import fs from 'fs/promises';
import { deleteAsync } from 'del';
import { job } from '../shared.js';
import { getMetadataPathsForComponents } from './shared.js';

export const runCleanup = job('Synergy MCP: Cleaning up component metadata...', async (metadata, dir) => {
  const metadataDirs = await getMetadataPathsForComponents(metadata, dir);

  const deleteMetadataDirs = metadataDirs.map(async d => await deleteAsync(d, { force: true }));
  await Promise.all(deleteMetadataDirs);

  const createDirs = metadataDirs.map(async d => await fs.mkdir(d, {
    recursive: true,
  }));
  return await Promise.all(createDirs);
});
