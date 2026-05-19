import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';
import { expect } from 'chai';

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

    expect(renderIntentFromRegistry({
      framework: 'react-web-components',
      intent: 'action.primary',
      target: buttonTarget,
    })).to.equal('<syn-button type="button" variant="filled">CONTENT</syn-button>');

    expect(renderIntentFromRegistry({
      framework: 'react-wrapper',
      intent: 'action.primary',
      target: buttonTarget,
    })).to.equal('<SynButton type="button" variant="filled">CONTENT</SynButton>');

    expect(renderIntentFromRegistry({
      framework: 'angular',
      intent: 'action.primary',
      target: buttonTarget,
    })).to.equal('<syn-button type="button" variant="filled">CONTENT</syn-button>');

    expect(renderIntentFromRegistry({
      framework: 'vue',
      intent: 'action.primary',
      target: buttonTarget,
    })).to.equal('<SynVueButton type="button" variant="filled">CONTENT</SynVueButton>');

    expect(renderIntentFromRegistry({
      framework: 'vanilla',
      intent: 'action.primary',
      target: buttonTarget,
    })).to.equal('<syn-button type="button" variant="filled">CONTENT</syn-button>');
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

    expect(rendered).to.not.equal(null);
    expect(rendered).to.include('<syn-dialog');
    expect(rendered).to.include('<nav slot="footer">');
    expect(rendered).to.include('<syn-button variant="text">Abort</syn-button>');
    expect(rendered).to.include('<syn-button variant="filled">Delete this!</syn-button>');

    const cancelIndex = rendered.indexOf('Abort');
    const confirmIndex = rendered.indexOf('Delete this!');
    expect(cancelIndex).to.be.lessThan(confirmIndex);
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

    expect(iconAction).to.equal('<syn-icon-button>CONTENT</syn-icon-button>');
    expect(groupedAction).to.equal('<syn-button-group>CONTENT</syn-button-group>');
  });
});
