// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=2856-3618
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/icon-button/icon-button.component.ts
// component=SynIconButton
import figma from 'figma';

const instance = figma.selectedInstance;
const props = {
  color: instance.getEnum('color', {
    disabled: 'currentColor',
    neutral: 'currentColor',
    primary: 'primary',
  }) ?? 'currentColor',
};
const { color } = props;

export default {
  example: figma.code`${color}`,
  id: 'syn-icon-button-helper-1',
};
