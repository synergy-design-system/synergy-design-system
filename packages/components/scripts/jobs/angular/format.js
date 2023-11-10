import path from 'path';
import { ESLint } from 'eslint';
import { job } from '../shared.js';

export const runFormat = job('Angular: Running code formatter...', async (outDir, packagePath) => {
  const eslint = new ESLint({
    fix: true,
    overrideConfig: {
      extends: [
        '@synergy-design-system/eslint-config-syn/ts',
      ],
      overrides: [
        {
          extends: ['plugin:@typescript-eslint/disable-type-checked'],
          files: ['./**/*.js'],
        },
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: false,
        },
        project: path.join(packagePath, 'tsconfig.json'),
      },
      root: true,
      rules: {
        'import/no-extraneous-dependencies': 0,
      },
    },
    useEslintrc: false,
  });

  const filesToFormat = `${outDir}/**/*.ts`;
  const result = await eslint.lintFiles(filesToFormat);
  await ESLint.outputFixes(result);
});
