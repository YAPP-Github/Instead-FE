import ScheduleDetail from './ScheduleDetail';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getServerSideTokens } from '@web/shared/server/serverSideTokens';
import { ScheduleDetailPageProps } from './type';
import { getPostQueryOptions } from '@web/store/query/useGetPostQuery';

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

  return (
    <ServerFetchBoundary fetchOptions={serverFetchOptions}>
      <ScheduleDetail params={params} />
    </ServerFetchBoundary>
  );
}
