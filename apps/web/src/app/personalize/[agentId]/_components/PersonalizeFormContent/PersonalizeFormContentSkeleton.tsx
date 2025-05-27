import { Label, Skeleton, Spacing } from '@repo/ui';
import * as style from './style.css';

export function PersonalizeFormContentSkeleton() {
  return (
    <>
      <div className={style.textFieldWrapperStyle}>
        <Label>활동 분야</Label>
        <Skeleton width="100%" height="5.6rem" radius={4} />
      </div>
      <Spacing size={64} />
      <Spacing size={4} />
      <div className={style.textFieldWrapperStyle}>
        <Label>계정 소개</Label>
        <Skeleton width="100%" height="5.6rem" radius={4} />
      </div>
      <Spacing size={64} />
      <Spacing size={4} />
      <div className={style.utteranceWrapperStyle}>
        <Label>말투</Label>
        <div className={style.radioCardsWrapperStyle}>
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} width="100%" height="8rem" radius={16} />
          ))}
        </div>
      </div>
    </>
  );
}
