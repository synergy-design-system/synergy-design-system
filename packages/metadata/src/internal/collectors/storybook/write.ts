import {
  readdir, rename, unlink, writeFile,
} from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { ensureDir } from '../../writers/fs-utils.js';
import { type StorybookArtifactKind, type StorybookExampleArtifact } from './types.js';

const pruneStaleArtifacts = async (
  workspaceRoot: string,
  outputDir: string,
  kindsToSync: StorybookArtifactKind[],
  expectedByKind: Map<StorybookArtifactKind, Set<string>>,
): Promise<void> => {
  await Promise.all(kindsToSync.map(async (kind) => {
    const kindDir = resolve(workspaceRoot, outputDir, 'layers', 'examples', kind);
    const expected = expectedByKind.get(kind) ?? new Set<string>();

    let entries: string[];
    try {
      entries = await readdir(kindDir);
    } catch {
      return;
    }

    await Promise.all(entries
      .filter((entry) => entry.endsWith('.md'))
      .map(async (entry) => {
        if (expected.has(entry)) {
          return;
        }

        await unlink(resolve(kindDir, entry));
      }));
  }));
};

export async function writeStorybookArtifacts(
  artifacts: StorybookExampleArtifact[],
  workspaceRoot: string,
  outputDir: string,
  kindsToSync: StorybookArtifactKind[],
): Promise<void> {
  const expectedByKind = new Map<StorybookArtifactKind, Set<string>>();

  for (const kind of kindsToSync) {
    expectedByKind.set(kind, new Set<string>());
  }

  for (const artifact of artifacts) {
    const expectedFiles = expectedByKind.get(artifact.kind) ?? new Set<string>();
    expectedFiles.add(`${artifact.entityId}.md`);
    expectedByKind.set(artifact.kind, expectedFiles);
  }

  await Promise.all(artifacts.map(async (artifact) => {
    if (artifact.content.trim().length === 0) {
      throw new Error(`Refusing to write empty storybook artifact for ${artifact.entityId}`);
    }

    const filePath = resolve(
      workspaceRoot,
      outputDir,
      'layers',
      'examples',
      artifact.kind,
      `${artifact.entityId}.md`,
    );
    const tempPath = `${filePath}.tmp-${process.pid}-${Date.now()}`;
    const content = `${artifact.content.trimEnd()}\n`;

    await ensureDir(dirname(filePath));
    await writeFile(tempPath, content, 'utf8');
    await rename(tempPath, filePath);
  }));

  await pruneStaleArtifacts(workspaceRoot, outputDir, kindsToSync, expectedByKind);
}
