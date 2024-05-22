import { basename } from 'path';
import { readFile } from 'fs/promises';
import { globby } from 'globby';
import { parse } from 'comment-parser';
import { getDirName, getPath, job } from '../shared.js';

const createMarkdownDocumentationFromTree = (fileName, parseResult) => {
  const hasTags = parseResult.some(node => node.tags.length !== 0);

  if (!hasTags) {
    return null;
  }

  return parseResult
    .filter(({ tags }) => tags.length > 0)
    .map(({
      description,
      tags,
    }) => ({
      description,
      fileName: basename(fileName).split('.').at(0),
      moduleName: getDirName(fileName),
      tags: tags.map(({
        description: d,
        name,
        type,
      }) => ({
        description: d,
        name,
        type,
      })),
    }));
};

const happy = c => JSON.stringify(c, null, 2);

/**
 * Create documentation from the generated CSS file
 */
export const createDocumentation = job('Creating documentation', async () => {
  const allFiles = await globby('./src/**/*.css');

  const documentation = await Promise.all(
    allFiles
      .filter(fileName => fileName !== './src/index.css')
      .map(async (file) => {
        const indexFile = await readFile(getPath(file), {
          encoding: 'utf-8',
        });

        return createMarkdownDocumentationFromTree(file, parse(indexFile));
      }),
  );

  const filteredItems = documentation.filter(Boolean);

  console.log(happy(filteredItems));
});
