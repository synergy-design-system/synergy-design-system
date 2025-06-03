import fs from 'fs';
import path from 'path';
import { pascalCase } from 'change-case';
import {
  createAttributeComment,
  createComment,
  createFrameworkIndex,
  createHeader,
  enrichComponentAttributes,
  getAllComponents,
  getControlAttributeForTwoWayBinding,
  getEventAttributeForTwoWayBinding,
  getIsTwoWayBindingEnabledFor,
  job,
} from '../shared.js';

const headerComment = createHeader('vue');

const getEventImports = (events = []) => events
  .map(event => `import type { ${event.eventName} } from '@synergy-design-system/components';`)
  .join('\n');

const getEventExports = (events = []) => events
  .map(event => `export type { ${event.eventName} } from '@synergy-design-system/components';`)
  .join('\n');

/**
 * Get all emits for the vue component
 * @param {string} componentName The component that we create the events for
 * @param {string} componentClass The class name of the component
 * @param {object[]} events Events to add
 * @returns {string} Final events list
 */
const getEmits = (componentName, componentClass, events = []) => {
  const vueEventMap = events
    .map(event => `
      ${createComment(event.description || '')}
      '${event.name}': [e: ${event.eventName}];`.trim());

  // Add support for custom vue vModel binding
  if (getIsTwoWayBindingEnabledFor(componentName)) {
    vueEventMap.push(`
      ${createComment('Support for two way data binding')}
      'update:modelValue': [newValue: ${componentClass}['${getControlAttributeForTwoWayBinding(componentName)}']];
    `.trim());
  }

  return vueEventMap.join('\n\n');
};

/**
 * Get the vue event list used in vue templates
 * @param {string} componentName The components name
 * @param {string} componentClass The class name of the component
 * @param {object[]} events Events to add
 * @returns string
 */
const getEmitAttributes = (componentName, componentClass, events = []) => {
  const templateEvents = events.map(
    event => ` @${event.name}="$emit('${event.name}', $event)"`,
  );

  // Return the plain events if we do not have a vmodel component
  if (!getIsTwoWayBindingEnabledFor(componentName)) {
    return templateEvents.join('\n');
  }

  // Add support for custom vue vModel binding
  const eventName = getEventAttributeForTwoWayBinding(componentName);

  const emitterValue = `$emit('update:modelValue', ($event.target as ${componentClass}).${getControlAttributeForTwoWayBinding(componentName)})`;

  // It may very well be that the event we need to hook into is already
  // declared (e.g. when using syn-input for two way data-binding and as a prop, too)
  // For this reason, we have to look if there is already a bound event and adjust it
  // accordingly so it includes the calls to update:modelValue, too.
  const vmodelEvents = templateEvents.map((event) => {
    // We have found the duplicated event
    if (event.trim().startsWith(`@${eventName}`)) {
      return ` @${eventName}="${emitterValue}; $emit('${eventName}', $event)"`;
    }

    // Not the wanted one, skip
    return event;
  });

  // If the event is not in our events list, add it to the final output by hand
  const hasEventAlreadySet = vmodelEvents.find(event => event.trim().startsWith(`@${eventName}`));
  if (!hasEventAlreadySet) {
    vmodelEvents.push(` @${eventName}="${emitterValue}"`);
  }

  return vmodelEvents.join('\n');
};

/**
 * Get the list of defined props
 * @param {string} componentName The name of the component
 * @param {string} componentClass The class name of the component
 * @param {object[]} attributes The attributes to add
 * @returns {string} The props to apply
 */
const getDefinedProps = (componentName, componentClass, attributes = []) => {
  const vueAttributeMap = attributes
    .map(attr => `
      ${createAttributeComment(attr)}
      '${attr.fieldName}'?: ${componentClass}['${attr.fieldName}'];
    `.trim());

  // Add support for vModel directive
  if (getIsTwoWayBindingEnabledFor(componentName)) {
    vueAttributeMap.push(`
      ${createComment('Support for two way data binding')}
      modelValue?: ${componentClass}['${getControlAttributeForTwoWayBinding(componentName)}'];
    `.trim());
  }

  return vueAttributeMap.join('\n\n');
};

/**
 * Get the slot bindings for the vue component.
 * When there are slots, we only return a generic slot as vue cannot map
 * its own slots to the web component slots.
 *
 * @see https://github.com/synergy-design-system/synergy-design-system/issues/472
 * @param {object[]} slots The slots as received via manifest
 * @returns {string} Slot support or empty string if no slots are available
 */
const getSlot = (slots = []) => {
  const hasSlots = slots.length > 0;
  return hasSlots ? '<slot></slot>' : '';
};

/**
 * Get the vue emit declaration
 * @param {string} emits The emit attributes gathered via getEmits
 * @returns {string} Empty string if no emits are there, otherwise the emits definition
 */
const getVueEmits = (emits) => {
  if (!emits) {
    return '';
  }
  return `
    // Map events
    defineEmits<{
      ${emits}
    }>();
  `.trim();
};

/**
 * Get the vue props for the component
 * @param {unknown[]} props The props to get
 * @returns {string} An empty string or a vue sfc template string used in <script setup>
 */
const getVueProps = (props = []) => {
  if (!props) {
    return '';
  }

  return `
    // Map attributes
    const props = defineProps<{
      ${props}
    }>();

    // Make sure prop binding only forwards the props that are actually there.
    // This is needed because :param="param" also adds an empty attribute
    // when using web-components, which breaks optional arguments like size in SynInput
    // @see https://github.com/vuejs/core/issues/5190#issuecomment-1003112498
    const visibleProps = computed(() => Object.fromEntries(
      Object
        .entries(props)
        .filter(([, value]) => typeof value !== 'undefined')
    ));
  `.trim();
};

/**
 * Get the visual bindings for the components props
 * @see getVueProps
 * @param {unknown[]} props props The props to get
 * @returns {string} The visible bindings for the component or an empty string
 */
const getVisibleBindings = (props = []) => {
  if (!props) {
    return '';
  }
  return 'v-bind="visibleProps"';
};

export const runCreateWrappers = job('Vue: Creating Component Wrappers...', async (metadata, outDir) => {
  // List of components
  const components = await getAllComponents(metadata);

  // Index exports file
  const index = [];

  const componentDir = path.join(outDir, 'components');

  components.forEach(component => {
    const vueComponentName = pascalCase([
      'syn',
      'vue',
      component.tagNameWithoutPrefix,
    ].join('-'));
    const componentFile = path.join(componentDir, `${vueComponentName}.vue`);
    const importPath = `@synergy-design-system/components/${component.path}`;

    const eventImports = getEventImports(component.events);
    const eventExports = getEventExports(component.events);
    const exports = eventExports.length > 0 ? `<script lang="ts">\n${eventExports}\n</script>\n` : '';
    const attributes = enrichComponentAttributes(component);

    // Prepare attributes
    const props = getDefinedProps(
      component.tagNameWithoutPrefix,
      component.name,
      attributes,
    );

    // Prepare events
    const emits = getEmits(component.tagNameWithoutPrefix, component.name, component.events);
    const emitAttributes = getEmitAttributes(
      component.tagNameWithoutPrefix,
      component.name,
      component.events,
    );

    // #300: We want to provide the default value for the prop and
    // let it still be usable with unidirectional and bidirectional dataflow
    // For this to work, we will have to add the attribute directly to the component binding
    let defaultValueBinding = '';

    if (getIsTwoWayBindingEnabledFor(component.tagNameWithoutPrefix)) {
      const controlAttribute = getControlAttributeForTwoWayBinding(component.tagNameWithoutPrefix);
      defaultValueBinding = `:${controlAttribute}="typeof props.modelValue !== 'undefined' ? props.modelValue : typeof props.${controlAttribute} !== 'undefined' ? props.${controlAttribute} : undefined"`;
    }

    // Prepare slots
    const slots = getSlot(component.slots);

    const jsDoc = component.jsDoc || '';

    const source = `
<script setup lang="ts">
${headerComment}

${jsDoc}
import { computed, ref } from 'vue';
import '${importPath}';

${eventImports}
import type { ${component.name} } from '@synergy-design-system/components';

// DOM Reference to the element
const nativeElement = ref<${component.name}>();

defineExpose({
  nativeElement,
});

${getVueProps(props)}

${getVueEmits(emits)}
</script>

${exports}
<template>
  <${component.tagName}
    ${emitAttributes}
    ${defaultValueBinding}
    ${getVisibleBindings(props)}
    ref="nativeElement"
  >
    ${slots}
  </${component.tagName}>
</template>
`.trim();

    index.push({
      name: vueComponentName,
      outputPath: `./components/${vueComponentName}.vue`,
    });

    fs.writeFileSync(componentFile, `${source}\n`, 'utf8');
  });

  const frameworkIndex = createFrameworkIndex(headerComment, index, true);

  // Generate the index file
  fs.writeFileSync(path.join(outDir, 'index.ts'), frameworkIndex, 'utf8');
});
