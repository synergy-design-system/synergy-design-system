import { execPromise, job } from './shared.js';

/**
 * Run esbuild for the components package
 */
export const runCem = job('Creating component manifest...', async () => await execPromise(
  'cem analyze --litelement --outdir dist',
  { stdio: 'inherit' },
));
