/* eslint-disable no-console */
import { StorybookManager } from './storybook-manager.js';
import { StorybookScraper } from './scraper.js';
import { componentScrapingConfig, stylesScrapingConfig } from './configs.js';
import { ScrapingConfig } from './types.js';

export class DocsScraper {
  private storybookManager: StorybookManager;

  private workingDirectory: string;

  constructor(workingDirectory: string = process.cwd()) {
    this.storybookManager = new StorybookManager();
    this.workingDirectory = workingDirectory;
  }

  /**
   * Run the scraping process for a specific configuration
   */
  async scrapeWithConfig(config: ScrapingConfig): Promise<void> {
    let server = this.storybookManager.getServer();
    let startedStorybook = false;

    try {
      // Start Storybook if not already running
      if (!server?.isRunning) {
        console.log('Starting Storybook server...');
        server = await this.storybookManager.start(this.workingDirectory);
        startedStorybook = true;
      } else {
        console.log(`Using existing Storybook server at ${server.url}`);
      }

      // Create scraper and run
      const scraper = new StorybookScraper(config);
      await scraper.scrapeAll(server.url);
    } catch (error) {
      console.error('Error during scraping process:', error);
      throw error;
    } finally {
      // Stop Storybook if we started it
      if (startedStorybook) {
        console.log('Stopping Storybook server...');
        await this.storybookManager.stop();
      }
    }
  }

  /**
   * Scrape component documentation
   */
  async scrapeComponents(): Promise<void> {
    console.log('Starting component documentation scraping...');
    await this.scrapeWithConfig(componentScrapingConfig);
  }

  /**
   * Scrape styles documentation
   */
  async scrapeStyles(): Promise<void> {
    console.log('Starting styles documentation scraping...');
    await this.scrapeWithConfig(stylesScrapingConfig);
  }

  /**
   * Scrape all documentation types
   */
  async scrapeAll(): Promise<void> {
    console.log('Starting comprehensive documentation scraping...');

    let server = this.storybookManager.getServer();
    let startedStorybook = false;

    try {
      // Start Storybook if not already running
      if (!server?.isRunning) {
        console.log('Starting Storybook server...');
        server = await this.storybookManager.start(this.workingDirectory);
        startedStorybook = true;
      } else {
        console.log(`Using existing Storybook server at ${server.url}`);
      }

      // Scrape components
      console.log('Scraping component documentation...');
      const componentScraper = new StorybookScraper(componentScrapingConfig);
      await componentScraper.scrapeAll(server.url);

      // Scrape styles
      console.log('Scraping styles documentation...');
      const stylesScraper = new StorybookScraper(stylesScrapingConfig);
      await stylesScraper.scrapeAll(server.url);

      console.log('All documentation scraping completed successfully!');
    } catch (error) {
      console.error('Error during comprehensive scraping process:', error);
      throw error;
    } finally {
      // Stop Storybook if we started it
      if (startedStorybook) {
        console.log('Stopping Storybook server...');
        await this.storybookManager.stop();
      }
    }
  }

  /**
   * Cleanup - stop Storybook if running
   */
  async cleanup(): Promise<void> {
    if (this.storybookManager.isRunning()) {
      console.log('Cleaning up - stopping Storybook...');
      await this.storybookManager.stop();
    }
  }
}

// CLI usage helper
export async function runDocsScraper(type: 'components' | 'styles' | 'all' = 'all'): Promise<void> {
  const scraper = new DocsScraper();

  try {
    switch (type) {
    case 'components':
      await scraper.scrapeComponents();
      break;
    case 'styles':
      await scraper.scrapeStyles();
      break;
    case 'all':
      await scraper.scrapeAll();
      break;
    default:
      throw new Error(`Unknown scraping type: ${type as string}`);
    }
  } catch (error) {
    console.error('Scraping failed:', error);
    process.exit(1);
  } finally {
    await scraper.cleanup();
  }
}
