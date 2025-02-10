'use client';

import { useScroll } from '@web/hooks';
import * as style from './pageStyle.css';
import { NavBar, MainBreadcrumbItem } from '@web/components/common';
import { Breadcrumb, Button, Icon } from '@repo/ui';
import { POST_STATUS } from '@web/types/post';
import { DndController } from '@web/components/common';
import { EditPageParams } from './types';
import { useGetAllPostsQuery } from '@web/store/query/useGetAllPostsQuery';
import { useUpdatePostsMutation } from '@web/store/mutation/useUpdatePostsMutation';
import { useRouter } from 'next/navigation';
import { EditContent } from './_components/EditContent/EditContent';
import { ContentItem } from '@web/components/common/DNDController/compounds';

export default function Edit({ agentId, postGroupId }: EditPageParams) {
  const [scrollRef, isScrolled] = useScroll<HTMLDivElement>({ threshold: 100 });
  const { data: posts } = useGetAllPostsQuery({
    agentId,
    postGroupId,
  });
  const { mutate: updatePosts } = useUpdatePostsMutation({
    agentId,
    postGroupId,
  });
  const router = useRouter();

  /**
   * READY_TO_UPLOAD 상태인 게시물이 있는지 확인
   */
  const hasReadyToUploadPosts = posts.data.posts.some(
    (post) => post.status === POST_STATUS.READY_TO_UPLOAD
  );

  return (
    <div className={style.mainStyle} ref={scrollRef}>
      <NavBar
        leftAddon={
          <Breadcrumb>
            <MainBreadcrumbItem href="/" />
            <Breadcrumb.Item active>
              {posts.data.postGroup.topic}
            </Breadcrumb.Item>
          </Breadcrumb>
        }
        rightAddon={
          <Button
            type="submit"
            size="large"
            variant="primary"
            leftAddon={<Icon name="checkCalendar" size={20} />}
            onClick={() =>
              router.push(`/edit/${agentId}/${postGroupId}/schedule`)
            }
            disabled={!hasReadyToUploadPosts}
            className={style.submitButtonStyle}
          >
            예약하러 가기
          </Button>
        }
        isScrolled={isScrolled}
      />
      <DndController
        initialItems={posts.data.posts}
        key={posts.data.posts.map((p) => p.id).join(',')}
        onDragEnd={(updatedItems) => {
          const updatePayload = {
            posts: updatedItems.map((item) => ({
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
        <EditContent agentId={agentId} postGroupId={postGroupId} />
      </DndController>
    </div>
  );
}
