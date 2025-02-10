'use client';

import { ScheduleDetailProps } from './type';
import * as style from './pageStyle.css';
import { useScroll } from '@web/hooks';
import { useRouter } from 'next/navigation';
import { MainBreadcrumbItem, NavBar } from '@web/components/common';
import { Badge, Breadcrumb, IconButton, Text } from '@repo/ui';
import { useGetAllPostsQuery } from '@web/store/query/useGetAllPostsQuery';
import { useToast } from '@repo/ui/hooks';
import Image from 'next/image';
export default function ScheduleDetail({ params }: ScheduleDetailProps) {
  const [scrollRef, isScrolled] = useScroll<HTMLDivElement>({ threshold: 100 });
  const router = useRouter();
  const toast = useToast();
  const { data: posts } = useGetAllPostsQuery({
    agentId: params.agentId,
    postGroupId: params.postGroupId,
  });

  const currentPost = posts.data.posts.find(
    (post) => post.id === Number(params.id)
  );

  if (!currentPost) {
    //TODO: error 페이지 사용하기
    toast.error('존재하지 않는 포스트입니다.');
    return;
  }

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
          <div className={style.buttonWrapperStyle}>
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
            {currentPost.summary}
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
          {currentPost.content}
        </Text.P>
        {currentPost.postImages.length > 0 &&
          currentPost.postImages.map((image) => (
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
