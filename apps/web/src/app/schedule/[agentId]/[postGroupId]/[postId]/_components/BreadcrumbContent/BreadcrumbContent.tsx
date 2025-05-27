'use client';

import { Breadcrumb } from '@repo/ui';
import * as style from './style.css';
import { IdParams } from '@web/types';
import { useGetTopicQuery } from '@web/store/query/useGetTopicQuery';

type BreadcrumbItemContentProps = Omit<IdParams, 'postId'>;

export function BreadcrumbItemContent({
  agentId,
  postGroupId,
}: BreadcrumbItemContentProps) {
  const { data: topic } = useGetTopicQuery({
    agentId: Number(agentId),
    postGroupId: Number(postGroupId),
  });

  return (
    <Breadcrumb.Item active className={style.breadcrumbItemStyle}>
      {topic.data.topic}
    </Breadcrumb.Item>
  );
}
