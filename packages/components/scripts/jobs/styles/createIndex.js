/* eslint-disable import/no-extraneous-dependencies */
import { readdir, unlink, writeFile } from 'fs/promises';
import postcss from 'postcss';
import atImportPlugin from 'postcss-import';
import headerPlugin from 'postcss-header';
import { getPackageJSONAsObject, getPath, job } from '../shared.js';

export const runCreateIndex = job('Styles: Creating CSS index bundle file', async (outDir) => {
  const { author, name, version } = await getPackageJSONAsObject();

  // Default banner to prepend to all generated files.
  const header = `
/**
 * ${name} version ${version}
 * ${author.name}
 * 
 * This file is created automatically in the build process!
 * All changes applied will get lost!
 * To recreate it, please use "pnpm build"!
 */
`.trim();

  // Get a list of available custom styles for synergy
  const allCustomFiles = await readdir(outDir);
  const availableStyles = allCustomFiles
    .filter(file => file.endsWith('.css') && file !== 'index.css')
    .map(file => `./${file}`);

  // List of files that have to be imported from shoelace
  const shoelaceFileList = [
    getPath('../src/styles/utility.css'),
  ];

  const output = [...shoelaceFileList, ...availableStyles]
    .map(file => `@import url("${file}");`)
    .join('\n');

  const { css } = await postcss([
    atImportPlugin({
      allowDuplicates: false,
    }),
    headerPlugin({
      header,
    }),
  ]).process(output, {
    from: `${outDir}/index.css`,
  });

  await unlink(`${outDir}/index.css`).catch(() => {});
  await writeFile(`${outDir}/index.css`, css);
});
