import { ContentItem } from '../ContentItem/ContentItem';
import * as style from './SkeletonContentItem.css';

type SkeletonContentItemProps = {
  length: number;
};

export function SkeletonContentItem({ length }: SkeletonContentItemProps) {
  return (
    <div className={style.skeletonWrapperStyle}>
      {Array.from({ length: length }).map((_, index) => (
        <div key={`skeleton-${index}`} className={style.skeletonItemStyle}>
          <ContentItem
            summary=""
            updatedAt=""
            onRemove={() => {}}
            onModify={() => {}}
            onClick={() => {}}
            isLoading={true}
          />
        </div>
      ))}
    </div>
  );
}
