import { execSync } from 'child_process';
import path from 'path';
import { getPackages } from '@manypkg/get-packages';

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
 * @typedef {Object} Changeset
 * @property {typeof STATUS_NO_FILES_CHANGED | typeof STATUS_NO_PACKAGES_CHANGED | typeof STATUS_PACKAGES_CHANGED} reason The reason for the changeset
 * @property {string[]} [changedPackages] Optional list of changed packages
 */

/**
 * Create a changeset record for all changed packages in the repo based on the specified bump type.
 * @param {'patch' | 'minor' | 'major'} bumpType? The bump type to apply to all packages
 * @param {string} packageRoot? The root directory of the monorepo. Defaults to the current working directory.
 * @returns {Promise<Changeset>} A changeset object representing the version bump
 */
const createChangesetFromGit = async (
  bumpType = 'patch',
  packageRoot = process.cwd(),
) => {
  // Check if the bumpType is valid
  if (!['patch', 'minor', 'major'].includes(bumpType)) {
    throw new Error(`Invalid bump type: ${bumpType}. Must be 'patch', 'minor', or 'major'.`);
  }

  try {
    const { packages } = await getPackages(packageRoot);

    // Get changed files between current branch and origin/main
    const changedFiles = execSync('git diff --name-only origin/main...HEAD', { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(Boolean);

    // No changed files where detected. Exit early.
    if (changedFiles.length === 0) {
      return { reason: STATUS_NO_FILES_CHANGED };
    }

    // Find packages that have changes
    const changedPackages = packages.filter(
      pkg => changedFiles.some(
        file => file.startsWith(
          path.join(pkg.relativeDir, '/'),
        ),
      ),
    );

    // No packages were changed
    if (changedPackages.length === 0) {
      return { reason: STATUS_NO_PACKAGES_CHANGED };
    }

    return {
      changedPackages: changedPackages.map(pkg => pkg.packageJson.name),
      reason: STATUS_PACKAGES_CHANGED,
    };
  } catch (/** @type {any} */ e) {
    throw new Error(`Failed to create changeset: ${e}`);
  }
};

createChangesetFromGit('patch').then(console.log).catch(console.error);
