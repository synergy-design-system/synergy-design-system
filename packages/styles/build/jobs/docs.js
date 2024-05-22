import { basename } from 'path';
import { readFile, writeFile } from 'fs/promises';
import { globby } from 'globby';
import { parse } from 'comment-parser';
import { job } from '../shared.js';

/**
 * Write the markdown to the README.md file
 * @param {string} markdown The markdown to adjust
 * @returns {Promise<void>}
 */
const adjustReadme = async (markdown) => {
  const readme = await readFile('./README.md', {
    encoding: 'utf-8',
  });

  const replacedContent = readme.replace(
    /<!-- BEGIN INLINE COMMENT -->[\s\S]*<!-- END INLINE COMMENT -->/,
    `<!-- BEGIN INLINE COMMENT -->\n\n${markdown}\n<!-- END INLINE COMMENT -->`,
  );

  return writeFile('./README.md', replacedContent, {
    encoding: 'utf-8',
  });
};

/**
 * Get the raw data from dist modules
 * @returns {Promise<object[]>} The raw data from the modules
 */
const getRawDataFromModules = async () => {
  const allowResult = ({ description, tags }) => {
    if (!description) {
      return false;
    }
    return tags.some(tag => tag.tag === 'variant');
  };

  const getDataFromTags = tag => ({
    description: tag.description,
    name: tag.name,
    tag: tag.tag,
    type: tag.type,
  });

  // Get all files, excluding the generated index.css file
  const moduleFileNames = await globby(['./dist/**/*.css', '!./dist/index.css']);
  return Promise.all(
    moduleFileNames.map(async (fileName) => {
      const fileContent = await readFile(fileName, {
        encoding: 'utf-8',
      });

      // We are only interested in comments that have a description and tags set
      // Also, we strip out the source because we do not need it
      const parsedResult = parse(fileContent)
        .filter(allowResult)
        .map(({ description, tags }) => ({
          description,
          tags: tags.map(getDataFromTags),
        }));

      return {
        comments: parsedResult,
        module: basename(fileName).split('.').at(0),
      };
    }),
  );
};

/**
 * Get the variants as a Markdown Table
 * @param {object[]} tags The tags the module should use
 * @returns {string} Markdown table
 */
const createVariantsTable = tags => {
  const hasVariants = tags.some(tag => tag.tag === 'variant');

  if (!hasVariants) {
    return '';
  }

  const classes = tags
    .map(tag => {
      const isDynamicTag = tag.type.includes('|');
      if (isDynamicTag) {
        return tag.type
          .split('|')
          .map(v => v.trim())
          .map(v => `${tag.name}-${v}`);
      }

      return '';
    })
    .flat();

  return `
#### Available classes

${classes.map(c => `- \`.${c}\``).join('\n')}
  `.trim();
};

/**
 * Get a markdown formatted version of the documentation
 * @param {object} module
 * @returns {string} Markdown representation of the modules parts
 */
const createMarkDownFromModule = (module, index) => {
  // Create the comment map
  const parts = module.comments.map((item) => `
#### ${item.tags[0]?.name}

${item.description}

#### Installation

\`\`\`html
<!-- Loading ${module.module} only (without bundler) -->
<link rel="stylesheet" href="/node_modules/@synergy-design-system/styles/dist/${module.module}.css" />
\`\`\`

\`\`\`javascript
// Loading ${module.module} only (with vite / webpack)
import "@synergy-design-system/styles/${module.module}.css";
\`\`\`

${createVariantsTable(item.tags)}`.trim());

  return `
### 3.${index + 1} - ${module.module}

${parts.join('\n\n---\n\n')}
  `.trim();
};

/**
 * Create documentation from the generated CSS file
 */
export const createDocumentation = job('Creating documentation', async () => {
  const rawData = await getRawDataFromModules();

  const markdown = rawData
    .map(createMarkDownFromModule)
    .join('\n\n---\n\n');

  return adjustReadme(markdown);
});
