/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

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
