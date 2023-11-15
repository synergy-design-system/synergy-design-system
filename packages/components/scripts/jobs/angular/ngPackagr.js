import { execPromise, job } from '../shared.js';

export const runNgPackagr = job('Angular: Running ng-packagr...', async () => await execPromise(
  'pnpm exec ng-packagr -p ../angular/ng-package.json',
  { stdio: 'inherit' },
));
