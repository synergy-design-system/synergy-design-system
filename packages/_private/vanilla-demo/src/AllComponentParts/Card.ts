import { html } from 'lit';

export const Card = () => html`
  <syn-card style="max-width: 400px;">
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
      slot="image"
      src="/card-example.jpg"
      alt="Multiple persons having lunch in SICK Academy"
    />
  </syn-card>
`;
