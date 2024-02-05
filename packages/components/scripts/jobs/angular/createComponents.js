import fs from 'fs';
import path from 'path';
import {
  createFrameworkIndex,
  createHeader,
  getAllComponents,
  job,
  lcFirstLetter,
  ucFirstLetter,
} from '../shared.js';

const headerComment = createHeader('angular');

/**
 * Turns a string into a multiline js comment
 * @param {string} str The input string that should be commented
 * @param {string} [optional] splitToken The token that should be used to split
 * @returns {string} The javascript comment
 */
const createComment = (str, splitToken = '. ') => {
  if (!str) return '';

  const lines = str
    .split(splitToken)
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => `* ${line}`)
    .join('.\n');
  return `
/**
${lines}
 */`;
};

const getEventImports = (events = []) => events
  .map(event => `import type { ${event.eventName} } from '@synergy-design-system/components';`)
  .join('\n');

const getEventListeners = (events = []) => events
  .map(event => `this._el.addEventListener('${event.name}', (e: ${event.eventName}) => { this.${lcFirstLetter(event.eventName)}.emit(e); });`)
  .join('\n');

const getEventOutputs = (events = []) => events
  .map(event => `
    ${createComment(event.description || '')}
    @Output() ${lcFirstLetter(event.eventName)} = new EventEmitter<${event.eventName}>();`)
  .join('\n');

const getAttributeInputs = (componentName, attributes = []) => attributes
  .map(attr => `
    ${createComment(attr.description || '')}
    @Input()
    set ${attr.fieldName}(v: ${componentName}['${attr.fieldName}']) {
      this._ngZone.runOutsideAngular(() => (this._el.${attr.fieldName} = v));
    }
    get ${attr.fieldName}() {
      return this._el.${attr.fieldName};
    }
  `.trim())
  .join('\n\n');

const getMethodInputs = (component, members = []) => members
  // Only include methods
  .filter(method => method.kind === 'method')
  // Filter out all private methods
  .filter(method => !method.privacy || method.privacy !== 'private')
  .map(member => `
    ${createComment(member.description || '')}
    @Input()
    call${ucFirstLetter(member.name)}(...args: Parameters<${component}['${member.name}']>) {
      return this._ngZone.runOutsideAngular(() => this._el.${member.name}(...args));
    }
  `.trim())
  .join('\n');

export const runCreateComponents = job('Angular: Creating components', async (metadata, outDir) => {
  // List of components
  const components = await getAllComponents(metadata);

  const index = [];

  components.forEach(component => {
    const componentFileName = `${component.tagNameWithoutPrefix}.component.ts`;
    const componentPath = path.join(outDir, componentFileName);
    const jsDoc = component.jsDoc || '';
    const importPath = `@synergy-design-system/components/${component.path}`;

    const eventImports = getEventImports(component.events);
    const eventListeners = getEventListeners(component.events);
    const eventOutputs = getEventOutputs(component.events);

    const attributeInputs = getAttributeInputs(component.name, component.attributes);
    const methodInputs = getMethodInputs(component.name, component.members);

    const source = `
      ${headerComment}
      import {
        Component,
        ElementRef,
        NgZone,
        Input,
        Output,
        EventEmitter,
      } from '@angular/core';
      import type { ${component.name} } from '@synergy-design-system/components';
      ${eventImports}
      import '${importPath}';

      ${jsDoc}
      @Component({
        selector: '${component.tagName}',
        standalone: true,
        template: '<ng-content></ng-content>',
      })
      export class ${component.name}Component {
        private _el: ${component.name};
        private _ngZone: NgZone;
      
        constructor(e: ElementRef, ngZone: NgZone) {
          this._el = e.nativeElement;
          this._ngZone = ngZone;
          ${eventListeners}
        }

        ${attributeInputs}

        ${methodInputs}

        ${eventOutputs}
      }
    `.trim();

    index.push({
      name: `${component.name}Component`,
      outputPath: `./${componentFileName.slice(0, -3)}`,
    });

    fs.writeFileSync(componentPath, source, 'utf8');
  });

  const frameworkIndex = createFrameworkIndex(headerComment, index);

  // Generate the index file
  fs.writeFileSync(path.join(outDir, 'index.ts'), frameworkIndex, 'utf8');
});
