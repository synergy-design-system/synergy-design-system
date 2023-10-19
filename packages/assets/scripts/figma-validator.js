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
