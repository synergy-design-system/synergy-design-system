import fs from 'fs';
import path from 'path';
import { pascalCase } from 'change-case';
import {
  createFrameworkIndex,
  createHeader,
  getAllComponents,
  job,
  ucFirstLetter,
} from '../shared.js';

const headerComment = createHeader('vue');

/**
 * List of components names that vue two way data binding should be enabled for
 * @var {string[]} vueModelEnabledComponents
 */
const vueModelEnabledComponents = [
  'checkbox',
  'input',
  'radio-group',
  'select',
  'switch',
  'textarea',
];

/**
 * Get the attribute that should be bound for two way data binding
 * @param {string} componentName Name of the component
 * @returns {string} Name of the attribute to use
 */
const getControlAttributeForVueModel = (componentName) => {
  switch (componentName) {
  case 'checkbox':
  case 'switch':
    return 'checked';
  default:
    return 'value';
  }
};

/**
 * Get the event attributes name used for two way data binding
 * @param {string} componentName Name of the component
 * @returns The name of the event that should be used to add the binding
 */
const getEventAttributeForVueModel = (componentName) => {
  switch (componentName) {
  default: return 'syn-input';
  }
};

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

const getEventExports = (events = []) => events
  .map(event => `export type { ${event.eventName} } from '@synergy-design-system/components';`)
  .join('\n');

const filterMethods = (members = []) => members
  // Only include methods
  .filter(method => method.kind === 'method')
  // Filter out all private methods
  .filter(method => !method.privacy || method.privacy !== 'private');

const getMethodInputs = (component, members = []) => filterMethods(members)
  .map(member => `
    ${createComment(member.description || '')}
    const call${ucFirstLetter(member.name)} = (...args: Parameters<${component}['${member.name}']>) => element.value?.${member.name}(...args);
  `.trim())
  .join('\n');

const getMethodExpose = (members = []) => filterMethods(members)
  .map(member => `call${ucFirstLetter(member.name)},`)
  .join('\n');

/**
 * Check if a given component is enabled for vModel interactions
 * @param {string} componentName
 * @returns {boolean}
 */
const getIsVModelEnabled = (componentName) => vueModelEnabledComponents.includes(componentName);

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
  if (getIsVModelEnabled(componentName)) {
    vueEventMap.push(`
      ${createComment('Support for two way data binding')}
      'update:modelValue': [newValue: ${componentClass}['${getControlAttributeForVueModel(componentName)}']];
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
  if (!getIsVModelEnabled(componentName)) {
    return templateEvents.join('\n');
  }

  // Add support for custom vue vModel binding
  const eventName = getEventAttributeForVueModel(componentName);

  // @todo: This would make types more explicit,
  // however esbuild is not able to compile it unfortunately
  // ($event.target as ${componentClass}).${getControlAttributeForVueModel(componentName)
  const emitterValue = `$emit('update:modelValue', $event.target.${getControlAttributeForVueModel(componentName)})`;

  // It may very well be that the event we need to hook into is already
  // declared (e.g. when using sy-input for two way databinding and as a prop, too)
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
      ${createComment(attr.description || '')}
      '${attr.fieldName}'?: ${componentClass}['${attr.fieldName}'];
    `.trim());

  // Add support for vModel directive
  if (getIsVModelEnabled(componentName)) {
    vueAttributeMap.push(`
      ${createComment('Support for two way data binding')}
      modelValue?: ${componentClass}['${getControlAttributeForVueModel(componentName)}'];
    `.trim());
  }

  return vueAttributeMap.join('\n\n');
};

const getSlots = (slots = []) => slots
  .map(slot => `<slot ${slot.name ? `name="${slot.name}"` : ''}></slot>`)
  .join('\n');

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

    // Prepare methods
    const methods = getMethodInputs(component.name, component.members);
    const methodDefinitions = getMethodExpose(component.members);

    // Prepare attributes
    const props = getDefinedProps(
      component.tagNameWithoutPrefix,
      component.name,
      component.attributes,
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

    if (getIsVModelEnabled(component.tagNameWithoutPrefix)) {
      const controlAttribute = getControlAttributeForVueModel(component.tagNameWithoutPrefix);
      defaultValueBinding = `:${controlAttribute}="typeof props.modelValue !== 'undefined' ? props.modelValue : typeof props.${controlAttribute} !== 'undefined' ? props.${controlAttribute} : undefined"`;
    }

    // Prepare slots
    const slots = getSlots(component.slots);

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
const element = ref<${component.name}>();

// Map methods
${methods}

defineExpose({
  ${methodDefinitions}
});

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

// Map events
defineEmits<{
  ${emits}
}>();
</script>

<template>
  <${component.tagName}
    ${emitAttributes}
    ${defaultValueBinding}
    v-bind="visibleProps"
    ref="element"
  >
    ${slots}
  </${component.tagName}>
</template>

<script lang="ts">
  ${eventExports}
</script>
`.trim();

    index.push({
      name: vueComponentName,
      outputPath: `./components/${vueComponentName}.vue`,
    });

    fs.writeFileSync(componentFile, `${source}\n`, 'utf8');
  });

  const frameworkIndex = createFrameworkIndex(headerComment, index, true);

  // Generate the index file
  fs.writeFileSync(path.join(outDir, 'index.js'), frameworkIndex, 'utf8');
});
