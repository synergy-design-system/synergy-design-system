import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import getChangesets from '@changesets/read';
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
 * Validate a single changeset file content.
 * @param {string} content The changeset file content
 * @param {Changeset} packageInfo Expected package information
 * @param {BumpType} bumpType Expected bump type
 * @param {string} fileName The changeset file name
 * @returns {{ valid: boolean, reason: string }} Validation result
 */
const validateSingleChangeset = (content, packageInfo, bumpType, fileName) => {
  const validationData = validateChangesetContent(content, packageInfo, bumpType);

  if (!validationData.valid) {
    return {
      reason: validationData.reason,
      valid: false,
    };
  }

  return {
    reason: `${validationData.reason}\n(Found in ${fileName})`,
    valid: true,
  };
};

/**
 * Validate multiple changesets combined.
 * @param {import('@changesets/types').NewChangeset[]} changesets All changesets
 * @param {Changeset} packageInfo Expected package information
 * @param {BumpType} bumpType Expected bump type
 * @returns {{ valid: boolean, reason: string }} Validation result
 */
const validateMultipleChangesets = (changesets, packageInfo, bumpType) => {
  if (changesets.length === 0) {
    return {
      reason: 'No changesets found in the repository.',
      valid: false,
    };
  }

  // Collect all package releases from all changesets
  const packagesInChangesets = new Map();
  const changesetsByPackage = new Map();

  changesets.forEach(changeset => {
    changeset.releases.forEach(release => {
      const existingBumpType = packagesInChangesets.get(release.name);

      // Track which changeset contains this package
      if (!changesetsByPackage.has(release.name)) {
        changesetsByPackage.set(release.name, []);
      }
      changesetsByPackage.get(release.name).push(changeset.id);

      // Keep the highest bump type if package appears in multiple changesets
      if (!existingBumpType || ALLOWED_BUMP_TYPES.indexOf(release.type) < ALLOWED_BUMP_TYPES.indexOf(existingBumpType)) {
        packagesInChangesets.set(release.name, release.type);
      }
    });
  });

  /**
   * @type {string[]}
   */
  const discrepancies = [];

  /**
   * @type {string[]}
   */
  const validPackages = [];

  packageInfo.changedPackages?.forEach(pkgName => {
    const bumpInChangeset = packagesInChangesets.get(pkgName);

    if (!bumpInChangeset) {
      discrepancies.push(`❌ Missing package: ${pkgName}`);
    } else if (bumpInChangeset !== bumpType) {
      discrepancies.push(`❌ Incorrect bump type for ${pkgName}: expected '${bumpType}', got '${bumpInChangeset}'`);
    } else {
      const changesetFiles = changesetsByPackage.get(pkgName) || [];
      validPackages.push(`☑️ ${pkgName} => ${bumpType} (found in ${changesetFiles.join(', ')})`);
    }
  });

  // Check for extra packages in changesets not present in changed packages
  packagesInChangesets.forEach((bump, pkgName) => {
    if (!packageInfo.changedPackages?.includes(pkgName)) {
      discrepancies.push(`❌ Unexpected package in changesets: ${pkgName}`);
    }
  });

  if (discrepancies.length > 0) {
    return {
      reason: `Mismatch between combined changesets and expected packages or bump types detected:\n${discrepancies.join('\n')}`,
      valid: false,
    };
  }

  return {
    reason: `Combined changesets are valid and match expected packages and bump types. This PR will upgrade:\n${validPackages.join('\n')}`,
    valid: true,
  };
};

/**
 * Validates changeset(s) for all changed packages in the repo based on the specified bump type.
 * @param {string} packageRoot The root directory of the monorepo. Defaults to the current working directory.
 * @returns {Promise<ValidateChangesetResult>} Validation result
 */
export const validateChangeset = async (
  packageRoot = process.cwd(),
) => {
  try {
    const { packages, rootDir } = await getAllPackages(packageRoot, true);
    const { bumpType, fileName } = getChangesetInformationFromBranchName();
    const packageInfo = getChangedPackages(packages, bumpType);

    const changesetDir = path.join(rootDir, CHANGESET_ROOT);

    // If the changeset directory does not exist, exit early
    if (!fs.existsSync(changesetDir)) {
      return {
        message: 'Changeset directory does not exist',
        reason: 'NO_CHANGESET_DIR',
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

    // Read all changesets once at the beginning
    const allChangesets = await getChangesets(rootDir);
    const changesetFilePath = path.join(changesetDir, fileName);

    // Try to find and validate the specific changeset file first
    const specificChangeset = allChangesets.find(cs => cs.id === fileName.replace('.md', ''));

    if (specificChangeset) {
      // We found the specific changeset, validate it
      const content = fs.readFileSync(changesetFilePath, { encoding: 'utf8' });
      const result = validateSingleChangeset(content, packageInfo, bumpType, fileName);

      return {
        message: result.reason,
        reason: result.valid ? 'VALID_CHANGESET' : 'INVALID_CHANGESET',
        valid: result.valid,
      };
    }

    // Fallback: validate all changesets combined
    const result = validateMultipleChangesets(allChangesets, packageInfo, bumpType);

    let reason;
    if (result.valid) {
      reason = 'VALID_CHANGESET';
    } else if (allChangesets.length === 0) {
      reason = 'NO_CHANGESET';
    } else {
      reason = 'INVALID_CHANGESET';
    }

    return {
      message: result.reason,
      reason,
      valid: result.valid,
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
