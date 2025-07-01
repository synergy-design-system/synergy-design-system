/**
 * List of all types from synergy that may be used as a resource list
 */
import { type FileStructure, folderToStructure } from './file.js';
import { Projects } from './config.js';

/**
 * Cache for storing package data to avoid redundant file system reads.
 */
const Cache = new Map<string, FileStructure>();

export const getPackageData = async (
  packageName: keyof typeof Projects,
) => {
  const {
    enabled = false,
    path,
  } = Projects[packageName] || {};

  if (!enabled) {
    throw new Error(`Package "${packageName}" is not enabled or does not exist.`);
  }

  if (!path) {
    throw new Error(`Package "${packageName}" is not configured or does not exist.`);
  }

  if (Cache.has(path)) {
    return Cache.get(path);
  }

  const result = await folderToStructure(path);
  Cache.set(path, result);
  return result;
};
