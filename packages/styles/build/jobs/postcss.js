import { readFile, writeFile } from 'fs/promises';
import { normalize } from 'path';
import { globby } from 'globby';
import postcss from 'postcss';
import atImportPlugin from 'postcss-import';
import headerPlugin from 'postcss-header';
import { getDirName, getPath, job } from '../shared.js';

/**
 * Get the output path used in postcss for the given input path
 * @example
 * getDistName('./src/typography/index.css'); // <- './dist/typography.css'
 * @param {string} inputPath The path to the input file
 * @returns {string} outputPath
 */
const getDistName = (inputPath) => {
  const normalizedInputPath = normalize(inputPath);
  const dirName = getDirName(normalizedInputPath);

  // Use a default name of the directory for the output file
  // Will turn src/typography/index.css into dist/typography.css
  let distName = `./dist/${dirName}.css`;

  // Special case for the root node:
  // We do not want to have a file named src.css, but index.css
  // for this special bundle file.
  // Turns src/index.css into dist/index.css
  if (normalizedInputPath === normalize('./src/index.css')) {
    distName = './dist/index.css';
  }

  return normalize(distName);
};

/**
 * Create the default banner
 * @returns {String} The banner to prepend to all generated files
 */
const createBanner = async () => {
  const packageJSON = await readFile(getPath('./package.json'), {
    encoding: 'utf-8',
  });

  const { author, name, version } = JSON.parse(packageJSON.toString());

  return `
/**
 * ${name} version ${version}
 * ${author.name}
 */`.trim();
};

export const runPostCSS = job('Running PostCSS', async () => {
  const header = await createBanner();

  const runner = postcss([
    atImportPlugin({
      allowDuplicates: false,
    }),
    headerPlugin({
      header,
    }),
  ]);

  // Get a list of files that we want to process
  const indexFiles = await globby('./src/**/index.css');

  const filesToTransform = await Promise.all(
    indexFiles.map(async (indexFile) => ({
      css: await readFile(getPath(indexFile), {
        encoding: 'utf-8',
      }),
      from: indexFile,
      to: getDistName(indexFile),
    })),
  );

  return Promise.all(
    filesToTransform.map(async ({ css, from, to }) => {
      const result = await runner.process(css, {
        from,
        to,
      });

      await writeFile(to, result.css, {
        encoding: 'utf-8',
      });
    }),
  );
});
