import { type SynDialog } from '@synergy-design-system/components';

export const Dialog = () => (
  <syn-dialog
    open
    label="Dialog"
    onsyn-after-hide={(e) => {
      const target = e.target as SynDialog;
      window.setTimeout(async () => {
        await target.show();
      }, 2000);
    }}
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <syn-button variant="filled" slot="footer">
      Close
    </syn-button>
  </syn-dialog>
);
