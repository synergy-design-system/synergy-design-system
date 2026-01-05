import { dirname } from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import { Browser, chromium } from 'playwright';
import prettier from 'prettier';
import storybookOutput from '@synergy-design-system/docs/dist/index.json' with { type: 'json' };
import { ScrapedStory, ScrapingConfig } from './types.js';

interface StorybookEntry {
  id: string;
  tags?: string[];
  [key: string]: unknown;
}

/**
 * Check if a story should be skipped based on its tags
 * @param storyId The story ID to check (e.g., "components-syn-combobox--async-options")
 * @returns true if the story should be skipped, false otherwise
 */
function shouldSkipStory(storyId: string): boolean {
  const entries = storybookOutput.entries as Record<string, StorybookEntry>;
  const storyEntry = entries[storyId];
  return storyEntry?.tags?.includes('skip_mcp') || false;
}

/**
 * Check if a story heading should be skipped by finding the corresponding story ID
 * @param docsStoryId The docs story ID (e.g., "components-syn-combobox--docs")
 * @param heading The story heading (e.g., "Async Options")
 * @returns true if the story should be skipped, false otherwise
 */
function shouldSkipStoryByHeading(docsStoryId: string, heading: string): boolean {
  // Get the component prefix from docs story ID
  // (e.g., "components-syn-combobox" from "components-syn-combobox--docs")
  const componentPrefix = docsStoryId.replace('--docs', '');

  // Find matching story by converting heading to potential story ID format
  // Story names are typically converted from "Async Options" to "async-options"
  const potentialStorySlug = heading.toLowerCase().replace(/\s+/g, '-');
  const potentialStoryId = `${componentPrefix}--${potentialStorySlug}`;

  // Check if this potential story ID exists and should be skipped
  return shouldSkipStory(potentialStoryId);
}

export class StorybookScraper {
  private config: ScrapingConfig;

  constructor(config: ScrapingConfig) {
    this.config = config;
  }

  /**
   * Scrape a single story from Storybook
   */
  static async scrapeStoryDocs(
    storyId: string,
    baseUrl: string = 'http://localhost:6006',
    browser?: Browser,
  ): Promise<ScrapedStory[]> {
    const shouldCloseBrowser = !browser;
    const browserInstance = browser || await chromium.launch({
      headless: true,
    });

    const page = await browserInstance.newPage({
      viewport: {
        height: 768,
        width: 1024,
      },
    });

    const scrapingReport = {
      error: null as Error | null,
      foundStories: 0,
      processedStories: 0,
      status: 'pending' as 'success' | 'error' | 'pending',
      storyDetails: [] as Array<{ heading: string; status: 'success' | 'error'; error?: string }>,
      storyId,
    };

    try {
      // Navigate to the Storybook docs page
      await page.goto(`${baseUrl}/iframe?viewMode=docs&id=${storyId}&globals=`);

      // Wait for the content to load
      await page.waitForSelector('.sb-anchor');

      // Extract the stories metadata first
      // We get basic info and identify stories that need iframe content
      const rawStoryMetadata = await page.evaluate(() => Array.from(
        document.querySelectorAll('.sb-anchor'),
      )
        .map((story, index) => {
          const description = story.querySelector(':scope > p')?.textContent || '';
          const exampleSource = story.querySelector('.sb-story #root-inner')?.innerHTML || '';
          const heading = story.querySelector('h3')?.textContent || '';
          const hasIframe = !!story.querySelector('.sb-story iframe');

          return {
            description,
            exampleSource,
            hasIframe,
            heading,
            index,
          };
        })
        .filter(x => x.heading));

      // Filter out stories that should be skipped based on their tags
      const storyMetadata = rawStoryMetadata.filter(story => {
        const shouldSkip = shouldSkipStoryByHeading(storyId, story.heading);
        if (shouldSkip) {
          console.log(`Skipping story "${story.heading}" due to skip_mcp tag`);
        }
        return !shouldSkip;
      });

      // Process each story and handle iframe content if needed
      const results = await Promise.all(
        storyMetadata.map(async (storyMeta) => {
          let { exampleSource } = storyMeta;

          // If no inline content and there's an iframe, try to get content from iframe
          if (!exampleSource && storyMeta.hasIframe) {
            try {
              const storySection = page.locator('.sb-anchor').nth(storyMeta.index);
              const frame = storySection.frameLocator('iframe');

              const frameContent = await frame.locator('#root-inner').innerHTML();
              exampleSource = frameContent || '';
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
              // If iframe content extraction fails, continue with empty content
              console.log(`Failed to extract iframe content for story "${storyMeta.heading}"`);
            }
          }

          // Replace all lit internal comments
          // Lit comments look like this: <!----> or <!--?lit$SOMENUMBER$-->
          const example = exampleSource
            // Remove comments that start with ?lit (with any content after)
            .replace(/<!--\?lit\$[^>]*-->/g, '')
            // Remove empty comments
            .replace(/<!--\s*-->/g, '')
            // Clean up any resulting multiple consecutive whitespace/newlines
            .replace(/\n\s*\n\s*\n/g, '\n\n')
            // Remove all data attributes as they may be dynamic data
            .replace(/ data-[^=]+="[^"]*"/g, '')
            // Trim leading/trailing whitespace
            .trim();

          return {
            description: storyMeta.description,
            example,
            heading: storyMeta.heading,
          };
        }),
      );

      // Filter out stories without examples
      const validResults = results.filter(x => x.heading && x.example);

      scrapingReport.foundStories = validResults.length;

      if (validResults.length === 0) {
        throw new Error(`No stories found for ${storyId}`);
      }

      const processedStories = await Promise.all(validResults.map(async (story, index) => {
        try {
          const formattedExample = await prettier.format(story.example, {
            parser: 'html',
          });

          scrapingReport.storyDetails.push({
            heading: story.heading,
            status: 'success',
          });

          scrapingReport.processedStories += 1;

          return {
            description: story.description,
            example: formattedExample,
            heading: story.heading,
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          scrapingReport.storyDetails.push({
            error: errorMessage,
            heading: story.heading || `Story ${index + 1}`,
            status: 'error',
          });
          throw error;
        }
      }));

      scrapingReport.status = 'success';
      return processedStories;
    } catch (error) {
      scrapingReport.error = error instanceof Error ? error : new Error(String(error));
      scrapingReport.status = 'error';
      return [];
    } finally {
      await page.close();

      if (shouldCloseBrowser) {
        await browserInstance.close();
      }

      // Generate final report
      if (scrapingReport.status !== 'success') {
        console.log(`📊 Scraping Report for ${storyId}:`);
        console.log('   Status: ❌ Error');
        console.log(`   Found Stories: ${scrapingReport.foundStories}`);
        console.log(`   Processed Stories: ${scrapingReport.processedStories}`);

        if (scrapingReport.storyDetails.length > 0) {
          console.log('   Story Details:');
          scrapingReport.storyDetails.forEach((detail, index) => {
            const statusIcon = detail.status === 'success' ? '✅' : '❌';
            console.log(`     ${index + 1}. ${statusIcon} ${detail.heading}`);
            if (detail.error) {
              console.log(`        Error: ${detail.error}`);
            }
          });
        }

        if (scrapingReport.error) {
          console.log(`   Error Details: ${scrapingReport.error.message}`);
        }

        console.log(''); // Empty line for readability
      }
    }
  }

  /**
   * Scrape all configured items and write documentation
   */
  async scrapeAll(baseUrl: string = 'http://localhost:6006'): Promise<void> {
    console.log('Starting scraping process...');

    const items = await this.config.getItems();

    // Create a single browser instance for all scraping operations
    const browser = await chromium.launch({
      headless: true,
    });

    try {
      const scrapedPages = await Promise.all(
        items.map(async item => {
          const storyId = this.config.generateStoryId(item);
          const stories = await StorybookScraper.scrapeStoryDocs(storyId, baseUrl, browser);
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

          // Ensure the directory exists before writing
          const dir = dirname(filePath);
          await mkdir(dir, { recursive: true });
          const content = await prettier.format(this.config.formatContent(item, stories), {
            parser: 'markdown',
          });
          await writeFile(filePath, content, 'utf-8');
        }),
      );

      console.log('Scraping process completed successfully!');
    } finally {
      // Always close the browser, even if an error occurs
      await browser.close();
    }
  }
}
