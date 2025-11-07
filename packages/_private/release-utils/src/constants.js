/**
 * @var {string} STATUS_NO_FILES_CHANGED Indicates that no files were changed in the git diff
 */
export const STATUS_NO_FILES_CHANGED = 'NO_FILES_CHANGED';

/**
 * @var {string} STATUS_NO_PACKAGES_CHANGED Indicates that no packages were changed in the git diff
 */
export const STATUS_NO_PACKAGES_CHANGED = 'NO_PACKAGES_CHANGED';

/**
 * @var {string} STATUS_PACKAGES_CHANGED Indicates that packages were changed in the git diff
 */
export const STATUS_PACKAGES_CHANGED = 'PACKAGES_CHANGED';

/**
 * @var {string[]} ALLOWED_BRANCH_PREFIXES List of allowed prefixes for branch names that can create changesets
 */
export const ALLOWED_BRANCH_PREFIXES = [
  'major',
  'feat',
  'fix',
  'chore',
  'docs',
];

/**
 * @var {Record<string, string>} BRANCH_COMMIT_ICONS List of icons corresponding to branch prefixes for human-readable messages
 */
export const BRANCH_COMMIT_ICONS = {
  chore: '🔧',
  docs: '📚',
  feat: '✨',
  fix: '🐛',
  major: '💥',
};

/**
 * @var {string[]} ALLOWED_BUMP_TYPES List of allowed bump types for versioning
 */
export const ALLOWED_BUMP_TYPES = ['major', 'minor', 'patch', 'none'];

/**
 * @var {string} CHANGESET_ROOT The directory where changesets are stored
 */
export const CHANGESET_ROOT = '.changeset';
