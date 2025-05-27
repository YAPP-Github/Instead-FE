'use client';

import {
  getAgentUploadReservedQueryOptions,
  useGetAgentUploadReservedQuery,
} from '@web/store/query/useGetAgentUploadReserved';
import { DndController } from '@web/components/common';
import { IdParams, Post, POST_STATUS } from '@web/types';
import { TitleWithDescription } from '@web/components/common/TitleWithDescription/TitleWithDescription';
import { ScheduleTable } from '@web/components/schedule/ScheduleTable/ScheduleTable';
import { ContentItem } from '@web/components/common/DNDController/compounds';
import { useForm, FormProvider } from 'react-hook-form';
import { useUpdateReservedPostsMutation } from '@web/store/mutation/useUpdateReservedPostsMutation';
import * as style from './style.css';
import { parseTime } from '@web/utils';
import { getCurrentDateKo } from '@web/utils';
import { ScheduleFormValues } from '../../type';
import { useQueryClient } from '@tanstack/react-query';

type ScheduleContentProps = {
  agentId: IdParams['agentId'];
};

export function ScheduleContent({ agentId }: ScheduleContentProps) {
  const queryClient = useQueryClient();

  const { data: reservedPosts } = useGetAgentUploadReservedQuery({
    agentId: Number(agentId),
  });

  const { mutate: updateReservedPosts } = useUpdateReservedPostsMutation(
    Number(agentId)
  );

  const methods = useForm<ScheduleFormValues>({
    defaultValues: {
      schedules: reservedPosts.posts.map(mapPostToSchedule),
    },
  });

  if (!reservedPosts) return null;

  return (
    <FormProvider {...methods}>
      <form className={style.dndSectionStyle}>
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
            [POST_STATUS.UPLOAD_RESERVED]: [],
            [POST_STATUS.UPLOAD_CONFIRMED]:
              reservedPosts.posts.map(mapPostToSchedule),
            [POST_STATUS.UPLOADED]: [],
            [POST_STATUS.UPLOAD_FAILED]: [],
          }}
          key={reservedPosts.posts
            .map((item) => `${item.id}-${item.displayOrder}-${item.status}`)
            .join(',')}
          onDragEnd={(updatedItems) => {
            const formValues = methods.getValues('schedules');
            console.log(updatedItems);
            const updatePayload = {
              posts: updatedItems[POST_STATUS.UPLOAD_CONFIRMED]
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
            updateReservedPosts(updatePayload, {
              onSuccess: () => {
                queryClient.invalidateQueries(
                  getAgentUploadReservedQueryOptions({
                    agentId: Number(agentId),
                  })
                );
              },
            });
          }}
          renderDragOverlay={(activeItem) => <ContentItem {...activeItem} />}
        >
          <ScheduleTable
            agentId={Number(agentId)}
            postStatus={POST_STATUS.UPLOAD_CONFIRMED}
          />
        </DndController>
      </form>
    </FormProvider>
  );
}

function mapPostToSchedule(post: Post) {
  const parsedTime = parseTime(post.uploadTime);
  return {
    ...post,
    postId: post.id,
    date: parsedTime?.date || getCurrentDateKo() || '',
    hour: parsedTime?.hour ?? '12',
    minute: parsedTime?.minute ?? '00',
    amPm: parsedTime?.amPm ?? '오전',
  };
}
