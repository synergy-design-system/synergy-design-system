import {
  execPromise,
  formatFile,
  getPath,
  job,
} from './shared.js';

/**
 * Run cem for the components package
 */
export const runCem = job('Creating component manifest...', async () => {
  await execPromise(
    'cem analyze --litelement --outdir dist',
    { stdio: 'inherit' },
  );

  await formatFile(getPath('../package.json'), 'json-stringify');
});
