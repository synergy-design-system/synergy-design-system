export type ExampleEntry = {
  description: string;
  id: string;
  path: string;
  title: string;
};

export const parseExampleIndex = (raw: string, directory: string): ExampleEntry[] => {
  const value: unknown = JSON.parse(raw);
  if (!Array.isArray(value)) throw new Error(`Invalid example index at ${directory}`);
  const ids = new Set<string>();
  const examples: ExampleEntry[] = [];
  for (const entry of value as unknown[]) {
    if (typeof entry !== 'object' || entry === null
      || !('id' in entry) || typeof entry.id !== 'string'
      || !('title' in entry) || typeof entry.title !== 'string'
      || !('description' in entry) || typeof entry.description !== 'string'
      || !('path' in entry) || typeof entry.path !== 'string'
      || !/^[a-z0-9][a-z0-9-]*$/.test(entry.id)
      || ids.has(entry.id) || entry.path !== `${directory}/${entry.id}.md`) {
      throw new Error(`Invalid example index at ${directory}`);
    }
    ids.add(entry.id);
    examples.push({
      description: entry.description,
      id: entry.id,
      path: entry.path,
      title: entry.title,
    });
  }
  return examples;
};
