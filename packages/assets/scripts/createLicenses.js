/* eslint-disable no-console */
/**
 * @typedef {import('./config.js').LicenseEntry} LicenseEntry
 */

/**
 * @typedef {Object} LicenseEntryResult
 * @property {LicenseEntry} license - The license entry that was processed.
 * @property {boolean} success - Whether the license was successfully copied.
 */

import fs from 'node:fs';
import { exit } from 'node:process';
import { fileURLToPath } from 'node:url';
import { LICENSE_MAP } from './config.js';

/**
 * Resolve a path relative to the current module.
 * @param {string} path The path to resolve
 * @param {string} [basePath='../'] The base path to resolve from, defaults to '../'
 * @returns {string} The resolved path
 */
const resolveLocalPath = (path, basePath = '../') => fileURLToPath(
  import.meta.resolve(`${basePath}${path}`),
);

/**
 * Checks for existence of the provided license and paths
 * and copies the license file to each path.
 * @param {LicenseEntry} license The license entry to process
 * @returns {LicenseEntryResult} Resolves to an object containing the license name and paths
 */
const copyLicense = license => {
  const licensePath = resolveLocalPath(license.license);
  if (!fs.existsSync(licensePath)) {
    throw new Error(`License file not found: ${licensePath}`);
  }

  const results = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const path of license.paths) {
    const resolvedPath = resolveLocalPath(path);
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`Path not found: ${resolvedPath}`);
    }

    const targetFile = `${resolvedPath}/LICENSE`;
    fs.copyFileSync(licensePath, targetFile);
    results.push({ license, success: true });
  }
  return results;
};

/**
 * Creates a LICENSE file for each provided folder in the LICENSE_MAP.
 * @returns {Promise<LicenseEntryResult[]>} Resolves to an array of license result entries.
 */
const copyLicenses = async () => {
  const results = await Promise.all(
    LICENSE_MAP.map(copyLicense),
  );
  return results.flat();
};

copyLicenses()
  .then(result => {
    const output = result
      .map(r => `  → Successfully copied "${r.license.name}" (${r.license.license}) to destinations (${r.license.paths.join(', ')})`)
      .join('\n');
    console.log(`✔ Licenses copied successfully\n${output}`);
    exit(0);
  })
  .catch(e => {
    console.error('⛔️ Error copying licenses', e);
    exit(1);
  });
