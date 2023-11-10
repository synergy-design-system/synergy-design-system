import path from 'path';
import { ESLint } from 'eslint';
import { job } from '../shared.js';

export const runFormat = job('Angular: Running code formatter...', async (outDir, packagePath) => {
  const eslint = new ESLint({
    fix: true,
    overrideConfig: {
      extends: [
        'airbnb',
        'airbnb-typescript',
        '@synergy-design-system/eslint-config-syn/ts',
      ],
      overrides: [
        {
          extends: ['plugin:@typescript-eslint/disable-type-checked'],
          files: ['./**/*.js'],
        },
      ],
      parserOptions: {
        project: path.join(packagePath, 'tsconfig.json'),
      },
      root: true,
      rules: {
        'import/no-extraneous-dependencies': 0,
        'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'react/react-in-jsx-scope': 0,
      },
    },
    useEslintrc: false,
  });

  const filesToFormat = `${outDir}/**/*.ts`;
  const result = await eslint.lintFiles(filesToFormat);
  await ESLint.outputFixes(result);
});
