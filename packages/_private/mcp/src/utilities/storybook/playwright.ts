/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/no-extraneous-dependencies */
import { writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import prettier from 'prettier';
import { componentPath } from '../config.js';
import { getAvailableComponents } from '../metadata.js';

export async function scrapeStorybookDocs(storyId: string) {
  const browser = await chromium.launch({
    headless: true,
  });
  const page = await browser.newPage();

  try {
    // Navigate to the Storybook docs page
    console.log('Navigating to Storybook docs for:', storyId);

    await page.goto(`http://localhost:8080/iframe.html?viewMode=docs&id=${storyId}&globals=`);

    // Wait for the content to load
    await page.waitForSelector('.sb-anchor', { timeout: 10000 });

    // Extract the stories
    // We skip stories that have no headline, description of example
    const results = await page.evaluate(() => Array.from(
      document.querySelectorAll('.sb-anchor'),
    )
      .map(story => {
        const description = story.querySelector(':scope > p')?.textContent;
        const exampleSource = story.querySelector('.sb-story #root-inner')?.innerHTML || '';
        const heading = story.querySelector('h3')?.textContent;

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
          // .replaceAll(/<!--\?lit\$[0-9]+\$/, '')
          // .replaceAll(/<!---->/, '');

        return {
          description,
          example,
          heading,
        };
      })
      .filter(x => x.heading && x.example && x.description));

    return await Promise.all(results.map(async story => ({
      ...story,
      example: await prettier.format(story.example, {
        parser: 'html',
      }),
    })));
  } catch (error) {
    console.error(`Error scraping Storybook: for story ${storyId}`, error);
    return [];
  } finally {
    await browser.close();
  }
}

const bootstrap = async () => {
  const components = await getAvailableComponents();

  const scrapedPages = components
    .map(async component => ({
      component,
      stories: await scrapeStorybookDocs(`components-${component}--docs`),
    }));

  const result = await Promise.all(scrapedPages);

  // Write out the result
  result.forEach(async ({ component, stories }) => {
    const filePath = `${componentPath}/${component}/docs.md`;
    const content = stories.map(
      story => `
## ${story.heading}

${story.description}

\`\`\`html\n${story.example}
\`\`\`
`,
    ).join('\n---\n');

    await writeFile(filePath, content, 'utf-8');
  });
};

bootstrap()
  .then(() => console.log('Successfully scraped Storybook docs!'))
  .catch(console.error);
