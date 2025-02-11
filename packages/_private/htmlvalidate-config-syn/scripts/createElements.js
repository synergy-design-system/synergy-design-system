import { defineMetadata } from 'html-validate';
import { createMetaData } from './rules.js';

export const createElements = () => defineMetadata({
  ...createMetaData(),
});
