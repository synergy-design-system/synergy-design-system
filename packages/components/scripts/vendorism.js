import { eject, setTarget, setSource } from 'vendorism';
import { generateStorybookFile } from './vendorism-create-stories.js';
import { execSync } from 'child_process';

const components = ['input']
const libraryPrefix = 'sds';
const libraryName = 'sick';
const shoelaceVersion = '2.6.0';

/**
 * Upfront we're going to generate the storybook files for all relevant components so that they can be vendored
 */
await Promise.all(components.map(async (component) => {
  const inputFilePath = `./vendor/docs/pages/components/${component}.md`;
  const outputFilePath = `./vendor/src/components/${component}/${component}.stories.ts`;
  await generateStorybookFile(inputFilePath, outputFilePath, component, libraryPrefix);
}));

const config = {
  source: {
    url: `https://github.com/shoelace-style/shoelace/archive/refs/tags/v${shoelaceVersion}.tar.gz`,
    path: "./vendor",
    hooks: {
      before: "echo ⌛️ Setting up source...",
      after: "echo ✅ Source setup complete.",
    },
    downloadConfig: {extract: true, strip: 1}
  },
  target: {
    path: ".",
    includes: [
      ...components.map((component) => `src/components/${component}/**`),
    ],
    hooks: {
      before: "echo ⌛️ Setting up target...",
      after: "echo ✅ Target setup complete.",
    },
    transforms: [
      // Remove Shoelace branding
      (path, content) => {
        const capitalizedPrefix = `${libraryPrefix.charAt(0).toUpperCase()}${libraryPrefix.slice(1)}`;
        const capitalizedLibraryName = `${libraryName.charAt(0).toUpperCase()}${libraryName.slice(1)}`;
        const lowerLibraryName = libraryName.toLowerCase();
        const libraryDesignName = `${lowerLibraryName}-design-system`;

        const regexPattern = new RegExp(`@${libraryDesignName}/(?!${lowerLibraryName}$)`, 'g');

        let modifiedContent = content
            .replace(/Sl(?=[A-Z])/g, capitalizedPrefix)
            .replace(/(?<![A-Za-z])sl-/g, `${libraryPrefix}-`)
            .replace(/shoelace-style/g, libraryDesignName)
            .replace(/Shoelace/g, capitalizedLibraryName)
            .replace(/shoelace/g, lowerLibraryName)
            .replace('__SHOELACE_VERSION__', '__PACKAGE_VERSION__')
            .replace(regexPattern, '@shoelace-style/');
        return {path, content: modifiedContent};
      },
      // Move stories into `temp` directory
      (path, content) => {
        if (path.includes('.stories.ts')) {
          const parts = path.split("/");
          const fileName = parts[parts.length - 1];  // Gets 'input.stories.ts'
          console.log(fileName)
          return {path: `./src/temp/${fileName}`, content};
        }
        return {path, content};
      },
    ]
  },
}

await setSource(config);

// Move all files from '../docs/src/components' to './src/temp'
await execSync('mv ../docs/src/components ./src/temp');

await setTarget(config);

// Move files back from './src/temp' to '../docs/src/components'
await execSync('mv ./src/temp ../docs/src/components');

process.exit();
