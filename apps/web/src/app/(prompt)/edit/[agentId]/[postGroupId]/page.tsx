import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import Edit from './Edit';
import type { EditPageProps } from './types';
import { getAllPostsQueryOptions } from '@web/store/query/useGetAllPostsQuery';
import { getServerSideTokens } from '@web/shared/server/serverSideTokens';
import { Suspense } from 'react';
import Loading from '@web/app/loading';

export default function EditPage({ params }: EditPageProps) {
  const tokens = getServerSideTokens();
  const serverFetchOptions = getAllPostsQueryOptions({
    agentId: params.agentId,
    postGroupId: params.postGroupId,
    tokens,
  });

  return (
    <ServerFetchBoundary fetchOptions={serverFetchOptions}>
      <Suspense fallback={<Loading />}>
        <Edit params={params} />
      </Suspense>
    </ServerFetchBoundary>
  );
}
