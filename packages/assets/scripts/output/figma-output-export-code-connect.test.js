import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { outputComponentsToCodeConnect } from './figma-output-export-code-connect.js';

test('exports all pages into one sorted icon batch without empty SVGs', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'synergy-icon-batch-'));
  const output = join(directory, 'icons.figma.batch.json');
  const component = (basename, id, svg = '<svg/>') => ({
    figmaExport: { basename },
    id,
    name: basename,
    svg,
  });

  try {
    const write = outputComponentsToCodeConnect({
      fileId: 'figma-file',
      getBasename: ({ basename }) => basename.replace('name=', ''),
      output,
    });
    const pages = [
      {
        components: [component('name=z-icon', '1:1'), component('empty', '1:2', '')],
        name: 'First',
      },
      {
        components: [component('name=a-"quoted"-icon', '2:1')],
        name: 'Second',
      },
    ];

    assert.equal(await write(pages), true);
    const contents = await readFile(output, 'utf8');
    const batch = JSON.parse(contents);
    assert.equal(batch.templateFile, './icons.figma.batch.ts');
    assert.deepEqual(batch.components.map(({ name, url }) => ({ name, url })), [
      { name: 'a-"quoted"-icon', url: 'https://www.figma.com/design/figma-file?node-id=2:1' },
      { name: 'z-icon', url: 'https://www.figma.com/design/figma-file?node-id=1:1' },
    ]);
    assert.ok(batch.components.every(icon => icon.component === 'SynIcon'
      && icon.source === 'https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/icon/icon.component.ts'));

    assert.equal(await write(pages), true);
    assert.equal(await readFile(output, 'utf8'), contents);
    assert.equal(await write([]), true);
    assert.deepEqual(JSON.parse(await readFile(output, 'utf8')).components, []);
  } finally {
    await rm(directory, { force: true, recursive: true });
  }
});
