/**
 * @typedef {import('@figma/rest-api-spec').GetLocalVariablesResponse} GetLocalVariablesResponse
 */
import path from 'path';
import { promises as fs } from 'fs';

const OUTPUT_DIR = './src/figma-variables';

/**
 * Fetches local variables from Figma API and saves them to a JSON file.
 */
const fetchFigmaVariables = async () => {
  const branchId = process.env.FIGMA_FILE_ID || 'bZFqk9urD3NlghGUKrkKCR';
  if (!process.env.FIGMA_FILE_ID) {
    console.log('No FIGMA_FILE_ID provided, using default branch ID:', branchId);
  }

  if (!process.env.FIGMA_ACCESS_TOKEN) {
    throw new Error('FIGMA_ACCESS_TOKEN environment variable is not set');
  }

  const headers = { 'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN };

  const variablesFetch = await fetch(`https://api.figma.com/v1/files/${branchId}/variables/local`, { headers });

  const variablesResponse = /** @type {GetLocalVariablesResponse} */ (await variablesFetch.json());

  if (variablesResponse.error || !variablesResponse.meta) {
    const errorMessage = variablesResponse.error ? `Error ${variablesResponse.status} while fetching ` : 'No metadata found in response';
    throw new Error(`Failed to fetch variables: ${errorMessage}`);
  }

  // Filter out variable collections that are hidden from publishing
  const variableCollections = variablesResponse.meta.variableCollections || {};
  for (const [collectionId, collection] of Object.entries(variableCollections)) {
    if (collection.hiddenFromPublishing === true) {
      delete variableCollections[collectionId];
    }
  }

  // Filter out variables that used collections that are hidden from publishing
  const variables = variablesResponse.meta.variables || {};
  for (const [variableId, variable] of Object.entries(variables)) {
    if (variableCollections[variable.variableCollectionId] === undefined) {
      delete variables[variableId];
    }
  }

  const outputPath = path.join(OUTPUT_DIR, 'tokens.json');
  const data = {
    variableCollections,
    variables,
  };
  await fs.writeFile(outputPath, JSON.stringify(data, null, 2));
};

fetchFigmaVariables();
