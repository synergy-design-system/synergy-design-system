export const Input = () => (
  <>
    <syn-input
      placeholder="Disabled"
      help-text="Help Text"
      label="Label"
    >
      <syn-icon name="house" slot="prefix" />
      <syn-icon name="chat" slot="suffix" />
    </syn-input>

    <>
      <syn-input
        data-testid="input-417-numeric-no-value"
        label="Numeric Strategy (no value provided)"
        max={100}
        min={0}
        placeholder="Enter a numeric value between 0 and 100"
        type="number"
        valueAsNumber={50}
      />

      <syn-input
        data-testid="input-417-numeric-native"
        label="Numeric Strategy (native)"
        numericStrategy="native"
        max={100}
        min={0}
        placeholder="Enter a numeric value between 0 and 100"
        type="number"
        valueAsNumber={50}
      />

      <syn-input
        data-testid="input-417-numeric-modern"
        label="Numeric Strategy (modern)"
        numericStrategy="modern"
        max={100}
        min={0}
        placeholder="Enter a numeric value between 0 and 100"
        type="number"
        valueAsNumber={50}
      />
    </>
  </>
);
