import fs from 'fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import path from 'path';

export async function generateStorybookFile(inputFilePath, outputFilePath, componentName, config) {
  const markdownContent = fs.readFileSync(inputFilePath, 'utf-8');

  const examplesSection = markdownContent
    .split("## Examples")[1]
    ?.split(/\n(?=## )/)[0];

  let isCapturingDescription = false;
  let currentStory = {};
  const storiesData = [];

  const processor = unified()
    .use(remarkParse);

  const parsedMarkdown = processor.parse(examplesSection);

  visit(parsedMarkdown, (node) => {
    if (node.type === 'heading' && node.depth === 3) {
      // Identified a headline, start capturing description
      isCapturingDescription = true;
      currentStory.title = node.children[0].value;
    } else if (isCapturingDescription && node.type === 'code' && node.lang === 'html:preview') {
      // Identified a html:preview block, stop capturing description and capture HTML content
      currentStory.html = node.value.replace(/`/g, '\\`').replace(/\${/g, '\\${').replace('<script>', '<script type="module">');
      storiesData.push(currentStory); // Add current story to stories array
      currentStory = {}; // Reset temporary object for next story
      isCapturingDescription = false; // Reset flag for next story
    } else if (isCapturingDescription && node.type === 'paragraph') {
      // Capturing description
      currentStory.description = (currentStory.description || "") + node.children.map(child => child.value || child.alt).join('');
    }
  });

  const prefix = config.libraryPrefix;

  let overrides = {
    'alert': `args: overrideArgs([ { type: 'slot', value: 'This is a standard alert. You can customize its content and even the icon.', name: 'default' }, { type: 'attribute', value: true, name: 'open' }, { type: 'slot', value: '<${prefix}-icon slot="icon" name="info-circle"></${prefix}-icon>', name: 'icon' } ], args)`,
    'button': `args: overrideArgs({ type: 'slot', value: 'Button', name: 'default' }, args)`,
  }

  let storybookOutput = `
import './${componentName}';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import docsTokens from '../../../../tokens/src/figma-tokens/_docs.json';
import { storybookDefaults, storybookHelpers, storybookTemplate } from '../../../.storybook/helper';
const { args, argTypes } = storybookDefaults('${prefix}-${componentName}');
const { overrideArgs } = storybookHelpers('${prefix}-${componentName}');
const { generateTemplate } = storybookTemplate('${prefix}-${componentName}');

const meta: Meta = {
  component: '${componentName}',
  ${overrides[componentName] || 'args'},
  argTypes,
  title: 'Components/${prefix}-${componentName}',
  parameters: {
    docs: {
      description: {
        component: docsTokens.components['${componentName}'].description.value
      },
    }
  }
};
export default meta;

type Story = StoryObj;

export const Default = {
  render: (args: any) => {
    return generateTemplate({ args });
  },
  parameters: {
    docs: {
      description: {
        story: docsTokens.components['${componentName}'].description.value
      }
    }
  }
} as Story;

`;

  for (const story of storiesData) {
    const formattedStoryName = story.title
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');

    storybookOutput += `
/**
 * ${story.description}
 */
export const ${formattedStoryName}: Story = {
  render: () => html\`${story.html}\`,
};
`;
  }

  fs.writeFileSync(outputFilePath, storybookOutput, 'utf-8');
}


const sourceDir = './vendor/docs/pages/components';
const destinationDir = './vendor/src/components';

export const generateStorybookFiles = async (config) =>
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error(`Could not list the directory. Error: ${err}`);
      return;
    }

    files.forEach((file) => {
      if (path.extname(file) === '.md') {
        const componentName = path.basename(file, '.md');
        const inputFilePath = path.join(sourceDir, file);
        const outputFilePath = path.join(destinationDir, componentName, `${componentName}.stories.ts`);

        generateStorybookFile(inputFilePath, outputFilePath, componentName, config);
      }
    });
  });
