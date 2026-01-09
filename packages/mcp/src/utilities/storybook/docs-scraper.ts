import { StorybookScraper } from './scraper.js';
import {
  componentScrapingConfig,
  stylesScrapingConfig,
  templateScrapingConfig,
} from './configs.js';
import { ScrapingConfig } from './types.js';

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
      console.log(`Using Storybook server at ${this.baseUrl}`);

      // Create scraper and run
      const scraper = new StorybookScraper(config);
      await scraper.scrapeAll(this.baseUrl);
    } catch (error) {
      console.error('Error during scraping process:', error);
      throw error;
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
   * Scrape styles documentation
   */
  async scrapeTemplates(): Promise<void> {
    console.log('Starting templates documentation scraping...');
    await this.scrapeWithConfig(templateScrapingConfig);
  }

  /**
   * Scrape all documentation types
   */
  async scrapeAll(): Promise<void> {
    console.log('Starting comprehensive documentation scraping...');

    try {
      console.log(`Using Storybook server at ${this.baseUrl}`);

      // Scrape components
      console.log('Scraping component documentation...');
      const componentScraper = new StorybookScraper(componentScrapingConfig);
      await componentScraper.scrapeAll(this.baseUrl);

      // Scrape styles
      console.log('Scraping styles documentation...');
      const stylesScraper = new StorybookScraper(stylesScrapingConfig);
      await stylesScraper.scrapeAll(this.baseUrl);

      // Scrape templates
      console.log('Scraping templates documentation...');
      const templatesScraper = new StorybookScraper(templateScrapingConfig);
      await templatesScraper.scrapeAll(this.baseUrl);

      console.log('All documentation scraping completed successfully!');
    } catch (error) {
      console.error('Error during comprehensive scraping process:', error);
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
    console.error('Scraping failed:', error);
    throw error;
  }
}
