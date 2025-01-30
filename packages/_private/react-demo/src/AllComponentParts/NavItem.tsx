export const NavItem = () => (
  <nav
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      width: 320,
    }}
  >
    <syn-nav-item current>Indentation: none</syn-nav-item>
    <syn-nav-item current style={{ '--indentation': '1' }}>
      Indentation: 1
    </syn-nav-item>
    <syn-nav-item current style={{ '--indentation': '2' }}>
      Indentation: 2
    </syn-nav-item>
  </nav>
);
