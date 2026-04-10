import { getDataForSetup } from '@synergy-design-system/metadata';

export const SUPPORTED_PACKAGES = ['components', 'charts'] as const;
export type DavinciMigrationPackage = (typeof SUPPORTED_PACKAGES)[number];

const getGuidePathSuffix = (packageName: DavinciMigrationPackage) => `/davinci/${packageName}.md`;

export const getMigrationGuideContent = async (packageName: DavinciMigrationPackage): Promise<string> => {
  if (packageName !== 'components') {
    throw new Error(`DaVinci migration package "${packageName}" is not available yet.`);
  }

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
