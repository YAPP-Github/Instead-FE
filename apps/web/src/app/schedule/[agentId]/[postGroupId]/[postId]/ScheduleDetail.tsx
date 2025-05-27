'use client';

import * as style from './pageStyle.css';
import { useScroll } from '@web/hooks';
import { useRouter } from 'next/navigation';
import { MainBreadcrumbItem, NavBar } from '@web/components/common';
import {
  Badge,
  Breadcrumb,
  Dropdown,
  Icon,
  IconButton,
  Modal,
  Text,
} from '@repo/ui';
import Image from 'next/image';
import { ScheduleDetailPageProps } from './type';
import { getPostQueryOptions } from '@web/store/query/useGetPostQuery';
import { isNil } from '@repo/ui/utils';
import { ROUTES } from '@web/routes';
import { getTopicQueryOptions } from '@web/store/query/useGetTopicQuery';
import { useDeletePostMutation } from '@web/store/mutation/useDeletePostMutation';
import { useModal } from '@repo/ui/hooks';
import { useSuspenseQueries } from '@tanstack/react-query';

export default function ScheduleDetail({ params }: ScheduleDetailPageProps) {
  const [scrollRef, isScrolled] = useScroll<HTMLDivElement>({ threshold: 100 });
  const router = useRouter();
  const modal = useModal();

  const [{ data: post }, { data: topic }] = useSuspenseQueries({
    queries: [
      getPostQueryOptions({
        agentId: Number(params.agentId),
        postGroupId: Number(params.postGroupId),
        postId: Number(params.postId),
      }),
      getTopicQueryOptions({
        agentId: Number(params.agentId),
        postGroupId: Number(params.postGroupId),
      }),
    ],
  });

  const { mutate: deletePost } = useDeletePostMutation({
    agentId: Number(params.agentId),
    postGroupId: Number(params.postGroupId),
  });

  if (isNil(post)) {
    router.push(ROUTES.ERROR);
    return;
  }

  const handleDeletePost = () => {
    modal.confirm({
      title: '정말 삭제하시겠어요?',
      description: '삭제된 글은 복구할 수 없어요',
      icon: <Modal.Icon name="notice" color="warning500" />,
      confirmButton: '삭제하기',
      cancelButton: '취소',
      confirmButtonProps: {
        onClick: async () => {
          deletePost(Number(params.postId), {
            onSuccess: () => router.back(),
          });
        },
      },
    });
  };

  return (
    <div className={style.mainStyle} ref={scrollRef}>
      <NavBar
        leftAddon={
          <Breadcrumb>
            <MainBreadcrumbItem href={ROUTES.HOME.DETAIL(params.agentId)} />
            <Breadcrumb.Item active className={style.breadcrumbItemStyle}>
              {topic.data.topic}
            </Breadcrumb.Item>
          </Breadcrumb>
        }
        rightAddon={
          <div className={style.buttonWrapperStyle}>
            <Dropdown>
              <Dropdown.Trigger>
                <IconButton icon="dots" />
              </Dropdown.Trigger>
              <Dropdown.Content align="right">
                <Dropdown.Item
                  value="option1"
                  className={style.dropdownItem}
                  onClick={handleDeletePost}
                >
                  <Icon name="trash" size="2.4rem" color="grey400" />
                  <Text fontSize={18} fontWeight="medium" color="grey1000">
                    삭제하기
                  </Text>
                </Dropdown.Item>
              </Dropdown.Content>
            </Dropdown>
            <IconButton
              icon="x"
              iconType="stroke"
              onClick={() => router.back()}
            />
          </div>
        }
        isScrolled={isScrolled}
      />
      <div className={style.contentWrapperStyle}>
        <div className={style.titleSectionStyle}>
          <Text.H1 fontSize={28} fontWeight="bold" color="grey1000">
            {post.data.summary}
          </Text.H1>
          <Badge size="large" variant="neutral" shape="square">
            요약
          </Badge>
        </div>
        <Text.P
          fontSize={18}
          fontWeight="medium"
          color="grey800"
          className={style.contentStyle}
        >
          {post.data.content}
        </Text.P>
        {post.data.postImages.length > 0 &&
          post.data.postImages.map((image) => (
            <div key={image.id} className={style.imageWrapperStyle}>
              <Image
                src={image.url}
                alt={`업로드 예정인 이미지 ${image.id}`}
                width={185.5}
                height={240}
                className={style.imageStyle}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
