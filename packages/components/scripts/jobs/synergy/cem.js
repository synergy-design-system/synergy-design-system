import {
  execPromise,
  formatFile,
  getPath,
  job,
} from '../shared.js';

/**
 * Run cem for the components package
 */
export const runCem = job('Synergy: Creating component manifest...', async (componentDistDir = 'dist') => {
  await execPromise(
    `cem analyze --litelement --outdir ${componentDistDir}`,
    { stdio: 'inherit' },
  );

  await formatFile(getPath('../package.json'), 'json-stringify');
});
