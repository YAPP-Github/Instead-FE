import Schedule from './Schedule';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getAllPostsQueryOptions } from '@web/store/query/useGetAllPostsQuery';
import { getServerSideTokens } from '@web/shared/server/serverSideTokens';
import { SchedulePageProps } from './type';

export default function SchedulePage({ params }: SchedulePageProps) {
  const tokens = getServerSideTokens();
  const serverFetchOptions = getAllPostsQueryOptions({
    agentId: params.agentId,
    postGroupId: params.postGroupId,
    tokens,
  });

  return (
    <ServerFetchBoundary fetchOptions={serverFetchOptions}>
      <Schedule params={params} />
    </ServerFetchBoundary>
  );
}
