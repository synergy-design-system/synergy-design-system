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

    <>
      <syn-input
        data-testid="input-838-numeric-native-min-fraction-digits"
        label="Numeric Strategy (native, using min-fraction-digits)"
        numericStrategy="native"
        max={100}
        min={0}
        minFractionDigits={4}
        placeholder="Enter a numeric value between 0 and 100"
        type="number"
        valueAsNumber={50}
      />
      <syn-input
        data-testid="input-838-numeric-modern-min-fraction-digits"
        label="Numeric Strategy (modern, using min-fraction-digits)"
        numericStrategy="modern"
        max={100}
        min={0}
        minFractionDigits={4}
        placeholder="Enter a numeric value between 0 and 100"
        type="number"
        valueAsNumber={50}
      />
    </>

    <syn-input
      data-testid="input-872-spin-buttons"
      label="Issue #872 - Spin Buttons out of sync with value"
      max={100}
      min={0}
      type="number"
      value="50"
    />
  </>
);
