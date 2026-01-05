import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import {
  ALLOWED_BUMP_TYPES,
  CHANGESET_ROOT,
  STATUS_NO_FILES_CHANGED,
  STATUS_NO_PACKAGES_CHANGED,
  STATUS_PACKAGES_CHANGED,
} from './constants.js';
import {
  createHumanReadableMessageFromBranchName,
  getChangesetInformationFromBranchName,
} from './git.js';
import { getAllPackages } from './packages.js';

/**
 * @typedef {import('./types.d.ts').Changeset} Changeset
 * @typedef {import('./types.d.ts').ChangesetReason} ChangesetReason
 * @typedef {import('./types.d.ts').BumpType} BumpType
 * @typedef {import('./types.d.ts').ValidateChangesetResult} ValidateChangesetResult
 */

/**
 * Create a changeset record for all changed packages in the repo based on the specified bump type.
 * @param {import('@manypkg/get-packages').Package[]} packages List of packages to consider.
 * @param {BumpType} bumpType? The bump type to apply to all packages
 * @returns {Changeset} A changeset object representing the version bump
 */
const getChangedPackages = (
  packages,
  bumpType = 'patch',
) => {
  // Check if the bumpType is valid
  if (!ALLOWED_BUMP_TYPES.includes(bumpType)) {
    throw new Error(`Invalid bump type: ${bumpType}. Must be one of: ${ALLOWED_BUMP_TYPES.join(', ')}`);
  }

  try {
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
      changedPackages: changedPackages
        .map(pkg => pkg.packageJson.name)
        .sort(),
      reason: STATUS_PACKAGES_CHANGED,
    };
  } catch (/** @type {any} */ e) {
    throw new Error(`Failed to get changeset information: ${e}`);
  }
};

/**
 * Create the changeset file content.
 * @param {string} branchName The name of the git branch
 * @param {BumpType} bumpType The type of version bump (major, minor, patch, none)
 * @param {Changeset} changeset The changeset object containing changed packages and reason
 * @returns {string} The content of the changeset file to be written
 */
const createChangesetContent = (
  branchName,
  bumpType,
  changeset,
) => {
  const packages = changeset.changedPackages?.map(pkg => `"${pkg}": ${bumpType}`).join('\n') || '';
  const message = createHumanReadableMessageFromBranchName(branchName);
  return `
---
${packages}
---

${message}
`.trimStart();
};

/**
 * Validate the content of an existing changeset file against the current package information.
 * @param {string} content The content of the existing changeset file
 * @param {Changeset} packageInfo List of packages to validate the changeset content against
 * @param {BumpType} bumpType The expected bump type for all packages
 * @returns {{ valid: boolean, reason: string }} Whether the changeset content is valid and a reason message
 */
const validateChangesetContent = (content, packageInfo, bumpType) => {
  // Parse the front matter section to extract package names and bump types
  const frontMatterMatch = content.match(/---\n([\s\S]*?)\n---/);

  // No front matter found!
  if (!frontMatterMatch) {
    return {
      reason: 'No front matter found in changeset content.',
      valid: false,
    };
  }

  const updatedPackagesFromFrontMatter = frontMatterMatch[1]
    .split('\n')
    .map(line => {
      const [pkg, bump] = line
        .split(':')
        .map(part => part.trim().replace(/"/g, ''));
      return { bump, pkg };
    })
    .sort((a, b) => a.pkg.localeCompare(b.pkg));

  // Check if all packages from the packageInfo are present in the front matter
  // Also check if the bump type matches the expected bump type
  let allPackagesValid = true;

  /**
   * @type {string[]}
   */
  const discrepancies = [];

  packageInfo.changedPackages?.forEach(pkgName => {
    const pkgEntry = updatedPackagesFromFrontMatter.find(entry => entry.pkg === pkgName);

    if (!pkgEntry) {
      allPackagesValid = false;
      discrepancies.push(`❌ Missing package: ${pkgName}`);
    } else if (pkgEntry.bump !== bumpType) {
      allPackagesValid = false;
      discrepancies.push(`❌ Incorrect bump type for ${pkgName}: expected '${bumpType}', got '${pkgEntry.bump}'`);
    }
  });

  // Check for extra packages in the changeset not present in changed packages
  updatedPackagesFromFrontMatter.forEach(entry => {
    if (!packageInfo.changedPackages?.includes(entry.pkg)) {
      allPackagesValid = false;
      discrepancies.push(`❌ Unexpected package in changeset: ${entry.pkg}`);
    }
  });

  if (!allPackagesValid) {
    return {
      reason: `Mismatch between changeset content and expected packages or bump types detected:\n${discrepancies.join('\n')}`,
      valid: false,
    };
  }

  const output = updatedPackagesFromFrontMatter
    .map(entry => `☑️ ${entry.pkg} => ${entry.bump}`)
    .join('\n');

  return {
    reason: `Changeset content appears to be valid and matches expected packages and bump types. This PR will upgrade:\n${output}`,
    valid: true,
  };
};

/**
 * Writes a changeset record for all changed packages in the repo based on the specified bump type.
 * @param {string} packageRoot? The root directory of the monorepo. Defaults to the current working directory.
 * @returns {Promise<ValidateChangesetResult>} True if the changeset was created successfully, false otherwise.
 */
export const validateChangeset = async (
  packageRoot = process.cwd(),
) => {
  try {
    const { packages, rootDir } = await getAllPackages(packageRoot, true);
    const { bumpType, fileName } = getChangesetInformationFromBranchName();
    const packageInfo = getChangedPackages(packages, bumpType);

    const changesetDir = path.join(rootDir, CHANGESET_ROOT);
    const changesetFilePath = path.join(changesetDir, `${fileName}`);

    // If the changeset directory does not exist, exit early
    if (!fs.existsSync(changesetDir)) {
      return {
        message: 'Changeset directory does not exist',
        reason: 'NO_CHANGESET_DIR',
        valid: false,
      };
    }

    // If the changeset file does not exist, exit early
    if (!fs.existsSync(changesetFilePath)) {
      return {
        message: `Changeset file does not exist. Please create it at ${changesetFilePath}`,
        reason: 'NO_CHANGESET',
        valid: false,
      };
    }

    // Exit early if no packages were changed
    if (packageInfo.reason !== STATUS_PACKAGES_CHANGED) {
      return {
        message: `No changeset needed. Reason: ${packageInfo.reason} for calculated bump type ${bumpType}.`,
        reason: packageInfo.reason,
        valid: true,
      };
    }

    const contentOfExistingChangeset = fs.readFileSync(changesetFilePath, { encoding: 'utf8' });
    const validationData = validateChangesetContent(contentOfExistingChangeset, packageInfo, bumpType);

    if (!validationData.valid) {
      return {
        message: validationData.reason,
        reason: 'INVALID_CHANGESET',
        valid: false,
      };
    }

    return {
      message: validationData.reason,
      reason: 'VALID_CHANGESET',
      valid: true,
    };
  } catch (/** @type {any} */ e) {
    return {
      message: `An unknown error occurred during changeset validation: ${e}`,
      reason: 'UNKNOWN_ERROR',
      valid: false,
    };
  }
};

/**
 * Writes a changeset record for all changed packages in the repo based on the specified bump type.
 * @param {string} packageRoot? The root directory of the monorepo. Defaults to the current working directory.
 * @returns {Promise<boolean>} True if the changeset was created successfully, false otherwise.
 */
export const createChangesetFileFromGit = async (
  packageRoot = process.cwd(),
) => {
  try {
    const validationResult = await validateChangeset(packageRoot);

    // If the changeset is already valid, exit early
    if (validationResult.valid) {
      console.log('✔ Changeset is already valid. No action needed.');
      return true;
    }

    // Exit early if some error occurs that is not a missing changeset
    if (validationResult.reason !== 'NO_CHANGESET') {
      console.error(`❌ Changeset is invalid: ${validationResult.message}`);
      return false;
    }

    // Finally, create the changeset
    const { packages, rootDir } = await getAllPackages(packageRoot, true);
    const { branchName, bumpType, fileName } = getChangesetInformationFromBranchName();
    const packageInfo = getChangedPackages(packages, bumpType);

    const changesetDir = path.join(rootDir, CHANGESET_ROOT);
    const changesetFilePath = path.join(changesetDir, `${fileName}`);

    const changesetContent = createChangesetContent(
      branchName,
      bumpType,
      packageInfo,
    );

    try {
      fs.writeFileSync(changesetFilePath, changesetContent, { encoding: 'utf8' });
      return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return false;
    }
  } catch (/** @type {any} */ e) {
    console.error(e);
    return false;
  }
};
