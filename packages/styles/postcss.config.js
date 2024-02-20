/* eslint-disable import/no-extraneous-dependencies */
import { readFileSync } from 'fs';
import atImport from 'postcss-import';
import header from 'postcss-header';

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

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: [
    atImport({
      allowDuplicates: true,
      filter: path => !path.startsWith('b64---'), // Prevent inlined items to be imported
    }),
    header({
      header: banner,
    }),
  ],
};
