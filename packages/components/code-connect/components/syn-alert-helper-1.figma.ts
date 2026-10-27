// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=16231-21245&t=uiGCtkXQsyEo930h-4
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/alert/alert.component.ts
// component=SynAlert
import figma from 'figma';

const instance = figma.selectedInstance;
const props = {
  variant: instance.getEnum('variant', {
    critical: 'critical',
    danger: 'danger',
    error: 'error',
    neutral: 'neutral',
    primary: 'primary',
    success: 'success',
    warning: 'warning',
  }) ?? 'primary',
};
const { variant } = props;

export default {
  example: figma.code`${variant}`,
  id: 'syn-alert-helper-1',
  imports: [],
  links: [],
};
