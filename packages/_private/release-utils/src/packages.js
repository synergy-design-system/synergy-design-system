import { getPackages } from '@manypkg/get-packages';

/**
 * Get all packages in the monorepo.
 * @param {string} packageRoot? The root directory where to begin search for the monorepo. Defaults to the current working directory.
 * @param {*} onlyPublic? Filter only public packages (not private). Defaults to false.
 * @returns {Promise<import("@manypkg/get-packages").Packages>} List of packages and the root directory of the monorepo.
 */
export const getAllPackages = async (
  packageRoot = process.cwd(),
  onlyPublic = false,
) => {
  const initialResult = await getPackages(packageRoot);

  const filteredList = onlyPublic
    ? initialResult.packages.filter(pkg => pkg.packageJson.private !== true)
    : initialResult.packages;

  const packages = filteredList.sort(
    (a, b) => a.packageJson.name.localeCompare(b.packageJson.name),
  );

  return {
    ...initialResult,
    packages,
  };
};
