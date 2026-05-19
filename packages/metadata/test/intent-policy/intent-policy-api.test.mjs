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
    // Use the actual built metadata directory for integration testing
    return {
      cleanup: async () => {
        // No cleanup needed for actual metadata directory
      },
      dataDir: path.resolve(metadataPackageDir, 'data'),
    };
  };

  it('lists intent categories and intents via explicit opt-in API', async () => {
    const { experimental_listIntentCategories, experimental_listIntents } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const categories = await experimental_listIntentCategories({ dataDir: fixture.dataDir });
      expect(categories.errors).to.equal(undefined);
      expect(categories.data.map((entry) => entry.id)).to.include('action');
      expect(categories.data.map((entry) => entry.id)).to.include('structure');

      const actionIntents = await experimental_listIntents({ category: 'action' }, { dataDir: fixture.dataDir });
      expect(actionIntents.errors).to.equal(undefined);
      expect(actionIntents.data.every((entry) => entry.category === 'action')).to.equal(true);
      expect(actionIntents.data.map((entry) => entry.id)).to.include('action.submit');
    } finally {
      await fixture.cleanup();
    }
  });

  it('resolves property-based intent presets for syn-button', async () => {
    const { experimental_resolveIntent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await experimental_resolveIntent({
        target: { id: 'component:syn-button', kind: 'component', name: 'syn-button' },
        intent: 'action.submit',
      }, {
        dataDir: fixture.dataDir,
      });

      expect(response.errors).to.equal(undefined);
      expect(response.data).to.not.equal(null);
      expect(response.data?.architecture).to.equal('Intent Policy Layer');
      expect(response.data?.process).to.equal('Intent Resolution');
      expect(response.data?.output).to.equal('Usage Pattern / Preset');
      expect(response.data?.pattern.structure?.component).to.equal('syn-button');
      expect(response.data?.pattern.structure?.config?.propRules).to.be.an('array');
      const submitRule = response.data?.pattern.structure?.config?.propRules?.find(r => r.prop === 'type');
      expect(submitRule?.value).to.equal('submit');
      const hrefRule = response.data?.pattern.structure?.config?.propRules?.find(r => r.prop === 'href');
      expect(hrefRule?.kind).to.equal('forbidden');
    } finally {
      await fixture.cleanup();
    }
  });

  it('resolves structural usage patterns for confirmation dialogs', async () => {
    const { experimental_resolveIntent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await experimental_resolveIntent({
        target: { id: 'component:syn-dialog', kind: 'component', name: 'syn-dialog' },
        intent: 'structure.confirmation',
      }, {
        dataDir: fixture.dataDir,
      });

      expect(response.errors).to.equal(undefined);
      expect(response.data).to.not.equal(null);
      expect(response.data?.pattern.structure?.component).to.equal('syn-dialog');
      expect(response.data?.pattern.structure?.children?.[1]?.slot).to.equal('footer');
      const confirmButton = response.data?.pattern.structure?.children?.[1]?.children?.[1];
      expect(confirmButton?.component).to.equal('syn-button');
      const variantRule = confirmButton?.config?.propRules?.find(r => r.prop === 'variant');
      expect(variantRule?.value).to.equal('filled');
    } finally {
      await fixture.cleanup();
    }
  });

  it('returns deterministic errors for unknown or incompatible queries', async () => {
    const { experimental_getTargetCapabilities, experimental_resolveIntent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const unknownComponent = await experimental_getTargetCapabilities({id: 'component:syn-unknown', kind: 'component', name: 'syn-unknown'}, { dataDir: fixture.dataDir });
      expect(unknownComponent.data).to.equal(null);
      expect(unknownComponent.errors?.[0]?.code).to.equal('NOT_FOUND');

      const incompatible = await experimental_resolveIntent({
        target: { id: 'component:syn-dialog', kind: 'component', name: 'syn-dialog' },
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
