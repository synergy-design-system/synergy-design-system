import {
  assetsPath,
} from './config.js';
import {
  type Filter,
  getStructuredMetaData,
} from './metadata.js';

export const getAssetsMetaData = async (
  filter?: Filter,
) => getStructuredMetaData(
  assetsPath,
  filter,
);
