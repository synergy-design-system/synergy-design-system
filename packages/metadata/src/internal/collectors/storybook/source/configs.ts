import storybookOutput from '@synergy-design-system/docs/dist/index.json' with { type: 'json' };
import { type ScrapingConfig, type StorybookArtifactKind } from './types.js';

interface StorybookEntry {
  id: string;
  importPath?: string;
}

/**
 * Get stories from Storybook output based on a prefix.
 * @param prefix Prefix to filter stories by
 * @returns List of stories matching the prefix
 */
const getStoriesFromStorybook = (prefix: string): Record<string, string> => {
  const byComponent = new Map<string, { priority: number; storyId: string }>();

  Object
    .entries(storybookOutput.entries)
    .filter(([key]) => key.startsWith(`${prefix}-`) && key.endsWith('-docs'))
    .map(([, value]) => value as StorybookEntry)
    .forEach((story) => {
      const docsId = story.id;
      const baseId = docsId.replace('--docs', '');
      const shouldSkip = baseId.endsWith('-overview') || baseId.endsWith('-getting-started');
      if (shouldSkip) {
        return;
      }
      const isStoriesFileDocs = !!story.importPath && /\.stories\.[cm]?[jt]sx?$/.test(story.importPath);
      const componentName = baseId
        .replace(`${prefix}-`, '')
        .replace(/-overview$/, '');
      const priority = isStoriesFileDocs ? 3 : 2;

      const existing = byComponent.get(componentName);
      if (!existing || priority > existing.priority) {
        byComponent.set(componentName, {
          priority,
          storyId: docsId,
        });
      }
    });

  const foundStories = Object.fromEntries(
    Array.from(byComponent.entries()).map(([componentName, value]) => [componentName, value.storyId]),
  );

  return foundStories;
};

const componentStories = getStoriesFromStorybook('components');
const chartStories = getStoriesFromStorybook('charts');
const styleStories = getStoriesFromStorybook('styles');
const templateStories = getStoriesFromStorybook('templates');

// enhance componentStories with chart stories, as charts are a type of component
Object.assign(componentStories, chartStories);

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
