import outputComponentsAsSvg from '@figma-export/output-components-as-svg'
import transformSvgWithSvgo from '@figma-export/transform-svg-with-svgo'

/** @type { import('@figma-export/types').ComponentsCommandOptions } */
const systemIconConfig = {
  fileId: 'bZFqk9urD3NlghGUKrkKCR',
  ids: [
    '1616-1509', // System Icons
    // '41-4000', // logos
    // '1616-1512', // Icons
  ],
  onlyFromPages: ['Assets'],
  includeTypes: ['COMPONENT', 'VARIANT'],
  transformers: [
    transformSvgWithSvgo({
      plugins: [
            {
              name: 'removeAttrs',
              params: { attrs: 'fill' },
            },
            {
              name: 'addAttributesToSVGElement',
              params: {
                attributes: ["fill='currentColor'"],
              },
            },
          ]
    })
  ],
  outputters: [
    outputComponentsAsSvg({
      getDirname: () => `system-icons`,
      output: './src'
    })
  ]
};

const iconConfig = {
  fileId: 'bZFqk9urD3NlghGUKrkKCR',
  ids: [
    // '1616-1509', // System Icons
    // '41-4000', // logos
    '1616-1512', // Icons
  ],
  onlyFromPages: ['Assets'],
  includeTypes: ['COMPONENT', 'VARIANT'],
  transformers: [
    transformSvgWithSvgo({
      plugins: [
            {
              name: 'removeAttrs',
              params: { attrs: 'fill' },
            },
            {
              name: 'addAttributesToSVGElement',
              params: {
                attributes: ["fill='currentColor'"],
              },
            },
          ]
    })
  ],
  outputters: [
    outputComponentsAsSvg({
      getDirname: () => `icons`,
      output: './src'
    })
  ]
};

const logoConfig = {
  fileId: 'bZFqk9urD3NlghGUKrkKCR',
  ids: [
    // '1616-1509', // System Icons
    '41-4000', // logos
    // '1616-1512', // Icons
  ],
  onlyFromPages: ['Assets'],
  includeTypes: ['COMPONENT', 'VARIANT'],
  transformers: [
    transformSvgWithSvgo({
      plugins: []
    }),
  ],
  outputters: [
    outputComponentsAsSvg({
      getBasename: ({ basename }) => {
        return basename.replace('name=', '') + '.svg';
      },
      getDirname: () => `logos`,
      output: './src'
    })
  ]
};

export default {
  commands: [
    ['components', systemIconConfig],
    ['components', iconConfig],
    ['components', logoConfig],
  ]
}
