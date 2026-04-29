import { mkdir, writeFile } from 'fs/promises';
import {
  isAbsolute,
  join,
  normalize,
  resolve,
  sep,
} from 'path';
import { execSync } from 'child_process';
import type { Plugin } from 'vite';
import type { Config } from './types.js';
import { getStructure } from './structure.js';
import { toCem } from './toCem.js';

const runStylesBuild = () => execSync(
  'pnpm --filter=@synergy-design-system/styles run build',
);

const defaultOptions: Config = {
  endPoint: '/custom-elements-styles.json',
  outputFileName: 'custom-elements-styles.json',
  srcDir: 'src',
};

export default function vitePluginSynergyStyles(
  userConfig: Partial<Config> = defaultOptions,
): Plugin {
  const config = { ...defaultOptions, ...userConfig };
  const { endPoint, outputFileName, srcDir } = config;
  const srcDirAbs = normalize(resolve(process.cwd(), srcDir));
  const srcDirAbsWithSep = `${srcDirAbs}${sep}`;

  // Set up vite virtual module to make it possible to import the manifest
  const virtualModuleId = 'virtual:vite-plugin-synergy-styles/custom-elements-manifest';
  const resolvedVirtualModuleId = `\0${virtualModuleId}`;

  return {
    configureServer(server) {
      // Make sure to hot reload when something in the srcdir changes
      server.watcher.add(srcDirAbs);

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      server.middlewares.use(endPoint, async (_, res) => {
        try {
          runStylesBuild();
          const structure = await getStructure(srcDirAbs);
          const manifest = toCem(structure);
          res.end(JSON.stringify(manifest, null, 2));
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
          res.statusCode = 500;
          res.end('Internal server error');
        }
      });
    },
    async generateBundle(this, { dir }) {
      if (!dir) {
        return;
      }

      runStylesBuild();
      const outputPath = join(dir, outputFileName);
      const structure = await getStructure(srcDirAbs);
      const manifest = toCem(structure);

      await mkdir(dir, { recursive: true });
      await writeFile(outputPath, JSON.stringify(manifest));
    },
    async handleHotUpdate({ file, server }) {
      const fileAbs = normalize(isAbsolute(file) ? file : resolve(process.cwd(), file));
      const isCssSourceChange = (
        (fileAbs === srcDirAbs || fileAbs.startsWith(srcDirAbsWithSep))
        && fileAbs.endsWith('.css')
      );

      if (!isCssSourceChange) {
        server.config.logger.info(
          `[vite-plugin-synergy-styles] skip hot update for ${fileAbs}`,
          { timestamp: true },
        );
        return;
      }

      const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId)
        ?? await server.moduleGraph.getModuleByUrl(resolvedVirtualModuleId);

      if (!mod) {
        server.config.logger.info(
          '[vite-plugin-synergy-styles] virtual module not found, skipping reload',
          { timestamp: true },
        );
        return;
      }

      server.config.logger.info(
        `[vite-plugin-synergy-styles] reloading styles manifest due to ${file}`,
        { timestamp: true },
      );
      await server.reloadModule(mod);
    },
    async load(id) {
      if (id !== resolvedVirtualModuleId) {
        return undefined;
      }

      runStylesBuild();
      const structure = await getStructure(srcDirAbs);
      const manifest = toCem(structure);
      return `export default ${JSON.stringify(manifest)}`;
    },
    name: 'vite-plugin-synergy-styles',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
      return undefined;
    },
  };
}
