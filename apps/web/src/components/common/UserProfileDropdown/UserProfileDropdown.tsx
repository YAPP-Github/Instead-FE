// components/common/UserProfileDropdown/UserProfileDropdown.tsx
'use client';

import { Dropdown, Icon, Skeleton, Text } from '@repo/ui';
import Image from 'next/image';
import { useGetUserQuery } from '@web/store/query/useGetUserQuery';
import { useLogoutMutation } from '@web/store/mutation/useLogoutMutation';
import { useModal } from '@repo/ui/hooks';
import { isNil } from '@repo/ui/utils';
import { Suspense } from 'react';
import * as style from './UserProfileDropdown.css';

export function UserProfileDropdown() {
  return (
    <Suspense fallback={<UserProfileDropdownSkeleton />}>
      <UserProfileDropdownContent />
    </Suspense>
  );
}

function UserProfileDropdownContent() {
  const { data: user } = useGetUserQuery();
  const { mutate: logout } = useLogoutMutation();
  const modal = useModal();

  const handleLogoutClick = () => {
    modal.confirm({
      title: '정말 로그아웃 하시겠어요??',
      icon: <Icon name="notice" color="warning500" />,
      confirmButton: '로그아웃',
      cancelButton: '취소',
      confirmButtonProps: {
        onClick: () => {
          logout();
        },
      },
    });
  };

  return (
    <Dropdown>
      <Dropdown.Trigger>
        {isNil(user.data.profileImage) ? (
          <div className={style.imageStyle} />
        ) : (
          <Image
            className={style.imageStyle}
            width={40}
            height={40}
            src={user.data.profileImage}
            alt="프로필"
          />
        )}
      </Dropdown.Trigger>
      <Dropdown.Content align="right">
        <Dropdown.Item
          onClick={handleLogoutClick}
          value="option1"
          className={style.dropdownItemStyle}
        >
          <Icon name="logout" size="2.4rem" color="grey400" />
          <Text.P fontSize={18} fontWeight="medium" color="grey1000">
            로그아웃
          </Text.P>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}

function UserProfileDropdownSkeleton() {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Skeleton width="4rem" height="4rem" radius={4} />
      </Dropdown.Trigger>
      <Dropdown.Content align="right">
        <Dropdown.Item value="option1" className={style.dropdownItemStyle}>
          <Skeleton width="8rem" height="2rem" radius={4} />
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}
