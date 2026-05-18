import {
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';
import { expect } from 'chai';

describe('intent policy api (separate from integration tests)', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const metadataPackageDir = path.resolve(__dirname, '..', '..');

  /**
   * @returns {Promise<typeof import('../../dist/index.js')>}
   */
  const loadPublicApi = async () => {
    const modulePath = path.join(metadataPackageDir, 'dist', 'index.js');
    return import(modulePath);
  };

  const createFixtureDataDir = async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'metadata-intent-policy-'));
    await mkdir(path.join(root, 'core'), { recursive: true });

    const index = {
      builtAt: '2026-05-13T00:00:00.000Z',
      entities: [],
      version: '1.0.0',
    };

    await writeFile(path.join(root, 'index.json'), JSON.stringify(index));

    return {
      cleanup: async () => {
        await rm(root, {
          force: true,
          recursive: true,
        });
      },
      dataDir: root,
    };
  };

  it('lists intent categories and intents via explicit opt-in API', async () => {
    const { listIntentCategories, listIntents } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const categories = await listIntentCategories({ dataDir: fixture.dataDir });
      expect(categories.errors).to.equal(undefined);
      expect(categories.data.map((entry) => entry.id)).to.include('action');
      expect(categories.data.map((entry) => entry.id)).to.include('structure');

      const actionIntents = await listIntents({ category: 'action' }, { dataDir: fixture.dataDir });
      expect(actionIntents.errors).to.equal(undefined);
      expect(actionIntents.data.every((entry) => entry.category === 'action')).to.equal(true);
      expect(actionIntents.data.map((entry) => entry.id)).to.include('action.submit');
    } finally {
      await fixture.cleanup();
    }
  });

  it('resolves property-based intent presets for syn-button', async () => {
    const { resolveIntent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await resolveIntent({
        component: 'syn-button',
        intent: 'action.submit',
      }, {
        dataDir: fixture.dataDir,
      });

      expect(response.errors).to.equal(undefined);
      expect(response.data).to.not.equal(null);
      expect(response.data?.architecture).to.equal('Intent Policy Layer');
      expect(response.data?.process).to.equal('Intent Resolution');
      expect(response.data?.output).to.equal('Usage Pattern / Preset');
      expect(response.data?.pattern.preset?.props?.type).to.equal('submit');
      expect(response.data?.pattern.preset?.forbiddenProps).to.deep.equal(['href']);
    } finally {
      await fixture.cleanup();
    }
  });

  it('resolves structural usage patterns for confirmation dialogs', async () => {
    const { resolveIntent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await resolveIntent({
        component: 'syn-dialog',
        intent: 'structure.confirmation',
      }, {
        dataDir: fixture.dataDir,
      });

      expect(response.errors).to.equal(undefined);
      expect(response.data).to.not.equal(null);
      expect(response.data?.pattern.structure?.component).to.equal('syn-dialog');
      expect(response.data?.pattern.structure?.children?.[1]?.slot).to.equal('footer');
      expect(response.data?.pattern.structure?.children?.[1]?.children?.[1]?.props?.variant).to.equal('danger');
    } finally {
      await fixture.cleanup();
    }
  });

  it('returns deterministic errors for unknown or incompatible queries', async () => {
    const { getComponentCapabilities, resolveIntent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const unknownComponent = await getComponentCapabilities('syn-unknown', { dataDir: fixture.dataDir });
      expect(unknownComponent.data).to.equal(null);
      expect(unknownComponent.errors?.[0]?.code).to.equal('NOT_FOUND');

      const incompatible = await resolveIntent({
        component: 'syn-dialog',
        intent: 'action.submit',
      }, {
        dataDir: fixture.dataDir,
      });

      expect(incompatible.data).to.equal(null);
      expect(incompatible.errors?.[0]?.code).to.equal('INVALID_QUERY');
    } finally {
      await fixture.cleanup();
    }
  });
});
