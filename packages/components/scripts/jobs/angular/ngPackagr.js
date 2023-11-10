import { execPromise, job } from '../shared.js';

export const runNGPackagr = job('Angular: Running ng-packgr...', async () => await execPromise(
  'pnpm exec ng-packagr -p ../angular/ng-package.json',
  { stdio: 'inherit' },
));
