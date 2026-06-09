import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  promptHandler,
} from '../utilities/index.js';

export const createSpriteSheetPrompt = (server: McpServer) => {
  server.registerPrompt(
    'create-spritesheet',
    {
      argsSchema: {
        folder: z
          .string()
          .describe('The folder that should be searched for occurrences of syn-icon.'),
        name: z
          .string()
          .optional()
          .describe('The name of the generated sprite sheet. If not provided, the sprite sheet will be registered as the default library.'),
      },
      description: 'Creates a SVG sprite sheet for a provided set of icons. Only works with the Synergy 2025 icon set.',
      title: 'Create Sprite Sheet',
    },
    promptHandler('create-spritesheet', async ({
      folder,
      name = 'default',
    // eslint-disable-next-line @typescript-eslint/require-await
    }) => {
      // Ensure to use a valid name
      const resolvedName = name?.trim() || 'default';

      // Code sample to register the generated sprite sheet as an icon library in the Synergy Design System
      const registrationCode = `
import { registerIconLibrary } from '@synergy-design-system/components/components/icon/library.js';

registerIconLibrary('${resolvedName}', {
  resolver: name => \`/public/${resolvedName}.svg#\${name}\`,
  spriteSheet: true,
});
      `;

      // Final prompt content for the AI, instructing it to generate the sprite sheet and provide usage instructions
      const content = `
You are working with a Synergy Design System project.
Task:
Generate an SVG sprite sheet for all synergy icons used in the folder "${folder}".

Instructions:
1. Search through the folder and find all occurrences of \`<syn-icon>\`.
2. Extract the value of the "name" attribute from each usage.
3. If at least one icon name was extracted, call the "create-spritesheet" tool.
   If no icons were found, do not call the tool and instead inform the user.

After the tool returns:

1. First, explain briefly that the SVG must be registered before usage.
2. Second, provide the following code example for registering the sprite sheet:
    \`\`\`js
    ${registrationCode.trim()}
    \`\`\`
3. Then show how to use an icon:
    \`\`\`html
    ${resolvedName === 'default' ? '<syn-icon name="star"></syn-icon>' : `<syn-icon library="${resolvedName}" name="star"></syn-icon>`}
    \`\`\`
4. Save the generated SVG sprite sheet as "${resolvedName}.svg" in the public folder of the project, so it can be accessed at "/public/${resolvedName}.svg".
5. Save the registration code in a file called "${resolvedName}-library.js" in the project, and make sure to import it in the main entry point of the application (e.g., index.js or main.js) to ensure the sprite sheet is registered when the application starts.
6. If you cannot save files directly:
   - Output the SVG and the registration code so the user can copy them manually.

Important:

- Call the "create-spritesheet" tool exactly once when valid icons are found.
- Do not explain the steps.
- Do not include intermediate results.
- Do not claim that files were saved unless you are certain the operation succeeded.
- The final answer must contain:
  1. Registration instructions
  2. Example usage
  3. The generated SVG
      `.trim();

      return [
        content,
      ];
    }, {
      description: ({
        folder,
        name,
      }) => `Creates a SVG sprite sheet for all synergy icons found in ${folder} and registers it as ${name ?? 'the default library'}.`,
    }),
  );
};
