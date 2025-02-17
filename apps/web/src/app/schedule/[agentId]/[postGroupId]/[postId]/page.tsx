import ScheduleDetail from './ScheduleDetail';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getServerSideTokens } from '@web/shared/server/serverSideTokens';
import { ScheduleDetailPageProps } from './type';
import { getPostQueryOptions } from '@web/store/query/useGetPostQuery';
import { getAllPostsQueryOptions } from '@web/store/query/useGetAllPostsQuery';

export default function ScheduleDetailPage({
  params,
}: ScheduleDetailPageProps) {
  const tokens = getServerSideTokens();
  const serverFetchOptions = getPostQueryOptions({
    agentId: params.agentId,
    postGroupId: params.postGroupId,
    postId: params.postId,
    tokens,
  });

  const serverFetchOption2 = getAllPostsQueryOptions({
    agentId: params.agentId,
    postGroupId: params.postGroupId,
    tokens,
  });

  return (
    <ServerFetchBoundary
      fetchOptions={[serverFetchOptions, serverFetchOption2]}
    >
      <ScheduleDetail params={params} />
    </ServerFetchBoundary>
  );
}
