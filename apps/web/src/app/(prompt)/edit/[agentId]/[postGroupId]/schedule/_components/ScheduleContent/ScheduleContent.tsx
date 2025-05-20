'use client';

import { useGetAllPostsQuery } from '@web/store/query/useGetAllPostsQuery';
import { ScheduleTable } from '@web/components/schedule/ScheduleTable/ScheduleTable';
import { DndController } from '@web/components/common';
import { POST_STATUS } from '@web/types';
import { TitleWithDescription } from '@web/components/common/TitleWithDescription/TitleWithDescription';
import * as style from './style.css';
import { ContentItem } from '../../../_components/ContentItem/ContentItem';
import { IdParams } from '@web/types';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { getCurrentDateKo } from '@web/utils';
import { ScheduleFormValues } from '../../../types';

type ScheduleContentProps = Omit<IdParams, 'postId'>;

export function ScheduleContent({
  agentId,
  postGroupId,
}: ScheduleContentProps) {
  const { data: posts } = useGetAllPostsQuery({
    agentId: Number(agentId),
    postGroupId: Number(postGroupId),
  });
  const readyToUploadPosts = posts.data.posts.READY_TO_UPLOAD;
  const { setValue } = useFormContext<ScheduleFormValues>();

  useEffect(() => {
    const currentDate = getCurrentDateKo() ?? '';

    setValue(
      'schedules',
      readyToUploadPosts.map((post) => ({
        postId: post.id,
        date: currentDate,
        hour: '12',
        minute: '00',
        amPm: '오전',
      }))
    );
  }, [readyToUploadPosts, setValue]);

  return (
    <div className={style.dndSectionStyle}>
      <TitleWithDescription
        title="업로드 예약 일정"
        rightTitle={readyToUploadPosts.length.toString()}
        description="개별 글의 업로드 날짜와 순서를 변경할 수 있어요"
      />
      <DndController
        initialItems={posts.data.posts}
        key={Object.values(posts.data.posts)
          .flat()
          .map((item) => `${item.id}-${item.displayOrder}-${item.status}`)
          .join(',')}
        renderDragOverlay={(activeItem) => <ContentItem {...activeItem} />}
      >
        <ScheduleTable
          agentId={Number(agentId)}
          postStatus={POST_STATUS.READY_TO_UPLOAD}
        />
      </DndController>
    </div>
  );
}
