import fs from 'fs/promises';
import path from 'path';
import { job } from './shared.js';

/**
 * This function will create the events/events.ts file out of all vendored events
 */
export const runCreateEvents = job('Creating events main file', async (componentsDir) => {
  const eventsDir = path.join(componentsDir, 'src/events');

  const contents = await fs.readdir(eventsDir);

  const eventMap = contents
    .filter(item => item !== 'events.ts' && item.startsWith('syn-') && item.endsWith('.ts'))
    .sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    })
    .map(evtFile => `export type * from './${evtFile}';`)
    .join('\n');

  const output = [
    '// !!! This file is automatically generated via scripts/build.js',
    '// !!! Changes you apply to this file will get lost',
    '// !!! Please add your wanted events to the `events` array in scripts/vendorism.js',
    '// !!! or add a new typescript file to the src/events folder',
    '// !!! and run `pnpm build` to recreate this index file',
    eventMap,
    '',
  ].join('\n');

  await fs.writeFile(path.join(eventsDir, 'events.ts'), output);
});