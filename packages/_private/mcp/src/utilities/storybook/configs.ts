import { ScrapingConfig } from './types.js';
import { componentPath, stylesPath } from '../config.js';
import { getAvailableComponents } from '../metadata.js';

/**
 * Configuration for scraping component documentation
 */
export const componentScrapingConfig: ScrapingConfig = {
  formatContent: (component: string, stories) => {
    const content = stories.map(
      story => `
## ${story.heading}

${story.description}

\`\`\`html
${story.example}
\`\`\`
`,
    ).join('\n---\n');

    return content;
  },
  generateOutputPath: (component: string) => `${componentPath}/${component}/docs.md`,
  generateStoryId: (component: string) => `components-${component}--docs`,
  getItems: getAvailableComponents,
  outputPath: componentPath,
  storyIdPattern: 'components-{component}--docs',
};

/**
 * Configuration for scraping styles documentation
 */
export const stylesScrapingConfig: ScrapingConfig = {
  formatContent: (style: string, stories) => {
    const content = stories.map(
      story => `
## ${story.heading}

${story.description}

\`\`\`html
${story.example}
\`\`\`
`,
    ).join('\n---\n');

    return content;
  },
  generateOutputPath: (style: string) => `${stylesPath}/${style}.md`,
  generateStoryId: (style: string) => `styles-${style}--docs`,
  getItems: async () => [
    'body',
    'heading',
    'link-list',
    'link',
    'table-cell',
    'table',
    'weight',
  ],
  outputPath: stylesPath,
  // storyIdPattern: 'styles-{style}--docs',
  storyIdPattern: 'styles-syn-{style}--default--primary',
};
