import assert from 'node:assert/strict';
import {
  mkdir, mkdtemp, readFile, rm, unlink, writeFile,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import {
  getDataForComponent,
  getDataForStyle,
  getDataForTemplate,
  getComponentMetadata,
  getStyleMetadata,
  getTemplateMetadata,
  getExample,
  listExamples,
  clearMetadataStoreCache,
} from '../../dist/public/index.js';
import { normalize } from '../../dist/internal/collectors/storybook/normalize.js';
import { writeStorybookArtifacts } from '../../dist/internal/collectors/storybook/write.js';

describe('individual Storybook examples', () => {
  it('lists and retrieves examples for each kind without changing aggregate payloads', async () => {
    const cases = [
      ['component', 'syn-chart', () => getDataForComponent('syn-chart', { layer: 'examples' }), () => getComponentMetadata('syn-chart')],
      ['style', 'syn-table', () => getDataForStyle('syn-table'), () => getStyleMetadata('syn-table')],
      ['template', 'appshell', () => getDataForTemplate('appshell'), () => getTemplateMetadata('appshell')],
    ];
    for (const [kind, name, getAggregate, getMetadata] of cases) {
      const list = await listExamples(kind, name);
      assert.ok(list.data?.length > 1, `${kind} must have multiple examples`);
      assert.equal(new Set(list.data.map(example => example.id)).size, list.data.length);
      const first = list.data[0];
      assert.ok(first.id && first.title);
      const metadata = await getMetadata();
      const refs = metadata.data.layers.examples.map(ref => ref.path.replaceAll('\\', '/'));
      assert.equal(refs.length, list.data.length + 2);
      assert.ok(refs.includes(first.path));
      assert.ok(refs.includes(`${refs[0].slice(0, -3)}/index.json`));
      assert.ok(list.data.every(example => refs.includes(example.path)));
      const selected = await getExample(kind, name, first.id);
      assert.equal(selected.data.id, first.id);
      assert.match(selected.data.content, /```html/);
      const aggregate = await getAggregate();
      assert.equal(aggregate.data.examples.length, 1);
      assert.ok(aggregate.data.examples[0].content.includes(selected.data.content.trim()));
      assert.ok(selected.data.content.length < aggregate.data.examples[0].content.length);
      const missing = await getExample(kind, name, 'does-not-exist');
      assert.equal(missing.data, null);
      assert.equal(missing.errors[0].code, 'NOT_FOUND');
    }

    const chart = await listExamples('component', 'syn-chart');
    assert.ok(chart.data.filter(example => example.title === 'Default').length > 1);
    assert.equal((await listExamples('component', 'syn-not-a-component')).errors[0].code, 'NOT_FOUND');
  });

  it('rejects duplicate and unsafe source IDs before writing artifacts', async () => {
    const story = { description: '', example: '<div></div>', heading: 'Default', id: 'page--default' };
    const document = { entityId: 'component:syn-test', item: 'syn-test', kind: 'component', stories: [story, story] };
    const duplicate = await normalize([document]);
    assert.equal(duplicate.ok, false);
    const unsafe = await normalize([{ ...document, stories: [{ ...story, id: '../escape' }] }]);
    assert.equal(unsafe.ok, false);
  });

  it('lists without reading individual files and reports a missing index', async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), 'synergy-example-api-'));
    try {
      const base = 'layers/examples/component/component__syn-test';
      await mkdir(path.join(root, 'core/component'), { recursive: true });
      await mkdir(path.join(root, base), { recursive: true });
      await writeFile(path.join(root, 'index.json'), JSON.stringify({
        builtAt: '2026-01-01',
        entities: [{ corePath: 'data/core/component/component__syn-test.json', id: 'component:syn-test', kind: 'component' }],
        version: '1',
      }));
      await writeFile(path.join(root, 'core/component/component__syn-test.json'), JSON.stringify({
        id: 'component:syn-test',
        kind: 'component',
        layers: { examples: [
          { layer: 'examples', path: `${base}.md` },
          { layer: 'examples', path: `${base}/index.json` },
          { layer: 'examples', path: `${base}/page--first.md` },
          { layer: 'examples', path: `${base}/page--second.md` },
        ] },
        name: 'syn-test',
        package: 'components',
        relations: [],
        sources: [],
        status: 'stable',
        tags: [],
      }));
      await writeFile(path.join(root, base, 'index.json'), JSON.stringify([
        { description: '', id: 'page--first', path: `${base}/page--first.md`, title: 'First' },
        { description: 'Second', id: 'page--second', path: `${base}/page--second.md`, title: 'Second' },
      ]));
      await writeFile(path.join(root, base, 'page--first.md'), 'first example');
      await writeFile(path.join(root, `${base}.md`), 'combined examples');
      const options = { dataDir: root };
      assert.equal((await listExamples('component', 'syn-test', options)).data.length, 2);
      assert.equal((await getExample('component', 'syn-test', 'page--first', options)).data.content, 'first example');
      assert.equal((await getDataForComponent('syn-test', { layer: 'examples' }, options)).data.examples[0].content, 'combined examples');
      await assert.rejects(getExample('component', 'syn-test', 'page--second', options), { code: 'ENOENT' });
      await unlink(path.join(root, base, 'index.json'));
      clearMetadataStoreCache();
      assert.equal((await listExamples('component', 'syn-test', options)).errors[0].code, 'DATA_NOT_READY');
    } finally {
      clearMetadataStoreCache();
      await rm(root, { force: true, recursive: true });
    }
  });

  it('prunes removed examples while keeping the legacy aggregate', async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), 'synergy-example-sync-'));
    try {
      const artifact = {
        content: 'combined',
        entityId: 'component:syn-test',
        examples: [
          { content: 'first', description: '', id: 'page--first', title: 'First' },
          { content: 'second', description: 'description', id: 'page--second', title: 'Second' },
        ],
        item: 'syn-test',
        kind: 'component',
        stories: [],
      };
      await writeStorybookArtifacts([artifact], root, 'data', ['component']);
      await writeStorybookArtifacts([{ ...artifact, examples: [artifact.examples[1]] }], root, 'data', ['component']);
      const directory = path.join(root, 'data/layers/examples/component/component__syn-test');
      const index = JSON.parse(await readFile(path.join(directory, 'index.json'), 'utf8'));
      assert.deepEqual(index.map(entry => entry.id), ['page--second']);
      await assert.rejects(readFile(path.join(directory, 'page--first.md')), { code: 'ENOENT' });
      assert.equal(await readFile(`${directory}.md`, 'utf8'), 'combined\n');
    } finally {
      await rm(root, { force: true, recursive: true });
    }
  });
});
