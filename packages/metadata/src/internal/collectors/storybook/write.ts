import {
  readdir, rename, rm, unlink, writeFile,
} from 'node:fs/promises';
import { dirname, posix, resolve } from 'node:path';
import { encodeEntityIdForPath } from '../../core/entity-paths.js';
import { ensureDir, writeJsonAtomic } from '../../writers/fs-utils.js';
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

    let entries;
    try {
      entries = await readdir(kindDir, { withFileTypes: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return;
      throw error;
    }

    await Promise.all(entries
      .filter((entry) => (entry.isDirectory() && entry.name.startsWith(`${kind}__`))
        || (entry.isFile() && entry.name.endsWith('.md')))
      .map(async (entry) => {
        const aggregateName = entry.isDirectory() ? `${entry.name}.md` : entry.name;
        if (expected.has(aggregateName)) {
          return;
        }

        if (entry.isDirectory()) {
          await rm(resolve(kindDir, entry.name), { recursive: true });
        } else {
          await unlink(resolve(kindDir, entry.name));
        }
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
    expectedFiles.add(`${encodeEntityIdForPath(artifact.entityId)}.md`);
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
      `${encodeEntityIdForPath(artifact.entityId)}.md`,
    );
    const tempPath = `${filePath}.tmp-${process.pid}-${Date.now()}`;
    const content = `${artifact.content.trimEnd()}\n`;

    await ensureDir(dirname(filePath));
    await writeFile(tempPath, content, 'utf8');
    await rename(tempPath, filePath);

    const exampleDir = filePath.slice(0, -3);
    await ensureDir(exampleDir);
    const expectedFiles = new Set(['index.json']);
    const index = await Promise.all(artifact.examples.map(async (example) => {
      if (!/^[a-z0-9][a-z0-9-]*$/.test(example.id)) {
        throw new Error(`Invalid example ID "${example.id}" for ${artifact.entityId}`);
      }
      const filename = `${example.id}.md`;
      if (expectedFiles.has(filename)) {
        throw new Error(`Duplicate example ID "${example.id}" for ${artifact.entityId}`);
      }
      expectedFiles.add(filename);
      await writeFile(resolve(exampleDir, filename), `${example.content.trimEnd()}\n`, 'utf8');
      return {
        description: example.description,
        id: example.id,
        path: posix.join('layers', 'examples', artifact.kind, encodeEntityIdForPath(artifact.entityId), filename),
        title: example.title,
      };
    }));
    await writeJsonAtomic(resolve(exampleDir, 'index.json'), index);
    const existing = await readdir(exampleDir, { withFileTypes: true });
    await Promise.all(existing
      .filter(entry => entry.isFile() && !expectedFiles.has(entry.name))
      .map(entry => unlink(resolve(exampleDir, entry.name))));
  }));

  await pruneStaleArtifacts(workspaceRoot, outputDir, kindsToSync, expectedByKind);
}
