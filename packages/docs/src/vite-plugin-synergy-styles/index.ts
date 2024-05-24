import type { Plugin } from 'vite';
import type { Config } from './types.js';
import { getStructure } from './structure.js';
import { toCem } from './toCem.js';

export default async function vitePluginSynergyStyles(config: Config = {
  srcDir: 'src',
}): Promise<Plugin> {
  const { srcDir } = config;
  const structure = await getStructure(srcDir);
  const fakeManifest = toCem(structure);
  console.log(JSON.stringify(fakeManifest, null, 2));
  throw 'up';
  return {
    name: 'vite-plugin-synergy-styles',
  };
}
