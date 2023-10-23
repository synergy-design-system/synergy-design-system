import fs from 'fs/promises';
import path from 'path';
import { job } from './shared.js';

/**
 * Make sure that @sick-design-system/react
 * matches the package version of @sick-design-system/components
 */
export const runAdjustPackageVersion = job('Adjusting package.json version field...', async () => {
  // Get the version field from the components package.json
  const componentPackageAsString = await fs.readFile(path.join('../components/package.json'), {
    encoding: 'utf-8',
  });
  const { version } = JSON.parse(componentPackageAsString);

  // Get the react packages package.json
  const reactPackageAsString = await fs.readFile(path.join('package.json'));
  const reactPackageAsJSON = JSON.parse(reactPackageAsString);

  // Write out the changed package.json file with adjusted version
  return await fs.writeFile(
    path.join('package.json'),
    [
      JSON.stringify({ ...reactPackageAsJSON, version }, null, 2).trim(),
      '',
    ].join('\n'),
  );
});
