/* eslint-disable import/no-extraneous-dependencies */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineMetadata } from 'html-validate';
import { mergeDeep } from './mergeDeep.js';
import { rules } from './synergy-element-rules.js';

// Get the destination of the custom elements file
// Note we need to use relative module imports here
// as we don´t know the location of the file when it is imported
const fileSystemDestinationOfCustomElements = import.meta.resolve('../../../dist/custom-elements.json');
const metadata = JSON.parse(readFileSync(fileURLToPath(fileSystemDestinationOfCustomElements), 'utf-8'));

/**
 * Creates the attributes for a given declaration
 * @returns {Record<string, import('html-validate').MetaAttribute>}
 */
const createAttributes = (declaration) => {
  const attributes = (declaration.attributes || [])
    .filter(attr => !!attr?.type?.text)
    .map(attr => {
      // Special case for boolean attributes
      if (attr.type.text === 'boolean') {
        return {
          [attr.name]: {
            boolean: true,
          },
        };
      }

      // Special case for attributes that have a fixed set of values
      if (attr.type.text.includes('|')) {
        const values = attr
          .type
          .text
          .split('|')
          .filter(value => value.includes("'"))
          .map(value => value.trim().replaceAll("'", ''))
          .filter(Boolean);

        if (values.length === 0) {
          return {
            [attr.name]: {},
          };
        }

        return {
          [attr.name]: {
            enum: values,
            omit: true,
          },
        };
      }

      // Default case, just return the attribute
      return {
        [attr.name]: {},
      };
    })
    .filter(Boolean)
    .reduce((acc, curr) => ({
      ...acc,
      ...curr,
    }), {});

  return attributes;
};

const createTextContent = (declaration) => {
  const { slots } = declaration;

  // If the element does not have slots, disallow text content
  if (!slots || slots.length === 0) {
    return 'none';
  }
  return 'default';
};

const createMetaElement = (declaration) => ({
  ...rules[declaration.name],
  attributes: mergeDeep(
    createAttributes(declaration),
    rules[declaration.name]?.attributes || {},
  ),
  textContent: createTextContent(declaration),
});

export const createMetaData = () => {
  const elements = metadata
    .modules
    .filter(module => module.declarations.filter(kind => kind === 'class'))
    .map(module => module.declarations)
    .flatMap(declaration => declaration)
    .map(declaration => [declaration.tagName, createMetaElement(declaration)]);

  const output = Object.fromEntries(elements);
  // console.log(JSON.stringify(output, null, 2));
  return output;
};

export const createElements = () => defineMetadata({
  ...createMetaData(),
});

// Enable for debugging
// console.log(createMetaData());
