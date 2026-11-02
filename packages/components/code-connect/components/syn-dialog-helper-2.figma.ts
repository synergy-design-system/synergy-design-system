// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=17938-28315
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/dialog/dialog.component.ts
// component=SynDialog
import figma from 'figma';

const instance = figma.selectedInstance;
const props = {
  filledButton: instance.getBoolean('filled button') ? figma.code`<syn-button variant="filled" slot="footer">Save</syn-button>` : undefined,
  textButton: instance.getBoolean('text button') ? figma.code`<syn-button variant="text" slot="footer">Cancel</syn-button>` : undefined,
};
const { filledButton, textButton } = props;

export default {
  example: figma.code`
    ${filledButton}
    ${textButton}
  `,
  id: 'syn-dialog-helper-2',
};
