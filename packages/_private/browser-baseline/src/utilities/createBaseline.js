import fs from 'node:fs';
import browserslist from 'browserslist';
import {
  usedBaseline,
  baselines,
} from '../config.js';
import { generateBaselineIndex } from './generateBaselineIndex.js';
import { generateConfig } from './generateConfig.js';

/**
 * Creates a new baseline configuration based on the provided options
 * @param {import('../types.js').CreateBaselineOptions} options Options to create baseline from
 * @return {boolean} True if the baseline was created successfully
 * @throws Will throw an error if the baseline could not be created
 */
export const createBaseline = ({
  baseline = usedBaseline,
  path = baselines,
  version = undefined,
} = {}) => {
  if (!baseline) {
    throw new Error('No baseline specified and no default baseline found');
  }

  if (!path) {
    throw new Error('No path specified and no default path found');
  }

  if (!version) {
    throw new Error('No version specified and no default version found');
  }

  // Check if the baselines directory exists
  if (!fs.existsSync(path)) {
    throw new Error(`Baselines directory not found at path: ${path}`);
  }

  // Write the baseline to the new file
  try {
    // Write the new config
    const newConfig = generateConfig(
      browserslist(baseline),
      version,
      baseline,
    );
    fs.writeFileSync(`${path}/${version}.js`, newConfig, 'utf-8');

    // Regenerate the index file
    generateBaselineIndex();
    return true;
  } catch (e) {
    const error = /** @type {Error} */ (e);
    throw new Error(`Failed to write baseline to file: ${error.message}`);
  }
};
