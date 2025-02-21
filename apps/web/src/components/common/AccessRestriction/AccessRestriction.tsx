'use client';

import { ReactNode, useEffect, useState } from 'react';
import { isNotNil } from '@repo/ui/utils';
import { image, nav, wrapper } from './AccessRestriction.css';
import { Text } from '@repo/ui/Text';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import { MainBreadcrumbItem } from '../MainBreadcrumbItem/MainBreadcrumbItem';
import AccessRestrictionImage from '@web/assets/images/accessRestriction.png';
import Image from 'next/image';
import { Spacing } from '@repo/ui';

type AccessRestrictionProps = {
  children: ReactNode;
};

export function AccessRestriction({ children }: AccessRestrictionProps) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 759px)');
    setIsDesktop(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (isNotNil(isDesktop) && !isDesktop) {
    return (
      <div className={wrapper}>
        <nav className={nav}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <MainBreadcrumbItem />
            </Breadcrumb.Item>
          </Breadcrumb>
        </nav>
        <Text.H1 fontWeight="bold" fontSize={30} color="grey700">
          더 큰 화면에서
          <br />
          사용할 수 있어요
        </Text.H1>
        <Spacing size={12} />
        <Text fontWeight="medium" fontSize={16} color="grey500">
          PC로 접속해주세요
        </Text>
        <Image
          className={image}
          src={AccessRestrictionImage}
          alt="access restriction image"
        />
      </div>
    );
  }

  return children;
}
