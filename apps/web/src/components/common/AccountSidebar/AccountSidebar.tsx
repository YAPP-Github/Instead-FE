'use client';

import { Text } from '@repo/ui/Text';
import * as style from './AccountSidebar.css';
import { AccountItem } from './AccountItem/AccountItem';
import { Agent } from '@web/types';
import { useGetXLoginQuery } from '@web/store/query/useGetXLogin';
import { IconButton } from '@repo/ui/IconButton';
import { isNotNil } from '@repo/ui/utils';
import { useGetAgentQuery } from '@web/store/query/useGetAgentQuery';
import { Suspense } from 'react';
import { AccountSidebarSkeleton } from './AccountSidebarSkeleton';

type AccountSidebarProps = {
  selectedId?: Agent['id'];
  onAccountClick: (id: Agent['id']) => void;
};

export function AccountSidebar({
  selectedId,
  onAccountClick,
}: AccountSidebarProps) {
  const { refetch: refetchXLogin } = useGetXLoginQuery();

  const handleClick = async () => {
    const result = await refetchXLogin();
    if (result.data?.data.redirectUrl) {
      window.location.href = result.data.data.redirectUrl;
    }
  };

  return (
    <div className={style.wrapperStyle}>
      <div className={style.titleWrapperStyle}>
        <Text fontSize={18} fontWeight="medium" color="grey600">
          내 계정
        </Text>
        <IconButton icon="plus" onClick={handleClick} />
      </div>
      <Suspense fallback={<AccountSidebarSkeleton />}>
        <AccountSidebarContent
          selectedId={selectedId}
          onAccountClick={onAccountClick}
        />
      </Suspense>
    </div>
  );
}

function AccountSidebarContent({
  selectedId,
  onAccountClick,
}: AccountSidebarProps) {
  const { data: agentData } = useGetAgentQuery();

  return agentData.agents.length > 0 ? (
    agentData.agents.map((data) => (
      <AccountItem
        key={data.accountName}
        profileImageUrl={data.profileImageUrl}
        accountName={data.accountName}
        agentPlatform={data.platform}
        agentPlan={data.agentPlan}
        isSelected={
          isNotNil(selectedId) ? Number(selectedId) === data.id : false
        }
        onClick={() => onAccountClick(data.id)}
      />
    ))
  ) : (
    <AccountItem accountName="SNS계정을 연동해 보세요" />
  );
}
