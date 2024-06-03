import { readFile, writeFile } from 'fs/promises';
import { globby } from 'globby';
import * as prettier from 'prettier';
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

const createMarkDownFromStructure = (structure) => Object
  .entries(structure)
  .map(([category, modules], index) => ({
    heading: `### 3.${index + 1} - ${category}`,
    imports: [
      `
<link
  rel="stylesheet"
  href="/node_modules/@synergy-design-system/styles/dist/${category}.css"
/>    
      `.trim(),
      `import "@synergy-design-system/styles/${category}.css";`,
    ],
    modules: modules.map((module) => `- ${module}`),
  }))
  .map(({ heading, imports, modules }) => `
${heading}

#### Usage

\`\`\`html
${imports[0]}
\`\`\`

\`\`\`javascript
${imports[1]}
\`\`\`

${modules.length > 0 ? `
#### Submodules

${modules.join('\n')}
` : ''}
`).join('\n---\n');

const createStructure = (fileNameList) => fileNameList
  .map(f => f.replace('./dist/', '').replace('.css', ''))
  .reduce((acc, curr) => {
    const [category, name] = curr.split('/');
    if (!acc[category]) {
      acc[category] = [];
    }

    if (name) {
      acc[category].push(name);
    }
    return acc;
  }, {});

/**
 * Formats the given markdown using prettier
 * @param {string} markdown The markdown to format
 * @returns {Promise<string>}
 */
const prettify = async (markdown) => prettier.format(markdown, {
  parser: 'markdown',
});

/**
 * Adjust the readme file with the new markdown from filesystem
 */
export const runAdjustReadme = job('Recreating README.md', async () => {
  const moduleFileNames = await globby(['./dist/**/*.css', '!./dist/index.css']);
  const structure = createStructure(moduleFileNames);
  const markdown = await prettify(createMarkDownFromStructure(structure));
  return adjustReadme(markdown);
});
