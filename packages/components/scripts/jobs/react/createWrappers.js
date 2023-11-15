/* eslint-disable complexity */
import fs from 'fs';
import path from 'path';
import {
  createFrameworkIndex,
  createHeader,
  getAllComponents,
  job,
} from '../shared.js';

const headerComment = createHeader('react');

export const runCreateWrappers = job('React: Creating Component Wrappers...', async (metadata, outDir) => {
  // List of components
  const components = getAllComponents(metadata);

  // Index exports file
  const index = [];

  const componentDir = path.join(outDir, 'components');

  components.forEach(component => {
    const componentFile = path.join(componentDir, `${component.tagNameWithoutPrefix}.ts`);
    const importPath = `@synergy-design-system/components/${component.path.replace(/\.js$/, '.component.js')}`;

    const eventImports = (component.events || [])
      .map(event => `import type { ${event.eventName} } from '@synergy-design-system/components';`)
      .join('\n');

    const eventExports = (component.events || [])
      .map(event => `export type { ${event.eventName} } from '@synergy-design-system/components';`)
      .join('\n');

    const eventNameImport = (component.events || []).length > 0 ? 'import { type EventName } from \'@lit/react\';' : '';

    const events = (component.events || [])
      .map(event => `${event.reactName}: '${event.name}' as EventName<${event.eventName}>`)
      .join(',\n');

    const jsDoc = component.jsDoc || '';

    const source = `
      ${headerComment}
      import * as React from 'react';
      import { createComponent } from '@lit/react';
      import Component from '${importPath}';

      ${eventNameImport}
      ${eventImports}

      const tagName = '${component.tagName}'
      Component.define('${component.tagName}')

      ${jsDoc}
      export const ${component.name} = createComponent({
        displayName: "${component.name}",
        elementClass: Component,
        events: {
          ${events}
        },
        react: React,
        tagName,
      });

      ${eventExports}
    `;

    index.push({
      name: component.name,
      outputPath: `./components/${component.tagNameWithoutPrefix}.js`,
    });

    fs.writeFileSync(componentFile, source, 'utf8');
  });

  const frameworkIndex = createFrameworkIndex(headerComment, index);

  // Generate the index file
  fs.writeFileSync(path.join(outDir, 'index.ts'), frameworkIndex, 'utf8');
});
