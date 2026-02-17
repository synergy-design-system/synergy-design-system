import { html } from 'lit';
import type { RegressionFns } from '../all-components-regressions';

export const Combobox = (regressions: RegressionFns = []) => {
  regressions.forEach((regression) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    regression();
  });

  return html`
    <syn-combobox data-testid="combobox-797" value="option-2">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-combobox>

    <syn-combobox data-testid="combobox-level-813" label="Experience" help-text="Please tell us your skill level." .value=${'2'}>
    </syn-combobox>

    <form>
      <syn-combobox data-testid="combobox-form-813" .value=${'option-1'}>
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-combobox>
      <syn-button type="reset">Reset</syn-button>
    </form>

    <syn-combobox
      data-testid="combobox-632"
      label="Keyboard Interaction test #632"
    >
      <syn-option value="option-1">Lorem</syn-option>
      <syn-option value="option-2">ipsum</syn-option>
      <syn-option value="option-3">dolor</syn-option>
    </syn-combobox>

    <syn-combobox
      data-testid="combobox-626"
      label="'Restricted' feature #626"
      restricted
    >
      <syn-option value="option-1">Lorem</syn-option>
      <syn-option value="option-2">ipsum</syn-option>
      <syn-option value="option-3">dolor</syn-option>
    </syn-combobox>

    <syn-combobox
      data-testid="combobox-626-async"
      label="'Restricted' feature #626 async"
      restricted
      value="3"
    ></syn-combobox>

    <syn-combobox
      data-testid="combobox-847-multiple"
      help-text="Normal value binding and async options"
      label="Multiple with async options"
      multiple
      value="1 2"
    ></syn-combobox>

    <syn-combobox
      data-testid="combobox-1036-subsequently-changed-delimiter"
      label="Subsequently changed delimiter"
    ></syn-combobox>

    <syn-combobox
      data-testid="combobox-1056-async-delimiter-change-with-pre-value"
      value="Option 2"
      label="Async changed delimiter with pre value"
      restricted
    ></syn-combobox>

    <syn-combobox
      data-testid="combobox-1056-async-delimiter-change-with-async-pre-value"
      label="Async changed delimiter with async pre value"
      restricted
    ></syn-combobox>

    <syn-combobox
      data-testid="combobox-627-delimiter"
      delimiter="+"
      help-text="This combobox uses a custom delimiter"
      label="Multiple with custom delimiter"
      multiple
      value="1+2"
    ></syn-combobox>

    <syn-combobox
      data-testid="combobox-805-single"
      help-text="Please tell us your skill level."
      label="Mixed integer and string values (Single Combobox)"
      .value=${Number(1)}
    ></syn-combobox>

    <syn-combobox
      data-testid="combobox-805-multi"
      help-text="Please tell us your skill level."
      label="Mixed integer and string values (multi Combobox)"
      multiple
      .value=${[1, 'three']}
    ></syn-combobox>

    <syn-combobox
      data-testid="combobox-885-value-zero-string"
      label="Combobox should allow to select value of string(zero)"
      value="0"
    >
      <syn-option value="0">Zero (string)</syn-option>
    </syn-combobox>

    <syn-combobox
      data-testid="combobox-885-value-zero-number"
      label="Combobox should allow to select value of number(zero)"
      .value=${0}
    >
      <syn-option .value=${0}>Zero (numeric)</syn-option>
    </syn-combobox>
  `;
};
