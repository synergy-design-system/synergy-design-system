export const Card = () => (
  <syn-card
    style={{
      maxWidth: 400,
    }}
  >
    <h3>Headline</h3>
    This are some happy employees, but not just any employees. These are SICK
    employees.

    <footer slot="footer">
      <small>Optional information</small>
      <nav>
        <syn-button variant="filled" size="small">More Info</syn-button>
      </nav>
    </footer>
    <img
      src="/card-example.jpg"
      slot="image"
      alt="Multiple persons having lunch in SICK Academy"
    />
  </syn-card>
);
