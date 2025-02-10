import ScheduleDetail from './ScheduleDetail';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getAllPostsQueryOptions } from '@web/store/query/useGetAllPostsQuery';
import { getServerSideTokens } from '@web/shared/server/serverSideTokens';
import { ScheduleDetailProps } from './type';

export default function ScheduleDetailPage({ params }: ScheduleDetailProps) {
  const tokens = getServerSideTokens();
  const serverFetchOptions = getAllPostsQueryOptions({
    agentId: params.agentId,
    postGroupId: params.postGroupId,
    tokens,
  });

  return (
    <ServerFetchBoundary fetchOptions={serverFetchOptions}>
      <ScheduleDetail params={params} />
    </ServerFetchBoundary>
  );
}
