import { StorybookScraper } from './scraper.js';
import {
  componentScrapingConfig,
  stylesScrapingConfig,
  templateScrapingConfig,
} from './configs.js';
import { type Logger, createConsoleLogger } from '../../core/context.js';
import { ScrapingConfig } from './types.js';

const defaultLogger = createConsoleLogger('storybook');

export class DocsScraper {
  private baseUrl: string;

  private logger: Logger;

  constructor(baseUrl: string = 'http://localhost:6006', logger?: Logger) {
    this.baseUrl = baseUrl;
    this.logger = logger ?? defaultLogger;
  }

  /**
   * Run the scraping process for a specific configuration
   */
  async scrapeWithConfig(config: ScrapingConfig): Promise<void> {
    try {
      this.logger.info(`Using Storybook server at ${this.baseUrl}`);

      // Create scraper and run
      const scraper = new StorybookScraper(config);
      await scraper.scrapeAll(this.baseUrl);
    } catch (error) {
      this.logger.error('Error during scraping process', { error: String(error) });
      throw error;
    }
  }

  /**
   * Scrape component documentation
   */
  async scrapeComponents(): Promise<void> {
    this.logger.info('Starting component documentation scraping...');
    await this.scrapeWithConfig(componentScrapingConfig);
  }

  /**
   * Scrape styles documentation
   */
  async scrapeStyles(): Promise<void> {
    this.logger.info('Starting styles documentation scraping...');
    await this.scrapeWithConfig(stylesScrapingConfig);
  }

  /**
   * Scrape styles documentation
   */
  async scrapeTemplates(): Promise<void> {
    this.logger.info('Starting templates documentation scraping...');
    await this.scrapeWithConfig(templateScrapingConfig);
  }

  /**
   * Scrape all documentation types
   */
  async scrapeAll(): Promise<void> {
    this.logger.info('Starting comprehensive documentation scraping...');

    try {
      this.logger.info(`Using Storybook server at ${this.baseUrl}`);

      // Scrape components
      this.logger.info('Scraping component documentation...');
      const componentScraper = new StorybookScraper(componentScrapingConfig);
      await componentScraper.scrapeAll(this.baseUrl);

      // Scrape styles
      this.logger.info('Scraping styles documentation...');
      const stylesScraper = new StorybookScraper(stylesScrapingConfig);
      await stylesScraper.scrapeAll(this.baseUrl);

      // Scrape templates
      this.logger.info('Scraping templates documentation...');
      const templatesScraper = new StorybookScraper(templateScrapingConfig);
      await templatesScraper.scrapeAll(this.baseUrl);

      this.logger.info('All documentation scraping completed successfully!');
    } catch (error) {
      this.logger.error('Error during comprehensive scraping process', { error: String(error) });
      throw error;
    }
  }
}

// CLI usage helper
export async function runDocsScraper(
  type: 'components' | 'styles' | 'templates' | 'all' = 'all',
  baseUrl: string = 'http://localhost:6006',
  logger?: Logger,
): Promise<void> {
  const log = logger ?? defaultLogger;
  const scraper = new DocsScraper(baseUrl, log);

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
    log.error('Scraping failed', { error: String(error) });
    throw error;
  }
}
