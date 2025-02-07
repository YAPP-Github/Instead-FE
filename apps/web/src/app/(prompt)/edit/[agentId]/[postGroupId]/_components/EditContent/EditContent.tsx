'use client';

import { Button, Chip, Icon, Accordion, Modal, TextField } from '@repo/ui';
import { Post, POST_STATUS } from '@web/types/post';
import { DndController, useDndController } from '@web/components/common';
import { useCreateMorePostsMutation } from '@web/store/mutation/useCreateMorePostsMutation';
import { useDeletePostMutation } from '@web/store/mutation/useDeletePostMutation';
import { useRouter } from 'next/navigation';
import { useModal } from '@repo/ui/hooks';
import { FormProvider, useForm } from 'react-hook-form';
import { EditPageParams } from '../../types';
import * as style from './EditContent.css';
import { DragGuide } from '../DragGuide/DragGuide';
import {
  UpdatePromptRequest,
  useUpdatePromptMutation,
} from '@web/store/mutation/useUpdatePromptMutation';
import { useMemo } from 'react';

type PromptForm = UpdatePromptRequest;

export function EditContent({ agentId, postGroupId }: EditPageParams) {
  const modal = useModal();
  const { getItemsByStatus } = useDndController();
  const isExistEditingPost = getItemsByStatus(POST_STATUS.EDITING).length > 0;
  const methods = useForm<PromptForm>({
    defaultValues: {
      prompt: '',
    },
  });
  const { register, handleSubmit, watch, setValue } = methods;
  const promptValue = watch('prompt');

  const { mutate: createMorePosts, isPending: isCreateMorePostsPending } =
    useCreateMorePostsMutation({
      agentId,
      postGroupId,
    });

  const { mutate: updatePrompt, isPending: isUpdatePromptPending } =
    useUpdatePromptMutation({
      agentId,
      postGroupId,
    });

  const { mutate: deletePost } = useDeletePostMutation({
    agentId,
    postGroupId,
  });

  const router = useRouter();

  const handleModify = (postId: Post['id']) => {
    router.push(`/edit/${agentId}/${postGroupId}/detail?postId=${postId}`);
  };

  const handleDeletePost = (postId: Post['id']) => {
    modal.confirm({
      title: '정말 삭제하시겠어요?',
      description: '삭제된 글은 복구할 수 없어요',
      icon: <Modal.Icon name="notice" color="warning500" />,
      confirmButton: '삭제하기',
      cancelButton: '취소',
      confirmButtonProps: {
        onClick: () => {
          deletePost(postId);
        },
      },
    });
  };

  const onSubmit = (data: PromptForm) => {
    const editingPostIds = getItemsByStatus(POST_STATUS.EDITING).map(
      (item) => item.id
    );

    updatePrompt({
      prompt: data.prompt,
      postsId: editingPostIds,
    });
    setValue('prompt', '');
  };

  const skeletonData = Array.from({ length: 5 }).map((_, index) => ({
    id: 10000 + index,
    summary: '',
    updatedAt: '',
    uploadTime: '',
    isLoading: true,
  }));

  /**
   * 스켈레톤을 추가하기 위해 생성된 글 데이터를 가져와 로딩 상태일 때 스켈레톤 데이터를 붙인다.
   */
  const data = useMemo(() => {
    if (isCreateMorePostsPending) {
      return [...getItemsByStatus(POST_STATUS.GENERATED), ...skeletonData];
    }
    return getItemsByStatus(POST_STATUS.GENERATED);
  }, [isCreateMorePostsPending, getItemsByStatus, skeletonData]);

  return (
    <div className={style.contentStyle}>
      <Accordion
        type="multiple"
        defaultValue={[
          POST_STATUS.GENERATED,
          POST_STATUS.EDITING,
          POST_STATUS.READY_TO_UPLOAD,
        ]}
        className={style.accordionStyle}
      >
        {/* 생성된 글 영역 */}
        <Accordion.Item
          value={POST_STATUS.GENERATED}
          className={style.accordionItemStyle}
        >
          <Accordion.Trigger className={style.accordionTriggerStyle}>
            <Chip variant="grey">생성된 글</Chip>
          </Accordion.Trigger>
          <Accordion.Content
            id={POST_STATUS.GENERATED}
            className={style.accordionContentStyle}
          >
            <div className={style.contentInnerWrapper}>
              <DndController.Droppable id={POST_STATUS.GENERATED}>
                <DndController.SortableList items={data.map((item) => item.id)}>
                  {data.map((item) => (
                    <DndController.Item
                      key={item.id}
                      id={item.id}
                      summary={item.summary}
                      updatedAt={item.updatedAt}
                      onRemove={() => handleDeletePost(item.id)}
                      onModify={() => handleModify(item.id)}
                      isLoading={item?.isLoading ?? false}
                    />
                  ))}
                </DndController.SortableList>
              </DndController.Droppable>
            </div>
            <div className={style.buttonWrapperStyle}>
              <Button
                type="submit"
                size="large"
                variant="primary"
                leftAddon={<Icon name="twinkle" size={20} color="primary800" />}
                onClick={() => createMorePosts()}
                isLoading={isCreateMorePostsPending}
              >
                5개 더 생성하기
              </Button>
            </div>
          </Accordion.Content>
        </Accordion.Item>

        {/* 수정 중인 글 영역 */}
        <Accordion.Item
          value={POST_STATUS.EDITING}
          className={style.accordionItemStyle}
        >
          <Accordion.Trigger className={style.accordionTriggerStyle}>
            <Chip variant="purple">수정 중인 글</Chip>
          </Accordion.Trigger>
          <Accordion.Content id={POST_STATUS.EDITING}>
            <DndController.Droppable id={POST_STATUS.EDITING}>
              <DndController.SortableList
                items={getItemsByStatus(POST_STATUS.EDITING)
                  .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
                  .map((item) => item.id)}
              >
                {isExistEditingPost && (
                  <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <TextField variant="white">
                        <TextField.Input
                          {...register('prompt')}
                          value={promptValue}
                          onChange={(e) => setValue('prompt', e.target.value)}
                          placeholder="AI에게 요청하여 글 업그레이드하기"
                          sumbitButton={
                            <TextField.Submit
                              type="submit"
                              disabled={isUpdatePromptPending}
                            />
                          }
                          maxLength={5000}
                        />
                      </TextField>
                    </form>
                  </FormProvider>
                )}
                {isExistEditingPost ? (
                  getItemsByStatus(POST_STATUS.EDITING).map((item) => (
                    <DndController.Item
                      key={item.id}
                      id={item.id}
                      summary={item.summary}
                      updatedAt={item.updatedAt}
                      onRemove={() => handleDeletePost(item.id)}
                      onModify={() => handleModify(item.id)}
                      isLoading={isUpdatePromptPending}
                    />
                  ))
                ) : (
                  <DragGuide description="수정 중인 글을 끌어서 여기에 놓아주세요" />
                )}
              </DndController.SortableList>
            </DndController.Droppable>
          </Accordion.Content>
        </Accordion.Item>

        {/* 업로드할 글 영역 */}
        <Accordion.Item
          value={POST_STATUS.READY_TO_UPLOAD}
          className={style.accordionItemStyle}
        >
          <Accordion.Trigger className={style.accordionTriggerStyle}>
            <Chip variant="green">업로드할 글</Chip>
          </Accordion.Trigger>
          <Accordion.Content id={POST_STATUS.READY_TO_UPLOAD}>
            <DndController.Droppable id={POST_STATUS.READY_TO_UPLOAD}>
              <DndController.SortableList
                items={getItemsByStatus(POST_STATUS.READY_TO_UPLOAD).map(
                  (item) => item.id
                )}
              >
                {getItemsByStatus(POST_STATUS.READY_TO_UPLOAD).length > 0 ? (
                  getItemsByStatus(POST_STATUS.READY_TO_UPLOAD).map((item) => (
                    <DndController.Item
                      key={item.id}
                      id={item.id}
                      summary={item.summary}
                      updatedAt={item.updatedAt}
                      onRemove={() => handleDeletePost(item.id)}
                      onModify={() => handleModify(item.id)}
                    />
                  ))
                ) : (
                  <DragGuide description="업로드가 준비된 글을 끌어서 여기에 놓아주세요" />
                )}
              </DndController.SortableList>
            </DndController.Droppable>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
