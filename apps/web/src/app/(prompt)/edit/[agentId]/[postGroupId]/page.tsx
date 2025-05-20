import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import Edit from './Edit';
import type { EditPageProps } from './types';
import { getAllPostsQueryOptions } from '@web/store/query/useGetAllPostsQuery';
import { getServerSideTokens } from '@web/shared/server/serverSideTokens';

export default function EditPage({ params }: EditPageProps) {
  const tokens = getServerSideTokens();
  const serverFetchOptions = getAllPostsQueryOptions({
    agentId: Number(params.agentId),
    postGroupId: Number(params.postGroupId),
    tokens,
  });

  return (
    <ServerFetchBoundary fetchOptions={serverFetchOptions}>
      <Edit params={params} />
    </ServerFetchBoundary>
  );
}
