/**
 * @typedef {keyof typeof baselines} BaselineKeys
 */
import * as baselines from './baselines/index.js';

/**
 * Get the baseline configuration for a specific version
 * @param {BaselineKeys} version The version to get the baseline for
 * @returns {string[]} The baseline configuration for the specified version
 * @throws Will throw an error if the specified version does not exist
 */
export const getBaseline = (version) => {
  if (!baselines[version]) {
    throw new Error(`Baseline for version ${version} not found. Available versions: ${Object.keys(baselines).join(', ')}`);
  }
  return baselines[version];
};
