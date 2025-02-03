import { Icon } from '@repo/ui';
import * as styles from './MainBreadcrumbItem.css';
import Link from 'next/link';

type MainBreadcrumbItemProps = {
  href?: string;
  onClick?: () => void;
};

export function MainBreadcrumbItem({
  href = '/create',
  onClick,
}: MainBreadcrumbItemProps) {
  const handleClick = (event: React.MouseEvent) => {
    if (onClick) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <Link
      href={href}
      className={styles.insteadTextWrapperStyle}
      onClick={handleClick}
    >
      <Icon name="stack" size={32} color="grey900" />
      <span className={styles.insteadTextStyle}>Instead</span>
    </Link>
  );
}
