/* eslint-disable no-console */
import { writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import prettier from 'prettier';
import { ScrapedStory, ScrapingConfig } from './types.js';

export class StorybookScraper {
  private config: ScrapingConfig;

  constructor(config: ScrapingConfig) {
    this.config = config;
  }

  /**
   * Scrape a single story from Storybook
   */
  static async scrapeStoryDocs(storyId: string, baseUrl: string = 'http://localhost:6006'): Promise<ScrapedStory[]> {
    const browser = await chromium.launch({
      headless: true,
    });
    const page = await browser.newPage();

    try {
      // Navigate to the Storybook docs page
      console.log('Navigating to Storybook docs for:', storyId);

      await page.goto(`${baseUrl}/iframe.html?viewMode=docs&id=${storyId}&globals=`);

      // Wait for the content to load
      await page.waitForSelector('.sb-anchor', { timeout: 10000 });

      // Extract the stories
      // We skip stories that have no headline or example
      const results = await page.evaluate(() => Array.from(
        document.querySelectorAll('.sb-anchor'),
      )
        .map(story => {
          const description = story.querySelector(':scope > p')?.textContent || '';
          const exampleSource = story.querySelector('.sb-story #root-inner')?.innerHTML || '';
          const heading = story.querySelector('h3')?.textContent || '';

          // Replace all lit internal comments
          // Lit comments look like this: <!----> or <!--?lit$SOMENUMBER$-->
          const example = exampleSource
            // Remove comments that start with ?lit (with any content after)
            .replace(/<!--\?lit\$[^>]*-->/g, '')
            // Remove empty comments
            .replace(/<!--\s*-->/g, '')
            // Clean up any resulting multiple consecutive whitespace/newlines
            .replace(/\n\s*\n\s*\n/g, '\n\n')
            // Trim leading/trailing whitespace
            .trim();

          return {
            description,
            example,
            heading,
          };
        })
        .filter(x => x.heading && x.example));

      return await Promise.all(results.map(async story => ({
        description: story.description,
        example: await prettier.format(story.example, {
          parser: 'html',
        }),
        heading: story.heading,
      })));
    } catch (error) {
      console.error(`Error scraping Storybook for story ${storyId}:`, error);
      return [];
    } finally {
      await browser.close();
    }
  }

  /**
   * Scrape all configured items and write documentation
   */
  async scrapeAll(baseUrl: string = 'http://localhost:6006'): Promise<void> {
    console.log('Starting scraping process...');

    const items = await this.config.getItems();

    const scrapedPages = await Promise.all(
      items.map(async item => {
        const storyId = this.config.generateStoryId(item);
        const stories = await StorybookScraper.scrapeStoryDocs(storyId, baseUrl);
        return {
          item,
          stories,
        };
      }),
    );

    console.log('Writing documentation files...');

    // Write out the results
    await Promise.all(
      scrapedPages.map(async ({ item, stories }) => {
        const filePath = this.config.generateOutputPath(item);
        const content = this.config.formatContent(item, stories);
        await writeFile(filePath, content, 'utf-8');
        console.log(`Written documentation for ${item} to ${filePath}`);
      }),
    );

    console.log('Scraping process completed successfully!');
  }
}
