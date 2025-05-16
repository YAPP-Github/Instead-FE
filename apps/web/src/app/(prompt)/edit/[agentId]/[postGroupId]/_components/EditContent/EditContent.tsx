'use client';

import { Button, Chip, Icon, Accordion, Modal, TextField } from '@repo/ui';
import { Post, POST_STATUS } from '@web/types/post';
import { DndController, useDndController } from '@web/components/common';
import { useCreateMorePostsMutation } from '@web/store/mutation/useCreateMorePostsMutation';
import { useDeletePostMutation } from '@web/store/mutation/useDeletePostMutation';
import { useRouter } from 'next/navigation';
import { useModal } from '@repo/ui/hooks';
import { FormProvider, useForm } from 'react-hook-form';
import { EditPageProps } from '../../types';
import * as style from './EditContent.css';
import { DragGuide } from '../DragGuide/DragGuide';
import {
  UpdatePromptRequest,
  useUpdateMultiplePromptMutation,
} from '@web/store/mutation/useUpdateMultiplePromptMutation';
import { ContentItem } from '@web/components/common/DNDController/compounds';
import { ROUTES } from '@web/routes';
import { dndItem } from './EditContent.css';
import { SkeletonContentItem } from '../SkeletonContentItem/SkeletonContentItem';

type PromptForm = UpdatePromptRequest;

export function EditContent({ params }: EditPageProps) {
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
    useCreateMorePostsMutation(params);

  const { mutate: updatePrompt, isPending: isUpdatePromptPending } =
    useUpdateMultiplePromptMutation(params);

  const { mutate: deletePost } = useDeletePostMutation(params);

  const router = useRouter();

  const handleModify = (postId: Post['id']) => {
    router.push(
      ROUTES.EDIT.DETAIL({
        agentId: params.agentId,
        postGroupId: params.postGroupId,
        postId,
      })
    );
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
            <Chip
              variant="grey"
              leftAddon={
                <Chip.Icon variant="grey" name="circle" size={'1.2rem'} />
              }
            >
              생성된 글
            </Chip>
          </Accordion.Trigger>
          <Accordion.Content id={POST_STATUS.GENERATED}>
            <div className={style.contentInnerWrapper}>
              <DndController.Droppable id={POST_STATUS.GENERATED}>
                <DndController.SortableList
                  items={getItemsByStatus(POST_STATUS.GENERATED).map(
                    (item) => item.id
                  )}
                >
                  {getItemsByStatus(POST_STATUS.GENERATED).map((item) => (
                    <DndController.Item
                      className={dndItem}
                      id={item.id}
                      key={item.id}
                    >
                      <ContentItem
                        summary={item.summary}
                        updatedAt={item.updatedAt}
                        onRemove={() => handleDeletePost(item.id)}
                        onModify={() => handleModify(item.id)}
                        onClick={() => handleModify(item.id)}
                        isLoading={item?.isLoading ?? false}
                      />
                    </DndController.Item>
                  ))}
                </DndController.SortableList>
              </DndController.Droppable>
              {isCreateMorePostsPending && <SkeletonContentItem length={5} />}
            </div>
            <div className={style.buttonWrapperStyle}>
              <Button
                type="submit"
                size="large"
                variant="line"
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
            <Chip
              variant="purple"
              leftAddon={
                <Chip.Icon variant="purple" name="circle" size={'1.2rem'} />
              }
            >
              수정 중인 글
            </Chip>
          </Accordion.Trigger>
          <Accordion.Content id={POST_STATUS.EDITING}>
            {isUpdatePromptPending ? (
              <SkeletonContentItem
                length={getItemsByStatus(POST_STATUS.EDITING).length}
              />
            ) : (
              <DndController.Droppable id={POST_STATUS.EDITING}>
                <DndController.SortableList
                  items={getItemsByStatus(POST_STATUS.EDITING).map(
                    (item) => item.id
                  )}
                >
                  {isExistEditingPost && (
                    <FormProvider {...methods}>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField variant="white">
                          <TextField.Input
                            {...register('prompt')}
                            value={promptValue}
                            onChange={(e) => setValue('prompt', e.target.value)}
                            placeholder="AI에게 요청하여 수정 중인 글 모두 업그레이드하기"
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
                        className={dndItem}
                        id={item.id}
                        key={item.id}
                      >
                        <ContentItem
                          summary={item.summary}
                          updatedAt={item.updatedAt}
                          onRemove={() => handleDeletePost(item.id)}
                          onModify={() => handleModify(item.id)}
                          onClick={() => handleModify(item.id)}
                        />
                      </DndController.Item>
                    ))
                  ) : (
                    <DragGuide description="수정 중인 글을 끌어서 여기에 놓아주세요" />
                  )}
                </DndController.SortableList>
              </DndController.Droppable>
            )}
          </Accordion.Content>
        </Accordion.Item>

        {/* 업로드할 글 영역 */}
        <Accordion.Item
          value={POST_STATUS.READY_TO_UPLOAD}
          className={style.accordionItemStyle}
        >
          <Accordion.Trigger className={style.accordionTriggerStyle}>
            <Chip
              variant="orange"
              leftAddon={
                <Chip.Icon variant="orange" name="circle" size={'1.2rem'} />
              }
            >
              업로드할 글
            </Chip>
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
                      className={dndItem}
                      id={item.id}
                      key={item.id}
                    >
                      <ContentItem
                        summary={item.summary}
                        updatedAt={item.updatedAt}
                        onRemove={() => handleDeletePost(item.id)}
                        onModify={() => handleModify(item.id)}
                        onClick={() => handleModify(item.id)}
                      />
                    </DndController.Item>
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
