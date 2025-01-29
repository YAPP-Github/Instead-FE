import { Breadcrumb, Button, Icon } from '@repo/ui';
import Link from 'next/link';
import * as styles from './Header.css';

export function Header() {
  return (
    <div className={styles.headerStyle}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href="/create">
            <Icon name="stack" size={32} color="grey900" />
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Button
        size="large"
        variant="primary"
        leftAddon={<Icon name="twinkle" />}
      >
        생성하기
      </Button>
    </div>
  );
}
