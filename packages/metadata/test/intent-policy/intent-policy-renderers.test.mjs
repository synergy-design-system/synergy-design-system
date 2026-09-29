import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('intent policy renderers', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const metadataPackageDir = path.resolve(__dirname, '..', '..');

  /**
   * @returns {Promise<typeof import('../../dist/intentPolicy/services/render.js')>}
   */
  const loadRenderService = async () => {
    const modulePath = path.join(metadataPackageDir, 'dist', 'intentPolicy', 'services', 'render.js');
    return import(modulePath);
  };

  const buttonTarget = {
    id: 'component:syn-button',
    kind: 'component',
    name: 'syn-button',
  };

  it('renders action.primary for all framework profiles', async () => {
    const { renderIntentFromRegistry } = await loadRenderService();

    assert.strictEqual(renderIntentFromRegistry({
      framework: 'react-web-components',
      intent: 'action.primary',
      target: buttonTarget,
    }), '<syn-button type="button" variant="filled">CONTENT</syn-button>');

    assert.strictEqual(renderIntentFromRegistry({
      framework: 'react-wrapper',
      intent: 'action.primary',
      target: buttonTarget,
    }), '<SynButton type="button" variant="filled">CONTENT</SynButton>');

    assert.strictEqual(renderIntentFromRegistry({
      framework: 'angular',
      intent: 'action.primary',
      target: buttonTarget,
    }), '<syn-button type="button" variant="filled">CONTENT</syn-button>');

    assert.strictEqual(renderIntentFromRegistry({
      framework: 'vue',
      intent: 'action.primary',
      target: buttonTarget,
    }), '<SynVueButton type="button" variant="filled">CONTENT</SynVueButton>');

    assert.strictEqual(renderIntentFromRegistry({
      framework: 'vue-web-components',
      intent: 'action.primary',
      target: buttonTarget,
    }), '<syn-button type="button" variant="filled">CONTENT</syn-button>');

    assert.strictEqual(renderIntentFromRegistry({
      framework: 'vanilla',
      intent: 'action.primary',
      target: buttonTarget,
    }), '<syn-button type="button" variant="filled">CONTENT</syn-button>');
  });

  it('renders structure.confirmation recursively with stable action order', async () => {
    const { renderIntentFromRegistry } = await loadRenderService();

    const rendered = renderIntentFromRegistry({
      framework: 'react-web-components',
      intent: 'structure.confirmation',
      target: {
        id: 'component:syn-dialog',
        kind: 'component',
        name: 'syn-dialog',
      },
    });

    assert.notStrictEqual(rendered, null);
    assert.ok(rendered.includes('<syn-dialog'));
    assert.ok(rendered.includes('<nav slot="footer">'));
    assert.ok(rendered.includes('<syn-button variant="text"></syn-button>'));
    assert.ok(rendered.includes('<syn-button variant="filled"></syn-button>'));

    const cancelIndex = rendered.indexOf('variant="text"');
    const confirmIndex = rendered.indexOf('variant="filled"');
    assert.ok(cancelIndex < confirmIndex);
  });

  it('auto-selects a renderable target when none is provided', async () => {
    const { renderIntentFromRegistry } = await loadRenderService();

    const iconAction = renderIntentFromRegistry({
      framework: 'react-web-components',
      intent: 'action.button.icon',
    });

    const groupedAction = renderIntentFromRegistry({
      framework: 'react-web-components',
      intent: 'action.grouped',
    });

    const singleSelection = renderIntentFromRegistry({
      framework: 'react-web-components',
      intent: 'input.selection.single',
    });

    assert.strictEqual(iconAction, '<syn-icon-button>CONTENT</syn-icon-button>');
    assert.strictEqual(groupedAction, '<syn-button-group>CONTENT</syn-button-group>');
    assert.strictEqual(singleSelection, '<syn-radio-group>CONTENT</syn-radio-group>');
  });
});
