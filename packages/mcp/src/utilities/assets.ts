import {
  assetsPath,
} from './config.js';
import {
  getStructuredMetaData,
} from './metadata.js';

export const getAssetsMetaData = async () => getStructuredMetaData(
  assetsPath,
);
