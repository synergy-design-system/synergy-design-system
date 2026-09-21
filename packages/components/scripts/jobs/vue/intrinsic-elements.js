import fs from 'fs';
import path from 'path';
import {
  createHeader,
  getAllComponents,
  job,
} from '../shared.js';

const headerComment = createHeader('vue');

const unique = (values) => Array.from(new Set(values)).sort();

const getEventTypeName = (componentName) => `${componentName}Events`;

const getEventImports = (components) => unique(
  components.flatMap(component => (component.events || []).map(event => event.eventName)),
);

const getComponentImports = (components) => components
  .filter(component => component.tagNameWithoutPrefix !== 'chart')
  .map(component => component.name);

const getEventType = (component) => {
  const events = component.events || [];
  const typeName = getEventTypeName(component.name);

  if (events.length === 0) {
    return `type ${typeName} = [];`;
  }

  return [
    `type ${typeName} = [`,
    ...events.map(event => `  ['${event.name}', ${event.eventName}],`),
    '];',
  ].join('\n');
};

const getGlobalComponentEntry = (component) => {
  const typeName = getEventTypeName(component.name);
  const jsDoc = component.jsDoc || '';
  return `${jsDoc}    '${component.tagName}': SynVueElement<${component.name}, ${typeName}>;`;
};

const getIntrinsicComponentEntry = (component) => {
  const typeName = getEventTypeName(component.name);
  const jsDoc = component.jsDoc || '';
  return `${jsDoc}    '${component.tagName}': SynIntrinsicElement<${component.name}, ${typeName}>;`;
};

export const runCreateIntrinsicElements = job('Vue: Creating native intrinsic element types...', async (
  metadata,
  outDir,
  fileName = 'synergy.ts',
) => {
  const components = await getAllComponents(metadata);
  const outFile = path.join(outDir, fileName);

  const eventImports = getEventImports(components);
  const componentImports = getComponentImports(components);
  const chartComponent = components.find(component => component.tagNameWithoutPrefix === 'chart');
  const chartTypeImport = chartComponent
    ? `import type ${chartComponent.name} from '@synergy-design-system/components/${chartComponent.componentPath}';`
    : '';

  const importStatements = [
    `import type {\n  ${componentImports.join(',\n  ')},${eventImports.length > 0 ? `\n  ${eventImports.join(',\n  ')}` : ''}\n} from '@synergy-design-system/components';`,
    chartTypeImport,
    'import type { SynIntrinsicElement, SynVueElement } from \'./core.js\';',
  ].filter(Boolean).join('\n');

  const eventTypes = components.map(getEventType).join('\n\n');
  const globalComponentEntries = components.map(getGlobalComponentEntry).join('\n');
  const intrinsicComponentEntries = components.map(getIntrinsicComponentEntry).join('\n');

  const source = [
    headerComment,
    importStatements,
    '',
    eventTypes,
    '',
    "declare module 'vue' {",
    '  interface GlobalComponents {',
    globalComponentEntries,
    '  }',
    '',
    '  interface IntrinsicElementAttributes {',
    intrinsicComponentEntries,
    '  }',
    '}',
    '',
  ].join('\n');

  fs.writeFileSync(outFile, source, 'utf8');
});
