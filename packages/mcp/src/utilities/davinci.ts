import { getDataForSetup } from '@synergy-design-system/metadata';

export const SUPPORTED_PACKAGES = ['basic-elements', 'dashboard-elements'] as const;
export type DavinciMigrationPackage = (typeof SUPPORTED_PACKAGES)[number];

/**
 * Alias mapping for DaVinci migration packages.
 * Maps user-friendly names to official package names.
 */
const davinciPackageAliases: Record<DavinciMigrationPackage, string[]> = {
  'basic-elements': [
    'basic-elements',
    'components',
  ],
  'dashboard-elements': [
    'dashboard-elements',
    'charts',
  ],
};

/**
 * Resolves a package alias to its official DaVinci migration package name.
 * @param alias The user-provided package alias or official name.
 * @returns The resolved official package name.
 * @throws Error if the alias is not recognized.
 */
export const resolveDavinciPackageAlias = (alias: string): DavinciMigrationPackage => {
  const resolved = Object
    .entries(davinciPackageAliases)
    .find(([, aliases]) => aliases.includes(alias.toLowerCase()))?.[0] as DavinciMigrationPackage | undefined;

  if (!resolved) {
    const validOptions = Object.keys(davinciPackageAliases).join(', ');
    throw new Error(`Unknown DaVinci package "${alias}". Valid options: ${validOptions}`);
  }

  return resolved;
};

const getGuidePathSuffix = (packageName: DavinciMigrationPackage) => `/davinci/${packageName}.md`;

export const getMigrationGuideContent = async (packageName: DavinciMigrationPackage): Promise<string> => {
  const response = await getDataForSetup({
    package: 'migrations',
  });

  if (!response.data) {
    throw new Error(response.errors?.[0]?.message ?? 'No migration setup data found.');
  }

  const guide = response.data.setups
    .flatMap((entry) => entry.text)
    .find((entry) => entry.path.toLowerCase().endsWith(getGuidePathSuffix(packageName)));

  if (!guide) {
    throw new Error(`No DaVinci migration guide found for package "${packageName}".`);
  }

  return guide.content;
};

export const extractDavinciComponents = (content: string): string[] => {
  const matches = Array.from(content.matchAll(/^### (davinci-[\w-]+)/gm), match => match[1]);
  return [...new Set(matches)].toSorted((a, b) => a.localeCompare(b));
};

export const extractMigrationSection = (content: string, component: string): string | undefined => content
  .split(/\n(?=###\s)/)
  .find(section => section.startsWith(`### ${component}`));
