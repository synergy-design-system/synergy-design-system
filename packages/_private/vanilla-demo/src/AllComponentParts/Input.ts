import { html } from 'lit';

export const Input = () => html`
  <syn-input
    placeholder="Disabled"
    help-text="Help Text"
    label="Label"
  >
    <syn-icon name="house" slot="prefix"></syn-icon>
    <syn-icon name="chat" slot="suffix"></syn-icon>
  </syn-input>

  <!-- #417: Numeric Strategy -->
  <syn-input
    data-testid="input-417-numeric-no-value"
    label="Numeric Strategy (no value provided)"
    max="100"
    min="0"
    placeholder="Enter a numeric value between 0 and 100"
    type="number"
    value="50"
  ></syn-input>

  <syn-input
    data-testid="input-417-numeric-native"
    label="Numeric Strategy (native)"
    numeric-strategy="native"
    max="100"
    min="0"
    placeholder="Enter a numeric value between 0 and 100"
    type="number"
    value="50"
  ></syn-input>

  <syn-input
    data-testid="input-417-numeric-modern"
    label="Numeric Strategy (modern)"
    numeric-strategy="modern"
    max="100"
    min="0"
    placeholder="Enter a numeric value between 0 and 100"
    type="number"
    value="50"
  ></syn-input>
  <!-- /#417 -->

  <!-- #838: Numeric Strategy (min-fraction-digits) -->
  <syn-input
    data-testid="input-838-numeric-native-min-fraction-digits"
    label="Numeric Strategy (native, using min-fraction-digits)"
    numeric-strategy="native"
    max="100"
    min="0"
    min-fraction-digits="4"
    placeholder="Enter a numeric value between 0 and 100"
    type="number"
    value="50"
  ></syn-input>

  <syn-input
    data-testid="input-838-numeric-modern-min-fraction-digits"
    label="Numeric Strategy (modern, using min-fraction-digits)"
    numeric-strategy="modern"
    max="100"
    min="0"
    min-fraction-digits="4"
    placeholder="Enter a numeric value between 0 and 100"
    type="number"
    value="50"
  ></syn-input>
  <!-- /#838 -->
`;
