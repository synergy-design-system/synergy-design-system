/**
 * @file figma-client.js
 * @description Low-level Figma REST API client used to fetch local variables from a Figma file.
 *
 * This module provides reusable utility functions for:
 *   - Fetching variables from the Figma API
 *   - Filtering out hidden variable collections
 *   - Validating API responses
 *   - Preparing the output directory
 *
 * It is consumed by `fetch-variables.js`, which passes in the file IDs and tokens.
 *
 * @typedef {import('@figma/rest-api-spec').GetLocalVariablesResponse} GetLocalVariablesResponse
 * @typedef {import('@figma/rest-api-spec').GetLocalVariablesResponse['meta']} VariablesAndCollections
 * @typedef {import('@figma/rest-api-spec').ErrorResponsePayloadWithErrorBoolean} ErrorResponsePayloadWithErrorBoolean
 * @typedef {VariablesAndCollections['variables']} Variables
 * @typedef {VariablesAndCollections['variableCollections']} VariableCollections
 */

import {
  existsSync, mkdirSync, rmSync, writeFileSync,
} from 'node:fs';
import { dirname } from 'node:path';
import { sort } from '@tamtamchik/json-deep-sort';

// ---------------------------------------------------------------------------
// Directory helpers
// ---------------------------------------------------------------------------

/**
 * Ensures the output directory exists by removing and recreating it.
 * This guarantees a clean state before writing new output files.
 *
 * @param {string} dir - The directory path to clean up and recreate.
 */
export const prepareOutputDir = (dir) => {
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true });
  }
  mkdirSync(dir, { recursive: true });
};

// ---------------------------------------------------------------------------
// Data filtering
// ---------------------------------------------------------------------------

/**
 * Filters out variable collections that are hidden from publishing,
 * along with all variables that belong to those hidden collections.
 *
 * @param {VariableCollections} variableCollections - All variable collections from the API response.
 * @param {Variables} variables - All variables from the API response.
 * @returns {{ variableCollections: VariableCollections, variables: Variables }}
 */
export const filterHiddenCollections = (variableCollections, variables) => {
  Object.entries(variableCollections).forEach(([collectionId, collection]) => {
    if (collection.hiddenFromPublishing === true) {
      delete variableCollections[collectionId];
    }
  });

  Object.entries(variables).forEach(([variableId, variable]) => {
    if (variableCollections[variable.variableCollectionId] === undefined) {
      delete variables[variableId];
    }
  });

  return { variableCollections, variables };
};

// ---------------------------------------------------------------------------
// Response validation
// ---------------------------------------------------------------------------

/**
 * Validates the Figma API response and throws a descriptive error if the
 * response indicates a failure or is missing metadata.
 *
 * @param {GetLocalVariablesResponse | ErrorResponsePayloadWithErrorBoolean} variablesResponse - The raw API response.
 * @throws {Error} If the response contains an error or no metadata.
 */
export const validateApiResponse = (variablesResponse) => {
  if (variablesResponse.error || !variablesResponse.meta) {
    const errorMessage = variablesResponse.error
      ? `Error ${variablesResponse.status} while fetching. Message: ${variablesResponse?.message || ''}`
      : 'No metadata found in response';
    throw new Error(`Failed to fetch variables: ${errorMessage}`);
  }
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * @typedef {object} FetchFigmaVariablesOptions
 * @property {string} figmaFileId - The Figma file (or branch) ID to fetch variables from.
 * @property {string} figmaToken - The Figma personal access token.
 * @property {string} outputPath - Absolute or relative path to write the resulting JSON file.
 * @property {string} [outputDir] - Directory to prepare before writing. Defaults to the directory of `outputPath`.
 */

/**
 * Fetches local variables from the Figma API, filters out hidden collections,
 * and writes the sorted result as formatted JSON to `outputPath`.
 *
 * @param {FetchFigmaVariablesOptions} options
 * @returns {Promise<void>}
 */
export const fetchFigmaVariables = async ({
  figmaFileId,
  figmaToken,
  outputPath,
  outputDir,
}) => {
  const targetDir = outputDir ?? dirname(outputPath);
  prepareOutputDir(targetDir);

  const headers = { 'X-Figma-Token': figmaToken };

  const variablesFetch = await fetch(
    `https://api.figma.com/v1/files/${figmaFileId}/variables/local`,
    { headers },
  );

  const response = /** @type {GetLocalVariablesResponse} */ (await variablesFetch.json());

  validateApiResponse(response);

  const variableCollections = response.meta.variableCollections || {};
  const variables = response.meta.variables || {};

  const filteredData = filterHiddenCollections(variableCollections, variables);

  writeFileSync(outputPath, JSON.stringify(sort(filteredData), null, 2));
};
