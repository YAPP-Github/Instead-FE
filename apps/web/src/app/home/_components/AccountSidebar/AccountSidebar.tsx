import { Text } from '@repo/ui/Text';
import { wrapper, title } from './AccountSidebar.css';
import { AccountItem } from '../AccountItem/AccountItem';
import { Agent } from '@web/types';

export function AccountSidebar({ agentData }: { agentData: Agent[] }) {
  console.log({ agentData });
  return (
    <div className={wrapper}>
      <Text className={title} fontSize={18} fontWeight="medium" color="grey600">
        내 계정
      </Text>
      {agentData?.map((data) => (
        <AccountItem
          key={data.accountId}
          accountId={data.accountId}
          agentPlan={data.agentPlan}
        />
      ))}
    </div>
  );
}
