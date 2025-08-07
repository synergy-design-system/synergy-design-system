export interface ScrapingConfig {
  /** The output directory path */
  outputPath: string;
  /** Function to get the list of items to scrape */
  getItems: () => Promise<string[]> | string[];
  /** Function to generate the story ID from an item */
  generateStoryId: (item: string) => string;
  /** Function to generate the output file path from an item */
  generateOutputPath: (item: string) => string;
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
