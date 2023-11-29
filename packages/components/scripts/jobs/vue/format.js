import path from 'path';
import { ESLint } from 'eslint';
import { job } from '../shared.js';

export const runFormat = job('Vue: Running code formatter...', async (outDir, packagePath) => {
  const eslint = new ESLint({
    fix: true,
    overrideConfig: {
      extends: [
        'plugin:vue/vue3-recommended',
        '@synergy-design-system/eslint-config-syn/ts',
      ],
      parser: 'vue-eslint-parser',
      parserOptions: {
        extraFileExtensions: ['.vue'],
        parser: '@typescript-eslint/parser',
        project: path.join(packagePath, 'tsconfig.json'),
      },
      root: true,
    },
    useEslintrc: false,
  });

  const filesToFormat = `${outDir}/**/*.vue`;
  const result = await eslint.lintFiles(filesToFormat);
  await ESLint.outputFixes(result);
});
