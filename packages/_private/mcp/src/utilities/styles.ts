import {
  stylesPath,
} from './config.js';
import {
  getStructuredMetaData,
} from './metadata.js';

export const getStylesMetaData = async () => getStructuredMetaData(
  stylesPath,
);
