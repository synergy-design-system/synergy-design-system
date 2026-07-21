export const Dialog = () => (
  <syn-dialog
    open
    label="Dialog"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <syn-button
      variant="filled"
      slot="footer"
      onClick={e => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        (e.target as HTMLElement).closest('syn-dialog')?.hide();
      }}
    >
      Close
    </syn-button>
  </syn-dialog>
);
