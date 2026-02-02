import { html } from 'lit';

const sizes = ['small', 'medium', 'large'] as const;
const variants = ['outline', 'filled'] as const;

export const ButtonGroup = () => html`
  <div style="display: flex; flex-direction: column; gap: var(--syn-spacing-medium);">
    <syn-button-group label="Button Group - Default">
      <syn-button>Left</syn-button>
      <syn-button>Center (This Group will size adjust!)</syn-button>
      <syn-button>Right</syn-button>
    </syn-button-group>

    ${sizes.map(size => variants.map(variant => html`
      <syn-button-group
        size="${size}"
        variant="${variant}"
        label="Button Group - Size: ${size}, Variant: ${variant}"
      >
        <syn-button>Left</syn-button>
        <syn-button>Center</syn-button>
        <syn-button>Right</syn-button>
      </syn-button-group>
    `))}
  </div>
`;
