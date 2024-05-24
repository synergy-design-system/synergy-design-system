// TODO: this eslint-disable should be removed at some point,
// as soon as it is clear what we want to do with this file

/* eslint-disable */
import { classMap } from 'lit/directives/class-map.js';
// @ts-ignore
import { getWcStorybookHelpers, setWcStorybookHelpersConfig } from "wc-storybook-helpers";
import { getComponentByTagName } from 'wc-storybook-helpers/dist/cem-utilities.js';
import { html, unsafeStatic } from 'lit/static-html.js';
import { Parameters, StoryObj, setCustomElementsManifest } from '@storybook/web-components';
import docsTokens from '../../../tokens/src/figma-tokens/_docs.json';
import storyBookPreviewConfig from '../../.storybook/preview.js';
import { sentenceCase } from 'change-case';
// @ts-ignore
import componentsManifest from 'virtual:vite-plugin-cem/custom-elements-manifest';
// @ts-ignore
import stylesManifest from 'virtual:vite-plugin-synergy-styles/custom-elements-manifest';
import type { TemplateResult } from 'lit';

setWcStorybookHelpersConfig({ hideArgRef: true, hideScriptTag: true });

// Remove all private members from the manifest
if (componentsManifest.modules) {
  componentsManifest.modules = componentsManifest.modules.map((module: any) => {
    if (module.declarations) {
      module.declarations = module.declarations.map((declaration: any) => {
        if (declaration.members) {
          declaration.members = declaration.members.filter((member: any) => member.description && member.privacy !== 'private');
        }
        return declaration;
      });
    }
    return module;
  });
}

// Copy the styles manifest into the components manifest
const manifest = {
  ...componentsManifest,
  modules: [
    ...componentsManifest.modules,
    ...stylesManifest.modules,
  ],
};

console.log(manifest);

setCustomElementsManifest(manifest);
console.log('Custom elements manifest loaded for components and styles');

type ArgTypesDefinition = 'attribute' | 'property' | 'slot' | 'cssPart' | 'cssProperty';

interface AxisDefinition {
  type: ArgTypesDefinition | 'template';
  name: string;
  values?: any[] | { value: any; title?: string; }[];
  title?: string;
}

export interface ConstantDefinition {
  type: ArgTypesDefinition | 'template';
  name: string;
  value: any;
  title?: string;
}

/**
 * Returns default arguments, events, and argument types for a given custom element tag.
 *
 * @param {string} customElementTag - The custom element tag for which the defaults are to be fetched.
 * @returns {any} - An object containing default arguments, events, and argument types.
 */
export const storybookDefaults = (customElementTag: string): any => {
  const {
    args, events, argTypes,
  } = getWcStorybookHelpers(customElementTag,);
  const manifest = getComponentByTagName(customElementTag,( window as any).__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__);

  const getBadgesConfig = () => ({
    status: {
      styles: {
        backgroundColor: manifest?.status === 'stable' ? '#43b02a' : 'rgb(255, 131, 0)',
        borderColor: 'white',
        color: 'white',
      },
      title: `Status: ${manifest?.status}`,
    },
    since: {
      styles: {
        backgroundColor: '#333',
        borderColor: '#fff',
        color: '#fff',
      },
      title: `Since: ${manifest?.since}`,
    },
  });

  const getOptimizedArgTypes = () => {
    interface member {
      kind: string;
      privacy?: string;
      name: string;
    }
    
    // Hide controls for all properties
    for (const key in argTypes) {
      if (argTypes.hasOwnProperty(key) && argTypes[key].table && argTypes[key].table.category === 'properties') {
        // Storybook@8 uses an object to indicate controls are disabled
        argTypes[key].control = {
          disabled: true,
        };
      }
    }

    const output = {
      ...argTypes,
      // Events should show up but not be editable
      ...manifest?.events?.reduce((acc: any, event: any) => {
        acc[event.name] = {
          ...event,
          control: false,
          table: {
            category: 'Events'
          },
        };
        return acc;
      }, {}),
      ...manifest?.members?.filter(member => member.kind === 'method').reduce((acc: any, method: any) => {
        acc[method.name] = { ...method, control: false, table: { category: 'Methods' } };
        return acc;
      }, {}),
    };


    return output;
  };

  return {
    args,
    argTypes: getOptimizedArgTypes(),
    parameters: {
      badges: ['status', 'since'],
      badgesConfig: getBadgesConfig(),
      actions: {
        handles: events,
      },
    },
  };
};

/**
 * Returns helper functions for working with the stories of a given custom element tag.
 *
 * @param {string} customElementTag - The custom element tag for which the helpers are to be fetched.
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
    property: '-prop',
    slot: '-slot',
    cssPart: '-part',
    cssProperty: '',
  }[type]),

  /**
     * Returns the possible values for an attribute for a given custom element tag.
     *
     * @param {string} attribute - The attribute for which the values are to be fetched.
     * @returns {any} - The possible values for the attribute.
     */
  getValuesFromAttribute: (attribute: string): any => {
    if (!attribute.endsWith('-attr')) {
      attribute = `${attribute}-attr`;
    }
    const { argTypes } = storybookDefaults(customElementTag);
    if (argTypes[attribute]?.control?.type === 'boolean') {
      return [true, false];
    }
    return argTypes[attribute].options;
  },

  /**
     * Returns the possible values for a list of attributes for a given custom element tag.
     *
     * @param {string[]} attributes - The attributes for which the values are to be fetched.
     * @returns {any} - The possible values for the attributes.
     */
  getValuesFromAttributes: (attributes: string[]): any => attributes?.map((attribute: string) => {
    if (!attribute.endsWith('-attr')) {
      attribute = `${attribute}-attr`;
    }
    return {
      name: attribute,
      values: storybookHelpers(customElementTag).getValuesFromAttribute(attribute),
    };
  }),

  /**
     * Returns an arguments object that has been overridden with the specified overrides.
     *
     * @param {ConstantDefinition | ConstantDefinition[]} overrides - The overrides for the arguments.
     * @param {Object} original - The original arguments object that is to be overridden.
     * @returns {Object} - The arguments object with the overrides applied.
     */
  overrideArgs: (overrides: ConstantDefinition | ConstantDefinition[], original?: { [k: string]: any; }) => {
    const args = original || storybookDefaults(customElementTag).args;
    const overridesArray = Array.isArray(overrides) ? overrides : [overrides];
    for (const override of overridesArray) {
      const suffix = storybookHelpers(customElementTag).getSuffixFromType(override.type as any);
      args[`${override.name}${suffix}`] = override.value;
    }

    return args;
  },
});

/**
 * Returns a template function for creating stories for a given custom element tag.
 *
 * @param {string} customElementTag - The custom element tag for which the story template is to be generated.
 * @returns {Object} - An object containing a function that generates a story template.
 */
export const storybookTemplate = (customElementTag: string) => {
  const { template: theTemplate, manifest } = getWcStorybookHelpers(customElementTag);

  const { args: defaultArgs } = storybookDefaults(customElementTag);
  const { getValuesFromAttribute } = storybookHelpers(customElementTag);

  /**
   * Returns a Lit template function that creates a story based on provided configuration.
   * This function takes a configuration object that specifies the axes, constants, title, and arguments to be used in the story.
   *
   * The `axis` object defines the x-axis and y-axis. Each axis is an `AxisDefinition` object
   * which consists of a type, name, values, and title. Type is the argument type which can be
   * 'attribute', 'property', 'slot', 'cssPart', or 'cssProperty'. Name is the argument name.
   * Values is an array of possible values for the argument. Title is the label of the axis in the story.
   *
   * The `constants` array defines the constant arguments to be used in the story.
   * Each constant is a `ConstantDefinition` object which consists of a type, name, value, and title.
   * Type is the argument type which can be 'attribute', 'property', 'slot', 'cssPart', or 'cssProperty'.
   * Name is the argument name. Value is the constant value of the argument. Title is the label of the constant in the story.
   *
   * The `title` string is the title of the story. If a title is specified, it will be displayed as a heading in the story.
   *
   * The `args` object is the default arguments for the story. If specified, these arguments will be used as defaults
   * for the story. If a constant or an axis with the same argument name is specified, the value from the constant
   * or axis will override the default value from `args`.
   *
   * The template function returned by `generateTemplate` generates a Lit template for the story based on
   * the provided configuration. The template displays a table showing all possible combinations of
   * argument values, with one row for each y-axis value and one column for each x-axis value.
   * Each cell in the table is filled with the custom element in the corresponding state.
   */
  const generateTemplate = ({
    axis,
    constants = [],
    options,
    args = defaultArgs,
  }: {
    /**
     * The object defining the x-axis and y-axis for the story.
     */
    axis?: {
      x?: AxisDefinition | AxisDefinition[];
      y?: AxisDefinition | AxisDefinition[];
    };
    /**
     * The constant argument(s) for the story. Those will be applied to every cell in the table.
     */
    constants?: ConstantDefinition | ConstantDefinition[];
    options?: {
      /**
       * The title of the story. This shows up on every table in the story.
       */
      title?: string;
      /**
       * Classes which are added to the table. This can be used to scope CSS.
       */
      classes?: string;
      /**
       * Background color of the table.
       */
      templateBackground?: string;
      /**
       * Background colors of the table. This can be used to alternate the background color of the table rows or columns.
       */
      templateBackgrounds?: { alternate: 'x' | 'y'; colors: string[]; };
      /**
       * Custom template function which can be used to customize the template.
       */
      templateContent?: string;
    };
    args: any;
  }) => {
    const template = (args: any) => {
      if (!manifest?.style) {
        return theTemplate(args);
      }
      // Extract class related attributes and transform into an object.
      const classesObj = Object.keys(args)
        .filter(key => key.endsWith('-attr'))
        .reduce((acc, key) => {
          const baseName = key.substring(0, key.length - 5); // Remove '-attr'

          // Check if value is 'true' and set the baseName class accordingly
          if (args[key] === true) {
            acc[baseName] = true;
          } else if (args[key] === 'false' || args[key] === '(default)') {
            acc[baseName] = false;
          }
          // If value is not 'true' or 'false', add the actual value as a class
          else if (args[key]) {
            // This makes it easier to write shorter class names in the docs
            if (baseName.endsWith('...')) {
              acc[baseName.replace('...', args[key])] = true;
            } else {
              acc[args[key]] = true;
            }
          }

          return acc;
        }, {} as { [key: string]: boolean; });

      const slotContent = args['default-slot'] || '';

      // Compute the classes object
      const classes = { [customElementTag]: true, ...classesObj };

      // Convert classes object to a space-separated string of class names
      const classesAsString = Object.keys(classes)
        .filter(key => classes[key])
        .join(' ');

      if (options?.templateContent) {
        // Replace placeholders in the provided template content
        const replacedContent = options.templateContent
          .replaceAll('%SLOT%', slotContent)
          .replaceAll('%CLASSES%', classesAsString);

        return unsafeStatic(replacedContent);
      }

      // Default rendering using lit-html
      return html`<div class=${classMap(classes)}>${unsafeStatic(slotContent)}</div>`;
    };

    const constantDefinitions = (Array.isArray(constants) ? constants : [constants]).reduce(
      (acc, curr) => ({
        ...acc,
        [`${curr.name}${storybookHelpers(customElementTag).getSuffixFromType(curr.type as any)}`]: curr.value,
      }),
      {},
    );

    if (!axis?.x && !axis?.y && !options?.title) {
      return html`${template({
        ...args,
        ...constantDefinitions,
      })}`;
    }

    const generateAxes = (axis: any): AxisDefinition[] => {
      if (!axis) return [{} as AxisDefinition];
      if (Array.isArray(axis)) {
        return axis.map(item => ({
          ...item,
          values: item.values || getValuesFromAttribute(item.name),
        }));
      }
      return [
        {
          ...axis,
          values: axis.values || getValuesFromAttribute(axis.name),
        },
      ];
    };

    const xAxes = generateAxes(axis?.x);
    const yAxes = generateAxes(axis?.y);

    const constantsArray = Array.isArray(constants) ? constants : [constants];
    const constantsTemplate = constantsArray.find(constant => constant.type === 'template')?.value;

    const uuid = `uuid-${crypto.randomUUID()}`;

    return html`
      <style>
        table:not(:first-of-type).story-template {
          margin-top: 72px;
        }
        .story-template th {
          text-align: left;
        }
        .story-template td {
          text-align: center;
        }
        .story-template th,
        .story-template td {
          padding: 16px;
          font-size: 12px;
        }
        td.template {
          font-size: 16px;
        }
        .story-template thead tr th {
          text-align: center;
          border-bottom: 1px solid #e0e0e0;
        }
        .story-template thead th.title {
          background: #e0e0e0;
          text-align: left;
          font-size: 14px;
        }
        .story-template tbody tr th {
          font-weight: normal;
          text-align: center;
        }

        .story-template tbody tr:first-of-type th:first-of-type {
          width: 32px;
        }

        .story-template tbody tr th[rowspan] {
          text-align: center;
          padding-left: 0;
          border-right: 1px solid #e0e0e0;
          font-weight: bold;
        }

        .story-template tbody tr th span {
          -ms-writing-mode: tb-rl;
          -webkit-writing-mode: vertical-rl;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          white-space: nowrap;
        }

        ${options?.templateBackground
      && `
          .${uuid}.story-template tbody tr.template-row td.template {
            background: ${options?.templateBackground};
          }
        `}

        ${options?.templateBackgrounds?.colors.map((color, index) => {
        const calculateNth = (index: number) => `${options?.templateBackgrounds?.colors.length}n + ${index + 1}`;
        return options?.templateBackgrounds?.alternate === 'y'
          ? `
                .${uuid}.story-template tbody tr.template-row:nth-of-type(${calculateNth(index)}) td.template {
                  background: ${color};
                }
              `
          : `
                .${uuid}.story-template tbody tr.template-row td.template:nth-of-type(${calculateNth(index)}) {
                  background: ${color};
                }
              `;
      })}
      </style>
      ${xAxes.map((xAxis: any) => html` ${yAxes.map((yAxis: any) => {
        let firstRow = true;
        const showXLabel = xAxes.length > 1 || xAxis.values;
        const showYLabel = ((xAxis && yAxis) || yAxes.length > 1) && yAxis?.values;
        return html`
            <table class="story-template ${uuid} ${options?.classes}">
              <thead>
                ${options?.title
          && html`<tr>
                  <th class="title" colspan=${(xAxis.values?.length || 0) + 3}><code>${options?.title}</code></th>
                </tr>`}
                ${xAxis
          && xAxis.values
          && html`
                  <tr>
                    ${showYLabel ? html`<td></td>` : ''} <td></td>
                    ${showXLabel
            && html`<th colspan=${xAxis.values?.length || 0}><code>${xAxis.title || xAxis.name}</code></th>`
            }
                    </tr>
                  </tr>
                  ${html`
                    <tr>
                      ${showYLabel ? html`<td></td>` : ''}
                      <td></td>
                      ${xAxis?.values?.map((xValue: any) => html`<td><code>${xValue.title || xValue}</code></td>`)}
                    </tr>
                  `}
                `}
              </thead>
              <tbody>
                ${(yAxis?.values || ['']).map((yValue: any) => {
              const row = html`
                    <tr class="template-row">
                      ${firstRow && showYLabel
                  ? html`<th rowspan="${yAxis?.values?.length}">
                            <span><code>${yAxis.title || yAxis.name}</code></span>
                          </th>`
                  : ''}
                      <th><code>${yValue.title || yValue}</code></th>
                      ${(xAxis?.values || ['']).map((xValue: any) => html`
                          <td class="template template-x-${xAxis?.values?.indexOf(xValue) || 0 + 1} template-y-${yAxis?.values?.indexOf(yValue.value || yValue) || 0 + 1
                    }">
                          ${(xAxis.type === 'template'
                      && unsafeStatic((xValue.value || xValue).split('%TEMPLATE%')[0] || ''))
                    || ''
                    }
                          ${(yAxis.type === 'template'
                      && unsafeStatic((yValue.value || yValue).split('%TEMPLATE%')[0] || ''))
                    || ''
                    }
                          ${(constantsTemplate && unsafeStatic(constantsTemplate.split('%TEMPLATE%')[0] || '')) || ''}
                            ${template({
                      ...args,
                      ...constantDefinitions,
                      ...(xAxis
                        && xAxis.type !== 'template' && {
                        [`${xAxis.name}${storybookHelpers(customElementTag).getSuffixFromType(xAxis.type)}`]:
                          // As the value could be null or empty, we need to check if the property exists
                          xValue.hasOwnProperty('value') ? xValue.value : xValue,
                      }),
                      ...(yAxis
                        && yAxis.type !== 'template' && {
                        [`${yAxis.name}${storybookHelpers(customElementTag).getSuffixFromType(yAxis.type)}`]:
                          // As the value could be null or empty, we need to check if the property exists
                          yValue.hasOwnProperty('value') ? yValue.value : yValue,
                      }),
                    })}
                         ${(yAxis.type === 'template'
                      && unsafeStatic((yValue.value || yValue).split('%TEMPLATE%')[1] || ''))
                    || ''
                    }
                         ${(xAxis.type === 'template'
                      && unsafeStatic((xValue.value || xValue).split('%TEMPLATE%')[1] || ''))
                    || ''
                    }
                          ${(constantsTemplate && unsafeStatic(constantsTemplate.split('%TEMPLATE%')[1] || '')) || ''
                    }</td></div>
                        `)}
                    </tr>
                  `;
              firstRow = false;
              return row;
            })}
              </tbody>
            </table>
          `;
      })}`)}
    `;
  };

  return { generateTemplate };
};

export const storybookUtilities = {
  /**
   * This function can be used to optimize the code preview in Storybook.
   * It especially works in combination with the `generateTemplate` function to optimize the final code.
   */
  codeOptimizer: (code: string) => {
    const { body } = new DOMParser().parseFromString(code, 'text/html');
    const templates = body.querySelectorAll('.template');
    let templateInnerHTML = '';
    if (templates.length) {
      templateInnerHTML = Array.from(templates)
        .map(template => template.innerHTML)
        .join('\n');
    } else {
      templateInnerHTML = body.innerHTML;
    }
    templateInnerHTML = templateInnerHTML
      .replace(/<style><\/style>/g, '')
      .replace(/<style>\n<\/style>/g, '')
      .replace(/<script>\s*component = document\.querySelector\('(.+?)'\);\s*<\/script>/g, '');
    // return templateInnerHTML;
    return templateInnerHTML;
  },
};



type Component = keyof typeof docsTokens.components;
type Attribute<T extends Component> = keyof typeof docsTokens.components[T];
type AttributeDescription = {
  description: {
    value: string;
    type: string;
  }
}

/**
 * Returns the story description to the corresponding component and attribute
 * 
 * @param {T} component  - The component name
 * @param {Attribute<T>} attribute - The attribute name
 * @returns {string} The story description
 */
export const generateStoryDescription = <T extends Component>(component: T, attribute: Attribute<T>) => {
 // Exchange all \n with <br/>, because single line breaks with \n are not working in storybook
 const description = (docsTokens?.components?.[component]?.[attribute] as AttributeDescription)?.description?.value ?? 'No Description';
 return description.replace(/\n/g, '<br/>');
}


/**
 * Parameters for the generateScreenshotStory function
 * It accepts either
 */
type screenshotStoryOptions = {
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
  options: number | screenshotStoryOptions = 150,
): StoryObj => {
  const usedOptions = !isNaN(options as number)
    ? ({ heightPx: options } as screenshotStoryOptions)
    : options as screenshotStoryOptions;

  const {
    afterRender = '',
    additionalChromaticOptions = {},
    heightPx = 150,
    styleHeading = {}
  } = usedOptions;
  const additionalStylesHeading = Object.entries(styleHeading).map(([key, value]) => `${key}: ${value};`).join(' ');
  
  return {
    parameters: {
      chromatic: {
        ...storyBookPreviewConfig?.parameters?.chromatic,
        ...additionalChromaticOptions,
        disableSnapshot: false,
      },
      docs: {
        disable: true
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
      `})}
      ${afterRender}
    `,
  };
}
