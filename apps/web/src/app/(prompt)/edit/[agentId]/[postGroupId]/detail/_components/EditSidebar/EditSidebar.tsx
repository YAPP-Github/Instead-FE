'use client';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import {
  accordionContent,
  accordionTrigger,
  breadcrumbWrapper,
  contentWrapper,
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
import { useGroupPostsQuery } from '@web/store/query/useGroupPostsQuery';
import { POST_STATUS } from '@web/types/post';

function EditSidebarContent() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams(); // ?post=3 같은 쿼리 파라미터
  const postParam = searchParams.get('post'); // '3' (string) or null

  const { data } = useGroupPostsQuery(1, Number(id));
  const posts = data?.data.posts ?? [];
  const { getItemsByStatus, handleRemove } = useDndController();

  const generatedPosts = posts.filter(
    (post) => post.status === POST_STATUS.GENERATED
  );
  const editingPosts = posts.filter(
    (post) => post.status === POST_STATUS.EDITING
  );
  const readyToUploadPosts = posts.filter(
    (post) => post.status === POST_STATUS.READY_TO_UPLOAD
  );

  const defaultValue = posts.find(
    (post) => post.id === Number(postParam)
  )?.status;

  const handleClick = (postId: number) => {
    // 기존 searchParams를 복사해서 새로운 URLSearchParams 인스턴스 생성
    router.push(`?post=${postId}`);
    console.log(postId);
  };

  return (
    <div className={sidebarWrapper}>
      <div className={breadcrumbWrapper}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <MainBreadcrumbItem href="/create" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Text fontSize={22} fontWeight="bold" color="grey900">
              {data?.data?.postGroup.topic}
            </Text>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className={contentWrapper}>
        <Accordion type="single" defaultValue={defaultValue}>
          <Accordion.Item value={POST_STATUS.GENERATED}>
            <Accordion.Trigger className={accordionTrigger}>
              <Chip
                variant="grey"
                leftAddon={<Chip.Icon variant="grey" name="circle" />}
              >
                생성된 글
              </Chip>
              <Text color="grey300" fontSize={16} fontWeight="semibold">
                {generatedPosts.length}
              </Text>
            </Accordion.Trigger>
            <Accordion.Content className={accordionContent}>
              <DndController.Droppable id={POST_STATUS.GENERATED}>
                <DndController.SortableList
                  items={getItemsByStatus(POST_STATUS.GENERATED).map(
                    (item) => item.id
                  )}
                >
                  {getItemsByStatus(POST_STATUS.GENERATED).map((item) => (
                    <DndController.Item
                      key={item.id}
                      id={item.id}
                      summary={item.summary}
                      updatedAt={item.updatedAt}
                      onRemove={() => handleRemove(item.id)}
                      onModify={() => {}}
                      onClick={() => handleClick(item.id)}
                    />
                  ))}
                </DndController.SortableList>
              </DndController.Droppable>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value={POST_STATUS.EDITING}>
            <Accordion.Trigger className={accordionTrigger}>
              <Chip
                variant="purple"
                leftAddon={<Chip.Icon variant="purple" name="circle" />}
              >
                수정 중인 글
              </Chip>
              <Text color="grey300" fontSize={16} fontWeight="semibold">
                {editingPosts.length}
              </Text>
            </Accordion.Trigger>
            <Accordion.Content className={accordionContent}>
              <DndController.Droppable id={POST_STATUS.EDITING}>
                <DndController.SortableList
                  items={getItemsByStatus(POST_STATUS.EDITING).map(
                    (item) => item.id
                  )}
                >
                  {getItemsByStatus(POST_STATUS.EDITING).map((item) => (
                    <DndController.Item
                      key={item.id}
                      id={item.id}
                      summary={item.summary}
                      updatedAt={item.updatedAt}
                      onRemove={() => handleRemove(item.id)}
                      onModify={() => {}}
                    />
                  ))}
                </DndController.SortableList>
              </DndController.Droppable>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value={POST_STATUS.READY_TO_UPLOAD}>
            <Accordion.Trigger className={accordionTrigger}>
              <Chip
                variant="green"
                leftAddon={<Chip.Icon variant="green" name="circle" />}
              >
                업로드할 글
              </Chip>
              <Text color="grey300" fontSize={16} fontWeight="semibold">
                {readyToUploadPosts.length}
              </Text>
            </Accordion.Trigger>
            <Accordion.Content className={accordionContent}>
              <DndController.Droppable id={POST_STATUS.READY_TO_UPLOAD}>
                <DndController.SortableList
                  items={getItemsByStatus(POST_STATUS.READY_TO_UPLOAD).map(
                    (item) => item.id
                  )}
                >
                  {getItemsByStatus(POST_STATUS.READY_TO_UPLOAD).map((item) => (
                    <DndController.Item
                      key={item.id}
                      id={item.id}
                      summary={item.summary}
                      updatedAt={item.updatedAt}
                      onRemove={() => handleRemove(item.id)}
                      onModify={() => {}}
                    />
                  ))}
                </DndController.SortableList>
              </DndController.Droppable>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export function EditSidebar() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams(); // ?post=3 같은 쿼리 파라미터
  const postParam = searchParams.get('post'); // '3' (string) or null

  const { data } = useGroupPostsQuery(1, Number(id));
  const posts = data?.data.posts ?? [];

  const generatedPosts = posts.filter(
    (post) => post.status === POST_STATUS.GENERATED
  );
  const editingPosts = posts.filter(
    (post) => post.status === POST_STATUS.EDITING
  );
  const readyToUploadPosts = posts.filter(
    (post) => post.status === POST_STATUS.READY_TO_UPLOAD
  );

  const defaultValue = posts.find(
    (post) => post.id === Number(postParam)
  )?.status;

  return (
    <DndController
      initialItems={posts}
      onDragEnd={(items) => {
        console.log('=== Current Items Status ===');
        const itemsByStatus = {
          GENERATED: items.filter((item) => item.status === 'GENERATED'),
          EDITING: items.filter((item) => item.status === 'EDITING'),
          READY_TO_UPLOAD: items.filter(
            (item) => item.status === 'READY_TO_UPLOAD'
          ),
        };
        console.log('GENERATED:', itemsByStatus.GENERATED);
        console.log('EDITING:', itemsByStatus.EDITING);
        console.log('READY_TO_UPLOAD:', itemsByStatus.READY_TO_UPLOAD);
        console.log('========================');
      }}
    >
      <EditSidebarContent />
    </DndController>
  );
}
