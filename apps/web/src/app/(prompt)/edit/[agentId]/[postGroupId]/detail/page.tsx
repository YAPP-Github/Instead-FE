import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { EditDetail } from './EditDetail';
import { getServerSideTokens } from '@web/shared/server/serverSideTokens';
import { EditPageProps } from '../types';
import { getAllPostsQueryOptions } from '@web/store/query/useGetAllPostsQuery';

export default function EditDetailPage({ params }: EditPageProps) {
  const tokens = getServerSideTokens();
  const serverFetchOptions = getAllPostsQueryOptions({
    agentId: params.agentId,
    postGroupId: params.postGroupId,
    tokens,
  });
  return (
    <ServerFetchBoundary fetchOptions={serverFetchOptions}>
      <EditDetail />
    </ServerFetchBoundary>
  );
}
