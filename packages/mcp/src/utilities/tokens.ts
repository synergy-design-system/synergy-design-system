import { globby } from 'globby';
import {
  tokensPath,
} from './config.js';
import {
  getStructuredMetaData,
} from './metadata.js';

export const getTokensMetaData = async (type: 'css' | 'javascript' = 'css') => {
  const fileList = [
    'README.md',
    'CHANGELOG.md',
  ];

  if (type === 'javascript') {
    fileList.push('*.js');
    fileList.push('*.ts');
  } else if (type === 'css') {
    fileList.push('*.css');
  }

  const finalList = await globby(fileList, {
    cwd: tokensPath,
    onlyFiles: true,
  });

  return getStructuredMetaData(
    tokensPath,
    item => finalList.includes(item),
  );
};

export const getTokensMigrationMetaData = async () => {
  const fileList = [
    'CHANGELOG.md',
    'BREAKING_CHANGES.md',
  ];

  return getStructuredMetaData(
    tokensPath,
    item => fileList.includes(item),
  );
};
