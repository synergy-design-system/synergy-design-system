import { access, readFile } from 'node:fs/promises';
import { join, posix } from 'node:path';
import { encodeEntityIdForPath } from '../../core/entity-paths.js';
import { parseExampleIndex } from '../../core/example-index.js';
import type { LayerRef } from '../../schemas/layer-ref.js';

export const discoverExampleReferences = async (
  outputDir: string,
  kind: string,
  entityId: string,
): Promise<LayerRef[]> => {
  const directory = posix.join('layers', 'examples', kind, encodeEntityIdForPath(entityId));
  const aggregate = `${directory}.md`;
  try {
    await access(join(outputDir, aggregate));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw error;
  }
  const refs: LayerRef[] = [{ layer: 'examples', path: aggregate }];
  const indexPath = `${directory}/index.json`;
  let index: string;
  try {
    index = await readFile(join(outputDir, indexPath), 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return refs;
    throw error;
  }
  const examples = parseExampleIndex(index, directory);
  await Promise.all(examples.map(example => access(join(outputDir, example.path))));
  return [
    ...refs,
    { layer: 'examples', path: indexPath },
    ...examples.map(example => ({ layer: 'examples' as const, path: example.path })),
  ];
};
