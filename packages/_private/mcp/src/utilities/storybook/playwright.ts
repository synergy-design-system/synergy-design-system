/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/no-extraneous-dependencies */

// This file has been updated to use the new generic scraping system
// Legacy implementation is preserved in playwright-legacy.ts

import { runDocsScraper } from './docs-scraper.js';

// Run the new generic scraper for styles only
runDocsScraper('all')
  .then(() => console.log('Successfully scraped Storybook docs!'))
  .catch(console.error);
