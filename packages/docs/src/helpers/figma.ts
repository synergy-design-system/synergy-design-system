/**
 * Figma link to the synergy charting library
 */
const CHARTING_FIGMA_LINK = 'https://www.figma.com/design/9IpXnDH4GFziUH9sOpnK8V/Synergy-Chart-Library';

/**
 * Figma link to the synergy components library
 */
const COMPONENTS_FIGMA_LINK = 'https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Library';

/**
* Returns the figma link for a specific node-id.
*
* @param figmaNodeId - The node-id of the components description in figma
* @returns {string} The specific figma link for a node
*/
export const generateFigmaLink = (figmaNodeId: string, isCharting: boolean = false) => (
  `${isCharting ? CHARTING_FIGMA_LINK : COMPONENTS_FIGMA_LINK}?node-id=${figmaNodeId}`
);

/**
* Returns the object to parameterize the figma plugin for a specific node-id.
*
* @param figmaNodeId - The node-id of the components description in figma
* @param isCharting - Whether the link is for the charting library
* @returns {string} The specific figma link for a node
*/
export const generateFigmaPluginObject = (figmaNodeId: string, isCharting: boolean = false) => ({
  label: 'Go to Figma page',
  type: 'link',
  url: generateFigmaLink(figmaNodeId, isCharting),
});
