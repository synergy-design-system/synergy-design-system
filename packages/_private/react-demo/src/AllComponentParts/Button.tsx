export const Button = () => (
  <div
    style={{
      display: 'flex',
      gap: 'var(--syn-spacing-medium)',
    }}
  >
    <syn-button variant="filled">Filled</syn-button>
    <syn-button variant="outline">Outline</syn-button>
    <syn-button variant="text">Text</syn-button>
  </div>
);
