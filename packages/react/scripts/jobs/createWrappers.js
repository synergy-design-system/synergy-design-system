/* eslint-disable complexity */
import fs from 'fs';
import path from 'path';
import { job } from './shared.js';

const getAllComponents = metadata => {
  const allComponents = [];

  metadata.modules.forEach(module => {
    module.declarations?.forEach(declaration => {
      if (declaration.customElement) {
        const component = declaration;
        if (component) {
          allComponents.push(Object.assign(component, {
            path: module.path,
          }));
        }
      }
    });
  });

  return allComponents;
};

export const createWrappers = job('Creating React Component Wrappers...', async (metadata, outDir) => {
  // List of components
  const components = getAllComponents(metadata);

  // Index exports file
  const index = [];

  components.forEach(component => {
    const tagWithoutPrefix = component.tagName.replace(/^sl-/, '');
    const componentDir = path.join(outDir, 'components', tagWithoutPrefix);
    const componentFile = path.join(componentDir, 'index.ts');
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

    fs.mkdirSync(componentDir, { recursive: true });

    const jsDoc = component.jsDoc || '';

    const source = `
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

    index.push(`export { ${component.name} } from './components/${tagWithoutPrefix}/index.js';`);

    fs.writeFileSync(componentFile, source, 'utf8');
  });

  // Generate the index file
  fs.writeFileSync(path.join(outDir, 'index.ts'), index.join('\n'), 'utf8');
});
