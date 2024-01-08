import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import { job } from './shared.js';

/**
 * This function will create checksums of framework wrapper packages to keep track of changes
 * for Semantic Release
 */
export const runCreateChecksums = job('Checksums updated in package.json', async () => {
  function updatePackageJson(project) {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Ensure meta.checksums object exists
    packageJson.meta = packageJson.meta || {};
    packageJson.meta.checksums = packageJson.meta.checksums || {};

    // Update the checksum
    packageJson.meta.checksums[project] = execSync(`git rev-parse HEAD:packages/${project} 2>&1`, { encoding: 'utf-8' }).trim();

    // Write the updated package.json back to disk
    fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
  }

  try {
    await updatePackageJson('angular');
    await updatePackageJson('react');
    await updatePackageJson('vue');
  } catch (error) {
    console.error('An error occurred:', error);
  }
});
