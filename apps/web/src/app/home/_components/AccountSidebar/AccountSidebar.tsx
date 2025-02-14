import { Spacing } from '@repo/ui/Spacing';
import { Text } from '@repo/ui/Text';
import { wrapper, title } from './AccountSidebar.css';
import { AccountItem } from '../AccountItem/AccountItem';

export function AccountSidebar() {
  return (
    <div className={wrapper}>
      <Text className={title} fontSize={18} fontWeight="medium" color="grey600">
        내 계정
      </Text>
      <AccountItem accountId={'marineserre_official'} agentPlan="PREMIUM" />
      <AccountItem
        accountId={'marineserre_official'}
        profileImageUrl={''}
        agentPlan="BASIC"
        isSelected
      />
    </div>
  );
}
