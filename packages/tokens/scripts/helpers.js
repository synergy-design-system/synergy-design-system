/* eslint-disable no-console */
import { existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

/**
 * Create a folder at provided path
 * @param {String} path The path to create
 * @returns {Boolean} True if the folder was created or exists, false otherwise
 */
export const createFolder = (path) => {
  const dirName = dirname(path);
  try {
    if (!existsSync(dirName)) {
      mkdirSync(dirName);
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * Creates a header string from the provided string parts
 * @param {string[]} parts The parts that should be created as comment lines
 * @returns {string} The final header string
 */
export const createHeaderComment = (parts) => {
  const lines = parts.map(part => ` * ${part}`);
  return `
/**
${lines.join('\n')}
 */
  `.trim();
};

/**
 * Creates a nested property in an object
 * @param {*} obj The object to modify
 * @param {Array<string>} keys The keys representing the path to the nested property
 * @param {unknown} value The value to set at the nested property
 */
export const setNestedProperty = (obj, keys, value) => {
  let current = obj;
  keys.slice(0, -1).forEach(key => {
    if (!current[key]) current[key] = {};
    current = current[key];
  });
  current[keys[keys.length - 1]] = value;
};
