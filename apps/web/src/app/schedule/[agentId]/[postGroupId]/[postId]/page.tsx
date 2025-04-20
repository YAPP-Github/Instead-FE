import ScheduleDetail from './ScheduleDetail';
import {
  FetchOptions,
  ServerFetchBoundary,
} from '@web/store/query/ServerFetchBoundary';
import { getServerSideTokens } from '@web/shared/server/serverSideTokens';
import { ScheduleDetailPageProps } from './type';
import { getPostQueryOptions } from '@web/store/query/useGetPostQuery';
import { getTopicQueryOptions } from '@web/store/query/useGetTopicQuery';
import { Suspense } from 'react';
import Loading from '@web/app/loading';

export default function ScheduleDetailPage({
  params,
}: ScheduleDetailPageProps) {
  const tokens = getServerSideTokens();
  const serverFetchOptions = [
    getPostQueryOptions({
      agentId: params.agentId,
      postGroupId: params.postGroupId,
      postId: params.postId,
      tokens,
    }),
    getTopicQueryOptions({
      agentId: params.agentId,
      postGroupId: params.postGroupId,
      tokens,
    }),
  ] as FetchOptions[];

  return (
    <ServerFetchBoundary fetchOptions={serverFetchOptions}>
      <Suspense fallback={<Loading />}>
        <ScheduleDetail params={params} />
      </Suspense>
    </ServerFetchBoundary>
  );
}
