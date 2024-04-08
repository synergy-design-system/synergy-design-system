import { type ComponentProps, type FC } from 'react';
import { SynNavItem } from '@synergy-design-system/react';
import type { SynNavItem as SynNavItemType } from '@synergy-design-system/components';
import {
  useHref,
  useLinkClickHandler,
} from 'react-router-dom';

type RouterLinkProps = ComponentProps<typeof SynNavItem>;

/**
 * This component wraps the SynNavItem component
 * to make it available transparently in react-router.
 */
export const RouterLink: FC<RouterLinkProps> = ({
  href,
  children,
  ...props
}) => {
  const usedHref = useHref(href as string);
  const clickHandler = useLinkClickHandler<SynNavItemType>(href as string);

  return (
    <SynNavItem
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      href={usedHref}
      onClick={clickHandler}
    >
      {children}
    </SynNavItem>
  );
};
