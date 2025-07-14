import { copyFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { getMetadataPathForStaticFiles } from './shared.js';
import { job } from '../shared.js';

const getStaticFileForProject = (dir, packageDir, packageName, filename) => {
  const source = path.join(packageDir, filename);
  const destination = path.join(getMetadataPathForStaticFiles(dir), packageName, filename);

  return {
    destination,
    source,
  };
};

export const runCopyStaticFiles = job('Synergy MCP: Copying static files...', async (
  rootDir,
  directories,
) => {
  const readmeFiles = directories
    .map(dir => {
      const packageName = path.basename(dir);

      // List of globally available static assets to copy
      return [
        getStaticFileForProject(rootDir, dir, packageName, 'README.md'),
        getStaticFileForProject(rootDir, dir, packageName, 'CHANGELOG.md'),
        getStaticFileForProject(rootDir, dir, packageName, 'LIMITATIONS.md'),
      ];
    })
    .flat()
    .filter(({ source }) => existsSync(source));

  // Create the missing directories if they do not exist
  await Promise.all(
    readmeFiles.map(({ destination }) => {
      const dir = path.dirname(destination);
      if (!existsSync(dir)) {
        return mkdir(dir, {
          recursive: true,
        });
      }
      return Promise.resolve();
    }),
  );

  // Finally, copy all files to their static destination
  return await Promise.all(
    readmeFiles.map(({
      destination,
      source,
    }) => copyFile(source, destination)),
  );
});
