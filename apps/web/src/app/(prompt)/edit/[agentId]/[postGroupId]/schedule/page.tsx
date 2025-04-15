import Schedule from './Schedule';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getAllPostsQueryOptions } from '@web/store/query/useGetAllPostsQuery';
import { getServerSideTokens } from '@web/shared/server/serverSideTokens';
import { EditPageProps } from '../types';
import { Suspense } from 'react';
import Loading from '@web/app/loading';

export default function SchedulePage({ params }: EditPageProps) {
  const tokens = getServerSideTokens();
  const serverFetchOptions = getAllPostsQueryOptions({
    agentId: params.agentId,
    postGroupId: params.postGroupId,
    tokens,
  });

  return (
    <ServerFetchBoundary fetchOptions={serverFetchOptions}>
      <Suspense fallback={<Loading />}>
        <Schedule params={params} />
      </Suspense>
    </ServerFetchBoundary>
  );
}
