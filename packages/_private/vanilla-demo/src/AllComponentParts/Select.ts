import { html } from 'lit';

export const Select = (regressions: Array<() => void> = []) => {
  regressions.forEach((regression) => {
    regression();
  });

  return html`
    <syn-select
      data-testid="select-level-813"
      help-text="Please tell us your skill level."
      label="Experience"
      .value=${'2'}
    ></syn-select>

    <form>
      <syn-select data-testid="select-form-813" .value=${'option-1'}>
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-select>
      <syn-button type="reset">Reset</syn-button>
    </form>

    <div>
      <syn-select
        data-testid="select-805-single-select"
        help-text="Please tell us your skill level."
        label="Mixed integer and string values (Single Select)"
        .value=${Number(1)}
      ></syn-select>

      <syn-select
        data-testid="select-805-multi-select"
        help-text="Please tell us your skill level."
        label="Mixed integer and string values (multi Select)"
        multiple
        .value=${[1, 'three']}
      ></syn-select>
    </div>

    <syn-select
      data-testid="select-540-delimiter"
      delimiter="|"
      help-text="This select uses a custom delimiter"
      label="Multiple with custom delimiter"
      multiple
      value="1|2"
    ></syn-select>

    <syn-select
      data-testid="select-847-multiple"
      help-text="Normal value binding and async options"
      label="Multiple with async options"
      multiple
      value="1 2"
    ></syn-select>
  `;
};
