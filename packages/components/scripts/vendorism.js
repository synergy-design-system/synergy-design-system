import { eject, setTarget, setSource } from 'vendorism';
import { generateStorybookFile } from './vendorism-create-stories.js';
import { execSync } from 'child_process';

const components = ['input']
const otherIncludes = ['custom-elements-manifest.config.js', 'web-test-runner.config.js', '*prettier*', '.eslint*', 'tsconfig.json', 'src/declaration.d.ts', 'src/shoelace-autoloader*', 'src/translations/de.ts'];
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
      ...otherIncludes
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

        const replace = (content) => content
            .replace(/Sl(?=[A-Z])/g, capitalizedPrefix)
            .replace(/(?<![A-Za-z])sl-/g, `${libraryPrefix}-`)
            .replace(/shoelace-style/g, libraryDesignName)
            .replace(/Shoelace/g, capitalizedLibraryName)
            .replace(/shoelace/g, lowerLibraryName)
            .replace('__SHOELACE_VERSION__', '__PACKAGE_VERSION__')
            .replace(regexPattern, '@shoelace-style/');

        let modifiedContent = replace(content)
        let modifiedPath = replace(content)

        return {path: replace(path), content: replace(content)};
      },
      // Move stories into `temp` directory
      (path, content) => {
        if (path.includes('.stories.ts')) {
          const parts = path.split("/");
          const fileName = parts[parts.length - 1];  // Gets 'input.stories.ts'
          return {path: `./src/temp/${fileName}`, content};
        }
        return {path, content};
      },
      // change something in `custom-elemenents-manifest.config.js`
      (path, content) => {
        if (path.includes('custom-elements-manifest.config.js')) {
          return {path, content: content.replace(`{ name: 'outdir', type: String }
]);`, `{ name: 'outdir', type: String }
], { partial: true })`)};
        }
        return {path, content};
      }
    ]
  },
}

// await setSource(config);

// Move all files from '../docs/src/components' to './src/temp'
await execSync('mv ../docs/stories/components ./src/temp');

await setTarget(config);

// Move files back from './src/temp' to '../docs/src/components'
await execSync('mv ./src/temp ../docs/stories/components');

process.exit();
