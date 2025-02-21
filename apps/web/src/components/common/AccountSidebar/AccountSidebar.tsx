'use client';

import { Text } from '@repo/ui/Text';
import { wrapper, titleWrapper } from './AccountSidebar.css';
import { AccountItem } from './AccountItem/AccountItem';
import { Agent } from '@web/types';
import { useGetXLoginQuery } from '@web/store/query/useGetXLogin';
import { IconButton } from '@repo/ui/IconButton';
import { isNotNil } from '@repo/ui/utils';

export type AccountSidebarProps = {
  agentData: Agent[];
  selectedId?: Agent['id'];
  onAccountClick: (id: Agent['id']) => void;
};

/**
 * TODO: position fixed 적용 필요
 */
export function AccountSidebar({
  agentData,
  selectedId,
  onAccountClick,
}: AccountSidebarProps) {
  const { refetch } = useGetXLoginQuery();

  const handleClick = async () => {
    const result = await refetch();
    if (result.data?.data.redirectUrl) {
      window.location.href = result.data.data.redirectUrl;
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
      {agentData.length > 0 ? (
        agentData.map((data) => (
          <AccountItem
            key={data.accountName}
            profileImageUrl={data.profileImageUrl}
            accountName={data.accountName}
            agentPlan={data.agentPlan}
            isSelected={
              isNotNil(selectedId) ? Number(selectedId) === data.id : false
            }
            onClick={() => onAccountClick(data.id)}
          />
        ))
      ) : (
        <AccountItem
          accountName="SNS계정을 연동해 보세요"
          agentPlan="아직 연동되지 않았어요"
        />
      )}
    </div>
  );
}
