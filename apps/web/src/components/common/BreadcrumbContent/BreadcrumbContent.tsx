'use client';

import { Breadcrumb } from '@repo/ui';
import * as style from './style.css';
import { useGetAllPostsQuery } from '@web/store/query/useGetAllPostsQuery';
import { IdParams } from '@web/types';

type BreadcrumbItemContentProps = Omit<IdParams, 'postId'>;

export function BreadcrumbItemContent({
  agentId,
  postGroupId,
}: BreadcrumbItemContentProps) {
  const { data: posts } = useGetAllPostsQuery({
    agentId: Number(agentId),
    postGroupId: Number(postGroupId),
  });

  return (
    <Breadcrumb.Item active className={style.breadcrumbItemStyle}>
      {posts.data.postGroup.topic}
    </Breadcrumb.Item>
  );
}
