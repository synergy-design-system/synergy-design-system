/**
 * Create a prefix message from branch name and the changed files in a commit
 *
 * @param {string} branchName The name of the git branch
 * @param {Array<string>} changedFiles The changed files in the commit
 */
function createPrefix(branchName, changedFiles) {

  /**
   * Get the the issue number and type of pull request (e.b. bugfix, feature, ...) from branch name
   */
  const issueNoMatch = branchName.match(/^\d+\-/);
  const issueNo = issueNoMatch && issueNoMatch[0].slice(0, issueNoMatch[0].length - 1);

  const branchTypeMatch = branchName.match(/^\d+\-(feat|bug|doc)/);

  let branchType;

  if (branchTypeMatch) {
    // Add more branch types here as soon as we need more
    if (branchTypeMatch[0].includes('feat')) {
      branchType = '✨ Feat';
    } else if (branchTypeMatch[0].includes('bug')) {
      branchType = '🐛 Fix';
    } else if (branchTypeMatch[0].includes('doc')) {
      branchType = '📚 Doc';
    }
  }


  /**
   * Get names of changed files and check which packages changed
   */

  let changedPackages;

  for (const changedFile of changedFiles) {
    const packageMatch = changedFile.match(/packages(\/|\\)([^\/\\]+)(\/|\\)/);
    let packageName;

    // If new packages are added to the monorepo, check if they also need a separate handling for the package name
    if (packageMatch && ['eslint-config-sds', 'stylelint-config-sds'].find((lintPackage) => packageMatch[0].includes(lintPackage))) {
      packageName = 'lint';
    } else if (packageMatch) {
      const pathParts = packageMatch[0].split(/(\/|\\)/)
      packageName = pathParts[2];
    }

    if (changedPackages && packageName && !changedPackages.includes(packageName)) {
      changedPackages = changedPackages.concat(`,${packageName}`);
    } else if (!changedPackages && packageName) {
      changedPackages = packageName;
    }
  }


  /**
   * Create the prefix message
   */
  let prefix;
  if (issueNo && branchType && changedPackages) {
    prefix = `${branchType}(${changedPackages}) #${issueNo}:`;
  } else if (issueNo && branchType) {
    prefix = `${branchType} #${issueNo}:`;
  }
  return prefix;
}


const branchName = process.argv[2];
const changedFiles = process.argv.slice(3);

console.log(createPrefix(branchName, changedFiles));
