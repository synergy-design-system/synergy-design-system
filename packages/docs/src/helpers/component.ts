import type { TemplateResult } from 'lit';
import type { InputType } from 'storybook/internal/csf';
import type { Parameters, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { html } from 'lit/static-html.js';
import { sentenceCase } from 'change-case';
import storyBookPreviewConfig from '../../.storybook/preview.js';
import docsTokens from '../../../tokens/src/figma-tokens/_docs.json' with { type: 'json' };

type ArgTypesDefinition = 'attribute' | 'property' | 'slot' | 'cssPart' | 'cssProperty';

export interface ConstantDefinition {
  type: ArgTypesDefinition | 'template';
  name: string;
  value: unknown;
  title?: string;
}

/**
 * Returns default arguments, events, and argument types for a given custom element tag.
 *
 * @param {string} customElementTag - Custom element tag for which the defaults are to be fetched.
 */
// eslint-disable-next-line max-len
export const storybookDefaults = (customElementTag: string) => {
  const output = getStorybookHelpers(customElementTag);
  const { argTypes, args } = output;

  // List of summary types that are considered valid per default
  // This makes it work for our custom styles package manifest
  const validSummaryTypes = ['boolean', 'string', 'number'];

  const checkValidTableSummary = (arg: typeof argTypes[string]) => arg.table?.type?.summary
    && validSummaryTypes.includes(arg.table.type?.summary);

  const checkMatchesDefaultValue = (arg: typeof argTypes[string]) => arg.table?.type?.summary
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    && arg.table.type?.summary?.includes(arg.defaultValue);

  // Hide controls for all properties that don´t have a valid summary
  Object.keys(argTypes).forEach(key => {
    const hasValidTableSummary = checkValidTableSummary(argTypes[key]);
    const matchesDefaultValue = checkMatchesDefaultValue(argTypes[key]);

    if (argTypes[key].table && argTypes[key].table.category === 'properties' && !hasValidTableSummary && !matchesDefaultValue) {
      // Remove the value of properties and disabled them as otherwise it can result in
      // unexpected behavior ( e.g. `modal` property of dialog)
      argTypes[key].control = false;
      args[key] = undefined;
    }
  });

  return {
    ...output,
    argTypes: {
      ...argTypes,
    },
  };
};

/**
 * Returns helper functions for working with the stories of a given custom element tag.
 *
 * @param {string} customElementTag - Custom element tag for which the helpers are to be fetched.
 * @returns {Object} - An object containing several helper functions for working with the stories.
 */
export const storybookHelpers = (customElementTag: string) => ({
  /**
   * Returns a suffix string based on the type of argument.
   *
   * @param {ArgTypesDefinition} type - The type of the argument.
   * @returns {string} - The suffix string.
   */
  getSuffixFromType: (type: ArgTypesDefinition): string => ({
    attribute: '',
    cssPart: '-part',
    cssProperty: '',
    property: '-prop',
    slot: '-slot',
  }[type]),

  getValuesFromAttribute: (attribute: string): InputType['options'] => {
    let usedAttribute = attribute;
    if (!attribute.endsWith('-attr')) {
      usedAttribute = `${attribute}-attr`;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { argTypes } = storybookDefaults(customElementTag);

    // Add an explicit index signature to help TypeScript with key access
    const typedArgTypes = argTypes as unknown as Record<string, InputType>;

    return typedArgTypes[usedAttribute]?.options;
  },

  /**
   * Returns the possible values for a list of attributes for a given custom element tag.
   *
   * @param {string[]} attributes - The attributes for which the values are to be fetched.
   * @returns {any} - The possible values for the attributes.
   */
  getValuesFromAttributes: (attributes: string[]) => attributes?.map((attribute: string) => {
    let usedAttribute = attribute;
    if (!attribute.endsWith('-attr')) {
      usedAttribute = `${attribute}-attr`;
    }
    return {
      name: usedAttribute,
      values: storybookHelpers(customElementTag).getValuesFromAttribute(usedAttribute),
    };
  }),

  /**
   * Returns an arguments object that has been overridden with the specified overrides.
   *
   * @param {ConstantDefinition | ConstantDefinition[]} overrides - Overrides for the arguments.
   * @param {Object} original - The original arguments object that is to be overridden.
   * @returns {Object} - The arguments object with the overrides applied.
   */
  overrideArgs: (
    overrides: ConstantDefinition | ConstantDefinition[],
    original?: { [k: string]: unknown; },
  ) => {
    const args = original || storybookDefaults(customElementTag).args;
    const overridesArray = Array.isArray(overrides) ? overrides : [overrides];
    // eslint-disable-next-line no-restricted-syntax
    for (const override of overridesArray) {
      const suffix = storybookHelpers(customElementTag).getSuffixFromType(
        override.type as ArgTypesDefinition,
      );
      args[`${override.name}${suffix}`] = override.value;
    }

    return args;
  },
});

/**
 * Returns a template function for creating stories for a given custom element tag.
 *
 * @param {string} customElementTag - Custom element tag for the story template is to be generated.
 * @returns {Object} - An object containing a function that generates a story template.
 */
export const storybookTemplate = (customElementTag: string) => ({
  generateTemplate: (data = {
    args: {},
  }) => getStorybookHelpers(customElementTag).template(data.args),
});

type Component = keyof typeof docsTokens.components | keyof typeof docsTokens.templates;
type Attribute<T extends Component> = T extends keyof typeof docsTokens.components
  ? keyof typeof docsTokens.components[T]
  : T extends keyof typeof docsTokens.templates
    ? keyof typeof docsTokens.templates[T]
    : never;

/**
 * Returns the story description to the corresponding component and attribute
 *
 * @param {T} component  - The component name
 * @param {Attribute<T>} attribute - The attribute name
 * @returns {string} The story description
 */
export const generateStoryDescription = <T extends Component>(
  component: T,
  attribute: Attribute<T>,
  path: 'components' | 'templates' = 'components',
) => {
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  const objectToUse: Record<string, any> = (docsTokens[path] as any)[component] ?? {};

  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const description: string = objectToUse[attribute]?.description?.value ?? 'No Description';

  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const hint: string = objectToUse[attribute]?.note?.value ?? '';

  const formatText = (text: string) => text.replace(/\n/g, '<br/>');

  const finalDescription = formatText(description);
  const finalHint = hint ? `<br/><br/><strong>👨‍💻 Additional developer Information:</strong><br>${formatText(hint)}` : '';

  return `${finalDescription}${finalHint}`;
};

/**
 * Parameters for the generateScreenshotStory function
 * It accepts either
 */
type ScreenshotStoryOptions = {
  /**
   * String or lit template that should be included directly after all stories
   */
  afterRender?: '' | TemplateResult,

  /**
   * Use this to set additional options for chromatic
   */
  additionalChromaticOptions?: Parameters,

  /**
   * The height of the drawn container
   */
  heightPx?: number,

  /**
   * The style of the drawn container
   */
  styleHeading?: Record<string, string>,
};

/**
 * Creates a bundled story for non-interactive stories, which does a chromatic screenshot
 *
 * @param stories - all non-interactive stories which should be bundled
 * @param options - When numeric, this is used as the height of the iframe. Options object otherwise
 * @returns the bundled story
 *
 * @example Simple usage. Will use 150 Pixels as height
 * ```
 * generateScreenshotStory({
 *   story1,
 *   story2,
 * });
 * ```
 *
 * @example Using another height
 * ```
 * generateScreenshotStory({
 *   story1,
 *   story2,
 * }, 300);
 * ```
 *
 * @example Configuring an after render call and custom height
 * ```
 * generateScreenshotStory({
 *   story1,
 *   story2,
 * }, {
 *   afterRender: html`I will be available as html!`,
 *   heightPx: 300,
 * });
 * ```
 *
 * @example Adding a custom option for chromatics configuration
 * // @see  For this example, see https://docs.chromatic.com/docs/delay/
 * generateScreenshotStory({
 *   story1,
 *   story2,
 * }, {
 *   additionalChromaticOptions: {
 *     delay: 500,
 *   }
 * });
 * ```
 */
export const generateScreenshotStory = (
  stories: { [key: string]: StoryObj },
  options: number | ScreenshotStoryOptions = 150,
): StoryObj => {
  // eslint-disable-next-line no-restricted-globals
  const usedOptions = !isNaN(options as number)
    ? ({ heightPx: options } as ScreenshotStoryOptions)
    : options as ScreenshotStoryOptions;

  const {
    afterRender = '',
    additionalChromaticOptions = {},
    heightPx = 150,
    styleHeading = {},
  } = usedOptions;
  const additionalStylesHeading = Object.entries(styleHeading).map(([key, value]) => `${key}: ${value};`).join(' ');

  return {
    parameters: {
      chromatic: {
        ...storyBookPreviewConfig?.parameters?.chromatic,
        ...additionalChromaticOptions,
        disableSnapshot: false,
      } as Parameters,
      docs: {
        disable: true,
      },
    },
    render: (args, context) => html`
      ${Object.entries(stories).map(([storyName, story]) => {
        const name = story.name ?? sentenceCase(storyName);
        return html`
          <div style='height: ${heightPx}px; margin: var(--syn-spacing-small);'>
            <h3 data-chromatic="ignore" style='${additionalStylesHeading}'>${name}</h3>
            ${story.render?.(args, context)}
          </div>
        `;
      })}
      ${afterRender}
    `,
  };
};
