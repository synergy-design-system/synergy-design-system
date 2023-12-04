import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import { job } from './shared.js';

/**
 * This function will create checksums of framework wrapper packages to keep track of changes
 * for Semantic Release
 */
export const runCreateChecksums = job('Checksums updated in package.json', async () => {
  function extractShasum(output) {
    const shasumRegex = /npm notice shasum:\s+([a-f0-9]{40})\s+/i;
    const match = output.match(shasumRegex);

    if (match && match[1]) {
      return match[1];
    }

    throw new Error('Shasum not found in npm publish output');
  }

  function getChecksum(directory) {
    // Save the current working directory
    const originalDirectory = process.cwd();

    // Change to the target directory
    process.chdir(directory);

    // Run `npm publish --dry-run` and capture the output
    const output = execSync('npm publish --dry-run 2>&1', { encoding: 'utf-8' });

    // Return to the original directory
    process.chdir(originalDirectory);

    // Extract and return the shasum
    return extractShasum(output);
  }

  function updatePackageJson(checksum, project) {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Ensure meta.checksums object exists
    packageJson.meta = packageJson.meta || {};
    packageJson.meta.checksums = packageJson.meta.checksums || {};

    // Update the checksum
    packageJson.meta.checksums[project] = checksum;

    // Write the updated package.json back to disk
    fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
  }

  try {
    const angularChecksum = getChecksum('../angular');
    const reactChecksum = getChecksum('../react');
    // const vueChecksum = getChecksum('../vue');

    await updatePackageJson(angularChecksum, 'angular');
    await updatePackageJson(reactChecksum, 'react');
    // await updatePackageJson(vueChecksum, 'vue');
  } catch (error) {
    console.error('An error occurred:', error);
  }
});
