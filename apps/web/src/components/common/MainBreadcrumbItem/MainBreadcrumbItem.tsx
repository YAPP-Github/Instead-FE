import { Icon } from '@repo/ui';
import * as styles from './MainBreadcrumbItem.css';
import Link from 'next/link';

type MainBreadcrumbItemProps = {
  href?: string;
};

export function MainBreadcrumbItem({
  href = '/create',
}: MainBreadcrumbItemProps) {
  return (
    <Link href={href} className={styles.insteadTextWrapperStyle}>
      <Icon name="stack" size={32} color="grey900" />
      <span className={styles.insteadTextStyle}>Instead</span>
    </Link>
  );
}
