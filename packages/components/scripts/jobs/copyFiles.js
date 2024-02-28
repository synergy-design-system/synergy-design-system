import { cp } from 'fs/promises';
import { job } from './shared.js';

/**
 * Copy the given folder or contents to a new destination
 * @param {string} source The source files to copy
 * @param {string} destination The destination path to copy to
 * @param {function} filter Filter function
 */
export const runCopyFiles = job('Copying static files...', async (
  source,
  destination,
  filter = () => true,
) => await cp(source, destination, {
  filter,
  recursive: true,
}));
