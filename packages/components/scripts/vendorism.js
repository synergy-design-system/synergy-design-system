import { eject, setTarget, setSource } from 'vendorism';
import { generateStorybookFile } from './vendorism-create-stories.js';
import { execSync } from 'child_process';
import commandLineArgs from 'command-line-args';
import fs from 'fs';

const components = ['input']
const otherIncludes = ['custom-elements-manifest.config.js', 'web-test-runner.config.js', '*prettier*', '.eslint*', 'tsconfig.json', 'src/declaration.d.ts', 'src/shoelace-autoloader*', 'src/translations/de.ts'];
const libraryPrefix = 'sds';
const libraryName = 'sick';
const shoelaceVersion = '2.6.0';

//Command line options
const optionDefinitions = [
  { name: 'setOnly', alias: 's', type: Boolean },
  { name: 'getOnly', alias: 'g', type: Boolean }
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
      // Add lint ignore information to all vendored data
      (path, content) => {

        const eslintDisableComment = '/* eslint-disable */';
        const stylelintDisableComment = '/* stylelint-disable */';

        const prefixedContent = [];

        // Shoelace vendor components use other style rules, so make sure to ignore them per default
        if (path.endsWith('.ts')) {
          prefixedContent.push(eslintDisableComment);
        }

        // We do not want to lint shoelace styles as they do not adhere to any standard
        if (path.endsWith('.styles.ts')) {
          prefixedContent.push(stylelintDisableComment);
        }

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
          const parts = path.split("/");
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

//Downloads Shoelace and sets up the source
if (!options.setOnly) {
  await setSource(config);
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

  await setTarget(config);
  // Move files back from './src/temp' to '../docs/src/components'
  await execSync('mv ./src/temp ../docs/stories/components');
}

process.exit();
