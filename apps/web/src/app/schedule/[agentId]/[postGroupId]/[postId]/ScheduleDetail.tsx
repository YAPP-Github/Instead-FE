'use client';

import * as style from './pageStyle.css';
import { useScroll } from '@web/hooks';
import { useRouter } from 'next/navigation';
import { MainBreadcrumbItem, NavBar } from '@web/components/common';
import { Badge, Breadcrumb, IconButton, Text } from '@repo/ui';
import Image from 'next/image';
import { ScheduleDetailPageProps } from './type';
import { useGetPostQuery } from '@web/store/query/useGetPostQuery';
import { isNil } from '@repo/ui/utils';
import { ROUTES } from '@web/routes';

export default function ScheduleDetail({ params }: ScheduleDetailPageProps) {
  const [scrollRef, isScrolled] = useScroll<HTMLDivElement>({ threshold: 100 });
  const router = useRouter();
  const { data: post } = useGetPostQuery({
    agentId: params.agentId,
    postGroupId: params.postGroupId,
    postId: params.postId,
  });

  if (isNil(post)) {
    router.push(ROUTES.ERROR);
    return;
  }

  return (
    <div className={style.mainStyle} ref={scrollRef}>
      <NavBar
        leftAddon={
          <Breadcrumb>
            <MainBreadcrumbItem href="/" />
            <Breadcrumb.Item active>
              {post.data.postGroup.topic}
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
            {post.data.post.summary}
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
          {post.data.post.content}
        </Text.P>
        {post.data.post.postImages.length > 0 &&
          post.data.post.postImages.map((image) => (
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
