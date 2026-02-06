import {
  assetsPath,
  componentBasePath,
  componentMigrationPath,
  staticMigrationPath,
  stylesPath,
  tokensPath,
} from './config.js';
import {
  getStructuredMetaData,
} from './metadata.js';

type AvailablePackages = 'assets' | 'components' | 'tokens' | 'styles';

/**
 * Low level utility to get migration metadata for a specific package.
 * @param path The path to retreive the information from
 * @param fileList A list of filenames that should be included
 */
const getBaseMigrationMetaData = async (
  path: string,
  fileList: string[] = [
    'CHANGELOG.md',
    'BREAKING_CHANGES.md',
  ],
) => getStructuredMetaData(
  path,
  item => fileList.includes(item),
);

const getAssetsMigrationMetaData = async () => getBaseMigrationMetaData(assetsPath);

const getStylesMigrationMetaData = async () => getBaseMigrationMetaData(stylesPath);

const getTokensMigrationMetaData = async () => getBaseMigrationMetaData(tokensPath);

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
    case 'styles': return getStylesMigrationMetaData();
    case 'components':
    default: return getComponentsMigrationMetaData();
  }
};
