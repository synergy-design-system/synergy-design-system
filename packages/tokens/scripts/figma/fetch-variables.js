/**
 * @description Entry-point script for fetching Figma variables.
 *
 * Run this script to download the latest variable tokens from Figma and write
 * them as raw JSON files into the local `src/` directories. These JSON files
 * are later consumed by `transform.js` to build Style-Dictionary-compatible
 * token files.
 *
 * Usage (via package.json script):
 *   FIGMA_TOKEN=<token> pnpm fetch:variables
 *
 * Environment variables:
 *   FIGMA_TOKEN      (required) Personal access token for the Figma REST API.
 *   FIGMA_FILE_ID    (optional) Override the default Figma file ID for component tokens.
 */

import {
  FIGMA_CHARTS_DIR,
  FIGMA_FETCHED_CHARTING_VARIABLES_PATH,
  FIGMA_FETCHED_VARIABLES_PATH,
  FIGMA_VARIABLES_DIR,
} from '../config.js';
import { fetchFigmaVariables } from './figma-client.js';

if (!process.env.FIGMA_TOKEN) {
  throw new Error('FIGMA_TOKEN environment variable is not set');
}

const figmaToken = process.env.FIGMA_TOKEN;

// ---------------------------------------------------------------------------
// Component tokens (main Figma file)
// ---------------------------------------------------------------------------

const DEFAULT_COMPONENT_FILE_ID = 'bZFqk9urD3NlghGUKrkKCR';
const componentFileId = process.env.FIGMA_FILE_ID || DEFAULT_COMPONENT_FILE_ID;

if (!process.env.FIGMA_FILE_ID) {
  console.log('No FIGMA_FILE_ID provided, using default branch ID:', componentFileId);
}

fetchFigmaVariables({
  figmaFileId: componentFileId,
  figmaToken,
  outputDir: FIGMA_VARIABLES_DIR,
  outputPath: FIGMA_FETCHED_VARIABLES_PATH,
}).catch(console.error);

// ---------------------------------------------------------------------------
// Charting tokens (separate Figma file)
// ---------------------------------------------------------------------------

const DEFAULT_CHARTING_FILE_ID = '9IpXnDH4GFziUH9sOpnK8V';
const chartingFileId = process.env.FIGMA_CHARTING_FILE_ID || DEFAULT_CHARTING_FILE_ID;

if (!process.env.FIGMA_CHARTING_FILE_ID) {
  console.log('No FIGMA_CHARTING_FILE_ID provided, using default branch ID:', chartingFileId);
}

fetchFigmaVariables({
  figmaFileId: chartingFileId,
  figmaToken,
  outputDir: FIGMA_CHARTS_DIR,
  outputPath: FIGMA_FETCHED_CHARTING_VARIABLES_PATH,
}).catch(console.error);
