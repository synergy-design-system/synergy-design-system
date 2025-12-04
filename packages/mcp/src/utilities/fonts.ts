import {
  fontsPath,
} from './config.js';
import {
  type Filter,
  getStructuredMetaData,
} from './metadata.js';

export const getFontsMetaData = async (
  filter?: Filter,
) => getStructuredMetaData(
  fontsPath,
  filter,
);
