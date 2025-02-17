import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { EditDetail } from './EditDetail';
import { getServerSideTokens } from '@web/shared/server/serverSideTokens';
import { groupPostsQueryQueryOptions } from '@web/store/query/useGroupPostsQuery';
import { EditPageProps } from '../types';

export default function EditDetailPage({ params }: EditPageProps) {
  const tokens = getServerSideTokens();
  const serverFetchOptions = groupPostsQueryQueryOptions(
    Number(params.agentId),
    Number(params.postGroupId),
    tokens
  );
  return (
    <ServerFetchBoundary fetchOptions={serverFetchOptions}>
      <EditDetail />
    </ServerFetchBoundary>
  );
}
