import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { expect } from 'chai';
import {
  getClustersForEntity,
  getOverride,
  loadConfig,
} from '../../dist/config/loader.js';
import { writeJsonAtomic } from '../../dist/internal/writers/fs-utils.js';

describe('config loader integration', () => {
  it('loads config and resolves overrides plus clustering deterministically', async () => {
    const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'metadata-config-test-'));

    try {
      const configDir = path.join(tempRoot, 'config');
      const overridesDir = path.join(configDir, 'overrides');
      const clusteringDir = path.join(configDir, 'clustering', 'components-by-tag');
      const storybookDir = path.join(tempRoot, 'external-data', 'storybook');

      await mkdir(overridesDir, { recursive: true });
      await mkdir(clusteringDir, { recursive: true });
      await mkdir(storybookDir, { recursive: true });

      await writeFile(
        path.join(overridesDir, 'component:syn-accordion.json'),
        JSON.stringify({
          storySourcePath: 'components.accordion',
          storyTags: ['Structure'],
        }),
        'utf8',
      );

      await writeFile(
        path.join(clusteringDir, 'structure.json'),
        JSON.stringify({
          description: 'Structure components',
          entities: ['component:syn-accordion'],
          name: 'Structure Components',
        }),
        'utf8',
      );

      await writeFile(
        path.join(storybookDir, '_docs.json'),
        JSON.stringify({
          components: {
            accordion: {
              default: {
                description: {
                  type: 'text',
                  value: 'Accordion description',
                },
                title: {
                  type: 'text',
                  value: 'Accordion title',
                },
              },
            },
          },
        }),
        'utf8',
      );

      const context = await loadConfig(configDir);

      expect(context.overrides.size).to.equal(1);
      expect(context.clustering.size).to.equal(1);
      expect(context.artifacts.storybook).to.not.equal(undefined);

      const override = getOverride(context, 'component:syn-accordion', true);
      expect(override).to.not.equal(null);
      expect(override.storyTags).to.deep.equal(['Structure']);
      expect(override.storySourcePath).to.equal('components.accordion');
      expect(override.stories).to.be.an('array').that.is.not.empty;
      expect(override.stories[0].name).to.equal('default');

      const clusters = getClustersForEntity(context, 'component:syn-accordion');
      expect(clusters).to.have.length(1);
      expect(clusters[0].name).to.equal('Structure Components');
    } finally {
      await rm(tempRoot, { force: true, recursive: true });
    }
  });
});

describe('json writer determinism', () => {
  it('writes JSON with recursively sorted object keys', async () => {
    const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'metadata-json-sort-test-'));

    try {
      const targetPath = path.join(tempRoot, 'out.json');

      /* eslint-disable sort-keys */
      // The whole point of this test is to verify that keys are sorted, so we intentionally write them in a non-sorted order here.
      await writeJsonAtomic(targetPath, {
        arr: [{ b: 2, a: 1 }],
        z: 1,
        a: { b: 2, a: 1 },
      });
      /* eslint-enable sort-keys */

      const raw = await readFile(targetPath, 'utf8');
      const parsed = JSON.parse(raw);

      // eslint-disable-next-line no-regex-spaces
      const topLevelKeys = Array.from(raw.matchAll(/^  "([^"]+)":/gm)).map((match) => match[1]);

      expect(topLevelKeys).to.deep.equal(['a', 'arr', 'z']);
      expect(Object.keys(parsed.a)).to.deep.equal(['a', 'b']);
      expect(Object.keys(parsed.arr[0])).to.deep.equal(['a', 'b']);
      expect(raw.endsWith('\n')).to.equal(true);
    } finally {
      await rm(tempRoot, { force: true, recursive: true });
    }
  });
});
