/* eslint-disable import/no-extraneous-dependencies */
import { readFileSync } from 'fs';
import atImportPlugin from 'postcss-import';
import headerPlugin from 'postcss-header';

const packageJSON = readFileSync('./package.json', {
  encoding: 'utf-8',
});

const { author, name, version } = JSON.parse(packageJSON.toString());

// Default banner to prepend to all generated files.
const header = `
/**
 * ${name} version ${version}
 * ${author.name}
 */
`.trim();

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: [
    atImportPlugin({
      allowDuplicates: false,
    }),
    headerPlugin({
      header,
    }),
  ],
};
