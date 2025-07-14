import { copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { pascalCase } from 'change-case';
import {
  getAllComponents,
  job,
} from '../shared.js';
import {
  getMetadataPathForComponent,
} from './shared.js';

const getComponentStaticFilePaths = async (componentName, directories) => {
  const staticFiles = [];

  const vueComponentName = pascalCase([
    'syn',
    'vue',
    componentName,
  ].join('-'));

  // Dynamic paths to generated wrappers
  const angularFile = `${directories.angularPackageDir}/components/${componentName}/${componentName}.component.ts`;
  const componentFile = `${directories.componentDir}/src/components/${componentName}/${componentName}.component.ts`;
  const reactFile = `${directories.reactPackageDir}/src/components/${componentName}.ts`;
  const vueFile = `${directories.vuePackageDir}/src/components/${vueComponentName}.vue`;

  // Add support for styles
  const defaultStyleFile = `${directories.componentDir}/src/components/${componentName}/${componentName}.styles.ts`;
  const customStyleFile = `${directories.componentDir}/src/components/${componentName}/${componentName}.custom.styles.ts`;

  staticFiles.push([
    angularFile,
    'component.angular.ts',
  ]);

  staticFiles.push([
    componentFile,
    'component.ts',
  ]);

  staticFiles.push([
    reactFile,
    'component.react.ts',
  ]);

  staticFiles.push([
    vueFile,
    'component.vue',
  ]);

  staticFiles.push([
    defaultStyleFile,
    'component.styles.ts',
  ]);

  staticFiles.push([
    customStyleFile,
    'component.custom.styles.ts',
  ]);

  return staticFiles
    .filter(([fileName]) => existsSync(fileName));
};

export const runCopyComponents = job('Synergy MCP: Copying component code...', async (metadata, directories) => {
  const components = await getAllComponents(metadata);

  // Create an array of absolute paths of all files that have to be copied for each component.
  // This takes into account the generated wrappers and original component file.
  const staticFiles = await Promise.all(
    components.map(async component => ({
      files: await getComponentStaticFilePaths(
        component.tagNameWithoutPrefix,
        directories,
      ),
      path: getMetadataPathForComponent(component, directories.mcpDir),
    })),
  );

  // Finally, copy the static files to the metadata directories.
  return await Promise.all(
    staticFiles.flatMap(async ({ files, path }) => await Promise.all(
      files.map(async ([fileName, targetFileName]) => {
        const targetPath = `${path}${targetFileName}`;
        return await copyFile(fileName, targetPath);
      }),
    )),
  );
});
