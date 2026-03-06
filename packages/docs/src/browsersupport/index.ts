import { getBaseline } from '@synergy-design-system/browser-baseline';

export const formatBrowserBaseline = (baseline: Parameters<typeof getBaseline>[0]): string[] => {
  const browsers = getBaseline(baseline);

  // Group browsers by name and extract versions
  const browserGroups: Record<string, number[]> = {};

  browsers.forEach(browser => {
    const [name, version] = browser.split(' ');
    const cleanName = name
      .replace('and_chr', 'chrome (android)')
      .replace('and_ff', 'firefox (android)')
      .replace('ios_saf', 'safari (ios)');

    if (!browserGroups[cleanName]) {
      browserGroups[cleanName] = [];
    }

    // Handle version ranges like "18.5-18.7" or single versions
    if (version.includes('-')) {
      const [start, end] = version.split('-');
      browserGroups[cleanName].push(parseFloat(start), parseFloat(end));
    } else {
      browserGroups[cleanName].push(parseFloat(version));
    }
  });

  // Format each browser group as ranges
  return Object.entries(browserGroups)
    .sort(([nameA], [nameB]) => nameA.localeCompare(nameB))
    .map(([name, versions]) => {
      const sortedVersions = [...new Set(versions)].sort((a, b) => a - b);
      const min = Math.min(...sortedVersions);
      const max = Math.max(...sortedVersions);

      return min === max ? `${name} ${min}` : `${name} ${min} - ${max}`;
    });
};

/**
 * Helper functions for version sorting and formatting
 * Converts "v3_0_0" to [3, 0, 0]
 */
export const parseVersion = (version: string): number[] => version.replace(/^v/, '').split('_').map(Number);

/**
 * Helper function to format version display, converting "v3_0_0" to "3.0.0"
 * Converts "v3_0_0" to "3.0.0"
 */
export const formatVersionDisplay = (version: string): string => version.replace(/^v/, '').replace(/_/g, '.');

export const compareVersions = (a: string, b: string): number => {
  const versionA = parseVersion(a);
  const versionB = parseVersion(b);

  const maxLength = Math.max(versionA.length, versionB.length);
  const versionPairs = Array.from({ length: maxLength }, (_, i) => [
    versionA[i] || 0,
    versionB[i] || 0,
  ]);

  const difference = versionPairs.find(([partA, partB]) => partA !== partB);

  return difference ? difference[1] - difference[0] : 0; // Reverse order (newest first)
};
