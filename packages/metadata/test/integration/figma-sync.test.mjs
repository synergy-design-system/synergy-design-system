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
import { syncCodeConnectFigmaOverrides } from '../../dist/config/index.js';

describe('code-connect figma override sync', () => {
  it('migrates legacy docs ids and prefers the marked web component connection', async () => {
    const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'metadata-figma-sync-test-'));

    try {
      const configDir = path.join(tempRoot, 'config');
      const overridesDir = path.join(configDir, 'overrides');
      const codeConnectDir = path.join(tempRoot, 'packages', 'components', 'code-connect', 'components');

      await mkdir(overridesDir, { recursive: true });
      await mkdir(codeConnectDir, { recursive: true });

      await writeFile(
        path.join(overridesDir, 'component__syn-accordion.json'),
        JSON.stringify({
          figmaComponentId: '41094-279501',
          storyTags: ['Structure'],
        }),
        'utf8',
      );

      await writeFile(
        path.join(codeConnectDir, 'syn-accordion.figma.ts'),
        [
          "import figma from '@figma/code-connect/html';",
          '',
          "figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=20877-88538', {});",
          '',
          '// Synergy Web Component Connection',
          "figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=20877-88547', {});",
          '',
        ].join('\n'),
        'utf8',
      );

      const summary = await syncCodeConnectFigmaOverrides(configDir, tempRoot);
      const syncedOverride = JSON.parse(
        await readFile(path.join(overridesDir, 'component__syn-accordion.json'), 'utf8'),
      );

      expect(summary.updatedCount).to.equal(1);
      expect(summary.ambiguousCount).to.equal(0);
      expect(syncedOverride).to.deep.equal({
        figmaComponentId: '20877-88547',
        figmaDocsId: '41094-279501',
        storyTags: ['Structure'],
      });
    } finally {
      await rm(tempRoot, { force: true, recursive: true });
    }
  });
});
