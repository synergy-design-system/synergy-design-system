import { ScrapingConfig } from './types.js';
import {
  staticComponentPath,
  staticStylesPath,
  templatesPath,
} from '../config.js';
import { getAvailableComponents } from '../components.js';

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
  generateOutputPath: (component: string) => `${staticComponentPath}/${component}/docs.md`,
  generateStoryId: (component: string) => `components-${component}--docs`,
  getItems: getAvailableComponents,
  outputPath: staticComponentPath,
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
  generateOutputPath: (style: string) => `${staticStylesPath}/${style}.md`,
  generateStoryId: (style: string) => `styles-syn-${style}--docs`,
  getItems: () => [
    'body',
    'heading',
    'link-list',
    'link',
    'table-cell',
    'table',
    'weight',
  ],
  outputPath: staticStylesPath,
};

/**
 * Configuration for scraping template documentation
 */
export const templateScrapingConfig: ScrapingConfig = {
  formatContent: (template: string, stories) => {
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
  generateOutputPath: (template: string) => `${templatesPath}/${template}.md`,
  generateStoryId: (template: string) => `templates-${template}--docs`,
  getItems: () => [
    'appshell',
    'breadcrumb',
    'footer',
    'forms',
    'table',
  ],
  outputPath: staticStylesPath,
};
