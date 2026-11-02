// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=3173-8459
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/icon-button/icon-button.component.ts
// component=SynIconButton
import figma from 'figma';
import type SynIconButton from '../../src/components/icon-button/icon-button.js';
import type { ValidProperties } from '../core/types.js';
import { readNestedProps, renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  color: readNestedProps(instance, 'color', nestedInstance => ({
    color: nestedInstance.getEnum('color', {
      disabled: 'currentColor',
      neutral: 'currentColor',
      primary: 'primary',
    }) ?? 'currentColor',
  })),
  disabled: instance.getBoolean('disabled'),
  name: 'wallpaper',
  size: instance.getEnum('size', {
    large: 'large',
    medium: 'medium',
    small: 'small',
  }) ?? 'inherit',
} satisfies ValidProperties<SynIconButton>;
const {
  color, disabled, size, name,
} = props;

export default {
  example: figma.code`
    <syn-icon-button
      ${renderAttribute('color', color.color)}
      ${renderAttribute('disabled', disabled)}
      ${renderAttribute('name', name)}
      ${renderAttribute('size', size)}
    >
    </syn-icon-button>
  `,
  id: 'syn-icon-button',
  imports: [
    'import { SynIconButton } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-icon-button--docs',
    },
  ],
};
