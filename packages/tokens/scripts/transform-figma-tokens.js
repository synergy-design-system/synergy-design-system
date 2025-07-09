import path from 'path';
import { promises as fs } from 'fs';
import inputData from '../src/figma-variables/tokens.json' with { type: 'json' };
import { sort } from '@tamtamchik/json-deep-sort';

const OUTPUT_DIR = './src/figma-variables/output';

// --- Utility Functions ---

const createDirectory = async dirPath => {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
};

const setNestedProperty = (obj, keys, value) => {
  let current = obj;
  keys.slice(0, -1).forEach(key => {
    if (!current[key]) current[key] = {};
    current = current[key];
  });
  current[keys[keys.length - 1]] = value;
};

const formatColor = ({ r, g, b, a }) => {
  const red = Math.round(r * 255);
  const green = Math.round(g * 255);
  const blue = Math.round(b * 255);

  if (a !== undefined && a < 1) {
    return `rgba(${red}, ${green}, ${blue}, ${a.toFixed(2)})`;
  }
  return `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;
};

const resolveAlias = id => {
  const aliasVar = Object.values(inputData.variables).find(v => v.id === id);
  if (!aliasVar) return null;
  const aliasName = aliasVar.name.toLowerCase();
  const aliasType = aliasVar.resolvedType === 'FLOAT'
    ? 'sizing'
    : aliasVar.resolvedType.toLowerCase();
  return { value: `{${aliasName}}`, type: aliasType };
};

// --- Main Transformation ---

const transformFigmaVariables = async () => {
  const transformed = {};

  Object.values(inputData.variables).forEach(variable => {
    const { name, valuesByMode, variableCollectionId, resolvedType } = variable;
    const collection = Object.values(inputData.variableCollections)
      .find(c => c.id === variableCollectionId);

    const defaultValue = valuesByMode?.[collection.id];

    Object.values(collection.modes).forEach(mode => {
      const { modeId, name: modeName } = mode;
      const modeValue = valuesByMode?.[modeId];
      if (!transformed[modeName]) transformed[modeName] = {};

      const cleanName = name.toLowerCase();
      const keys = cleanName.split('.');

      let finalValue, type;

      if (modeValue?.type === 'VARIABLE_ALIAS') {
        const resolved = resolveAlias(modeValue.id);
        if (resolved) {
          finalValue = resolved.value;
          type = resolved.type;
        }
      } else if (resolvedType === 'FLOAT') {
        if (cleanName.includes('opacity')) {
          finalValue = `${parseFloat(modeValue ?? defaultValue)}%`.replace('NaN', '0');
          type = 'opacity';
        } else if (cleanName.includes('weight')) {
          finalValue = `${parseFloat(modeValue ?? defaultValue)}`;
          type = 'fontWeights';
        } else {
          finalValue = `${parseFloat(modeValue ?? defaultValue)}px`.replace('NaN', '0');
          type = 'sizing';
        }
      } else if (modeValue && typeof modeValue === 'object' && modeValue.r !== undefined) {
        finalValue = formatColor(modeValue);
        type = 'color';
      } else {
        finalValue = modeValue ?? defaultValue;
        type = resolvedType.toLowerCase();
      }

      setNestedProperty(transformed[modeName], keys, { value: finalValue, type });
    });
  });

  await Promise.all(
    Object.entries(transformed).map(async ([modeName, modeData]) => {
      const sanitizedModeName = modeName.toLowerCase().replace(/\s+/g, '-');
      const outputPath = path.join(OUTPUT_DIR, `${sanitizedModeName}.json`);
      await createDirectory(OUTPUT_DIR);
      await fs.writeFile(outputPath, JSON.stringify(sort(modeData), null, 2));
    })
  );
};

transformFigmaVariables();
