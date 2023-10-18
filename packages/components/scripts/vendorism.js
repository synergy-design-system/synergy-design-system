import { eject, setTarget, setSource } from 'vendorism';
import { generateStorybookFile } from './vendorism-create-stories.js';
import { execSync } from 'child_process';
import { updateVsCodeReadOnlyFiles } from './update-vscode-readonly-files.js';
import commandLineArgs from 'command-line-args';
import fs from 'fs';
import { optimizePathForWindows } from 'vendorism/src/scripts/helpers.js';

const components = ['input'];

// List of events that we want to import.
// @todo: Automate this depending on components!
// @todo: This will NOT add exports to events/events.ts automatically
const events = [
  'sl-blur',
  'sl-focus',
  'sl-invalid',
  'sl-load',
  'sl-error',
  'sl-blur', 
  'sl-change', 
  'sl-clear',
  'sl-input',
].map(evt => `src/events/${evt}.ts`);

const otherIncludes = [
  'custom-elements-manifest.config.js',
  'web-test-runner.config.js',
  '*prettier*',
  'tsconfig.json',
  'tsconfig.prod.json',
  'src/declaration.d.ts',
  'src/shoelace-autoloader*',
  'src/translations/de.ts',
  ...events,
];

const libraryPrefix = 'syn';
const libraryName = 'synergy';
const shoelaceVersion = '2.10.0';

//Command line options
const optionDefinitions = [
  { name: 'setOnly', alias: 's', type: Boolean },
  { name: 'getOnly', alias: 'g', type: Boolean },
  { name: 'eject', alias: 'e', type: Boolean },
  { name: 'file', type: String, defaultOption: true }
];

const options = commandLineArgs(optionDefinitions);

const config = {
  source: {
    url: `https://github.com/shoelace-style/shoelace/archive/refs/tags/v${shoelaceVersion}.tar.gz`,
    path: "./vendor",
    hooks: {
      before: "echo ⌛️ Setting up source...",
      after: "echo ✅ Source setup complete.",
    },
    downloadConfig: { extract: true, strip: 1 }
  },
  target: {
    path: ".",
    includes: [
      ...components.map((component) => `src/components/${component}/**`),
      ...otherIncludes
    ],
    hooks: {
      before: "echo ⌛️ Setting up target...",
      after: "echo ✅ Target setup complete.",
    },
    //Changes targeted files -> otherIncludes
    transforms: [
      // Adjust the event map to use our own file names
      (path, content) => {
        const outputPath = path.startsWith('events/')
          ? path.replace('sl-', libraryPrefix + '-')
          : path;

        return {
          content,
          path: outputPath,
        };
      },
      // Add lint ignore information to all vendored data and remove lint-enables
      (path, content) => {
        const eslintEnableComment = '/* eslint-enable */';
        const eslintDisableComment = '/* eslint-disable */';
        const stylelintDisableComment = '/* stylelint-disable */';

        const prefixedContent = [];

        // Sometimes eslint is enabled explicitly in code. This needs to be removed, otherwise the disable does not work.
        content = content.replaceAll(eslintEnableComment, '')

        // Shoelace vendor components use other style rules, so make sure to ignore them per default
        if (path.endsWith('.ts') || path.endsWith('.js')) {
          prefixedContent.push(eslintDisableComment);
        }

        // We do not want to lint shoelace styles as they do not adhere to any standard
        // we can`t just add the style-disable at the top of the file. To make it work it needs to be in the "css" function
        content = content.replace('css`', `css\`\n\t${stylelintDisableComment}`);

        return {
          content: [...prefixedContent, content].join('\n'),
          path,
        };
      },
      // Remove Shoelace branding
      (path, content) => {
        const capitalizedPrefix = `${libraryPrefix.charAt(0).toUpperCase()}${libraryPrefix.slice(1)}`;
        const capitalizedLibraryName = `${libraryName.charAt(0).toUpperCase()}${libraryName.slice(1)}`;
        const lowerLibraryName = libraryName.toLowerCase();
        const libraryDesignName = `${lowerLibraryName}-design-system`;

        const regexPattern = new RegExp(`@${libraryDesignName}/(?!${lowerLibraryName}$)`, 'g');

        const replace = (content) => content
          .replace(/Sl(?=[A-Z])/g, capitalizedPrefix)
          .replace(/(?<![A-Za-z])sl-/g, `${libraryPrefix}-`)
          .replace(/shoelace-style/g, libraryDesignName)
          .replace(/Shoelace/g, capitalizedLibraryName)
          .replace(/shoelace/g, lowerLibraryName)
          .replace('__SHOELACE_VERSION__', '__PACKAGE_VERSION__')
          .replace(regexPattern, '@shoelace-style/');

        return { path: replace(path), content: replace(content) };
      },
      // Move stories into `temp` directory
      (path, content) => {
        if (path.includes('.stories.ts')) {
          const optimizedPath = optimizePathForWindows(path);
          const parts = optimizedPath.split("/");
          const fileName = parts[parts.length - 1];  // Gets 'input.stories.ts'
          return { path: `./src/temp/${fileName}`, content };
        }
        return { path, content };
      },
      // change something in `custom-elements-manifest.config.js`
      (path, content) => {
        if (path.includes('custom-elements-manifest.config.js')) {
          return {
            path, content: content.replace(`{ name: 'outdir', type: String }
]);`, `{ name: 'outdir', type: String }
], { partial: true })`)
          };
        }
        return { path, content };
      }
    ]
  },
}

// If the eject option is specified, runs the eject functionality
if (options.eject) {
  const filePath = options.file;
  const optimizedPath = optimizePathForWindows(filePath);

  console.log("🚀 Ejecting file", optimizedPath);

  if (!optimizedPath) {
    console.error("❗ Please provide a file path for the eject operation.");
    process.exit(1);
  }

  await eject(
    config,
    filePath
  );
  await updateVsCodeReadOnlyFiles([optimizedPath], []);

  process.exit(0);
}

//Downloads Shoelace and sets up the source
if (!options.setOnly) {
  await setSource(config);
  // Don`t know exactly why, but this is needed for Windows. Otherwise the last three files (tsconfig.(prod).json, web-test-runner.config.js) from shoelace are missing after the download.
  await new Promise(res => { setTimeout(res, 100); })
}
// Check for the "getOnly" option and modify the content if necessary
if (!options.getOnly) {
  /**
   * Generate the storybook files for all relevant components after shoelace is available so that they can be vendored
  */
  await Promise.all(components.map(async (component) => {
    const inputFilePath = `./vendor/docs/pages/components/${component}.md`;
    const outputFilePath = `./vendor/src/components/${component}/${component}.stories.ts`;
    await generateStorybookFile(inputFilePath, outputFilePath, component, libraryPrefix);
  }));

  // Move all files from '../docs/src/components' to './src/temp'
  await execSync('mv ../docs/stories/components ./src/temp');

  const target = await setTarget(config);
  const removedFiles = target.removedFiles;
  const newFiles = target.newFiles;

  await updateVsCodeReadOnlyFiles(removedFiles, newFiles);

  // Move files back from './src/temp' to '../docs/src/components'
  await execSync('mv ./src/temp ../docs/stories/components');
}

process.exit();
