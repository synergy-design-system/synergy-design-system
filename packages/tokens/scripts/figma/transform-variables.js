/**
 * @file transform-tokens.js
 * @description Entry-point script for transforming fetched Figma variables into
 * Style-Dictionary-compatible token files.
 *
 * Run this script after `fetch-variables.js` to convert the raw Figma variable JSON files
 * stored in `src/` into per-theme token files that Style Dictionary can consume.
 *
 * Usage (via package.json script):
 *   pnpm build:variables
 *
 * Output directories are defined in `../config.js`.
 *
 * @typedef {import('@figma/rest-api-spec').GetLocalVariablesResponse['meta']} VariablesAndCollections
 */
import variablesJson from '../../src/figma-variables/variableTokens.json' with { type: 'json' };
import {
  CHARTS_OUTPUT_DIR,
  CHART_COLLECTION_NAME,
  COMPONENTS_COLLECTION_NAME,
  COMPONENTS_OUTPUT_DIR,
  shouldSkipChartingTransform,
} from '../config.js';
import { transformFigmaVariables } from './transformer-variables-generic.js';

transformFigmaVariables({
  collectionName: COMPONENTS_COLLECTION_NAME,
  outputDir: COMPONENTS_OUTPUT_DIR,
  variablesData: /** @type {VariablesAndCollections} */ (variablesJson),
});

if (shouldSkipChartingTransform()) {
  console.log('Skipping charting variable transform (SKIP_CHARTING/SKIP_CHARTING_TRANSFORM=true).');
} else {
  const chartsJson = (await import('../../src/figma-charts/chartTokens.json', { with: { type: 'json' } })).default;
  transformFigmaVariables({
    collectionName: CHART_COLLECTION_NAME,
    outputDir: CHARTS_OUTPUT_DIR,
    variablesData: /** @type {VariablesAndCollections} */ (chartsJson),
  });
}
