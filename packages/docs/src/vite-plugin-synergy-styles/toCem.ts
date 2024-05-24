import type { Attribute, ClassMember, Package } from 'custom-elements-manifest/schema.d.ts';
import type { Structure, StyleModule, Tag } from './types.js';

const getTypesAsArray = (tag: Tag): string[] => tag.type
  .split('|')
  .map(t => t.trim())
  .map(t => `'${tag.name}-${t}'`);

/**
 * The tag to get the type for
 * @param tag The tag to get the type for
 * @returns Type structure for the tag
 */
const getTypeForTag = (tag: Tag) => {
  const text = getTypesAsArray(tag).join(' | ');
  return {
    text,
  };
};

/**
 * Check if a tag is allowed to be included
 * @param tag The tag to check
 * @returns True if the tag is allowed to be included
 */
const tagIsAllowedToBeIncluded = (tag: Tag): boolean => {
  const hasVariants = tag.tag === 'variant';
  const isDynamicTag = tag.type.includes('|');

  // @todo: Allow boolean values to be used as well
  return hasVariants && isDynamicTag;
};

/**
 * Convert a tag to an attribute
 * @param tag The tag to convert to an attribute
 * @returns attribute The created attribute
 */
const getAttributesForTag = (tag: Tag): Attribute | null => {
  // Skip if we don't have variants or if the tag is not dynamic
  if (!tagIsAllowedToBeIncluded(tag)) {
    return null;
  }

  return {
    default: getTypesAsArray(tag).at(0),
    description: tag.description,
    name: 'className',
    type: getTypeForTag(tag),
  };
};

const getMembersForTag = (tag: Tag): ClassMember | null => {
  // Skip if we don't have variants or if the tag is not dynamic
  if (!tagIsAllowedToBeIncluded(tag)) {
    return null;
  }

  return {
    default: getTypesAsArray(tag).at(0),
    kind: 'field',
    name: 'className',
    type: getTypeForTag(tag),
  };
};

/**
 * Converts a tag to a schema module
 * @param tag The tag to convert
 * @returns module The schema module
 */
const tagToSchemaModule = (tag: Tag): StyleModule => {
  const attribute = getAttributesForTag(tag);
  const attributes = attribute ? [attribute] : [];

  const member = getMembersForTag(tag);
  const members = member ? [member] : [];

  const tagNameWithoutPrefix = tag.name.includes('-') ? tag.name.split('-').slice(1).join('-') : tag.name;

  return {
    declarations: [{
      attributes,
      customElement: true,
      kind: 'class',
      members,
      name: tag.name,
      slots: [{
        description: `Main content of ${tag.name}`,
        name: '',
      }],
      tagName: tag.name,
      tagNameWithoutPrefix,
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
