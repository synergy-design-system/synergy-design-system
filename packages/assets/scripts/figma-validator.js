/* eslint-disable no-console */

/**
 * This class serves as a utility to interact with the Figma API,
 * providing functionalities specific to the validation of Figma documents, like:
 *
 * - Fetching page names from a given Figma file
 * - Checking if essential pages are missing from the provided file
 */
export class FigmaValidator {
  constructor(config) {
    this.config = {
      baseURL: 'https://api.figma.com/v1', // default value
      exportVariants: true,
      format: 'svg',
      scale: 1,
      ...config,
    };
  }

  /**
   * Fetches and returns the names of all pages in a given Figma file.
   *
   * @param {string} fileId - The ID of the Figma file
   * @returns all page names belonging to the Figma file
   */
  async getPageNames(fileId) {
    try {
      const response = await fetch(`${this.config.baseURL}/files/${fileId}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Figma-Token': this.config.figmaPersonalToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok ${response.statusText}`);
      }

      const data = await response.json();
      const pageNames = data.document.children.map(c => c.name);
      return pageNames;
    } catch (error) {
      console.error('Error fetching page names:', error);
      return null;
    }
  }

  /**
   * Checks and returns any of the required pages (Assets, Tokens, Components)
   * that are missing from the Figma file.
   *
   * @param {string} fileId - The ID of the Figma file
   * @returns the missing Figma files
   */
  async getMissingPages(fileId) {
    const pageNames = await this.getPageNames(fileId);

    if (pageNames) {
      const requiredPages = ['Assets', 'Tokens', 'Components'];
      const missingPages = requiredPages.filter(page => !pageNames.includes(page));

      return missingPages;
    }
    return Promise.resolve();
  }
}
