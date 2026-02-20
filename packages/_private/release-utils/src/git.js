import { execSync } from 'child_process';
import {
  ALLOWED_BRANCH_PREFIXES,
  BRANCH_COMMIT_ICONS,
} from './constants.js';

/**
 * @typedef {import('./types.d.ts').GitInformation} GitInformation
 * @typedef {import('./types.d.ts').BumpType} BumpType
 */

/**
 * Get the bump type from a branch prefix
 * @param {string} prefix The prefix to get the bump type for
 * @returns {BumpType} The bump type corresponding to the prefix
 */
const getBumpTypeFromPrefix = (prefix) => {
  switch (prefix) {
    case 'major':
      return 'major';
    case 'feat':
      return 'minor';
    case 'fix':
      return 'patch';
    // Default includes stuff like chore and docs
    default:
      return 'none';
  }
};

/**
 * Get the current git branch name
 * @returns {string} The current git branch name
 */
export const getGitBranchName = () => execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();

/**
 * Get information about the changeset from the current git branch name
 * @returns {GitInformation} An object containing information parsed from the current git branch name
 */
export const getChangesetInformationFromBranchName = () => {
  const branchName = getGitBranchName();

  const [prefix, ...rest] = branchName.split('/');

  if (!ALLOWED_BRANCH_PREFIXES.includes(prefix)) {
    throw new Error(`Invalid branch prefix: ${prefix}. Must be one of: ${ALLOWED_BRANCH_PREFIXES.join(', ')}`);
  }

  return {
    branchName,
    bumpType: getBumpTypeFromPrefix(prefix),
    fileName: [rest.join().replace(/[^a-zA-Z0-9]/g, '-'), 'md'].join('.'),
  };
};

/**
 * Get a human readable representation of a branch name
 * @param {string} branchName The branch name to get information from
 * @returns {string} The human readable message
 */
export const createHumanReadableMessageFromBranchName = branchName => {
  const [prefix, ...parts] = branchName.split('/');

  const iconToUse = Object.prototype.hasOwnProperty.call(BRANCH_COMMIT_ICONS, prefix)
    ? BRANCH_COMMIT_ICONS[/** @type {keyof typeof BRANCH_COMMIT_ICONS} */ (prefix)]
    : '';

  // If our first part is a issue id, include it in the message prefix
  const [issueId, ...rest] = parts.join(' ').split('-');

  let description = rest.join(' ');

  // Use the issue id appropriately based on if it's a number or string
  if (Number.isInteger(Number(issueId))) {
    description = `${description} (#${issueId})`;
  } else {
    description = `${issueId} ${description}`;
  }

  return `${prefix}: ${iconToUse} ${description}`;
};
