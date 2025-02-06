import * as styles from './MainBreadcrumbItem.css';
import Link from 'next/link';
import { MouseEvent } from 'react';
import Image from 'next/image';
import InsteadLogoImage from '@web/assets/images/instead.webp';
import { Breadcrumb } from '@repo/ui';

type MainBreadcrumbItemProps = {
  href?: string;
  onClick?: () => void;
};

export function MainBreadcrumbItem({
  href = '/create',
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
        <Image
          src={InsteadLogoImage}
          alt="Instead 로고"
          width={120}
          height={38}
        />
      </Link>
    </Breadcrumb.Item>
  );
}
