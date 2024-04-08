import React, { FC, ReactNode } from 'react';
import { DocsContainer, DocsContainerProps } from '@storybook/blocks';

type DisableFocusTrapProps = DocsContainerProps & {
  children: ReactNode;
  value?: string;
};

/**
 * Custom DocsContainer that disables focus trapping for all syn-side-nav and syn-drawer elements.
 */
export const DisableFocusTrap: FC<DisableFocusTrapProps> = ({ children, ...props }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    // Needed otherwise the side-nav / drawer can`t be found
    setTimeout(() => {
      // Disable focus trapping for all syn-side-nav`s
      const sideNavs = Array.from(ref.current!.querySelectorAll('syn-side-nav'));
      sideNavs.forEach((sideNav) => {
        const drawer = sideNav.shadowRoot!.querySelector('syn-drawer')!;
        drawer.modal.activateExternal();
      });

      // Disable focus trapping for all syn-drawer`s
      const drawers = Array.from(ref.current!.querySelectorAll('syn-drawer'));
      drawers.forEach((drawer) => {
        drawer.modal.activateExternal();
      });
    });
  }, []);

  return <div ref={ref} style={{ display: 'contents' }}>
    <DocsContainer {...props}>
      {children}
    </DocsContainer>
  </div>;
};
