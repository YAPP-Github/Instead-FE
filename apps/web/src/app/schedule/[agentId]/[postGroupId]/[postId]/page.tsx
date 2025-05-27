import ScheduleDetail from './ScheduleDetail';
import {
  FetchOptions,
  ServerFetchBoundary,
} from '@web/store/query/ServerFetchBoundary';
import { getServerSideTokens } from '@web/shared/server/serverSideTokens';
import { ScheduleDetailPageProps } from './type';
import { getPostQueryOptions } from '@web/store/query/useGetPostQuery';
import { getTopicQueryOptions } from '@web/store/query/useGetTopicQuery';

export default function ScheduleDetailPage({
  params,
}: ScheduleDetailPageProps) {
  const tokens = getServerSideTokens();
  const serverFetchOptions = [
    getPostQueryOptions({
      agentId: Number(params.agentId),
      postGroupId: Number(params.postGroupId),
      postId: Number(params.postId),
      tokens,
    }),
    getTopicQueryOptions({
      agentId: Number(params.agentId),
      postGroupId: Number(params.postGroupId),
      tokens,
    }),
  ] as FetchOptions[];

  return (
    <ServerFetchBoundary fetchOptions={serverFetchOptions}>
      <ScheduleDetail params={params} />
    </ServerFetchBoundary>
  );
}
