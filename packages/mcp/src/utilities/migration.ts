import { createMetadataStore } from '@synergy-design-system/metadata';
import type { MetadataFile } from './metadata.js';

type AvailablePackages = 'assets' | 'components' | 'tokens' | 'styles';

export type MigrationRecoveryResult = {
  availableFilenames: string[];
  error: string;
  operationPerformed: false;
  package: AvailablePackages;
  recovery: {
    arguments: { synergyPackage: AvailablePackages };
    tool: 'migration-list';
  };
  submittedFilename: string;
};

// For non-components packages, return only breaking changes docs.
// For components, also include the migration path guides from the migration/ layer subfolder.
const isMigrationFile = (path: string, pkg: AvailablePackages): boolean => {
  const filename = path.split('/').at(-1) ?? '';
  if (filename === 'BREAKING_CHANGES.md' || filename === 'CHANGELOG.md') {
    return true;
  }

  if (pkg === 'components' && path.includes('/migration/')) {
    return true;
  }

  return false;
};

const setupEntityByPackage: Record<AvailablePackages, string> = {
  assets: 'setup:assets-package',
  components: 'setup:synergy-migrations',
  styles: 'setup:styles-package',
  tokens: 'setup:tokens-package',
};

const getMigrationMetaDataFromSetupEntity = async (entityId: string, pkg: AvailablePackages): Promise<MetadataFile[]> => {
  const store = createMetadataStore();
  const refs = await store.getLayerFiles(entityId, 'full');

  const migrationRefs = refs.filter((ref) => isMigrationFile(ref.path, pkg));

  const files = await Promise.all(
    migrationRefs.map(async (ref) => {
      const filename = ref.path.split('/').at(-1) ?? ref.path;

      return {
        content: await store.readLayerFile(ref),
        filename,
      };
    }),
  );

  return files.toSorted((a, b) => a.filename.localeCompare(b.filename));
};

export const getMigrationMetaData = async (requestedPackage: AvailablePackages = 'components') => {
  const entityId = setupEntityByPackage[requestedPackage] ?? setupEntityByPackage.components;
  return getMigrationMetaDataFromSetupEntity(entityId, requestedPackage);
};

export const buildMigrationRecovery = async (
  requestedPackage: AvailablePackages,
  submittedFilename: string,
  error: string,
): Promise<MigrationRecoveryResult> => ({
  availableFilenames: (await getMigrationMetaData(requestedPackage)).map((file) => file.filename),
  error,
  operationPerformed: false,
  package: requestedPackage,
  recovery: {
    arguments: { synergyPackage: requestedPackage },
    tool: 'migration-list',
  },
  submittedFilename,
});
