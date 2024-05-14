import fs from 'fs';
import path from 'path';
import {
  createComment,
  createFrameworkIndex,
  createHeader,
  getAllComponents,
  getControlAttributeForTwoWayBinding,
  getEventAttributeForTwoWayBinding,
  getIsTwoWayBindingEnabledFor,
  job,
  lcFirstLetter,
  ucFirstLetter,
} from '../shared.js';

const headerComment = createHeader('angular');

const getEventImports = (events = []) => events
  .map(event => `import type { ${event.eventName} } from '@synergy-design-system/components';`)
  .join('\n');

const getEventExports = (events = []) => events
  .map(event => `export type { ${event.eventName} } from '@synergy-design-system/components';`)
  .join('\n');

const getEventListeners = ({
  events = [],
  tagNameWithoutPrefix,
}) => events
  .map(event => {
    let additionalCodeToRun = '';
    if (
      getIsTwoWayBindingEnabledFor(tagNameWithoutPrefix)
      && event.name === getEventAttributeForTwoWayBinding(tagNameWithoutPrefix)
    ) {
      const control = getControlAttributeForTwoWayBinding(tagNameWithoutPrefix);
      additionalCodeToRun = `this.${control}Change.emit(this.${control})`;
    }
    return `this.nativeElement.addEventListener('${event.name}', (e: ${event.eventName}) => { this.${lcFirstLetter(event.eventName)}.emit(e); ${additionalCodeToRun} });`;
  })
  .join('\n');

const getEventOutputs = ({
  events = [],
  name,
  tagNameWithoutPrefix,
}) => {
  const exportedEvents = events.map(event => `
    ${createComment(event.description || '')}
    @Output() ${lcFirstLetter(event.eventName)} = new EventEmitter<${event.eventName}>();
  `);

  // Add support for two way databinding
  if (getIsTwoWayBindingEnabledFor(tagNameWithoutPrefix)) {
    const control = getControlAttributeForTwoWayBinding(tagNameWithoutPrefix);
    exportedEvents.push(`
      ${createComment('Support for two way data binding')}
      @Output() ${control}Change = new EventEmitter<${name}['${control}']>();
    `);
  }
  return exportedEvents.join('\n');
};

const getAttributeInputs = (componentName, attributes = []) => attributes
  .map(attr => `
    ${createComment(attr.description || '')}
    @Input()
    set ${attr.fieldName}(v: ${componentName}['${attr.fieldName}']) {
      this._ngZone.runOutsideAngular(() => (this.nativeElement.${attr.fieldName} = v));
    }
    get ${attr.fieldName}() {
      return this.nativeElement.${attr.fieldName};
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
      return this._ngZone.runOutsideAngular(() => this.nativeElement.${member.name}(...args));
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
    const eventExports = getEventExports(component.events);
    const eventListeners = getEventListeners(component);
    const eventOutputs = getEventOutputs(component);

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
        public nativeElement: ${component.name};
        private _ngZone: NgZone;
      
        constructor(e: ElementRef, ngZone: NgZone) {
          this.nativeElement = e.nativeElement;
          this._ngZone = ngZone;
          ${eventListeners}
        }

        ${attributeInputs}

        ${methodInputs}

        ${eventOutputs}
      }

      ${eventExports}
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
