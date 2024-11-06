import { execPromise, job } from '../shared.js';

/**
 * Create a final vite build for the vue package
 * @param {String} outDir The directory where to emit to
 * @param {String} baseDir The base directory path
 */
export const runVueBuild = job('Vue: Building components...', async () => await execPromise(
  'pnpm run -C ../vue _build',
  { stdio: 'inherit' },
));
