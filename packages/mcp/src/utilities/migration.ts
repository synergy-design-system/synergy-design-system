import {
  componentMigrationPath,
  staticMigrationPath,
} from './config.js';
import {
  getStructuredMetaData,
} from './metadata.js';

export const getMigrationMetaData = async () => {
  const data = await getStructuredMetaData(componentMigrationPath);
  const additionalData = await getStructuredMetaData(staticMigrationPath);

  return [
    ...data,
    ...additionalData,
  ];
};
