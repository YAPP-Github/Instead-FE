'use client';
import { Text } from '@repo/ui/Text';
import { wrapper, titleWrapper } from './AccountSidebar.css';
import { AccountItem } from '../AccountItem/AccountItem';
import { IconButton } from '@repo/ui/IconButton';
import { useGetXLoginQuery } from '@web/store/query/useGetXLogin';
import { useRouter } from 'next/navigation';

export function AccountSidebar() {
  const { data, refetch } = useGetXLoginQuery();
  const router = useRouter();

  const handleClick = async () => {
    await refetch();
    if (data?.data.redirectUrl) {
      router.push(data?.data.redirectUrl);
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
