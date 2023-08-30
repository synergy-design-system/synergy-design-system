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
    // Strip out resolveMath as it does not work with outputReferences
    // @see https://github.com/amzn/style-dictionary/issues/974
    ...transforms.filter((transform) => transform !== 'ts/resolveMath'),
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

/**
 * Transform group for SASS.
 * Does not need calc() statements at all
 */
export const SDSTransformGroupSASS = createTransformGroup(
  `${prefix}/tokens-studio-scss`,
  ['name/cti/kebab'],
);
