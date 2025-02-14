'use client';

import { MainBreadcrumbItem, NavBar } from '@web/components/common';
import { AccountSidebar } from './_components/AccountSidebar/AccountSidebar';
import { useScroll } from '@web/hooks';
import { ROUTES } from '@web/routes';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import { background, dropdownItem, image } from './page.css';
import { Dropdown } from '@repo/ui/Dropdown';
import Image from 'next/image';
import { Icon } from '@repo/ui/Icon';
import { Text } from '@repo/ui/Text';
import { isNil } from '@repo/ui/utils';

export default function Home() {
  const [scrollRef, isScrolled] = useScroll<HTMLDivElement>({
    threshold: 100,
  });

  const profileImageUrl = '';
  return (
    <div className={background} ref={scrollRef}>
      <NavBar
        leftAddon={
          <Breadcrumb>
            <Breadcrumb.Item>
              <MainBreadcrumbItem href={ROUTES.HOME} />
            </Breadcrumb.Item>
          </Breadcrumb>
        }
        rightAddon={
          <Dropdown>
            <Dropdown.Trigger>
              {isNil(profileImageUrl) ? (
                <div className={image} />
              ) : (
                <Image
                  className={image}
                  width={40}
                  height={40}
                  src={profileImageUrl}
                  alt={''}
                />
              )}
            </Dropdown.Trigger>
            <Dropdown.Content align="right">
              <Dropdown.Item value="option1" className={dropdownItem}>
                <Icon name="clock" size="2.4rem" color="grey400" />
                <Text fontSize={18} fontWeight="medium" color="grey1000">
                  수정하기
                </Text>
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        }
        isScrolled={isScrolled}
      />

      <AccountSidebar />
    </div>
  );
}
