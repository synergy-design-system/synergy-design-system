import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect } from 'chai';
import { execa } from 'execa';

describe('storybook examples sync', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const metadataPackageDir = path.resolve(__dirname, '..', '..');

  /**
   * Keep runtime path dynamic for integration tests while preserving editor type support.
   *
   * @returns {Promise<typeof import('../../dist/internal/collectors/storybook/write.js')>}
   */
  const loadStorybookWriteModule = async () => import(path.join(
    metadataPackageDir,
    'dist',
    'internal',
    'collectors',
    'storybook',
    'write.js',
  ));

  it('prunes stale examples and keeps core refs in sync', async () => {
    const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'metadata-storybook-prune-test-'));

    try {
      const outputDir = path.join(tempRoot, 'data');
      const staleAccordionExamplePath = path.join(
        outputDir,
        'layers',
        'examples',
        'component',
        'component:syn-accordion.md',
      );

      await mkdir(path.dirname(staleAccordionExamplePath), { recursive: true });
      await writeFile(staleAccordionExamplePath, '# stale accordion example\n', 'utf8');

      const { writeStorybookArtifacts } = await loadStorybookWriteModule();

      await writeStorybookArtifacts(
        [
          {
            content: '# syn-alert example\n\n```html\n<syn-alert open>Alert</syn-alert>\n```\n',
            entityId: 'component:syn-alert',
            item: 'syn-alert',
            kind: 'component',
            stories: [],
          },
        ],
        metadataPackageDir,
        outputDir,
        ['component'],
      );

      await execa('node', ['dist/internal/cli/build.js'], {
        cwd: metadataPackageDir,
        env: {
          ...process.env,
          SYNERGY_METADATA_OUTPUT_DIR: outputDir,
        },
      });

      let staleExists = true;
      try {
        await access(staleAccordionExamplePath);
      } catch {
        staleExists = false;
      }
      expect(staleExists).to.equal(false);

      const accordionCorePath = path.join(
        outputDir,
        'core',
        'component',
        'component:syn-accordion.json',
      );
      const accordionCore = JSON.parse(await readFile(accordionCorePath, 'utf8'));
      expect(accordionCore.layers).to.not.have.property('examples');

      const alertExamplePath = path.join(
        outputDir,
        'layers',
        'examples',
        'component',
        'component:syn-alert.md',
      );
      await access(alertExamplePath);

      const alertCorePath = path.join(
        outputDir,
        'core',
        'component',
        'component:syn-alert.json',
      );
      const alertCore = JSON.parse(await readFile(alertCorePath, 'utf8'));
      expect(alertCore.layers.examples.some((ref) => ref.path === 'layers/examples/component/component:syn-alert.md')).to.equal(true);
    } finally {
      await rm(tempRoot, { force: true, recursive: true });
    }
  });
});
