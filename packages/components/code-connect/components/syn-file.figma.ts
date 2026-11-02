// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=21709-47500
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/file/file.component.ts
// component=SynFile
import figma from 'figma';
import type SynFile from '../../src/components/file/file.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  disabled: instance.getBoolean('disabled'),
  droparea: instance.getBoolean('droparea'),
  helpText: instance.getBoolean('help-text') ? instance.getString('\u21B3 content/help-text') : undefined,
  hideValue: !instance.getBoolean('*hide-value'),
  label: instance.getBoolean('label') ? instance.getString('\u21B3 content/label') : undefined,
  size: instance.getEnum('size', {
    large: 'large',
    medium: 'medium',
    small: 'small',
  }) ?? 'medium',
} satisfies ValidProperties<SynFile>;
const {
  disabled, droparea, helpText, hideValue, label, size,
} = props;

export default {
  example: figma.code`
    <syn-file
      ${renderAttribute('disabled', disabled)}
      ${renderAttribute('droparea', droparea)}
      ${renderAttribute('help-text', helpText)}
      ${renderAttribute('hide-value', hideValue)}
      ${renderAttribute('label', label)}
      ${renderAttribute('size', size)}
    >
    </syn-file>
  `,
  id: 'syn-file',
  imports: [
    'import { SynFile } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-file--docs',
    },
  ],
};
