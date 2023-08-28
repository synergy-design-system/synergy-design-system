import { transforms } from '@tokens-studio/sd-transforms';
import { prefix } from './config.js';

/**
 * Create a new transform group
 * @param {String} name The name of the transform group
 * @param {String[]} additionalTransforms List of additional transforms
 * @returns {Object} Style dictionary conform transform group
 */
export const createTransformGroup = (name, additionalTransforms = []) => ({
  name,
  transforms: [
    ...transforms,
    ...additionalTransforms,
  ],
});

/**
 * Default transform group.
 * Uses tokens studio per default, but adds support for automatic calculation
 */
export const SDSTransformGroupDefault = createTransformGroup(
  `${prefix}/tokens-studio`,
  ['sds/calc', 'name/cti/kebab'],
);
