/* eslint-disable no-script-url */
export const PrioNav = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--syn-spacing-2x-large)',
    }}
  >
    <syn-prio-nav style={{ width: '220px' }}>
      <syn-nav-item current horizontal>Domains</syn-nav-item>
      <syn-nav-item horizontal>Projects</syn-nav-item>
      <syn-nav-item horizontal href="javascript:void(0)">Trainings</syn-nav-item>
    </syn-prio-nav>
  </div>
);
