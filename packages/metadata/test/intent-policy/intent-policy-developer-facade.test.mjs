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
import assert from 'node:assert/strict';

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

    const synButtonInterfaceLayerPath = path.join(root, 'layers', 'interface', 'component', 'component__syn-button.json');
    const sourceSynButtonInterfaceLayerPath = path.join(
      metadataPackageDir,
      'data',
      'layers',
      'interface',
      'component',
      'component__syn-button.json',
    );
    const synButtonCorePath = path.join(root, 'core', 'component', 'component__syn-button.json');
    const synFieldsetInterfaceLayerPath = path.join(root, 'layers', 'interface', 'component', 'component__syn-fieldset.json');
    const sourceSynFieldsetInterfaceLayerPath = path.join(
      metadataPackageDir,
      'data',
      'layers',
      'interface',
      'component',
      'component__syn-fieldset.json',
    );
    const synFieldsetCorePath = path.join(root, 'core', 'component', 'component__syn-fieldset.json');

    const index = {
      builtAt: '2026-05-18T00:00:00.000Z',
      entities: [
        {
          corePath: 'data/core/component/component__syn-button.json',
          id: 'component:syn-button',
          kind: 'component',
          layers: {
            interface: 1,
          },
          name: 'syn-button',
          search: ['component:syn-button', 'syn-button'],
        },
        {
          corePath: 'data/core/component/component__syn-fieldset.json',
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
          path: 'data/layers/interface/component/component__syn-button.json',
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
          path: 'data/layers/interface/component/component__syn-fieldset.json',
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
    const { validateComponent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await validateComponent({
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

      assert.strictEqual(response.errors, undefined);
      assert.notStrictEqual(response.data, null);
      assert.strictEqual(response.data.valid, false);
      assert.ok(response.data.issues.map((issue) => issue.code).includes('FORBIDDEN_PROP_HREF'));
    } finally {
      await fixture.cleanup();
    }
  });

  it('uses metadata property defaults during strict structure validation', async () => {
    const { validateComponent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await validateComponent({
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

      assert.strictEqual(response.errors, undefined);
      assert.notStrictEqual(response.data, null);
      assert.strictEqual(response.data.valid, true);
      assert.ok(!response.data.issues.some((issue) => issue.code === 'REQUIRED_PROP_BUTTON_TYPE'));
    } finally {
      await fixture.cleanup();
    }
  });

  it('keeps explicit property values over metadata defaults', async () => {
    const { validateComponent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await validateComponent({
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

      assert.strictEqual(response.errors, undefined);
      assert.notStrictEqual(response.data, null);
      assert.strictEqual(response.data.valid, false);
      assert.ok(response.data.issues.some((issue) => issue.code === 'REQUIRED_PROP_BUTTON_TYPE'));
    } finally {
      await fixture.cleanup();
    }
  });

  it('returns component guide for supported intents and usages', async () => {
    const { getComponentGuide } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await getComponentGuide({
        component: 'syn-button',
        framework: 'react-web-components',
        includePhases: ['experimental'],
      }, {
        dataDir: fixture.dataDir,
      });

      assert.strictEqual(response.errors, undefined);
      assert.notStrictEqual(response.data, null);
      assert.ok(response.data.supportedIntents.map((intent) => intent.id).includes('action.submit'));
      assert.ok(response.data.recommendedUsages.length > 0);
    } finally {
      await fixture.cleanup();
    }
  });

  it('emits contextual warning when submit intent is disabled', async () => {
    const { validateComponent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await validateComponent({
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

      assert.strictEqual(response.errors, undefined);
      assert.notStrictEqual(response.data, null);
      assert.strictEqual(response.data.valid, true);
      assert.strictEqual(response.data.score, 90);
      assert.ok(response.data.issues.map((issue) => issue.code).includes('INTENT_TEMPORARILY_BLOCKED'));
      assert.strictEqual(response.data.issues.find((issue) => issue.code === 'INTENT_TEMPORARILY_BLOCKED')?.severity, 'warning');
    } finally {
      await fixture.cleanup();
    }
  });

  it('warns when fieldset grouping intent omits both legend property and legend slot', async () => {
    const { validateComponent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await validateComponent({
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

      assert.strictEqual(response.errors, undefined);
      assert.notStrictEqual(response.data, null);
      assert.strictEqual(response.data.valid, true);
      assert.ok(response.data.issues.map((issue) => issue.code).includes('FIELDSET_LEGEND_REQUIRED'));
      assert.strictEqual(response.data.issues.find((issue) => issue.code === 'FIELDSET_LEGEND_REQUIRED')?.severity, 'warning');
    } finally {
      await fixture.cleanup();
    }
  });

  it('accepts fieldset grouping intent when legend property is provided', async () => {
    const { validateComponent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await validateComponent({
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

      assert.strictEqual(response.errors, undefined);
      assert.notStrictEqual(response.data, null);
      assert.ok(!response.data.issues.some((issue) => issue.code === 'FIELDSET_LEGEND_REQUIRED'));
    } finally {
      await fixture.cleanup();
    }
  });

  it('accepts fieldset grouping intent when legend slot content is provided', async () => {
    const { validateComponent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await validateComponent({
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

      assert.strictEqual(response.errors, undefined);
      assert.notStrictEqual(response.data, null);
      assert.ok(!response.data.issues.some((issue) => issue.code === 'FIELDSET_LEGEND_REQUIRED'));
    } finally {
      await fixture.cleanup();
    }
  });

  it('warns when checkbox grouping intent omits both label property and label slot', async () => {
    const { validateComponent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await validateComponent({
        component: 'syn-checkbox-group',
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intent: 'input.grouping.checkbox',
        structure: {
          children: [{
            component: 'syn-checkbox',
          }],
          component: 'syn-checkbox-group',
        },
      }, {
        dataDir: fixture.dataDir,
      });

      assert.strictEqual(response.errors, undefined);
      assert.notStrictEqual(response.data, null);
      assert.strictEqual(response.data.valid, true);
      assert.ok(response.data.issues.map((issue) => issue.code).includes('CHECKBOX_GROUP_LABEL_REQUIRED'));
      assert.strictEqual(response.data.issues.find((issue) => issue.code === 'CHECKBOX_GROUP_LABEL_REQUIRED')?.severity, 'warning');
    } finally {
      await fixture.cleanup();
    }
  });

  it('accepts checkbox grouping intent when label property is provided', async () => {
    const { validateComponent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await validateComponent({
        component: 'syn-checkbox-group',
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intent: 'input.grouping.checkbox',
        structure: {
          children: [{
            component: 'syn-checkbox',
          }],
          component: 'syn-checkbox-group',
          props: {
            label: 'Preferences',
          },
        },
      }, {
        dataDir: fixture.dataDir,
      });

      assert.strictEqual(response.errors, undefined);
      assert.notStrictEqual(response.data, null);
      assert.ok(!response.data.issues.some((issue) => issue.code === 'CHECKBOX_GROUP_LABEL_REQUIRED'));
    } finally {
      await fixture.cleanup();
    }
  });

  it('accepts checkbox grouping intent when label slot content is provided', async () => {
    const { validateComponent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await validateComponent({
        component: 'syn-checkbox-group',
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intent: 'input.grouping.checkbox',
        structure: {
          children: [
            {
              component: 'text',
              slot: 'label',
              text: 'Preferences',
            },
            {
              component: 'syn-checkbox',
            },
          ],
          component: 'syn-checkbox-group',
        },
      }, {
        dataDir: fixture.dataDir,
      });

      assert.strictEqual(response.errors, undefined);
      assert.notStrictEqual(response.data, null);
      assert.ok(!response.data.issues.some((issue) => issue.code === 'CHECKBOX_GROUP_LABEL_REQUIRED'));
    } finally {
      await fixture.cleanup();
    }
  });

  it('returns only syn-fieldset for fieldset grouping intent', async () => {
    const { getIntentOptions } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await getIntentOptions({
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intentId: 'input.grouping.fieldset',
      }, {
        dataDir: fixture.dataDir,
      });

      assert.strictEqual(response.errors, undefined);
      assert.notStrictEqual(response.data, null);
      assert.strictEqual(response.data.bestDefaultTargetId, 'component:syn-fieldset');
      assert.deepStrictEqual(response.data.renderableTargets.map((target) => target.targetId), [
        'component:syn-fieldset',
      ]);
      assert.ok(!response.data.nonRenderableCandidates.some((candidate) => candidate.targetId === 'component:syn-checkbox-group'));
    } finally {
      await fixture.cleanup();
    }
  });

  it('validates structural composition and node-level rules for confirmation dialog intent', async () => {
    const { validateComponent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await validateComponent({
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

      assert.strictEqual(response.errors, undefined);
      assert.notStrictEqual(response.data, null);
      assert.strictEqual(response.data.valid, false);
      assert.ok(response.data.issues.map((issue) => issue.code).includes('REQUIRED_CANCEL_VARIANT_TEXT'));
      assert.ok(response.data.issues.map((issue) => issue.code).includes('REQUIRED_CONFIRM_VARIANT_FILLED'));
      assert.ok(response.data.issues.map((issue) => issue.code).includes('FORBIDDEN_CONFIRM_HREF'));
    } finally {
      await fixture.cleanup();
    }
  });

  it('finds component recommendations for an intent task', async () => {
    const { findComponentsForTask } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await findComponentsForTask({
        framework: 'react-web-components',
        includePhases: ['experimental'],
        taskId: 'action.submit',
      }, {
        dataDir: fixture.dataDir,
      });

      assert.strictEqual(response.errors, undefined);
      assert.notStrictEqual(response.data, null);
      assert.notStrictEqual(response.data.primaryRecommendation, null);
      assert.strictEqual(response.data.primaryRecommendation.targetId, 'component:syn-button');
    } finally {
      await fixture.cleanup();
    }
  });

  it('returns only renderable options by default for an intent', async () => {
    const { getIntentOptions } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await getIntentOptions({
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intentId: 'action.grouped',
      }, {
        dataDir: fixture.dataDir,
      });

      assert.strictEqual(response.errors, undefined);
      assert.notStrictEqual(response.data, null);
      assert.strictEqual(response.data.bestDefaultTargetId, 'component:syn-button-group');
      assert.ok(response.data.renderableTargets.map((target) => target.targetId).includes('component:syn-button-group'));
      assert.deepStrictEqual(response.data.nonRenderableCandidates, []);
    } finally {
      await fixture.cleanup();
    }
  });

  it('returns non-renderable diagnostics when includeDiagnostics is enabled', async () => {
    const { getIntentOptions } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await getIntentOptions({
        framework: 'react-web-components',
        includeDiagnostics: true,
        includePhases: ['experimental'],
        intentId: 'navigation.link-list.grouped',
      }, {
        dataDir: fixture.dataDir,
      });

      assert.strictEqual(response.errors, undefined);
      assert.notStrictEqual(response.data, null);
      assert.strictEqual(response.data.bestDefaultTargetId, 'style:syn-link-list');
      assert.ok(response.data.renderableTargets.map((target) => target.targetId).includes('style:syn-link-list'));
      assert.ok(response.data.nonRenderableCandidates.length > 0);
      assert.ok(response.data.nonRenderableCandidates.some((candidate) => candidate.reasonCode === 'PATTERN_NOT_FOUND'));
    } finally {
      await fixture.cleanup();
    }
  });

  it('prioritizes radio-group over select and radio-button for input.selection.single', async () => {
    const { getIntentOptions } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await getIntentOptions({
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intentId: 'input.selection.single',
      }, {
        dataDir: fixture.dataDir,
      });

      assert.strictEqual(response.errors, undefined);
      assert.notStrictEqual(response.data, null);
      assert.strictEqual(response.data.bestDefaultTargetId, 'component:syn-radio-group');
      assert.deepStrictEqual(response.data.renderableTargets.map((target) => target.targetId), [
        'component:syn-radio-group',
        'component:syn-select',
        'component:syn-radio-button',
        'component:syn-radio',
        'component:syn-option',
      ]);
    } finally {
      await fixture.cleanup();
    }
  });

  it('returns syn-combobox for input.selection.searchable.multiple intent', async () => {
    const { getIntentOptions } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await getIntentOptions({
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intentId: 'input.selection.searchable.multiple',
      }, {
        dataDir: fixture.dataDir,
      });

      assert.strictEqual(response.errors, undefined);
      assert.notStrictEqual(response.data, null);
      assert.strictEqual(response.data.bestDefaultTargetId, 'component:syn-combobox');
      assert.deepStrictEqual(response.data.renderableTargets.map((target) => target.targetId), [
        'component:syn-combobox',
      ]);
    } finally {
      await fixture.cleanup();
    }
  });

  it('returns syn-validate as renderable target for generic validation feedback intent', async () => {
    const { getIntentOptions } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await getIntentOptions({
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intentId: 'feedback.validation.generic',
      }, {
        dataDir: fixture.dataDir,
      });

      assert.strictEqual(response.errors, undefined);
      assert.notStrictEqual(response.data, null);
      assert.strictEqual(response.data.bestDefaultTargetId, 'component:syn-validate');
      assert.deepStrictEqual(response.data.renderableTargets.map((target) => target.targetId), [
        'component:syn-validate',
      ]);
      assert.deepStrictEqual(response.data.nonRenderableCandidates, []);
    } finally {
      await fixture.cleanup();
    }
  });
});
