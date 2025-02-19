import * as styles from './MainBreadcrumbItem.css';
import Link from 'next/link';
import { MouseEvent } from 'react';
import InsteadLogoImage from '@web/assets/images/instead.svg';
import { Breadcrumb } from '@repo/ui';
import { ROUTES } from '@web/routes';

type MainBreadcrumbItemProps = {
  href?: string;
  onClick?: () => void;
};

export function MainBreadcrumbItem({
  href = ROUTES.CREATE.ROOT,
  onClick,
}: MainBreadcrumbItemProps) {
  const handleClick = (event: MouseEvent) => {
    if (onClick) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <Breadcrumb.Item>
      <Link
        href={href}
        className={styles.insteadTextWrapperStyle}
        onClick={handleClick}
      >
        <InsteadLogoImage />
      </Link>
    </Breadcrumb.Item>
  );
}
