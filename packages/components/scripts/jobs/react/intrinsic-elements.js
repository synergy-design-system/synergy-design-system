import fs from 'fs';
import path from 'path';
import {
  createHeader,
  getAllComponents,
  job,
} from '../shared.js';

const headerComment = createHeader('react');

export const runCreateIntrinsicElements = job('React: Creating react intrinsic elements for react@19 and higher...', async (
  metadata,
  outDir,
  fileName = 'syn-jsx-elements.ts',
) => {
  const components = await getAllComponents(metadata);
  const outFile = path.join(outDir, fileName);

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
    import type { CSSProperties, DOMAttributes, RefObject } from 'react';
    import type { ${synergyTypes.join(',')} } from '@synergy-design-system/components';

    /**
     * Used core types
     * @see https://coryrylan.com/blog/how-to-use-web-components-with-typescript-and-react
     */

    type SynEventTuple = [string, unknown];

    type SynEventMap<T extends SynEventTuple[]> = {
      [K in T[number] as \`on\${K[0]}\`]: (event: K[1]) => void;
    };

    /**
    * Synergy custom element type definition
    * This type is used to define the custom elements in the Synergy Design System
     */
    export type SynCustomElement<
      SynElement extends HTMLElement,
      Events extends SynEventTuple[] = [],
    > = Partial<
      Omit<SynElement, 'style'> &
      DOMAttributes<SynElement> &
      {
        children?: any;
        key?: any;
        ref?: RefObject<SynElement | null>;
        style?: CSSProperties | undefined;
      } &
      SynEventMap<Events>
    >;
  `;

  const componentExports = components
    .map(component => ([
      component.jsDoc,
      component.name,
      component?.events,
    ]))
    .map(([jsDoc, name, events = []]) => {
      const eventTypeMap = events.map(({ name: eName, eventName }) => `['${eName}', ${eventName}]`);
      return `${jsDoc}export type ${name}JSXElement = SynCustomElement<${name}, [${eventTypeMap.join(',')}]>`;
    });

  const componentTypes = components
    .map(component => ([
      component.jsDoc,
      component.tagName,
      component.name,
    ]))
    .map(([jsDoc, tagName, name]) => `${jsDoc}'${tagName}': ${name}JSXElement;`);

  // Final output
  const source = `
    ${headerComment}
    /* eslint-disable */
    ${imports}
    
    ${componentExports.join('\n')}

    declare module 'react' {
      // #746: Allow synergies custom properties as css variable names
      // @see https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
      // @see https://stackoverflow.com/questions/65878880/typescript-template-literal-as-interface-key/65879197#65879197
      interface CSSProperties {
        [key: \`--\${string}\`]: string | undefined;
      }

      namespace JSX {
        interface IntrinsicElements {
          ${componentTypes.join('\n')}
        }
      }
    }
  `;

  fs.writeFileSync(outFile, source, 'utf8');
});
