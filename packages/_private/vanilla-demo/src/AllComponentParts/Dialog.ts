import { html } from 'lit';
import type { RegressionFns } from '../all-components-regressions';

export const Dialog = (regressions: RegressionFns = []) => {
  regressions.forEach((regression) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    regression();
  });

  return html`
    <syn-dialog
      ?open=${false}
      label="Dialog"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <syn-button variant="filled" slot="footer">
        Close
      </syn-button>
    </syn-dialog>
  `;
};
