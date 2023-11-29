/* eslint-disable complexity */
import fs from 'fs';
import path from 'path';
import {
  createFrameworkIndex,
  createHeader,
  getAllComponents,
  job,
  ucFirstLetter,
} from '../shared.js';

const headerComment = createHeader('vue');

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

const getEmits = (events = []) => events
  .map(event => `
    ${createComment(event.description || '')}
    '${event.name}': [e: ${event.eventName}];`.trim())
  .join('\n');

const getEmitAttributes = (events = []) => events
  .map(event => ` @${event.name}="$emit('${event.name}', $event)"`)
  .join('\n');

const getDefinedProps = (componentName, attributes = []) => attributes
  .map(attr => `
    ${createComment(attr.description || '')}
    '${attr.fieldName}'?: ${componentName}['${attr.fieldName}'];
  `.trim())
  .join('\n\n');

const getPropAttributes = (attributes = []) => attributes
  .map(attr => `:${attr.fieldName}="${attr.fieldName}"`.trim())
  .join('\n');

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
    const componentFile = path.join(componentDir, `${component.tagNameWithoutPrefix}.vue`);
    const importPath = `@synergy-design-system/components/${component.path}`;

    const eventImports = getEventImports(component.events);

    // Prepare methods
    const methods = getMethodInputs(component.name, component.members);
    const methodDefinitions = getMethodExpose(component.members);

    // Prepare attributes
    const props = getDefinedProps(component.name, component.attributes);
    const propAttributes = getPropAttributes(component.attributes);

    // Prepare events
    const emits = getEmits(component.events);
    const emitAttributes = getEmitAttributes(component.events);

    // Prepare slots
    const slots = getSlots(component.slots);

    const jsDoc = component.jsDoc || '';

    const source = `
<script setup lang="ts">
${headerComment}

${jsDoc}
import { ref } from 'vue';
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
defineProps<{
  ${props}
}>();

// Map events
defineEmits<{
  ${emits}
}>();
</script>

<template>
  <${component.tagName}
    ${emitAttributes}
    ${propAttributes}
    ref="element"
  >
    ${slots}
  </${component.tagName}>
</template>
`.trim();

    index.push({
      name: component.name,
      outputPath: `./components/${component.tagNameWithoutPrefix}.vue`,
    });

    fs.writeFileSync(componentFile, `${source}\n`, 'utf8');
  });

  const frameworkIndex = createFrameworkIndex(headerComment, index, true);

  // Generate the index file
  fs.writeFileSync(path.join(outDir, 'index.ts'), frameworkIndex, 'utf8');
});
