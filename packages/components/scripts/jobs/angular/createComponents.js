import fs from 'fs';
import path from 'path';
import {
  createComment,
  createFrameworkIndex,
  createHeader,
  enrichComponentAttributes,
  getAllComponents,
  getControlAttributeForTwoWayBinding,
  getEventAttributeForTwoWayBinding,
  getIsTwoWayBindingEnabledFor,
  job,
  lcFirstLetter,
} from '../shared.js';
import { createNgPackageJson } from './shared.js';

const headerComment = createHeader('angular');

const getEventImports = (events = []) => events
  .map(event => `import type { ${event.eventName} } from '@synergy-design-system/components';`)
  .join('\n');

const getEventExports = (events = []) => events
  .map(event => `export type { ${event.eventName} } from '@synergy-design-system/components';`)
  .join('\n');

const getEventListeners = ({
  events = [],
}) => events
  .map(event => `this.nativeElement.addEventListener('${event.name}', (e: ${event.eventName}) => { this.${lcFirstLetter(event.eventName)}.emit(e); });`)
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

  // Add support for two way data binding
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
  .map(attr => {
    let usedTypeForSetter = `${componentName}['${attr.fieldName}']`;
    let calledMethod = `this.nativeElement.${attr.fieldName} = v`;

    // Special overrides for booleans:
    // When using booleans, we also need to accept an empty string
    // as a value, which will then be used as the boolean value `true`
    // @see https://angular.dev/tools/cli/template-typecheck#input-setter-coercion
    if (attr?.type?.text === 'boolean') {
      usedTypeForSetter = `'' | ${componentName}['${attr.fieldName}']`;
      calledMethod = `this.nativeElement.${attr.fieldName} = (v === '') || v`;
    }

    return `
      ${createComment(attr.description || '')}
      @Input()
      set ${attr.fieldName}(v: ${usedTypeForSetter}) {
        this._ngZone.runOutsideAngular(() => (${calledMethod}));
      }
      get ${attr.fieldName}(): ${componentName}['${attr.fieldName}'] {
        return this.nativeElement.${attr.fieldName};
      }
    `.trim();
  })
  .join('\n\n');

const componentsCustomization = {
  SynDetails: {
    ngAfterContentInit: `    // This is a workaround for this issue: https://github.com/synergy-design-system/synergy-design-system/issues/784
    if (this.nativeElement.open) {
      this.nativeElement.updateComplete.then(() => {
        const animations = this.nativeElement.details.getAnimations({
          subtree: true,
        });
        animations.forEach(animation => {
          animation.cancel();
        });
      });
    }`,
  },
};

const getNgModelUpdateOnInput = (componentName) => {
  const control = getControlAttributeForTwoWayBinding(componentName);
  const changeEmitter = `this.${control}Change.emit(this.${control});`;
  const defaultEvent = getEventAttributeForTwoWayBinding(componentName);
  return `@Input()
  set ngModelUpdateOn(v: keyof HTMLElementEventMap) {
    this.modelSignal.abort();
    this.modelSignal = new AbortController();
    const option = v || '${defaultEvent}';
    this.nativeElement.addEventListener(option, () => {
      ${changeEmitter}
    }, {
      signal: this.modelSignal.signal,
    });
  }
  get ngModelUpdateOn(): keyof HTMLElementEventMap {
    return this.ngModelUpdateOn;
  }`;
}

export const runCreateComponents = job('Angular: Creating components', async (metadata, outDir) => {
  // List of components
  const components = await getAllComponents(metadata);

  const index = [];

  // eslint-disable-next-line complexity
  components.forEach(component => {
    const componentDir = path.join(outDir, component.tagNameWithoutPrefix);
    const componentFileName = `${component.tagNameWithoutPrefix}.component.ts`;
    // Create a subdirectory for each component
    fs.mkdirSync(componentDir, { recursive: true });

    const componentPath = path.join(componentDir, componentFileName);
    const jsDoc = component.jsDoc || '';
    const importPath = `@synergy-design-system/components/${component.path}`;

    const eventImports = getEventImports(component.events);
    const eventExports = getEventExports(component.events);
    const eventListeners = getEventListeners(component);
    const eventOutputs = getEventOutputs(component);
    const attributes = enrichComponentAttributes(component);

    const attributeInputs = getAttributeInputs(component.name, attributes);

    const ngAfterContentInit = componentsCustomization[component.name]?.ngAfterContentInit || '';

    const twoWayBindingEvent = getEventAttributeForTwoWayBinding(component.tagNameWithoutPrefix);

    const source = `
      ${headerComment}
      import {
        Component,
        ElementRef,
        NgZone,
        Input,
        Output,
        EventEmitter,
        AfterContentInit,
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
      export class ${component.name}Component ${ngAfterContentInit ? 'implements AfterContentInit' : ''} {
        
      public nativeElement: ${component.name};
      private _ngZone: NgZone;
      ${getIsTwoWayBindingEnabledFor(component.tagNameWithoutPrefix) ? 'private modelSignal = new AbortController();' : ''}

        constructor(e: ElementRef, ngZone: NgZone) {
          this.nativeElement = e.nativeElement;
          this._ngZone = ngZone;
          ${eventListeners}
          ${getIsTwoWayBindingEnabledFor(component.tagNameWithoutPrefix) ? `this.ngModelUpdateOn = '${twoWayBindingEvent}'` : ''}
        }

        ${ngAfterContentInit ? `ngAfterContentInit(): void {
            ${ngAfterContentInit}
          }` : ''}

        ${getIsTwoWayBindingEnabledFor(component.tagNameWithoutPrefix) ? getNgModelUpdateOnInput(component.tagNameWithoutPrefix) : ''}
 
        ${attributeInputs}

        ${eventOutputs}
      }

      ${eventExports}
    `.trim();

    index.push({
      name: `${component.name}Component`,
      outputPath: `@synergy-design-system/angular/components/${component.tagNameWithoutPrefix}`,
    });

    fs.writeFileSync(componentPath, source, 'utf8');
    createNgPackageJson(componentFileName, componentDir);
  });

  const frameworkIndex = createFrameworkIndex(headerComment, index);

  // Generate the index file
  const indexFileName = 'index.ts';
  fs.writeFileSync(path.join(outDir, indexFileName), frameworkIndex, 'utf8');
  createNgPackageJson(indexFileName, outDir);
});
