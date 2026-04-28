import storybookOutput from '@synergy-design-system/docs/dist/index.json' with { type: 'json' };
import { type ScrapingConfig, type StorybookArtifactKind } from './types.js';

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

const formatStoriesAsMarkdown = (stories: Parameters<ScrapingConfig['formatContent']>[1]): string => stories.map(
  (story) => `
## ${story.heading}

${story.description}

\`\`\`html
${story.example}
\`\`\`
`,
).join('\n---\n');

/**
 * Configuration for scraping component documentation
 */
export const componentScrapingConfig: ScrapingConfig = {
  formatContent: (_component: string, stories) => formatStoriesAsMarkdown(stories),
  generateEntityId: (component: string) => `component:${component}`,
  generateStoryId: (component: string) => componentStories[component],
  getItems: async () => Promise.resolve(Object.keys(componentStories)),
  kind: 'component',
};

/**
 * Configuration for scraping styles documentation
 */
export const stylesScrapingConfig: ScrapingConfig = {
  formatContent: (_style: string, stories) => formatStoriesAsMarkdown(stories),
  generateEntityId: (style: string) => `style:${style}`,
  generateStoryId: (component: string) => styleStories[component],
  getItems: async () => Promise.resolve(Object.keys(styleStories)),
  kind: 'style',
};

/**
 * Configuration for scraping template documentation
 */
export const templateScrapingConfig: ScrapingConfig = {
  formatContent: (_template: string, stories) => formatStoriesAsMarkdown(stories),
  generateEntityId: (template: string) => `template:${template}`,
  generateStoryId: (component: string) => templateStories[component],
  getItems: async () => Promise.resolve(Object.keys(templateStories)),
  kind: 'template',
};

export const scrapingConfigByKind: Record<StorybookArtifactKind, ScrapingConfig> = {
  component: componentScrapingConfig,
  style: stylesScrapingConfig,
  template: templateScrapingConfig,
};
