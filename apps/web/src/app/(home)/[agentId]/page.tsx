import { getAgentDetailQueryOptions } from '@web/store/query/useGetAgentDetailQuery';
import Home from './Home';
import { getServerSideTokens } from '@web/shared/server/serverSideTokens';
import { getAgentPostGroupsQueryOptions } from '@web/store/query/useGetAgentPostGroupsQuery';
import { getAgentQueryOptions } from '@web/store/query/useGetAgentQuery';
import {
  FetchOptions,
  ServerFetchBoundary,
} from '@web/store/query/ServerFetchBoundary';
import { HomePageProps } from './types';
import { getUserQueryOptions } from '@web/store/query/useGetUserQuery';
import { getAgentUploadReservedQueryOptions } from '@web/store/query/useGetAgentUploadReserved';
import { Suspense } from 'react';
import Loading from '@web/app/loading';

export default function HomeDetailPage({ params }: HomePageProps) {
  const tokens = getServerSideTokens();
  const serverFetchOptions = [
    getAgentDetailQueryOptions({
      agentId: params.agentId,
      tokens,
    }),
    getAgentUploadReservedQueryOptions({
      agentId: params.agentId,
      tokens,
    }),
    getAgentPostGroupsQueryOptions({
      agentId: params.agentId,
      tokens,
    }),
    getAgentQueryOptions(tokens),
    getUserQueryOptions(tokens),
  ];

  return (
    <ServerFetchBoundary fetchOptions={serverFetchOptions as FetchOptions[]}>
      <Suspense fallback={<Loading />}>
        <Home params={params} />
      </Suspense>
    </ServerFetchBoundary>
  );
}
