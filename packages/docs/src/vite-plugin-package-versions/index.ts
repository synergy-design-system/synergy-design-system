import { readFileSync } from 'fs';
import { join } from 'path';
import { Plugin } from 'vite';

interface PackageVersionsPluginOptions {
  packagePaths: string[];
}

function VitePluginPackageVersions(options: PackageVersionsPluginOptions): Plugin {
  return {
    name: 'vite-plugin-package-versions',
    configResolved(config) {
      const versions = options.packagePaths.reduce((acc, packagePath) => {
        try {
          const packageJson = JSON.parse(
            readFileSync(join(config.root, packagePath, 'package.json'), 'utf-8'),
          );
          acc[packageJson.name] = packageJson.version;
          console.log(acc);
        } catch (error) {
          console.error(`Failed to read package.json from ${packagePath}:`, error);
        }
        return acc;
      }, {} as Record<string, string>);

      // Make the versions available as a global variable
      config.define = {
        ...config.define,
        __VITE_PACKAGE_VERSIONS__: JSON.stringify(versions),
      };
    },
  };
}

export default VitePluginPackageVersions;
