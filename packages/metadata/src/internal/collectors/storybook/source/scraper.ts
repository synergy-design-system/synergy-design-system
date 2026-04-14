import { Browser, chromium } from 'playwright';
import type { Page } from 'playwright';
import prettier from 'prettier';
import storybookOutput from '@synergy-design-system/docs/dist/index.json' with { type: 'json' };
import { createConsoleLogger } from '../../../core/context.js';
import { type ScrapedStory, type ScrapingConfig, type StorybookCollectedDocument } from './types.js';

const logger = createConsoleLogger('storybook');

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

function isDefaultOrScreenshotOnlyDocsStory(docsStoryId: string): boolean {
  const entries = storybookOutput.entries as Record<string, StorybookEntry>;
  const componentPrefix = docsStoryId.replace('--docs', '');

  const relatedStoryIds = Object.keys(entries)
    .filter((id) => id.startsWith(`${componentPrefix}--`) && !id.endsWith('--docs'));

  if (relatedStoryIds.length === 0) {
    return false;
  }

  return relatedStoryIds.every((id) => {
    const storySlug = id.slice(componentPrefix.length + 2).toLowerCase();
    return storySlug === 'default' || storySlug === 'screenshot';
  });
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

async function waitForHiddenSources(page: Page): Promise<void> {
  try {
    await page.waitForFunction(() => {
      const anchors = Array.from(document.querySelectorAll('.sb-anchor'));
      if (anchors.length === 0) {
        return false;
      }

      return anchors.every((story) => {
        const hasCodeToggle = !!story.querySelector('.docblock-code-toggle');
        const hiddenSources = Array.from(story.querySelectorAll('.syn-story-source'));
        const hasNonEmptyHiddenSource = hiddenSources.some((node) => (node.textContent || '').trim().length > 0);

        return !hasCodeToggle || hasNonEmptyHiddenSource;
      });
    }, {
      timeout: 5000,
    });
  } catch {
    // Best effort only. Some docs stories intentionally do not expose source.
  }
}

async function formatExample(example: string): Promise<string> {
  const trimmed = example.trim();
  if (!trimmed) {
    return '';
  }

  try {
    return await prettier.format(trimmed, {
      parser: 'html',
    });
  } catch {
    return `${trimmed}\n`;
  }
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

    const context = await browserInstance.newContext({
      viewport: {
        height: 768,
        width: 1024,
      },
    });

    const page = await context.newPage();

    const scrapingReport = {
      error: null as Error | null,
      foundStories: 0,
      processedStories: 0,
      status: 'pending' as 'success' | 'error' | 'pending',
      storyDetails: [] as Array<{ heading: string; status: 'success' | 'error'; error?: string; }>,
      storyId,
    };

    try {
      // Navigate to the Storybook docs page
      await page.goto(`${baseUrl}/iframe?viewMode=docs&id=${storyId}&globals=`);

      // Wait for the content to load
      await page.waitForSelector('.sb-anchor');
      await waitForHiddenSources(page);

      // Extract the stories metadata first
      // Read hidden sources directly from the DOM snapshot. This is more reliable than
      // per-story Playwright locator reads on long docs pages.
      const rawStoryMetadata = await page.evaluate(() => Array
        .from(document.querySelectorAll('.sb-anchor'))
        .map((story, index) => {
          const description = story.querySelector(':scope > p')?.textContent || '';
          const heading = story.querySelector(':scope > h3')?.textContent || '';
          const exampleSource = story.querySelector('.syn-story-source')?.textContent?.trim() || '';

          return {
            description,
            exampleSource,
            heading,
            index,
          };
        }));

      // Filter out stories that should be skipped based on their tags
      const storyMetadata = rawStoryMetadata.filter(story => {
        const shouldSkip = shouldSkipStoryByHeading(storyId, story.heading);
        if (shouldSkip) {
          logger.warn(`Skipping story "${story.heading}" due to skip_mcp tag`);
        }
        return !shouldSkip;
      });

      const results = storyMetadata
        .filter(story => !!story.heading && !!story.exampleSource)
        .map((storyMeta) => {
          if (!storyMeta.exampleSource) {
            logger.warn(`No hidden source found for story "${storyMeta.heading}" in ${storyId}`);
          }

          return {
            description: storyMeta.description,
            example: storyMeta.exampleSource.trim(),
            heading: storyMeta.heading,
          };
        });

      // Filter out stories without examples
      const validResults = results.filter(x => x.example);

      scrapingReport.foundStories = validResults.length;

      if (validResults.length === 0) {
        throw new Error(`No stories found for ${storyId}`);
      }

      const processedStories = await Promise.all(validResults.map(async (story, index) => {
        try {
          const formattedExample = await formatExample(story.example);

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
      logger.info(`Scraped ${storyId}`);
      return processedStories;
    } catch (error) {
      scrapingReport.error = error instanceof Error ? error : new Error(String(error));
      scrapingReport.status = 'error';
      return [];
    } finally {
      await page.close();
      await context.close();

      if (shouldCloseBrowser) {
        await browserInstance.close();
      }

      // Generate final report
      if (scrapingReport.status !== 'success') {
        logger.error(`Scraping failed for ${storyId}`, {
          error: scrapingReport.error?.message,
          foundStories: scrapingReport.foundStories,
          processedStories: scrapingReport.processedStories,
          storyDetails: scrapingReport.storyDetails,
        });
      }
    }
  }

  /**
   * Scrape all configured items and write documentation
   */
  async scrapeAll(baseUrl: string = 'http://localhost:6006'): Promise<StorybookCollectedDocument[]> {
    logger.info('Starting scraping process...');

    const items = await this.config.getItems();

    // Create a single browser instance for all scraping operations
    const browser = await chromium.launch({
      headless: true,
    });

    try {
      const scrapedPages = await Promise.all(items.map(async (item) => {
        const storyId = this.config.generateStoryId(item);
        const stories = await StorybookScraper.scrapeStoryDocs(storyId, baseUrl, browser);
        return {
          item,
          stories,
        };
      }));

      const ignorableEmptyPages = scrapedPages.filter(({ item, stories }) => {
        if (stories.length > 0) {
          return false;
        }

        const docsStoryId = this.config.generateStoryId(item);
        return isDefaultOrScreenshotOnlyDocsStory(docsStoryId);
      });

      const failedPages = scrapedPages.filter(({ item, stories }) => {
        if (stories.length > 0) {
          return false;
        }

        const docsStoryId = this.config.generateStoryId(item);
        return !isDefaultOrScreenshotOnlyDocsStory(docsStoryId);
      });

      if (ignorableEmptyPages.length > 0) {
        logger.warn('Skipping examples for default/screenshot-only docs pages', {
          affectedEntities: ignorableEmptyPages
            .map(({ item }) => this.config.generateEntityId(item))
            .sort(),
        });
      }

      if (failedPages.length > 0) {
        const failedIds = failedPages
          .map(({ item }) => this.config.generateEntityId(item))
          .sort();

        if (this.config.kind === 'component') {
          throw new Error(`Failed to scrape storybook examples for ${failedIds.join(', ')}`);
        }

        logger.warn('Skipping docs pages without hidden-source examples', {
          affectedEntities: failedIds,
          kind: this.config.kind,
        });
      }

      const successfulPages = scrapedPages.filter(({ stories }) => stories.length > 0);

      logger.info(`Collected ${successfulPages.length} documentation artifacts`);

      return successfulPages.map(({ item, stories }) => ({
        entityId: this.config.generateEntityId(item),
        item,
        kind: this.config.kind,
        stories,
      }));
    } finally {
      // Always close the browser, even if an error occurs
      await browser.close();
    }
  }
}
