/* eslint-disable import/no-extraneous-dependencies */
const atImport = require('postcss-import');
const postcssInlineBase64 = require('postcss-inline-base64');
const header = require('postcss-header');
const { author, name, version } = require('./package.json');

// Default banner to prepend to all generated files.
const banner = `
/**
 * ${name} version ${version}
 * ${author.name}
 */
`.trim();

/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: [
    atImport({
      allowDuplicates: true,
      filter: (path) => !path.startsWith('b64---'), // Prevent inlined items to be imported
    }),
    postcssInlineBase64(),
    header({
      header: banner,
    }),
  ],
};
