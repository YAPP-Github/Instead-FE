'use client';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import {
  accordionContent,
  accordionTrigger,
  breadcrumbWrapper,
  contentWrapper,
  generateTrigger,
  sidebarWrapper,
} from './EditSidebar.css';
import {
  DndController,
  MainBreadcrumbItem,
  useDndController,
} from '@web/components/common';
import { Text } from '@repo/ui/Text';
import { Accordion } from '@repo/ui/Accordion';
import { Chip } from '@repo/ui/Chip';
import { Post, POST_STATUS } from '@web/types/post';
import { IconButton } from '@repo/ui/IconButton';
import { useContext, useEffect, useState } from 'react';
import { useCreateMorePostsMutation } from '@web/store/mutation/useCreateMorePostsMutation';
import { SkeletonContentItem } from '../ContentItem/SkeletonContentItem';
import { useModal, useToast } from '@repo/ui/hooks';
import { Modal } from '@repo/ui/Modal';
import { useDeletePostMutation } from '@web/store/mutation/useDeletePostMutation';
import { DetailPageContext } from '../../EditDetail';
import { DragGuide } from '../DragGuide/DragGuide';
import { ContentItem } from '@web/components/common/DNDController/compounds';
import { ROUTES } from '@web/routes';
import { useGetAllPostsQuery } from '@web/store/query/useGetAllPostsQuery';
import { useUpdatePostsMutation } from '@web/store/mutation/useUpdatePostsMutation';
import { PostId } from '@web/types';

function EditSidebarContent() {
  const modal = useModal();
  const toast = useToast();
  const { loadingPosts } = useContext(DetailPageContext);
  const { agentId, postGroupId } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const postParam = searchParams.get('postId');
  const { data: posts } = useGetAllPostsQuery({
    agentId: Number(agentId),
    postGroupId: Number(postGroupId),
  });

  const { getItemsByStatus } = useDndController();
  // TODO: param 주입 방식 수정
  const { mutate: createMorePosts, isPending: isCreateMorePostsPending } =
    useCreateMorePostsMutation({
      agentId: Number(agentId),
      postGroupId: Number(postGroupId),
    });

  const { mutateAsync: deletePost } = useDeletePostMutation({
    agentId: Number(agentId),
    postGroupId: Number(postGroupId),
  });

  const defaultValue = Object.values(posts?.data.posts)
    .flat()
    .find((post) => post.id === Number(postParam))?.status;

  const [accordionValue, setAccordionValue] = useState<
    Post['status'] | undefined
  >(defaultValue);

  useEffect(() => {
    setAccordionValue(defaultValue);
  }, [defaultValue]);

  const handleClick = (id: PostId) => {
    router.push(
      ROUTES.EDIT.DETAIL({
        agentId: Number(agentId),
        postGroupId: Number(postGroupId),
        postId: id,
      })
    );
  };

  const handlePlusClick = () => {
    setAccordionValue('EDITING');
    createMorePosts();
  };

  const handleDeletePost = (postId: Post['id']) => {
    modal.confirm({
      title: '정말 삭제하시겠어요?',
      description: '삭제된 글은 복구할 수 없어요',
      icon: <Modal.Icon name="notice" color="warning500" />,
      confirmButton: '삭제하기',
      cancelButton: '취소',
      confirmButtonProps: {
        onClick: async () => {
          await deletePost(Number(postId), {
            onSuccess: () => router.push(ROUTES.CREATE(Number(agentId))),
          });
        },
      },
    });
  };

  // TODO
  const skeletonData = Array.from({ length: 5 }).map((_, index) => ({
    id: 10000 + index,
    summary: '',
    updatedAt: '',
    uploadTime: '',
    isLoading: true,
  }));

  return (
    // TODO 중복되는 로직 컴포넌트화 할 예정
    <div className={sidebarWrapper}>
      <div className={breadcrumbWrapper}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <MainBreadcrumbItem href={ROUTES.HOME.DETAIL(Number(agentId))} />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Text fontSize={22} fontWeight="bold" color="grey900">
              {posts.data.postGroup.topic}
            </Text>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className={contentWrapper}>
        <Accordion<Post['status']>
          type="single"
          value={accordionValue}
          onValueChange={(newValue) => setAccordionValue(newValue)}
        >
          <DndController.Droppable id={POST_STATUS.GENERATED}>
            <Accordion.Item value={POST_STATUS.GENERATED}>
              <div className={generateTrigger}>
                <Accordion.Trigger className={accordionTrigger}>
                  <Chip
                    variant="grey"
                    leftAddon={
                      <Chip.Icon variant="grey" name="circle" size={12} />
                    }
                  >
                    생성된 글
                  </Chip>
                  <Text color="grey300" fontSize={16} fontWeight="semibold">
                    {getItemsByStatus(POST_STATUS.GENERATED).length}
                  </Text>
                </Accordion.Trigger>
                <IconButton
                  icon="plus"
                  onClick={handlePlusClick}
                  isLoading={isCreateMorePostsPending}
                />
              </div>
              <Accordion.Content className={accordionContent}>
                {getItemsByStatus(POST_STATUS.GENERATED).length > 0 ? (
                  <DndController.SortableList
                    items={getItemsByStatus(POST_STATUS.GENERATED).map(
                      (item) => item.id
                    )}
                  >
                    {/* TODO FIXME */}
                    {isCreateMorePostsPending &&
                      skeletonData.map((item) => (
                        <SkeletonContentItem key={item.id} />
                      ))}
                    {getItemsByStatus(POST_STATUS.GENERATED).map((item) => (
                      <DndController.Item id={item.id} key={item.id}>
                        <ContentItem
                          summary={item.summary}
                          updatedAt={item.updatedAt}
                          onRemove={() => handleDeletePost(item.id)}
                          onModify={() => handleClick(item.id)}
                          isSelected={Number(postParam) === item.id}
                          isLoading={loadingPosts.includes(item.id)}
                        />
                      </DndController.Item>
                    ))}
                  </DndController.SortableList>
                ) : (
                  <DragGuide description="+ 버튼을 눌러\n게시글을 5개 추가해보세요" />
                )}
              </Accordion.Content>
            </Accordion.Item>
          </DndController.Droppable>
          <DndController.Droppable id={POST_STATUS.EDITING}>
            <Accordion.Item value={POST_STATUS.EDITING}>
              <Accordion.Trigger className={accordionTrigger}>
                <Chip
                  variant="purple"
                  leftAddon={
                    <Chip.Icon variant="purple" name="circle" size={12} />
                  }
                >
                  수정 중인 글
                </Chip>
                <Text color="grey300" fontSize={16} fontWeight="semibold">
                  {getItemsByStatus(POST_STATUS.EDITING).length}
                </Text>
              </Accordion.Trigger>
              <Accordion.Content className={accordionContent}>
                {getItemsByStatus(POST_STATUS.EDITING).length > 0 ? (
                  <DndController.SortableList
                    items={getItemsByStatus(POST_STATUS.EDITING).map(
                      (item) => item.id
                    )}
                  >
                    {getItemsByStatus(POST_STATUS.EDITING).map((item) => (
                      <DndController.Item id={item.id} key={item.id}>
                        <ContentItem
                          summary={item.summary}
                          updatedAt={item.updatedAt}
                          onRemove={() => handleDeletePost(item.id)}
                          onModify={() => handleClick(item.id)}
                          onClick={() => handleClick(item.id)}
                          isSelected={Number(postParam) === item.id}
                          isLoading={loadingPosts.includes(item.id)}
                        />
                      </DndController.Item>
                    ))}
                  </DndController.SortableList>
                ) : (
                  <DragGuide description="수정하고 싶은 글을" />
                )}
              </Accordion.Content>
            </Accordion.Item>
          </DndController.Droppable>
          <DndController.Droppable id={POST_STATUS.READY_TO_UPLOAD}>
            <Accordion.Item value={POST_STATUS.READY_TO_UPLOAD}>
              <Accordion.Trigger className={accordionTrigger}>
                <Chip
                  variant="green"
                  leftAddon={
                    <Chip.Icon variant="green" name="circle" size={12} />
                  }
                >
                  업로드할 글
                </Chip>
                <Text color="grey300" fontSize={16} fontWeight="semibold">
                  {getItemsByStatus(POST_STATUS.READY_TO_UPLOAD).length}
                </Text>
              </Accordion.Trigger>
              <Accordion.Content className={accordionContent}>
                {getItemsByStatus(POST_STATUS.READY_TO_UPLOAD).length > 0 ? (
                  <DndController.SortableList
                    items={getItemsByStatus(POST_STATUS.READY_TO_UPLOAD).map(
                      (item) => item.id
                    )}
                  >
                    {getItemsByStatus(POST_STATUS.READY_TO_UPLOAD).map(
                      (item) => (
                        <DndController.Item id={item.id} key={item.id}>
                          <ContentItem
                            summary={item.summary}
                            updatedAt={item.updatedAt}
                            onRemove={() => handleDeletePost(item.id)}
                            onModify={() => handleClick(item.id)}
                            isSelected={Number(postParam) === item.id}
                            isLoading={loadingPosts.includes(item.id)}
                          />
                        </DndController.Item>
                      )
                    )}
                  </DndController.SortableList>
                ) : (
                  <DragGuide description="업로드가 준비된 글을" />
                )}
              </Accordion.Content>
            </Accordion.Item>
          </DndController.Droppable>
        </Accordion>
      </div>
    </div>
  );
}

export function EditSidebar() {
  const { agentId, postGroupId } = useParams();
  const { mutate: updatePosts } = useUpdatePostsMutation({
    agentId: Number(agentId),
    postGroupId: Number(postGroupId),
  });

  const { data: posts } = useGetAllPostsQuery({
    agentId: Number(agentId),
    postGroupId: Number(postGroupId),
  });

  return (
    <DndController
      initialItems={posts.data.posts}
      key={Object.values(posts.data.posts)
        .flat()
        .map((item) => `${item.id}-${item.displayOrder}-${item.status}`)
        .join(',')}
      onDragEnd={(updatedItems) => {
        const updatePayload = {
          posts: Object.values(updatedItems)
            .flat()
            .map((item) => ({
              postId: item.id,
              status: item.status,
              displayOrder: item.displayOrder,
              uploadTime: item.uploadTime,
            })),
        };
        updatePosts(updatePayload);
      }}
      renderDragOverlay={(activeItem) => (
        <ContentItem
          summary={activeItem.summary}
          updatedAt={activeItem.updatedAt}
        />
      )}
    >
      <EditSidebarContent />
    </DndController>
  );
}
