import { StorybookScraper } from './scraper.js';
import {
  componentScrapingConfig,
  stylesScrapingConfig,
  templateScrapingConfig,
} from './configs.js';
import { createConsoleLogger } from '../../core/context.js';
import { ScrapingConfig } from './types.js';

const logger = createConsoleLogger('storybook');

export class DocsScraper {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:6006') {
    this.baseUrl = baseUrl;
  }

  /**
   * Run the scraping process for a specific configuration
   */
  async scrapeWithConfig(config: ScrapingConfig): Promise<void> {
    try {
      logger.info(`Using Storybook server at ${this.baseUrl}`);

      // Create scraper and run
      const scraper = new StorybookScraper(config);
      await scraper.scrapeAll(this.baseUrl);
    } catch (error) {
      logger.error('Error during scraping process', { error: String(error) });
      throw error;
    }
  }

  /**
   * Scrape component documentation
   */
  async scrapeComponents(): Promise<void> {
    logger.info('Starting component documentation scraping...');
    await this.scrapeWithConfig(componentScrapingConfig);
  }

  /**
   * Scrape styles documentation
   */
  async scrapeStyles(): Promise<void> {
    logger.info('Starting styles documentation scraping...');
    await this.scrapeWithConfig(stylesScrapingConfig);
  }

  /**
   * Scrape styles documentation
   */
  async scrapeTemplates(): Promise<void> {
    logger.info('Starting templates documentation scraping...');
    await this.scrapeWithConfig(templateScrapingConfig);
  }

  /**
   * Scrape all documentation types
   */
  async scrapeAll(): Promise<void> {
    logger.info('Starting comprehensive documentation scraping...');

    try {
      logger.info(`Using Storybook server at ${this.baseUrl}`);

      // Scrape components
      logger.info('Scraping component documentation...');
      const componentScraper = new StorybookScraper(componentScrapingConfig);
      await componentScraper.scrapeAll(this.baseUrl);

      // Scrape styles
      logger.info('Scraping styles documentation...');
      const stylesScraper = new StorybookScraper(stylesScrapingConfig);
      await stylesScraper.scrapeAll(this.baseUrl);

      // Scrape templates
      logger.info('Scraping templates documentation...');
      const templatesScraper = new StorybookScraper(templateScrapingConfig);
      await templatesScraper.scrapeAll(this.baseUrl);

      logger.info('All documentation scraping completed successfully!');
    } catch (error) {
      logger.error('Error during comprehensive scraping process', { error: String(error) });
      throw error;
    }
  }
}

// CLI usage helper
export async function runDocsScraper(
  type: 'components' | 'styles' | 'templates' | 'all' = 'all',
  baseUrl: string = 'http://localhost:6006',
): Promise<void> {
  const scraper = new DocsScraper(baseUrl);

  try {
    switch (type) {
      case 'components':
        await scraper.scrapeComponents();
        break;
      case 'styles':
        await scraper.scrapeStyles();
        break;
      case 'templates':
        await scraper.scrapeTemplates();
        break;
      case 'all':
        await scraper.scrapeAll();
        break;
      default:
        throw new Error(`Unknown scraping type: ${type as string}`);
    }
  } catch (error) {
    logger.error('Scraping failed', { error: String(error) });
    throw error;
  }
}
