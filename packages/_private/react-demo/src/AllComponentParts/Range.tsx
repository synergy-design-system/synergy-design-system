export const Range = () => (
  <syn-range
    help-text="Controls the volume of the current song"
    label="Volume"
    max={100}
    min={0}
    value="50"
  >
    <span slot="prefix">0</span>
    <span slot="suffix">100</span>
  </syn-range>
);
