import { Skeleton, Text } from '@repo/ui';
import * as style from './ContentGroupCard.css';
import { Spacing } from '@repo/ui';

export function ContentGroupCardSkeleton() {
  return (
    <div className={style.card}>
      <div className={style.leftText}>
        <Text fontSize={22} fontWeight="semibold" color="grey800">
          생성된 주제
        </Text>
        <Skeleton width="2.8rem" height="2.2rem" radius={4} />
      </div>
      <div className={style.items}>
        {Array.from({ length: 9 }, (_, index) => (
          <div key={index} className={style.contentGroupItem}>
            <Skeleton width="39.2rem" height="22.4rem" radius={4} />
            <div className={style.content}>
              <div className={style.contentGroupText}>
                <Skeleton width="6rem" height="1.8rem" radius={4} />
                <Spacing size={8} />
                <Skeleton width="24rem" height="2.2rem" radius={4} />
                <Spacing size={8} />
                <Skeleton width="12rem" height="1.6rem" radius={4} />
              </div>
              <div className={style.dropdownWrapper}>
                <Skeleton width="2.4rem" height="2.4rem" radius={4} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
