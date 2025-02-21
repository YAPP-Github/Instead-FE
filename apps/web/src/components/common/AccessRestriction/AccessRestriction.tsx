'use client';

import { ReactNode, useEffect, useState } from 'react';
import { isNotNil } from '@repo/ui/utils';
import { image, logoOverride, nav, wrapper } from './AccessRestriction.css';
import { Text } from '@repo/ui/Text';
import AccessRestrictionImage from '@web/assets/images/accessRestriction.png';
import Image from 'next/image';
import { Spacing } from '@repo/ui';
import InsteadLogoImage from '@web/assets/images/instead.svg';

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
          <div style={{ width: '8.8rem' /* 원하는 너비 */, display: 'flex' }}>
            <InsteadLogoImage className={logoOverride} />
          </div>
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
