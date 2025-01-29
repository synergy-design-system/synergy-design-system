import { html } from 'lit';

export const Dialog = () => html`
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
