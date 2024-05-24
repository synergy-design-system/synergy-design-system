import type { Attribute, Module, Package } from 'custom-elements-manifest/schema.d.ts';
import type { Structure, Tag } from './types.js';

/**
 * Convert a tag to an attribute
 * @param tag The tag to convert to an attribute
 * @returns attribute The created attribute
 */
const getAttributesForTag = (tag: Tag): Attribute | null => {
  const hasVariants = tag.tag === 'variant';
  const isDynamicTag = tag.type.includes('|');

  // Skip if we don't have variants or if the tag is not dynamic
  // @todo: Allow boolean values to be used as well
  if (!hasVariants || !isDynamicTag) {
    return null;
  }

  // We have to reformat our type to match the CEM format
  const type = tag.type
    .split('|')
    .map(t => t.trim())
    .map(t => `'${tag.name}-${t}'`)
    .join(' | ');

  return {
    default: '',
    description: tag.description,
    name: 'className',
    type: {
      text: type,
    },
  };
};

/**
 * Converts a tag to a schema module
 * @param tag The tag to convert
 * @returns module The schema module
 */
const tagToSchemaModule = (tag: Tag): Module => {
  const attribute = getAttributesForTag(tag);
  const attributes = attribute ? [attribute] : [];
  return {
    declarations: [{
      attributes,
      kind: 'class',
      name: tag.name,
      slots: [{
        description: `Main content of ${tag.name}`,
        name: '',
      }],
    }],
    description: tag.description,
    kind: 'javascript-module',
    path: tag.fileName,
  };
};

/**
 * Takes a structure and converts it to a custom elements schema
 * @param structure The structure to use
 * @returns package The custom elements schema
 */
export const toCem = (structure: Structure[]): Package => {
  const modules = structure
    .filter(({ comments }) => comments.length > 0)
    .flatMap(({ comments }) => comments)
    .flatMap(({ tags }) => tags)
    .map(tagToSchemaModule);

  return {
    modules,
    readme: '',
    schemaVersion: '1.0.0',
  } as Package;
};
