import {
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { expect } from 'chai';

const createFixtureDataDir = async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'metadata-store-cache-'));
  const componentCoreDir = path.join(root, 'core', 'component');
  const layerInterfaceDir = path.join(root, 'layers', 'interface', 'component');

  await mkdir(componentCoreDir, { recursive: true });
  await mkdir(layerInterfaceDir, { recursive: true });

  const entityId = 'component:syn-cached-fixture';
  const corePath = `data/core/component/${entityId}.json`;
  const layerPath = `layers/interface/component/${entityId}.md`;

  const initialEntity = {
    id: entityId,
    kind: 'component',
    layers: {
      interface: [{ layer: 'interface', path: layerPath }],
    },
    name: 'Cached Fixture V1',
    package: 'components',
    relations: [],
    since: '0.0.0',
    sources: [],
    status: 'experimental',
    tags: ['component', 'fixture'],
  };

  const updatedEntity = {
    ...initialEntity,
    name: 'Cached Fixture V2',
  };

  const index = {
    builtAt: '2026-01-01T00:00:00.000Z',
    entities: [
      {
        corePath,
        id: entityId,
        kind: 'component',
        layers: {
          examples: 0,
          full: 0,
          interface: 1,
        },
        name: 'Cached Fixture',
        search: ['cached', 'fixture', entityId],
      },
    ],
    version: '1.0.0',
  };

  await writeFile(path.join(root, 'index.json'), JSON.stringify(index));
  await writeFile(path.join(componentCoreDir, `${entityId}.json`), JSON.stringify(initialEntity));
  await writeFile(path.join(layerInterfaceDir, `${entityId}.md`), 'interface-v1');

  const writeUpdatedFiles = async () => {
    await writeFile(path.join(componentCoreDir, `${entityId}.json`), JSON.stringify(updatedEntity));
    await writeFile(path.join(layerInterfaceDir, `${entityId}.md`), 'interface-v2');
  };

  return {
    cleanup: async () => {
      await rm(root, {
        force: true,
        recursive: true,
      });
    },
    dataDir: root,
    entityId,
    interfaceRef: {
      layer: 'interface',
      path: layerPath,
    },
    writeUpdatedFiles,
  };
};

describe('metadata store cache integration', () => {
  it('reuses cached index/entity/layer data across store instances until explicitly cleared', async () => {
    const {
      cleanup,
      dataDir,
      entityId,
      interfaceRef,
      writeUpdatedFiles,
    } = await createFixtureDataDir();

    try {
      const {
        clearMetadataStoreCache,
        createMetadataStore,
      } = await import('../../dist/index.js');

      clearMetadataStoreCache();

      const store1 = createMetadataStore({ dataDir });
      const index1 = await store1.getIndex();
      const entity1 = await store1.getEntity(entityId);
      const layer1 = await store1.readLayerFile(interfaceRef);

      expect(index1.builtAt).to.equal('2026-01-01T00:00:00.000Z');
      expect(entity1?.name).to.equal('Cached Fixture V1');
      expect(layer1).to.equal('interface-v1');

      await writeUpdatedFiles();

      const store2 = createMetadataStore({ dataDir });
      const entity2 = await store2.getEntity(entityId);
      const layer2 = await store2.readLayerFile(interfaceRef);

      // Same process cache should keep immutable snapshot until clearMetadataStoreCache() is called.
      expect(entity2?.name).to.equal('Cached Fixture V1');
      expect(layer2).to.equal('interface-v1');

      // Callers should receive cloned JSON objects, not shared mutable references.
      expect(entity2).to.not.equal(entity1);

      clearMetadataStoreCache();

      const store3 = createMetadataStore({ dataDir });
      const entity3 = await store3.getEntity(entityId);
      const layer3 = await store3.readLayerFile(interfaceRef);

      expect(entity3?.name).to.equal('Cached Fixture V2');
      expect(layer3).to.equal('interface-v2');
    } finally {
      await cleanup();
    }
  });
});
