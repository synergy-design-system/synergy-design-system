import { ESLint } from 'eslint';

const eslint = new ESLint({
  useEslintrc: true,
  fix: true,
});

export const lintFiles = async (files) => {
  const config = await eslint.calculateConfigForFile(files);
  const result = await eslint.lintFiles(files);
  await ESLint.outputFixes(result);
};
