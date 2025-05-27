import { Icon, Skeleton, Text } from '@repo/ui';
import * as style from './PersonalCard.css';

export function PersonalCardSkeleton() {
  return (
    <div className={style.card}>
      <div className={style.cardText}>
        <div className={style.leftText}>
          <Text fontSize={22} fontWeight="semibold" color="grey800">
            개인화 설정
          </Text>
          <div className={style.chipArea}>
            <Skeleton width="8rem" height="3.2rem" radius={16} />
            <Skeleton width="8rem" height="3.2rem" radius={16} />
          </div>
        </div>
        <Icon
          className={style.cursorPointer}
          name="pencil"
          size="2.4rem"
          color="grey300"
        />
      </div>
      <Skeleton width="100%" height="3rem" radius={4} />
    </div>
  );
}
