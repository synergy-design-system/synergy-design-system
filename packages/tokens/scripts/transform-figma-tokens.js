import path from 'path';
import { promises as fs } from 'fs';
import inputData from '../src/figma-variables/tokens.json' with { type: 'json' };
import { useFigmaToDTCG } from '@tfk-samf/figma-to-dtcg';

const outputDirectory = './src/figma-variables/output';

const inputVariables = inputData['variables'];
const transformedVariables = {};
for (const [, value] of Object.entries(inputVariables)) {
  transformedVariables[value.id] = value;
}

const inputVariableCollections = inputData['variableCollections'];
const transformedVariableCollections = {};
for (const [, value] of Object.entries(inputVariableCollections)) {
  value['variableIds'] = Object.values(value['variableIds'])
  value['modes'] = Object.values(value['modes']);
  transformedVariableCollections[value.id] = value;
}


const { tokens } = await useFigmaToDTCG({
  api: "rest",
  response: { meta: { variableCollections: transformedVariableCollections }, variables: transformedVariables }
});


const outputFilePath = path.join(outputDirectory, 'tokens.json');

await fs.mkdir(outputDirectory, { recursive: true });
await fs.writeFile(outputFilePath, JSON.stringify(tokens, null, 2));
