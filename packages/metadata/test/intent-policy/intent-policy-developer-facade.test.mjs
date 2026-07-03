import {
  mkdir,
  mkdtemp,
  readFile,
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
    await mkdir(path.join(root, 'core', 'component'), { recursive: true });
    await mkdir(path.join(root, 'layers', 'interface', 'component'), { recursive: true });

    const synButtonInterfaceLayerPath = path.join(root, 'layers', 'interface', 'component', 'component:syn-button.json');
    const sourceSynButtonInterfaceLayerPath = path.join(
      metadataPackageDir,
      'data',
      'layers',
      'interface',
      'component',
      'component:syn-button.json',
    );
    const synButtonCorePath = path.join(root, 'core', 'component', 'component:syn-button.json');
    const synFieldsetInterfaceLayerPath = path.join(root, 'layers', 'interface', 'component', 'component:syn-fieldset.json');
    const sourceSynFieldsetInterfaceLayerPath = path.join(
      metadataPackageDir,
      'data',
      'layers',
      'interface',
      'component',
      'component:syn-fieldset.json',
    );
    const synFieldsetCorePath = path.join(root, 'core', 'component', 'component:syn-fieldset.json');

    const index = {
      builtAt: '2026-05-18T00:00:00.000Z',
      entities: [
        {
          corePath: 'data/core/component/component:syn-button.json',
          id: 'component:syn-button',
          kind: 'component',
          layers: {
            interface: 1,
          },
          name: 'syn-button',
          search: ['component:syn-button', 'syn-button'],
        },
        {
          corePath: 'data/core/component/component:syn-fieldset.json',
          id: 'component:syn-fieldset',
          kind: 'component',
          layers: {
            interface: 1,
          },
          name: 'syn-fieldset',
          search: ['component:syn-fieldset', 'syn-fieldset'],
        },
      ],
      version: '1.0.0',
    };

    const synButtonCoreEntity = {
      id: 'component:syn-button',
      kind: 'component',
      layers: {
        interface: [{
          layer: 'interface',
          path: 'data/layers/interface/component/component:syn-button.json',
        }],
      },
      name: 'syn-button',
    };

    const synFieldsetCoreEntity = {
      id: 'component:syn-fieldset',
      kind: 'component',
      layers: {
        interface: [{
          layer: 'interface',
          path: 'data/layers/interface/component/component:syn-fieldset.json',
        }],
      },
      name: 'syn-fieldset',
    };

    await writeFile(path.join(root, 'index.json'), JSON.stringify(index));
    await writeFile(
      synButtonInterfaceLayerPath,
      await readFile(sourceSynButtonInterfaceLayerPath, 'utf8'),
    );
    await writeFile(
      synFieldsetInterfaceLayerPath,
      await readFile(sourceSynFieldsetInterfaceLayerPath, 'utf8'),
    );
    await writeFile(synButtonCorePath, JSON.stringify(synButtonCoreEntity));
    await writeFile(synFieldsetCorePath, JSON.stringify(synFieldsetCoreEntity));

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
        framework: 'react-web-components',
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

  it('uses metadata property defaults during strict structure validation', async () => {
    const { experimental_validateComponent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await experimental_validateComponent({
        component: 'syn-button',
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intent: 'action.primary',
        structure: {
          children: [
            {
              component: 'text',
              text: 'Action',
            },
          ],
          component: 'syn-button',
          props: {
            variant: 'filled',
          },
        },
      }, {
        dataDir: fixture.dataDir,
      });

      expect(response.errors).to.equal(undefined);
      expect(response.data).to.not.equal(null);
      expect(response.data.valid).to.equal(true);
      expect(response.data.issues.some((issue) => issue.code === 'REQUIRED_PROP_BUTTON_TYPE')).to.equal(false);
    } finally {
      await fixture.cleanup();
    }
  });

  it('keeps explicit property values over metadata defaults', async () => {
    const { experimental_validateComponent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await experimental_validateComponent({
        component: 'syn-button',
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intent: 'action.primary',
        structure: {
          children: [
            {
              component: 'text',
              text: 'Action',
            },
          ],
          component: 'syn-button',
          props: {
            type: 'reset',
            variant: 'filled',
          },
        },
      }, {
        dataDir: fixture.dataDir,
      });

      expect(response.errors).to.equal(undefined);
      expect(response.data).to.not.equal(null);
      expect(response.data.valid).to.equal(false);
      expect(response.data.issues.some((issue) => issue.code === 'REQUIRED_PROP_BUTTON_TYPE')).to.equal(true);
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
        framework: 'react-web-components',
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
        framework: 'react-web-components',
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

  it('warns when fieldset grouping intent omits both legend property and legend slot', async () => {
    const { experimental_validateComponent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await experimental_validateComponent({
        component: 'syn-fieldset',
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intent: 'input.grouping.fieldset',
        structure: {
          children: [{
            component: 'syn-input',
          }],
          component: 'syn-fieldset',
        },
      }, {
        dataDir: fixture.dataDir,
      });

      expect(response.errors).to.equal(undefined);
      expect(response.data).to.not.equal(null);
      expect(response.data.valid).to.equal(true);
      expect(response.data.issues.map((issue) => issue.code)).to.include('FIELDSET_LEGEND_REQUIRED');
      expect(response.data.issues.find((issue) => issue.code === 'FIELDSET_LEGEND_REQUIRED')?.severity).to.equal('warning');
    } finally {
      await fixture.cleanup();
    }
  });

  it('accepts fieldset grouping intent when legend property is provided', async () => {
    const { experimental_validateComponent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await experimental_validateComponent({
        component: 'syn-fieldset',
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intent: 'input.grouping.fieldset',
        structure: {
          children: [{
            component: 'syn-input',
          }],
          component: 'syn-fieldset',
          props: {
            legend: 'Contact details',
          },
        },
      }, {
        dataDir: fixture.dataDir,
      });

      expect(response.errors).to.equal(undefined);
      expect(response.data).to.not.equal(null);
      expect(response.data.issues.some((issue) => issue.code === 'FIELDSET_LEGEND_REQUIRED')).to.equal(false);
    } finally {
      await fixture.cleanup();
    }
  });

  it('accepts fieldset grouping intent when legend slot content is provided', async () => {
    const { experimental_validateComponent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await experimental_validateComponent({
        component: 'syn-fieldset',
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intent: 'input.grouping.fieldset',
        structure: {
          children: [
            {
              component: 'text',
              slot: 'legend',
              text: 'Contact details',
            },
            {
              component: 'syn-input',
            },
          ],
          component: 'syn-fieldset',
        },
      }, {
        dataDir: fixture.dataDir,
      });

      expect(response.errors).to.equal(undefined);
      expect(response.data).to.not.equal(null);
      expect(response.data.issues.some((issue) => issue.code === 'FIELDSET_LEGEND_REQUIRED')).to.equal(false);
    } finally {
      await fixture.cleanup();
    }
  });

  it('validates structural composition and node-level rules for confirmation dialog intent', async () => {
    const { experimental_validateComponent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await experimental_validateComponent({
        component: 'syn-dialog',
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intent: 'structure.confirmation',
        structure: {
          children: [
            {
              component: 'text',
              role: 'content',
              text: 'Content',
            },
            {
              children: [
                {
                  component: 'syn-button',
                  props: {
                    variant: 'danger',
                  },
                  role: 'cancelAction',
                  text: 'Abort',
                },
                {
                  component: 'syn-button',
                  props: {
                    href: '#',
                    variant: 'text',
                  },
                  role: 'confirmAction',
                  text: 'Delete this!',
                },
              ],
              component: 'nav',
              role: 'footer',
              slot: 'footer',
            },
          ],
          component: 'syn-dialog',
          role: 'container',
        },
      }, {
        dataDir: fixture.dataDir,
      });

      expect(response.errors).to.equal(undefined);
      expect(response.data).to.not.equal(null);
      expect(response.data.valid).to.equal(false);
      expect(response.data.issues.map((issue) => issue.code)).to.include('REQUIRED_CANCEL_VARIANT_TEXT');
      expect(response.data.issues.map((issue) => issue.code)).to.include('REQUIRED_CONFIRM_VARIANT_FILLED');
      expect(response.data.issues.map((issue) => issue.code)).to.include('FORBIDDEN_CONFIRM_HREF');
    } finally {
      await fixture.cleanup();
    }
  });

  it('finds component recommendations for an intent task', async () => {
    const { experimental_findComponentsForTask } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await experimental_findComponentsForTask({
        framework: 'react-web-components',
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
        framework: 'react-web-components',
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
        framework: 'react-web-components',
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

  it('prioritizes radio-group over select and radio-button for input.selection.single', async () => {
    const { experimental_getIntentOptions } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await experimental_getIntentOptions({
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intentId: 'input.selection.single',
      }, {
        dataDir: fixture.dataDir,
      });

      expect(response.errors).to.equal(undefined);
      expect(response.data).to.not.equal(null);
      expect(response.data.bestDefaultTargetId).to.equal('component:syn-radio-group');
      expect(response.data.renderableTargets.map((target) => target.targetId)).to.deep.equal([
        'component:syn-radio-group',
        'component:syn-select',
        'component:syn-radio-button',
      ]);
    } finally {
      await fixture.cleanup();
    }
  });
});
