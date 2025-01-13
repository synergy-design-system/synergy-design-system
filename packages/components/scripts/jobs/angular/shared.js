/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { formatFile, job } from '../shared.js';

/**
 * Creates an ng-package.json file for the given entry file
 * @param {*} entryFile - the entry file it is created for
 * @param {*} outDir - the path where it is written to
 */
export const createNgPackageJson = (entryFile, outDir) => {
  const ngPackageJson = {
    $schema: '../../../node_modules/ng-packagr/ng-package.schema.json',
    lib: {
      entryFile,
    },
  };

  const ngPackageJsonPath = path.join(outDir, 'ng-package.json');

  fs.writeFileSync(ngPackageJsonPath, JSON.stringify(ngPackageJson, null, 2));
};

/**
 * Adjust the package.json exports field located in packageDir by removing the 'src' prefix
 * @param {string} label The label
 * @returns {job}
 */
export const runAdjustPackageExports = (label) => job(label, async (packageDir) => {
  const packageJsonPath = path.join(packageDir, 'package.json');
  // Get the exports field from the package.json
  const packageAsString = fs.readFileSync(packageJsonPath, {
    encoding: 'utf-8',
  });
  const packageAsJson = JSON.parse(packageAsString);

  const oldExports = packageAsJson.exports;

  const updatedExports = Object.keys(oldExports).reduce((acc, key) => {
    const updatedKey = key.replace(/^\.\/src\//, './');
    acc[updatedKey] = oldExports[key];
    return acc;
  }, {});

  // Write out the changed package.json file with adjusted exports
  // and format it using prettier
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify({ ...packageAsJson, exports: updatedExports }),
  );

  await formatFile(packageJsonPath, 'json-stringify');
});
