/* eslint-disable no-param-reassign */
import { readFileSync } from 'fs';
import { join } from 'path';
import { Plugin } from 'vite';

interface PackageVersionsPluginOptions {
  packagePaths: string[];
}

function VitePluginPackageVersions(options: PackageVersionsPluginOptions): Plugin {
  return {
    configResolved(config) {
      const versions = options.packagePaths.reduce((acc, packagePath) => {
        try {
          const packageJson = JSON.parse(
            readFileSync(join(config.root, packagePath, 'package.json'), 'utf-8'),
          ) as { name: string, version: string; };
          acc[packageJson.name] = packageJson.version;
        } catch (error) {
          console.error(`Failed to read package.json from ${packagePath}:`, error);
        }
        return acc;
      }, {} as Record<string, string>);

      // Make the versions available as a global variable
      config.define = {
        ...config.define,
        __STORYBOOK_PACKAGE_VERSIONS__: JSON.stringify(versions),
      };
    },
    name: 'vite-plugin-package-versions',
  };
}

export default VitePluginPackageVersions;
