/* eslint-disable complexity */
import fs from 'fs';
import path from 'path';

// fetch images and save to disk
async function fetchComponentThumbnails() {
  // traverses the Figma document structure to find the element by given path
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

  // fetch the image from Figma API using the provided element ID
  async function getImageUrl(id) {
    const requestUrl = `https://api.figma.com/v1/images/3cQ9BFSSaoVfhizV0AJ9GP?ids=${id}&format=svg`;
    const headers = { 'X-Figma-Token': process.env.FIGMA_PERSONAL_ACCESS_TOKEN };
    const response = await fetch(requestUrl, { headers });
    const imgData = await response.json();

    return imgData.images[id];
  }

  // path definitions to traverse the Figma document structure
  const pathToParentElement = ['Component overview', 'Jumppoint', 'jump to=components', 'Frame 3155'];
  const pathToImage = ['content', 'helper/image', 'cover', 'Fixed-aspect-ratio-spacer'];
  const pathToName = ['content', 'Component-name', '[1]'];

  // Read and parse the JSON file
  const headers = { 'X-Figma-Token': process.env.FIGMA_PERSONAL_ACCESS_TOKEN };
  const fileData = await fetch('https://api.figma.com/v1/files/3cQ9BFSSaoVfhizV0AJ9GP', { headers });
  const jsonData = await fileData.json();

  // Get the parent element from the Figma document
  const elements = getElement(jsonData.document, pathToParentElement).children;
  // Get all the element names
  const elementNames = elements.map((element) => getElement(element, pathToName).name);
  // Get the image URLs for each element
  const imagesAwaits = elements.map((element) => getImageUrl(getElement(element, pathToImage).id));
  const imageURLs = await Promise.all(imagesAwaits);

  // make sure the target directory exists
  const targetDir = path.join('src', 'component-thumbnails');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  // Write each image to the target directory
  imageURLs.forEach(async (url, i) => {
    const imagePath = path.join(targetDir, `${elementNames[i]}.svg`);
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const arrayBuffer = await res.arrayBuffer();
    const image = Buffer.from(arrayBuffer);

    fs.writeFile(imagePath, image, (err) => {
      if (err) {
        console.error('Error writing file:', err);
      }
    });
  });
}

(fetchComponentThumbnails)();
