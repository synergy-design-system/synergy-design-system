import { Browser, chromium } from 'playwright';
import type { Page } from 'playwright';
import prettier from 'prettier';
import storybookOutput from '@synergy-design-system/docs/dist/index.json' with { type: 'json' };
import { createConsoleLogger } from '../../../core/context.js';
import { type ScrapedStory, type ScrapingConfig, type StorybookCollectedDocument } from './types.js';

const logger = createConsoleLogger('storybook');

const DEFAULT_HIDDEN_SOURCE_WAIT_TIMEOUT_MS = 15000;

// In CI we have to wait a bit longer for stories to render and inject hidden sources, otherwise we get unstyled stories into the index.
// This is true for the current playwright version as time of writing (v1.59.1).
const DEFAULT_STORY_SETTLE_DELAY_MS = process.env.CI ? 2000 : 100;

const parseHiddenSourceWaitTimeout = (): number => {
  const rawValue = process.env.SYNERGY_METADATA_HIDDEN_SOURCE_TIMEOUT_MS;
  if (!rawValue) {
    return DEFAULT_HIDDEN_SOURCE_WAIT_TIMEOUT_MS;
  }

  const parsed = Number.parseInt(rawValue, 10);
  if (Number.isNaN(parsed) || parsed < 0) {
    return DEFAULT_HIDDEN_SOURCE_WAIT_TIMEOUT_MS;
  }

  return parsed;
};

const HIDDEN_SOURCE_WAIT_TIMEOUT_MS = parseHiddenSourceWaitTimeout();

const parseStorySettleDelayMs = (): number => {
  const rawValue = process.env.SYNERGY_METADATA_STORY_SETTLE_DELAY_MS
    ?? process.env.SYNERGY_METADATA_STORY_ANCHOR_SETTLE_DELAY_MS;
  if (!rawValue) {
    return DEFAULT_STORY_SETTLE_DELAY_MS;
  }

  const parsed = Number.parseInt(rawValue, 10);
  if (Number.isNaN(parsed) || parsed < 0) {
    return DEFAULT_STORY_SETTLE_DELAY_MS;
  }

  return parsed;
};

const STORY_SETTLE_DELAY_MS = parseStorySettleDelayMs();

logger.debug(`Storybook scraper initialized with STORY_SETTLE_DELAY_MS=${STORY_SETTLE_DELAY_MS}ms (CI=${process.env.CI ?? 'undefined'})`);

interface HiddenSourceStatus {
  hasCodeToggle: boolean;
  hasNonEmptyHiddenSource: boolean;
  heading: string;
}

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

/**
 * Scroll all story anchors into view to trigger lazy-loading of iframe content.
 * Stories in iframes are loaded lazily and only render when the iframe is visible.
 */
async function scrollAnchorsIntoView(page: Page): Promise<void> {
  const anchors = page.locator('.sb-anchor');
  const anchorCount = await anchors.count();

  logger.debug(`scrollAnchorsIntoView: found ${anchorCount} anchors, STORY_SETTLE_DELAY_MS=${STORY_SETTLE_DELAY_MS}ms`);

  for (let i = 0; i < anchorCount; i += 1) {
    const anchor = anchors.nth(i);
    await anchor.scrollIntoViewIfNeeded();

    // Wait before each story anchor snapshot to reduce CI timing flakiness.
    if (STORY_SETTLE_DELAY_MS > 0) {
      logger.debug(`scrollAnchorsIntoView: waiting ${STORY_SETTLE_DELAY_MS}ms before anchor ${i + 1}/${anchorCount}`);
      await page.waitForTimeout(STORY_SETTLE_DELAY_MS);
    }

    const hasIframe = (await anchor.locator('iframe').count()) > 0;
    if (hasIframe) {
      // Give lazily loaded iframe stories a short moment to render after scrolling.
      await page.waitForTimeout(250);
    }
  }
}

async function waitForHiddenSources(page: Page, storyId: string): Promise<boolean> {
  const startTime = Date.now();

  while (true) {
    const statuses = await page.evaluate(() => Array
      .from(document.querySelectorAll('.sb-anchor'))
      .filter((story) => !!story.querySelector(':scope > h3'))
      .map((story) => {
        const heading = story.querySelector(':scope > h3')?.textContent?.trim() || '';
        const hasCodeToggle = !!story.querySelector('.docblock-code-toggle');
        const hiddenSources = Array.from(story.querySelectorAll('.syn-story-source'));
        const hasNonEmptyHiddenSource = hiddenSources.some((node) => (node.textContent || '').trim().length > 0);

        return {
          hasCodeToggle,
          hasNonEmptyHiddenSource,
          heading,
        };
      })) as HiddenSourceStatus[];

    const missingRequiredHeadings = statuses
      .filter((status) => status.hasCodeToggle)
      .filter((status) => !shouldSkipStoryByHeading(storyId, status.heading))
      .filter((status) => !status.hasNonEmptyHiddenSource)
      .map((status) => status.heading);

    if (missingRequiredHeadings.length === 0 && statuses.length > 0) {
      return true;
    }

    if (HIDDEN_SOURCE_WAIT_TIMEOUT_MS > 0 && (Date.now() - startTime) >= HIDDEN_SOURCE_WAIT_TIMEOUT_MS) {
      logger.warn(`Timed out waiting for hidden sources for ${storyId}; continuing with available sources`, {
        missingHeadings: missingRequiredHeadings,
        timeoutMs: HIDDEN_SOURCE_WAIT_TIMEOUT_MS,
      });
      return false;
    }

    await page.waitForTimeout(200);
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

  private browser: Browser | null = null;

  setConfig(config: ScrapingConfig) {
    this.config = config;
  }

  constructor(config: ScrapingConfig) {
    this.config = config;
  }

  /**
   * Initialize the browser instance. Called on first scrape.
   */
  private async initBrowser(): Promise<void> {
    if (!this.browser) {
      this.browser = await chromium.launch({
        headless: true,
      });
    }
  }

  /**
   * Close the browser instance and cleanup resources.
   */
  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  /**
   * Scrape a single story from Storybook
   */
  private async scrapeStoryDocs(
    storyId: string,
    baseUrl: string = 'http://localhost:6006',
  ): Promise<ScrapedStory[]> {
    if (!this.browser) {
      throw new Error('Browser not initialized. Call initBrowser or scrapeAll first.');
    }

    const browserInstance = this.browser;

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

      // Scroll story anchors into view to trigger lazy-loading of iframe content.
      // Stories in iframes only render when the iframe is visible in the viewport.
      await scrollAnchorsIntoView(page);

      // Now wait for the hidden sources to be injected by the docsCodepenEnhancer
      await waitForHiddenSources(page, storyId);

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
      logger.info(`Scraped ${storyId} with settle delay ${STORY_SETTLE_DELAY_MS}ms`);
      return processedStories;
    } catch (error) {
      scrapingReport.error = error instanceof Error ? error : new Error(String(error));
      scrapingReport.status = 'error';
      return [];
    } finally {
      await page.close();
      await context.close();

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
   * @param baseUrl Storybook server base URL
   */
  async scrapeAll(baseUrl: string = 'http://localhost:6006'): Promise<StorybookCollectedDocument[]> {
    logger.info('Starting scraping process...');

    logger.debug('Initializing browser...');
    const initStart = Date.now();
    await this.initBrowser();
    logger.debug(`Browser initialized (${Date.now() - initStart}ms)`);

    logger.debug('Getting config items...');
    const itemsStart = Date.now();
    const items = await this.config.getItems();
    logger.debug(`Config items retrieved (${Date.now() - itemsStart}ms, count: ${items.length})`);

    try {
      const scrapedPages = await Promise.all(items.map(async (item) => {
        const storyId = this.config.generateStoryId(item);
        const stories = await this.scrapeStoryDocs(storyId, baseUrl);
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
    } catch (error) {
      logger.error('Scraping all failed', { error: String(error) });
      throw error;
    }
  }
}
