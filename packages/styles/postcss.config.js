/* eslint-disable import/no-extraneous-dependencies */
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import atImport from 'postcss-import';
import header from 'postcss-header';

/**
 * We have to create the fouc detection manually to make sure it still works when using
 * angular, vue or other web-component libraries.
 */
const handleFoundPrevention = () => {
  const foucComponentSelector = readdirSync('../components/src/components')
    .sort()
    .map(component => `syn-${component}:not(:defined)`.toLowerCase())
    .join(',\n');

  const foucFileContents = `
/**
 * This file prevents the flash of unstyled components
 * @see https://web.dev/custom-elements-v1/#styling-a-custom-element
 * @todo: Create a better matching version after the first components are ready!
 * @todo: Each component should be defined using its default height and display type.
 *
 * This file is created automatically in the build process!
 * All changes applied will get lost!
 * To recreate it, please use "pnpm build"!
 */
${foucComponentSelector} {
  display: inline-block;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
 }

/**
 * @example:
 * This example shows how we could provide defaults for the syn-button
 * in all three sizes.
 */

/*
  syn-button[size="small"]:not(:defined) {
    height: 30px;
  }

  syn-button[size="medium"]:not(:defined) {
    height: 40px;
  }

  syn-button[size="large"]:not(:defined) {
    height: 50px;
  }
*/
`.trimStart();

  writeFileSync('./src/modules/fouc.css', foucFileContents);
};

const packageJSON = readFileSync('./package.json', {
  encoding: 'utf-8',
});

const { author, name, version } = JSON.parse(packageJSON.toString());

// Default banner to prepend to all generated files.
const banner = `
/**
 * ${name} version ${version}
 * ${author.name}
 */
`.trim();

handleFoundPrevention();

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: [
    atImport({
      allowDuplicates: false,
      filter: path => !path.startsWith('b64---'), // Prevent inlined items to be imported
    }),
    header({
      header: banner,
    }),
  ],
};
