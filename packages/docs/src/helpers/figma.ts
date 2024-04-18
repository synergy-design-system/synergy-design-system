/**
* Returns the figma link for a specific node-id.
*
* @param figmaNodeId - The node-id of the components description in figma
* @returns {string} The specific figma link for a node
*/
export const generateFigmaLink = (figmaNodeId: string) => (`https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=${figmaNodeId}`);

/**
* Returns the object to parameterize the figma plugin for a specific node-id.
*
* @param figmaNodeId - The node-id of the components description in figma
* @param label - The label for the figma link
* @returns {string} The specific figma link for a node
*/
export const generateFigmaPluginObject = (figmaNodeId: string, label: string = 'Go to Figma page') => ({
  label,
  type: 'link',
  url: generateFigmaLink(figmaNodeId),
});
