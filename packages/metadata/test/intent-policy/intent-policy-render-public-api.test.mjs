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

describe('intent policy render public api', () => {
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
    const root = await mkdtemp(path.join(tmpdir(), 'metadata-intent-policy-render-'));
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

  it('exports experimental_renderIntent and renders action.primary for react-web-components', async () => {
    const { experimental_renderIntent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await experimental_renderIntent({
        framework: 'react-web-components',
        intent: 'action.primary',
        target: {
          id: 'component:syn-button',
          kind: 'component',
          name: 'syn-button',
        },
      }, {
        dataDir: fixture.dataDir,
      });

      expect(response.errors).to.equal(undefined);
      expect(response.data).to.equal('<syn-button type="button" variant="filled">CONTENT</syn-button>');
    } finally {
      await fixture.cleanup();
    }
  });

  it('renders with automatic target resolution when target is omitted', async () => {
    const { experimental_renderIntent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await experimental_renderIntent({
        framework: 'react-web-components',
        intent: 'action.grouped',
      }, {
        dataDir: fixture.dataDir,
      });

      expect(response.errors).to.equal(undefined);
      expect(response.data).to.equal('<syn-button-group>CONTENT</syn-button-group>');
    } finally {
      await fixture.cleanup();
    }
  });
});
