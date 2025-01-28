import { html } from 'lit';
import { type SynDialog } from '@synergy-design-system/components';

const autoShow = (e: Event) => {
  const target = e.target as SynDialog;
  window.setTimeout(() => {
    target.show().then(() => {
    }).catch(() => {});
  }, 2000);
};

export const Dialog = () => html`
  <syn-dialog
    open
    label="Dialog"
    @syn-after-hide=${autoShow}
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <syn-button variant="filled" slot="footer">
      Close
    </syn-button>
  </syn-dialog>
`;
