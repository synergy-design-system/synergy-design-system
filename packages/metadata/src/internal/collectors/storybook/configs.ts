import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import storybookOutput from '@synergy-design-system/docs/dist/index.json' with { type: 'json' };
import { ScrapingConfig } from './types.js';

// Resolve output base from compiled location: dist/internal/collectors/storybook/ → 4 up → package root
const filename = fileURLToPath(import.meta.url);
const currentDir = dirname(filename);
const packageRoot = resolve(currentDir, '../../../..');
const outputDir = process.env.SYNERGY_METADATA_OUTPUT_DIR?.trim() || 'data';
const examplesBase = resolve(packageRoot, outputDir, 'layers/examples');

const staticComponentPath = join(examplesBase, 'component');
const staticStylesPath = join(examplesBase, 'styles');
const templatesPath = join(examplesBase, 'templates');

/**
 * Get stories from Storybook output based on a prefix.
 * @param prefix Prefix to filter stories by
 * @returns List of stories matching the prefix
 */
const getStoriesFromStorybook = (prefix: string): Record<string, string> => {
  const foundStories = Object
    .entries(storybookOutput.entries)
    .filter(([key]) => key.startsWith(`${prefix}-`) && key.endsWith('-docs'))
    .map(([, value]) => value)
    .reduce((acc, story) => {
      const componentName = story.id.split('--')[0].replace(`${prefix}-`, '');
      acc[componentName] = story.id;
      return acc;
    }, {} as Record<string, string>);

  return foundStories;
};

const componentStories = getStoriesFromStorybook('components');
const styleStories = getStoriesFromStorybook('styles');
const templateStories = getStoriesFromStorybook('templates');

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
  generateOutputPath: (component: string) => `${staticComponentPath}/component:${component}.md`,
  generateStoryId: (component: string) => componentStories[component],
  getItems: async () => Promise.resolve(Object.keys(componentStories)),
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
  generateOutputPath: (style: string) => `${staticStylesPath}/style:${style}.md`,
  generateStoryId: (component: string) => styleStories[component],
  getItems: async () => Promise.resolve(Object.keys(styleStories)),
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
  generateOutputPath: (template: string) => `${templatesPath}/template:${template}.md`,
  generateStoryId: (component: string) => templateStories[component],
  getItems: async () => Promise.resolve(Object.keys(templateStories)),
  outputPath: staticStylesPath,
};
