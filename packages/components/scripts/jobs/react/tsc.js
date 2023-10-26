import { execPromise, job } from '../shared.js';

/**
 * Create types via typescript
 * @param {String} outDir The directory where to emit to
 * @param {String} baseDir The base directory path
 */
export const runReactTypeScript = job('React: Generating typescript types...', async (outDir, baseDir) => await execPromise(
  `tsc --project ${baseDir}/tsconfig.json --outDir "${outDir}"`,
  { stdio: 'inherit' },
));
