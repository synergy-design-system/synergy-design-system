// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=24705-3468291&m=dev
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/styles/src/link/index.css
// component=SynLink
import figma from 'figma';

const instance = figma.selectedInstance;
const props = {
  quiet: instance.getBoolean('quiet') ? 'syn-link--quiet' : undefined,
};
const { quiet } = props;

export default {
  example: figma.code`${quiet}`,
  id: 'syn-link-helper-1',
};
