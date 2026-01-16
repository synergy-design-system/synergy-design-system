/* eslint-disable no-restricted-syntax */
/**
 * @typedef {import('@figma-export/types').ComponentOutputter} ComponentOutputter
 * @typedef {import('@figma-export/types').ComponentNode} ComponentNode
 */

/**
 * @typedef {Object} Options
 * @property {string} basename - The base name for the SVG file, typically the component name.
 * @property {string} dirname - The directory name for the SVG file, typically derived from the component's page.
 * @property {componentName: string} componentName - The name of the component.
 * @property {string} pageName - The name of the page.
 */

/**
 * @typedef {Object} OutputOptions
 * @property {function(ComponentNode): boolean} [options.componentFilter] - Function to filter components.
 * @property {function(Options): string} [getBasename] - Function to get the basename of the SVG file.
 * @property {function(Options): string} [getDirname] - Function to get the directory name for the SVG file.
 * @property {string} output - The output directory where SVG files will be saved.
 * @property {boolean} [extractIndividualComponents] - Whether to extract individual components from the main SVG.
 */

import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';

/**
 * Extract individual images from SVG image elements using regex parsing
 * @param {string} svgContent - The SVG content to parse
 * @param {string} outputDir - The output directory path
 * @returns {Array<{name: string, filename: string, type: string, size: number}>} Array of extracted images
 */
function extractIndividualComponents(svgContent, outputDir) {
  const extractedImages = [];

  try {
    // Parse SVG content with cheerio (XML mode)
    const $ = cheerio.load(svgContent, { xml: true });

    // Find all image elements with data-name attributes
    const imageElements = $('image[data-name]');
    console.log(`Found ${imageElements.length} image elements with data-name attributes`);

    imageElements.each((_, element) => {
      const $img = $(element);
      const originalFilename = $img.attr('data-name');

      if (!originalFilename || !originalFilename.endsWith('.png')) {
        return; // continue to next iteration
      }

      // Transform filename: remove 'syn-' prefix and convert to proper naming
      let filename = originalFilename.replace(/^syn-/, '');

      // Filenames will be all lowercase without any spacers
      filename = filename.toLowerCase().replace(/\s+/g, '-');

      // Get the base64 data from href or xlink:href
      const href = $img.attr('href') || $img.attr('xlink:href');
      if (!href || !href.startsWith('data:image/')) {
        return; // continue to next iteration
      }

      try {
        // Extract base64 data from data URL
        const [, mimeAndData] = href.split('data:image/');
        const [imageType, base64Data] = mimeAndData.split(';base64,');

        // Decode base64 to buffer
        const imageBuffer = Buffer.from(base64Data, 'base64');

        // Create output path
        const outputPath = path.resolve(outputDir, filename);

        // Write the image file
        fs.writeFileSync(outputPath, imageBuffer);

        extractedImages.push({
          filename,
          name: filename.replace('.png', ''),
          size: imageBuffer.length,
          type: imageType,
        });
      } catch (error) {
        console.error(`  ✗ Failed to save ${filename}:`, error.message);
      }
    });
  } catch (parseError) {
    console.error('Failed to parse SVG content with cheerio:', parseError.message);
  }

  return extractedImages;
}

/**
 * Create a component outputter that exports SVG files from Figma components.
 * Can optionally extract individual components from a single SVG file.
 * Based on the original @figma-export/output-components-as-svg package.
 * @param {OutputOptions} options - Configuration options for the outputter.
 * @returns {ComponentOutputter}
 */
export const figmaOutputThumbnails = ({
  componentFilter = () => true,
  getBasename = (options) => `${options.basename}.svg`,
  getDirname = (options) => `${options.pageName}${path.sep}${options.dirname}`,
  output,
  extractIndividualComponents: shouldExtract = false,
}) => pages => {
  for (const page of pages) {
    const { name: pageName, components } = page;
    for (const component of components) {
      const { name: componentName, svg, figmaExport } = component;
      const options = {
        componentName,
        pageName,
        ...figmaExport,
      };

      if (componentFilter(component)) {
        const filePath = path.resolve(output, getDirname(options));
        fs.mkdirSync(filePath, { recursive: true });

        if (shouldExtract && svg) {
          const extractedImages = extractIndividualComponents(svg, filePath);

          console.log(`Extracted ${extractedImages.length} individual images from ${componentName}`);

          // Also save the original SVG file
          const originalFilePath = path.resolve(filePath, getBasename(options));
          fs.writeFileSync(originalFilePath, svg);
        } else {
          // Save the original SVG as-is
          const originalFilePath = path.resolve(filePath, getBasename(options));
          fs.writeFileSync(originalFilePath, svg);
        }
      }
    }
  }
};
