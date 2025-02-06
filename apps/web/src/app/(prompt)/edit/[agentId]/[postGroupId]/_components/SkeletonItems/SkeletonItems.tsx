import { DndController } from '@web/components/common';

type SkeletonItemsProps = {
  length: number;
};

export function SkeletonItems({ length }: SkeletonItemsProps) {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <DndController.Item
          key={`skeleton-${index}`}
          id={index}
          summary=""
          updatedAt=""
          isLoading={true}
        />
      ))}
    </>
  );
}
