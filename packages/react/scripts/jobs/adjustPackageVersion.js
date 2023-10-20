import fs from 'fs/promises';
import path from 'path';
import { job } from './shared.js';

/**
 * Make sure that @sick-design-system/react
 * matches the package version of @sick-design-system/components
 */
export const runAdjustPackageVersion = job('Adjusting package.json version field...', async () => {
  const componentPackageAsString = await fs.readFile(path.join('../components/package.json'), {
    encoding: 'utf-8',
  });
  const { version } = JSON.parse(componentPackageAsString);

  const reactPackageAsString = await fs.readFile(path.join('package.json'));
  const reactPackageAsJSON = JSON.parse(reactPackageAsString);

  const nextPackageJSON = {
    ...reactPackageAsJSON,
    version,
  };

  await fs.writeFile(path.join('package.json'), JSON.stringify(nextPackageJSON, null, 2));
});
