import { Text } from '@repo/ui/Text';
import { wrapper, title } from './AccountSidebar.css';
import { AccountItem } from './AccountItem/AccountItem';
import { Agent } from '@web/types';

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
  return (
    <div className={wrapper}>
      <Text className={title} fontSize={18} fontWeight="medium" color="grey600">
        내 계정
      </Text>
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
