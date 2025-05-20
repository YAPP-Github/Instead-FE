'use client';

import { useGetAgentUploadReservedQuery } from '@web/store/query/useGetAgentUploadReserved';
import { DndController } from '@web/components/common';
import { IdParams, POST_STATUS } from '@web/types';
import { TitleWithDescription } from '@web/components/common/TitleWithDescription/TitleWithDescription';
import { ScheduleTable } from '@web/components/schedule/ScheduleTable/ScheduleTable';
import { ContentItem } from '@web/components/common/DNDController/compounds';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { useUpdateReservedPostsMutation } from '@web/store/mutation/useUpdateReservedPostsMutation';
import * as style from './style.css';
import { parseTime } from '@web/utils';
import { getCurrentDateKo } from '@web/utils';
import { ScheduleFormValues } from '../../type';

type ScheduleContentProps = {
  agentId: IdParams['agentId'];
};

export function ScheduleContent({ agentId }: ScheduleContentProps) {
  const { data: reservedPosts } = useGetAgentUploadReservedQuery({
    agentId,
  });
  const { mutate: updateReservedPosts } =
    useUpdateReservedPostsMutation(agentId);
  const { setValue, getValues } = useFormContext<ScheduleFormValues>();

  useEffect(() => {
    setValue(
      'schedules',
      reservedPosts.posts.map((post) => {
        const parsedTime = parseTime(post.uploadTime);
        return {
          postId: post.id,
          date: parsedTime?.date || getCurrentDateKo() || '',
          hour: parsedTime?.hour ?? '00',
          minute: parsedTime?.minute ?? '00',
        };
      })
    );
  }, [reservedPosts.posts, setValue]);

  return (
    <div className={style.dndSectionStyle}>
      <TitleWithDescription
        title="업로드 예약 일정"
        rightTitle={reservedPosts.posts.length.toString()}
        description="개별 글의 업로드 날짜와 순서를 변경할 수 있어요"
      />
      <DndController
        initialItems={{
          [POST_STATUS.GENERATED]: [],
          [POST_STATUS.EDITING]: [],
          [POST_STATUS.READY_TO_UPLOAD]: [],
          [POST_STATUS.UPLOAD_RESERVED]: reservedPosts.posts,
          [POST_STATUS.UPLOAD_CONFIRMED]: [],
          [POST_STATUS.UPLOADED]: [],
          [POST_STATUS.UPLOAD_FAILED]: [],
        }}
        key={reservedPosts.posts
          .map((item) => `${item.id}-${item.displayOrder}-${item.status}`)
          .join(',')}
        onDragEnd={(updatedItems) => {
          const formValues = getValues('schedules');
          const updatePayload = {
            posts: updatedItems[POST_STATUS.UPLOAD_RESERVED]
              .map((item, index) => {
                const schedule = formValues[index];
                if (!schedule) return null;

                return {
                  postId: item.id,
                  postGroupId: item.postGroupId,
                  uploadTime: `${schedule.date}T${schedule.hour}:${schedule.minute}:00.000Z`,
                };
              })
              .filter(
                (item): item is NonNullable<typeof item> => item !== null
              ),
          };
          updateReservedPosts(updatePayload);
        }}
        renderDragOverlay={(activeItem) => <ContentItem {...activeItem} />}
      >
        <ScheduleTable
          agentId={Number(agentId)}
          postStatus={POST_STATUS.UPLOAD_RESERVED}
        />
      </DndController>
    </div>
  );
}
