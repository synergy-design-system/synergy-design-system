/* eslint-disable complexity */
/**
 * @typedef {import('@figma/rest-api-spec').ComponentNode} ComponentNode
 * @typedef {import('@figma/rest-api-spec').GetImagesResponse} GetImagesResponse
 * @typedef {import('@figma/rest-api-spec').GetFileResponse} GetFileResponse
 */
import fs from 'node:fs';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { exit } from 'process';
import {
  FIGMA_FILE_ID_LIBRARY,
  PATH_COMPONENT_OVERVIEW,
} from './config.js';

// fetch images and save to disk
async function fetchComponentThumbnails() {
  /**
   * Traverses the Figma document structure to find the element by given path
   * @param {ComponentNode} element The element to search within
   * @param {string[]} pathNames The path to traverse
   * @returns {ComponentNode|undefined}
   */
  function getElement(element, pathNames) {
    if (pathNames.length === 0) return element;
    const [name, ...remaining] = pathNames;
    let childElement = name.indexOf('[') >= 0
      ? element.children[parseInt(name.substr(1), 10)]
      : element.children.find(child => child.name.indexOf(name) >= 0);
    if (!childElement && remaining.length > 0) {
      childElement = element;
    }

    return childElement ? getElement(childElement, remaining) : undefined;
  }

  /**
   * Fetch the image from Figma API using the provided element ID
   * @param {string} id The id to search for
   * @returns {Promise<string>} The URL of the image
   */
  async function getImageUrl(id) {
    const requestUrl = `https://api.figma.com/v1/images/${FIGMA_FILE_ID_LIBRARY}?ids=${id}&format=svg`;
    const headers = { 'X-Figma-Token': process.env.FIGMA_TOKEN };
    const response = await fetch(requestUrl, { headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    /**
     * @type {GetImagesResponse}
     */
    const imgData = await response.json();

    return Object.values(imgData.images)[0];
  }

  // path definitions to traverse the Figma document structure
  const pathToParentElement = ['Component overview', 'Jumppoint', 'jump to=components', 'Frame 3155'];
  const pathToImage = ['content', 'helper/image', 'cover', 'Fixed-aspect-ratio-spacer'];

  // Read and parse the JSON file
  const headers = { 'X-Figma-Token': process.env.FIGMA_TOKEN };
  const fileData = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_ID_LIBRARY}`, { headers });

  /**
   * @type {GetFileResponse}
   */
  const jsonData = await fileData.json();

  // Get the parent element from the Figma document
  const elements = getElement(jsonData.document, pathToParentElement).children;
  // Get all the element names
  const elementNames = elements.map(element => element.name);
  // Get the image URLs for each element
  const imagesAwaits = elements.map(element => getImageUrl(getElement(element, pathToImage).id));
  const imageURLs = await Promise.all(imagesAwaits);

  // make sure the target directory exists
  const targetDir = PATH_COMPONENT_OVERVIEW;
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Write each image to the target directory
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const calls = imageURLs.map(async (url, i) => {
    const imagePath = path.join(targetDir, `${elementNames[i]}.svg`);
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const arrayBuffer = await res.arrayBuffer();
    const image = Buffer.from(arrayBuffer);

    try {
      await writeFile(imagePath, image);
      return {
        error: null,
        success: true,
        url,
      };
    } catch (e) {
      return {
        error: e,
        success: false,
        url,
      };
    }
  });

  const result = await Promise.allSettled(calls);
  return result;
}

fetchComponentThumbnails()
  .then((r) => {
    const success = r.filter((res) => res.status === 'fulfilled' && res.value.success);
    // eslint-disable-next-line no-console
    console.log(`Component thumbnails fetched and saved successfully (${success.length} out of ${r.length} written).`);
    exit(0);
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.error('Error fetching component thumbnails:', error);
    exit(1);
  });
