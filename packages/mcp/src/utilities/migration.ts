import {
  assetsPath,
  componentBasePath,
  componentMigrationPath,
  staticMigrationPath,
  tokensPath,
} from './config.js';
import {
  getStructuredMetaData,
} from './metadata.js';

type AvailablePackages = 'assets' | 'components' | 'tokens';

const getAssetsMigrationMetaData = async () => {
  const fileList = [
    'CHANGELOG.md',
    'BREAKING_CHANGES.md',
  ];

  return getStructuredMetaData(
    assetsPath,
    item => fileList.includes(item),
  );
};

const getTokensMigrationMetaData = async () => {
  const fileList = [
    'CHANGELOG.md',
    'BREAKING_CHANGES.md',
  ];

  return getStructuredMetaData(
    tokensPath,
    item => fileList.includes(item),
  );
};

const getComponentsMigrationMetaData = async () => {
  const data = await getStructuredMetaData(componentMigrationPath);
  const additionalData = await getStructuredMetaData(staticMigrationPath);
  const changelog = await getStructuredMetaData(componentBasePath, item => ['CHANGELOG.md'].includes(item));

  return [
    ...data,
    ...additionalData,
    ...changelog,
  ];
};

export const getMigrationMetaData = async (requestedPackage: AvailablePackages = 'components') => {
  switch (requestedPackage) {
  case 'assets': return getAssetsMigrationMetaData();
  case 'tokens': return getTokensMigrationMetaData();
  case 'components':
  default: return getComponentsMigrationMetaData();
  }
};
