import { ESLint } from 'eslint';
import { job } from './shared.js';

const eslint = new ESLint({
  fix: true,
  useEslintrc: true,
});

export const runFormat = job('Running code formatter...', async (outDir) => {
  const filesToFormat = `${outDir}/**/*.ts`;
  const result = await eslint.lintFiles(filesToFormat);
  await ESLint.outputFixes(result);
});
