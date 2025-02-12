import { execPromise, job } from '../shared.js';

/**
 * Create types via typescript
 * @param {String} outDir The directory where to emit to
 * @param {String} tsConfigPath [optional] path to the tsconfig file to use
 */
export const runTypeScript = job('Synergy: Generating typescript types...', async (
  outDir,
  tsConfigPath = './tsconfig.json',
) => await execPromise(
  `tsc --project ${tsConfigPath} --outDir "${outDir}"`,
  { stdio: 'inherit' },
));
