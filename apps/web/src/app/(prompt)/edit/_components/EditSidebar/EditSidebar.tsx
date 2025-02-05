'use client';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import { ContentItem } from '../ContentItem/ContentItem';
import {
  accordionContent,
  accordionTrigger,
  breadcrumbWrapper,
  contentWrapper,
  sidebarWrapper,
} from './EditSidebar.css';
import { MainBreadcrumbItem } from '@web/components/common';
import { Text } from '@repo/ui/Text';
import { Accordion } from '@repo/ui/Accordion';
import { Chip } from '@repo/ui/Chip';
import { useGroupPostsQuery } from '@web/store/query/useGroupPostsQuery';
import { POST_STATUS } from '@web/types/post';

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
              {generatedPosts.map((post) => (
                <ContentItem
                  key={post.id}
                  image={post.postImages}
                  title={post.summary}
                  updatedAt={post.updatedAt}
                  onClick={() => handleClick(post.id)}
                  onRemove={() => {}}
                  onModify={() => {}}
                  onDrag={() => {}}
                />
              ))}
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
            <Accordion.Content>
              {editingPosts.map((post) => (
                <ContentItem
                  key={post.id}
                  image={post.postImages}
                  title={post.summary}
                  updatedAt={post.updatedAt}
                  onClick={() => handleClick(post.id)}
                  onRemove={() => {}}
                  onModify={() => {}}
                  onDrag={() => {}}
                />
              ))}
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
            <Accordion.Content>
              {readyToUploadPosts.map((post) => (
                <ContentItem
                  key={post.id}
                  image={post.postImages}
                  title={post.summary}
                  updatedAt={post.updatedAt}
                  onClick={() => handleClick(post.id)}
                  onRemove={() => {}}
                  onModify={() => {}}
                  onDrag={() => {}}
                />
              ))}
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}
