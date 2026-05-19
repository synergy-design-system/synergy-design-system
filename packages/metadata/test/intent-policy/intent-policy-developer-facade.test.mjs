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

describe('intent policy developer facade', () => {
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
    const root = await mkdtemp(path.join(tmpdir(), 'metadata-intent-policy-developer-facade-'));
    await mkdir(path.join(root, 'core'), { recursive: true });

    const index = {
      builtAt: '2026-05-18T00:00:00.000Z',
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

  it('validates component usage against intent rules', async () => {
    const { experimental_validateComponent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await experimental_validateComponent({
        component: 'syn-button',
        framework: 'react19',
        includePhases: ['experimental'],
        intent: 'action.submit',
        props: {
          href: '#',
        },
      }, {
        dataDir: fixture.dataDir,
      });

      expect(response.errors).to.equal(undefined);
      expect(response.data).to.not.equal(null);
      expect(response.data.valid).to.equal(false);
      expect(response.data.issues.map((issue) => issue.code)).to.include('FORBIDDEN_PROP_HREF');
    } finally {
      await fixture.cleanup();
    }
  });

  it('returns component guide for supported intents and usages', async () => {
    const { experimental_getComponentGuide } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await experimental_getComponentGuide({
        component: 'syn-button',
        framework: 'react19',
        includePhases: ['experimental'],
      }, {
        dataDir: fixture.dataDir,
      });

      expect(response.errors).to.equal(undefined);
      expect(response.data).to.not.equal(null);
      expect(response.data.supportedIntents.map((intent) => intent.id)).to.include('action.submit');
      expect(response.data.recommendedUsages.length).to.be.greaterThan(0);
    } finally {
      await fixture.cleanup();
    }
  });

  it('emits contextual warning when submit intent is disabled', async () => {
    const { experimental_validateComponent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await experimental_validateComponent({
        component: 'syn-button',
        framework: 'react19',
        includePhases: ['experimental'],
        intent: 'action.submit',
        props: {
          disabled: true,
        },
      }, {
        dataDir: fixture.dataDir,
      });

      expect(response.errors).to.equal(undefined);
      expect(response.data).to.not.equal(null);
      expect(response.data.valid).to.equal(true);
      expect(response.data.score).to.equal(90);
      expect(response.data.issues.map((issue) => issue.code)).to.include('INTENT_TEMPORARILY_BLOCKED');
      expect(response.data.issues.find((issue) => issue.code === 'INTENT_TEMPORARILY_BLOCKED')?.severity).to.equal('warning');
    } finally {
      await fixture.cleanup();
    }
  });

  it('finds component recommendations for an intent task', async () => {
    const { experimental_findComponentsForTask } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await experimental_findComponentsForTask({
        framework: 'react19',
        includePhases: ['experimental'],
        taskId: 'action.submit',
      }, {
        dataDir: fixture.dataDir,
      });

      expect(response.errors).to.equal(undefined);
      expect(response.data).to.not.equal(null);
      expect(response.data.primaryRecommendation).to.not.equal(null);
      expect(response.data.primaryRecommendation.targetId).to.equal('component:syn-button');
    } finally {
      await fixture.cleanup();
    }
  });

  it('returns only renderable options by default for an intent', async () => {
    const { experimental_getIntentOptions } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await experimental_getIntentOptions({
        framework: 'react19',
        includePhases: ['experimental'],
        intentId: 'action.grouped',
      }, {
        dataDir: fixture.dataDir,
      });

      expect(response.errors).to.equal(undefined);
      expect(response.data).to.not.equal(null);
      expect(response.data.bestDefaultTargetId).to.equal('component:syn-button-group');
      expect(response.data.renderableTargets.map((target) => target.targetId)).to.include('component:syn-button-group');
      expect(response.data.nonRenderableCandidates).to.deep.equal([]);
    } finally {
      await fixture.cleanup();
    }
  });

  it('returns non-renderable diagnostics when includeDiagnostics is enabled', async () => {
    const { experimental_getIntentOptions } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await experimental_getIntentOptions({
        framework: 'react19',
        includeDiagnostics: true,
        includePhases: ['experimental'],
        intentId: 'navigation.link-list.grouped',
      }, {
        dataDir: fixture.dataDir,
      });

      expect(response.errors).to.equal(undefined);
      expect(response.data).to.not.equal(null);
      expect(response.data.bestDefaultTargetId).to.equal('style:syn-link-list');
      expect(response.data.renderableTargets.map((target) => target.targetId)).to.include('style:syn-link-list');
      expect(response.data.nonRenderableCandidates.length).to.be.greaterThan(0);
      expect(response.data.nonRenderableCandidates.some((candidate) => candidate.reasonCode === 'PATTERN_NOT_FOUND')).to.equal(true);
    } finally {
      await fixture.cleanup();
    }
  });
});
