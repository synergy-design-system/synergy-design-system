import { StorybookScraper } from './scraper.js';
import {
  componentScrapingConfig,
  stylesScrapingConfig,
  templateScrapingConfig,
} from './configs.js';
import { type Logger, createConsoleLogger } from '../../../core/context.js';
import { type ScrapingConfig, type StorybookCollectedDocument, type StorybookScrapeType } from './types.js';

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
  async scrapeWithConfig(config: ScrapingConfig): Promise<StorybookCollectedDocument[]> {
    try {
      this.logger.info(`Using Storybook server at ${this.baseUrl}`);

      // Create scraper and run
      const scraper = new StorybookScraper(config);
      return await scraper.scrapeAll(this.baseUrl);
    } catch (error) {
      this.logger.error('Error during scraping process', { error: String(error) });
      throw error;
    }
  }

  /**
   * Scrape component documentation
   */
  async scrapeComponents(): Promise<StorybookCollectedDocument[]> {
    this.logger.info('Starting component documentation scraping...');
    return this.scrapeWithConfig(componentScrapingConfig);
  }

  /**
   * Scrape styles documentation
   */
  async scrapeStyles(): Promise<StorybookCollectedDocument[]> {
    this.logger.info('Starting styles documentation scraping...');
    return this.scrapeWithConfig(stylesScrapingConfig);
  }

  /**
   * Scrape styles documentation
   */
  async scrapeTemplates(): Promise<StorybookCollectedDocument[]> {
    this.logger.info('Starting templates documentation scraping...');
    return this.scrapeWithConfig(templateScrapingConfig);
  }

  /**
   * Scrape all documentation types
   */
  async scrapeAll(): Promise<StorybookCollectedDocument[]> {
    this.logger.info('Starting comprehensive documentation scraping...');

    try {
      this.logger.info(`Using Storybook server at ${this.baseUrl}`);

      // Scrape components
      this.logger.info('Scraping component documentation...');
      const componentScraper = new StorybookScraper(componentScrapingConfig);
      const components = await componentScraper.scrapeAll(this.baseUrl);

      // Scrape styles
      this.logger.info('Scraping styles documentation...');
      const stylesScraper = new StorybookScraper(stylesScrapingConfig);
      const styles = await stylesScraper.scrapeAll(this.baseUrl);

      // Scrape templates
      this.logger.info('Scraping templates documentation...');
      const templatesScraper = new StorybookScraper(templateScrapingConfig);
      const templates = await templatesScraper.scrapeAll(this.baseUrl);

      this.logger.info('All documentation scraping completed successfully!');
      return [...components, ...styles, ...templates];
    } catch (error) {
      this.logger.error('Error during comprehensive scraping process', { error: String(error) });
      throw error;
    }
  }
}

// CLI usage helper
export async function runDocsScraper(
  type: StorybookScrapeType = 'all',
  baseUrl: string = 'http://localhost:6006',
  logger?: Logger,
): Promise<StorybookCollectedDocument[]> {
  const log = logger ?? defaultLogger;
  const scraper = new DocsScraper(baseUrl, log);

  try {
    switch (type) {
      case 'components':
        return await scraper.scrapeComponents();
      case 'styles':
        return await scraper.scrapeStyles();
      case 'templates':
        return await scraper.scrapeTemplates();
      case 'all':
        return await scraper.scrapeAll();
      default:
        throw new Error(`Unknown scraping type: ${type as string}`);
    }
  } catch (error) {
    log.error('Scraping failed', { error: String(error) });
    throw error;
  }
}
