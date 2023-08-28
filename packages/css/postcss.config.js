/* eslint-disable import/no-extraneous-dependencies */
const atImport = require('postcss-import');
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
    }),
    header({
      header: banner,
    }),
  ],
};
