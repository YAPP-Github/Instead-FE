import { FixedBottomCTA, Icon } from '@repo/ui';

export function SumbitBottomCTASkeleton() {
  return (
    <FixedBottomCTA
      leftAddon={<Icon name="checkCalendar" size={20} />}
      isLoading
    >
      예약하러 가기
    </FixedBottomCTA>
  );
}
