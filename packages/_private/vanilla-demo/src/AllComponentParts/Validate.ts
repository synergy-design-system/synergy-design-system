import { html } from 'lit';
import { RegressionFns } from '../all-components-regressions';

export const Validate = (regressions: RegressionFns = []) => {
  regressions.forEach((regression) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    regression();
  });

  return html`
    <syn-validate eager variant="inline" on="live">
      <syn-input
        label="Invalid input"
        type="email"
        value=""
        required
      ></syn-input>
    </syn-validate>

    <syn-validate data-testid="validate-915" on="revalidate" variant="inline">
      <syn-input label="Incorrect state with custom event #915"></syn-input>
    </syn-validate>
  `;
};
