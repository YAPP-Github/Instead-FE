'use client';

import { Text } from '@repo/ui/Text';
import { wrapper, titleWrapper } from './AccountSidebar.css';
import { AccountItem } from './AccountItem/AccountItem';
import { Agent } from '@web/types';
import { useGetXLoginQuery } from '@web/store/query/useGetXLogin';
import { useRouter } from 'next/router';
import { IconButton } from '@repo/ui/IconButton';

export type AccountSidebarProps = {
  agentData: Agent[];
  selectedId: number;
  onAccountClick: (id: number) => void;
};

export function AccountSidebar({
  agentData,
  selectedId,
  onAccountClick,
}: AccountSidebarProps) {
  const { data, refetch } = useGetXLoginQuery();
  const router = useRouter();

  const handleClick = async () => {
    await refetch();
    if (data?.data.redirectUrl) {
      // TODO redirect url 변경
      router.push('/');
    }
  };
  return (
    <div className={wrapper}>
      <div className={titleWrapper}>
        <Text fontSize={18} fontWeight="medium" color="grey600">
          내 계정
        </Text>
        <IconButton icon="plus" onClick={handleClick} />
      </div>
      {agentData?.map((data) => (
        <AccountItem
          key={data.accountName}
          profileImageUrl={data.profileImageUrl}
          accountName={data.accountName}
          agentPlan={data.agentPlan}
          isSelected={selectedId === data.id}
          onClick={() => onAccountClick(data.id)}
        />
      ))}
    </div>
  );
}
