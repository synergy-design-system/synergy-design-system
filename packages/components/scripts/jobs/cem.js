import fs from 'fs/promises';
import prettier from 'prettier';
import { execPromise, getPath, job } from './shared.js';
// eslint-disable-next-line import/no-relative-packages
import prettierConfig from '../../../../prettier.config.js';

/**
 * Run cem for the components package
 */
export const runCem = job('Creating component manifest...', async () => {
  await execPromise(
    'cem analyze --litelement --outdir dist',
    { stdio: 'inherit' },
  );

  const packageJSON = getPath('../package.json');
  const packageData = await fs.readFile(packageJSON);
  const formattedPackageJSON = await prettier.format(packageData.toString(), {
    ...prettierConfig,
    parser: 'json-stringify',
  });

  await fs.writeFile(packageJSON, formattedPackageJSON);
});
