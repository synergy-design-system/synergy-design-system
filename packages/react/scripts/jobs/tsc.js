import { execPromise, job } from './shared.js';

export const runTypeScript = job('Generating typescript types...', async (distDir) => await execPromise(
  `tsc --project ./tsconfig.prod.json --outdir "${distDir}"`,
  { stdio: 'inherit' },
));
