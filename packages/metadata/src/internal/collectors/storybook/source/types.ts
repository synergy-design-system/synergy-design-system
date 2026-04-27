export type StorybookArtifactKind = 'component' | 'style' | 'template';

export type StorybookScrapeType = 'components' | 'styles' | 'templates' | 'all';

export interface ScrapingConfig {
  /** The output kind for persisted examples */
  kind: StorybookArtifactKind;
  /** Function to get the list of items to scrape */
  getItems: () => Promise<string[]> | string[];
  /** Function to generate the story ID from an item */
  generateStoryId: (item: string) => string;
  /** Function to generate the canonical entity ID from an item */
  generateEntityId: (item: string) => string;
  /** Function to format the scraped content */
  formatContent: (item: string, stories: ScrapedStory[]) => string;
}

export interface ScrapedStory {
  heading: string;
  description: string;
  example: string;
}

export interface StorybookServer {
  port: number;
  url: string;
  isRunning: boolean;
}

export interface StorybookCollectedDocument {
  entityId: string;
  item: string;
  kind: StorybookArtifactKind;
  stories: ScrapedStory[];
}
