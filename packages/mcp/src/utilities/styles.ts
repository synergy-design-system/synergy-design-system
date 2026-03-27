import {
  staticStylesPath,
  stylesPath,
} from './config.js';
import {
  getStructuredMetaData,
} from './metadata.js';

export const getStylesMetaData = async () => {
  const data = await getStructuredMetaData(stylesPath);
  const additionalData = await getStructuredMetaData(staticStylesPath);

  return [
    ...data,
    ...additionalData,
  ];
};
