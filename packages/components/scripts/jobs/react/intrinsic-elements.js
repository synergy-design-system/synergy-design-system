import fs from 'fs';
import path from 'path';
import {
  createHeader,
  getAllComponents,
  job,
} from '../shared.js';

const headerComment = createHeader('react');

export const runCreateIntrinsicElements = job('React: Creating react intrinsic elements for react@19 and higher...', async (metadata, outDir) => {
  const components = await getAllComponents(metadata);
  const outFile = path.join(outDir, 'syn-jsx-elements.ts');

  // Get a list of all events
  const eventTypeImports = components.reduce((acc, component) => {
    const events = component.events || [];
    return acc.concat(events.map(event => event.eventName));
  }, []);

  const componentTypeImports = components.map(component => component.name);

  const synergyTypes = Array.from(new Set([
    ...eventTypeImports,
    ...componentTypeImports,
  ]));

  // List of imports needed for the generated types
  const imports = `
    import type { DOMAttributes } from 'react';
    import type { ${synergyTypes.join(',')} } from '@synergy-design-system/components';

    /**
     * Used core types
     * @see https://coryrylan.com/blog/how-to-use-web-components-with-typescript-and-react
     */

    type SynEventTuple = [string, unknown];

    type SynEventMap<T extends SynEventTuple[]> = {
      [K in T[number] as \`on\${K[0]}\`]: (event: K[1]) => void;
    };

    export type SynCustomElement<
      SynElement extends HTMLElement,
      Events extends SynEventTuple[] = [],
    > = Partial<
      SynElement &
      DOMAttributes<SynElement> &
      {
        children?: any;
        key?: any;
      } &
      SynEventMap<Events>
    >;
  `;

  const componentTypes = components
    .map(component => ([
      component.tagName,
      component.name,
      component?.events,
    ]))
    .map(([tagName, name, events = []]) => {
      const eventTypeMap = events.map(({ name: eName, eventName }) => `['${eName}', ${eventName}]`);
      return `'${tagName}': SynCustomElement<${name}, [${eventTypeMap.join(',')}]>;`;
    });

  // Final output
  const source = `
    ${headerComment}
    ${imports}
    
    declare module 'react' {
      namespace JSX {
        interface IntrinsicElements {
          ${componentTypes.join('\n')}
        }
      }
    }
  `;

  fs.writeFileSync(outFile, source, 'utf8');
});
