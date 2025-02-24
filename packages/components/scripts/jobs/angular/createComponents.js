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

const isDetailsReturnString = (componentName, detailsString) => {
  if (componentName === 'SynDetails') {
    return detailsString;
  }
  return '';
};

export const runCreateComponents = job('Angular: Creating components', async (metadata, outDir) => {
  // List of components
  const components = await getAllComponents(metadata);

  const index = [];

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

    const source = `
      ${headerComment}
      import {
        Component,
        ElementRef,
        NgZone,
        Input,
        Output,
        EventEmitter,
        inject,
        AfterContentInit,
      } from '@angular/core';
      import type { ${component.name} } from '@synergy-design-system/components';
      ${eventImports}
      import '${importPath}';
      ${isDetailsReturnString(component.name, 'import { setAnimation, getAnimation } from \'@synergy-design-system/components/utilities/animation-registry.js\'')}

      ${jsDoc}
      @Component({
        selector: '${component.tagName}',
        standalone: true,
        template: '<ng-content></ng-content>',
      })
      export class ${component.name}Component ${isDetailsReturnString(component.name, 'implements AfterContentInit')} {
        private _elementRef = inject(ElementRef);
        private _ngZone: NgZone = inject(NgZone);
        
        public nativeElement: ${component.name};

        ${isDetailsReturnString(component.name, 'initialOpen = this._elementRef.nativeElement.open;')}
      
        constructor() {
          this.nativeElement = this._elementRef.nativeElement;
          ${eventListeners}
        }

        ${isDetailsReturnString(component.name, `ngAfterContentInit(): void {
    // This is a workaround for this issue: https://github.com/synergy-design-system/synergy-design-system/issues/784
    if(!this.initialOpen && this.nativeElement.open) {
      const dir = document.documentElement.dir || 'ltr';;
      const openAnimation = getAnimation(this.nativeElement, 'details.show', { dir });
      setAnimation(this.nativeElement, 'details.show', null);
      this.nativeElement.details.addEventListener('transitionstart', (event) => {
        const target = event.target as HTMLElement;
        const animations = target.getAnimations();
        animations.forEach((animation: Animation) => {
          animation.cancel();
        });
      });

      this.nativeElement.addEventListener('syn-after-show', () => {
        setAnimation(this.nativeElement, 'details.show', openAnimation);
      }, { once: true });
    }
  }`)}

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
