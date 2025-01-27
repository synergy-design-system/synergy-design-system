import { execPromise, job } from '../shared.js';

/**
 * Create a final ng-packagr build for the angular package
 * @param {String} outDir The directory where to emit to
 * @param {String} baseDir The base directory path
 */
export const runAngularBuild = job('Angular: Building components...', async () => await execPromise(
  'pnpm run -C ../angular _build',
  { stdio: 'inherit' },
));
