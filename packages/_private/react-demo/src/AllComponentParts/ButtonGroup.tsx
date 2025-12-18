export const ButtonGroup = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--syn-spacing-medium)',
    }}
  >
    <syn-button-group label="Button Group - Default">
      <syn-button>Left</syn-button>
      <syn-button>Center (This Group will size adjust!)</syn-button>
      <syn-button>Right</syn-button>
    </syn-button-group>

    {
      (['small', 'medium', 'large'] as const).map(size => (
        (['outline', 'filled'] as const).map(variant => (
          <syn-button-group
            label={`Button Group - Size: ${size}, Variant: ${variant}`}
            size={size}
            variant={variant}
            key={`${size}-${variant}`}
          >
            <syn-button>Left</syn-button>
            <syn-button>Center</syn-button>
            <syn-button>Right</syn-button>
          </syn-button-group>
        ))
      ))
    }
  </div>
);
