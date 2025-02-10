export const Validate = () => (
  <syn-validate eager variant="inline" on="live">
    <syn-input
      label="Invalid input"
      type="email"
      value=""
      required
    />
  </syn-validate>
);
