# Generic Storybook Scraping System

This directory contains a generic and extensible system for scraping Storybook documentation and generating markdown files.

## Overview

The system provides a flexible architecture that can be configured to scrape different types of Storybook documentation (components, styles, etc.) with automatic Storybook lifecycle management.

## Architecture

### Core Components

1. **StorybookManager** (`storybook-manager.ts`)

   - Manages the Storybook server lifecycle
   - Handles automatic port detection and allocation
   - Provides graceful start/stop functionality

2. **StorybookScraper** (`scraper.ts`)

   - Generic scraping functionality
   - Configurable via `ScrapingConfig` interface
   - Handles browser automation and content extraction

3. **DocsScraper** (`docs-scraper.ts`)

   - High-level orchestrator that combines manager and scraper
   - Provides convenience methods for common scraping tasks
   - Handles server lifecycle automatically

4. **Configuration Presets** (`configs.ts`)
   - Pre-configured setups for common use cases
   - `componentScrapingConfig` for component documentation
   - `stylesScrapingConfig` for styles documentation

### Types

The system uses TypeScript interfaces defined in `types.ts`:

- `ScrapingConfig`: Configuration for scraping operations
- `ScrapedStory`: Structure of scraped story data
- `StorybookServer`: Server state information

## Usage

### Basic Usage

```typescript
import { runDocsScraper } from "./docs-scraper.js";

// Scrape all documentation
await runDocsScraper("all");

// Scrape only components
await runDocsScraper("components");

// Scrape only styles
await runDocsScraper("styles");
```

### Advanced Usage

```typescript
import { DocsScraper, StorybookScraper } from "./index.js";

// Create custom scraper
const docsScraper = new DocsScraper("/path/to/storybook");

// Scrape with custom configuration
const customConfig = {
  outputPath: "/custom/path",
  getItems: async () => ["item1", "item2"],
  generateStoryId: item => `my-${item}--docs`,
  generateOutputPath: item => `/custom/path/${item}.md`,
  formatContent: (item, stories) =>
    `# ${item}\n\n${stories.map(s => s.description).join("\n")}`,
};

await docsScraper.scrapeWithConfig(customConfig);
```

### Command Line Usage

```bash
# Using the build script
node build-docs.ts components  # Scrape components only
node build-docs.ts styles      # Scrape styles only
node build-docs.ts all         # Scrape everything (default)
node build-docs.ts             # Scrape everything (default)
```

## Configuration

### ScrapingConfig Interface

```typescript
interface ScrapingConfig {
  outputPath: string; // Base output directory
  getItems: () => Promise<string[]>; // Function to get items to scrape
  generateStoryId: (item: string) => string; // Generate story ID from item
  generateOutputPath: (item: string) => string; // Generate output path from item
  formatContent: (item: string, stories: ScrapedStory[]) => string; // Format content
}
```

### Creating Custom Configurations

```typescript
const myCustomConfig: ScrapingConfig = {
  outputPath: "/path/to/examples",
  getItems: async () => ["example1", "example2"],
  generateStoryId: example => `examples-${example}--docs`,
  generateOutputPath: example => `/path/to/examples/${example}/README.md`,
  formatContent: (example, stories) => {
    return stories
      .map(
        story => `
## ${story.heading}

${story.description}

\`\`\`html
${story.example}
\`\`\`
`,
      )
      .join("\n---\n");
  },
};
```

## Storybook Server Management

The system automatically manages the Storybook server:

- **Port Detection**: Automatically finds available ports starting from 6006
- **Lifecycle Management**: Starts server when needed, stops when done
- **Reuse**: Reuses existing server if already running
- **Graceful Shutdown**: Properly handles server cleanup

## File Structure

```
storybook/
├── types.ts              # TypeScript interfaces
├── storybook-manager.ts  # Server lifecycle management
├── scraper.ts            # Core scraping logic
├── configs.ts            # Pre-configured setups
├── docs-scraper.ts       # High-level orchestrator
├── build-docs.ts         # Command line interface
├── index.ts              # Main exports
├── playwright.ts         # Updated to use new system
├── playwright-legacy.ts  # Legacy implementation
└── README.md             # This file
```

## Benefits

1. **Extensible**: Easy to add new scraping configurations
2. **Reusable**: Common functionality abstracted into reusable components
3. **Maintainable**: Clear separation of concerns
4. **Reliable**: Automatic server management and error handling
5. **Type-Safe**: Full TypeScript support with proper interfaces

## Migration from Legacy System

The old `playwright.ts` file has been updated to use the new system. The legacy implementation is preserved in `playwright-legacy.ts` for reference.

To migrate existing code:

```typescript
// Old way
import { scrapeStorybookDocs } from "./playwright.js";

// New way
import { runDocsScraper } from "./docs-scraper.js";
await runDocsScraper("components");
```

## Future Enhancements

- [ ] Support for parallel scraping
- [ ] Incremental scraping (only changed stories)
- [ ] Custom output formats (JSON, XML, etc.)
- [ ] Integration with CI/CD pipelines
- [ ] Performance monitoring and reporting
