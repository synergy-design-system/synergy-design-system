import { execPromise, job } from '../shared.js';

/**
 * Create types via typescript
 * @param {String} outDir The directory where to emit to
 * @param {String} baseDir The base directory path
 */
export const runVueTypeScript = job('Vue: Generating typescript types...', async (outDir, baseDir) => await execPromise(
  `vue-tsc --project ${baseDir}/tsconfig.json --declaration --outDir "${outDir}"`,
  { stdio: 'inherit' },
));
