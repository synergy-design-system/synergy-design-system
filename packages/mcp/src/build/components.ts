import { existsSync, mkdirSync } from 'node:fs';
import { copyFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { rimraf } from 'rimraf';
import ora from 'ora';
import { pascalCase } from 'change-case';
import type { CustomElementDeclaration, Module } from 'custom-elements-manifest/schema.d.ts';
import {
  componentPath,
  componentStaticPath,
  createPath,
  getAbsolutePath,
} from '../utilities/index.js';

type Manifest = Module[];
type SynCustomElementDeclaration = CustomElementDeclaration & {
  tagNameWithoutPrefix: string;
};
type FileListEntry = [/* source */ string, /* target */ string];
type FileList = {
  componentName: string;
  entries: FileListEntry[];
};

const directories = {
  angularPackageDir: getAbsolutePath('../../../../packages/angular'),
  componentDir: getAbsolutePath('../../../../packages/components'),
  reactPackageDir: getAbsolutePath('../../../../packages/react'),
  vuePackageDir: getAbsolutePath('../../../../packages/vue'),
};

/**
 * Gets the file list for a specific component.
 * @param component The module to get the file list for.
 * @returns An array of tuples that define file paths related to the component.
 */
const getComponentFileList = (component: SynCustomElementDeclaration): FileList => {
  const {
    tagName,
    tagNameWithoutPrefix,
  } = component;

  const staticFiles: FileListEntry[] = [];

  const vueComponentName = pascalCase([
    'syn',
    'vue',
    tagNameWithoutPrefix,
  ].join('-'));

  // Dynamic paths to generated wrappers
  const angularFile = `${directories.angularPackageDir}/components/${tagNameWithoutPrefix}/${tagNameWithoutPrefix}.component.ts`;
  const componentFile = `${directories.componentDir}/src/components/${tagNameWithoutPrefix}/${tagNameWithoutPrefix}.component.ts`;
  const reactFile = `${directories.reactPackageDir}/src/components/${tagNameWithoutPrefix}.ts`;
  const vueFile = `${directories.vuePackageDir}/src/components/${vueComponentName}.vue`;

  // Add support for styles
  const defaultStyleFile = `${directories.componentDir}/src/components/${tagNameWithoutPrefix}/${tagNameWithoutPrefix}.styles.ts`;
  const customStyleFile = `${directories.componentDir}/src/components/${tagNameWithoutPrefix}/${tagNameWithoutPrefix}.custom.styles.ts`;

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

  return {
    componentName: tagName!,
    entries: staticFiles
      .filter(([fileName]) => existsSync(fileName)),
  };
};

/**
 * Sets up all data from the components and framework packages and adds them to the static metadata.
 */
export const buildComponents = async () => {
  const spinner = ora({
    prefixText: 'Components:',
    text: 'Generating static metadata...',
  }).start();

  try {
    // Import the custom elements manifest
    const customElementsManifestImport = await import('@synergy-design-system/components/custom-elements.json', {
      with: { type: 'json' },
    });
    const customElementsManifest = customElementsManifestImport.default?.modules as Manifest;

    spinner.text = 'Cleaning up old metadata...';
    await rimraf(componentPath);

    spinner.succeed('Old metadata cleaned up.');

    spinner.text = 'Creating new metadata directory...';

    // Create the components directory if it doesn't exist
    await createPath(componentPath);

    spinner.text = 'Generating components metadata...';

    // Create and populate the metadata for each component
    const componentMetadata = customElementsManifest
      .filter(module => module.declarations && module.declarations.length === 1)
      .filter(module => module
        .declarations!
        .some(declaration => (declaration as CustomElementDeclaration).tagName))
      .map(module => (module.declarations![0] as SynCustomElementDeclaration))
      .map(getComponentFileList)
      .flat()
      .map(({ componentName, entries }) => {
        const absoluteComponentPath = join(componentPath, componentName);

        // Create the component directory if it doesn't exist
        if (!existsSync(absoluteComponentPath)) {
          mkdirSync(absoluteComponentPath, { recursive: true });
        }

        return entries.map(([source, target]) => {
          const targetFileName = join(absoluteComponentPath, target);
          return copyFile(source, targetFileName);
        });
      });

    await Promise.all(componentMetadata);
    spinner.succeed('Components metadata generated successfully.');

    spinner.text = 'Generating static metadata...';

    if (!existsSync(componentStaticPath)) {
      mkdirSync(componentStaticPath, { recursive: true });
    }

    const staticFiles = [
      'README.md',
      'CHANGELOG.md',
      'LIMITATIONS.md',
    ]
      .map(staticFile => join(getAbsolutePath('../../../../packages/components'), staticFile))
      .filter(existsSync)
      .map(staticFile => {
        const base = basename(staticFile);
        const target = join(componentStaticPath, base);
        return copyFile(staticFile, target);
      });

    await Promise.all(staticFiles);
    spinner.succeed('Static metadata generated successfully.');

    spinner.succeed('Generation of metadata generated successfully.');
  } catch (error) {
    spinner.fail(`Failed to generate components metadata. Error: ${error as string}`);
    throw error;
  }
};
