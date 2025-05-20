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

export default function HomeDetailPage({ params }: HomePageProps) {
  const tokens = getServerSideTokens();
  const serverFetchOptions = [
    getAgentDetailQueryOptions({
      agentId: Number(params.agentId),
      tokens,
    }),
    getAgentUploadReservedQueryOptions({
      agentId: Number(params.agentId),
      tokens,
    }),
    getAgentPostGroupsQueryOptions({
      agentId: Number(params.agentId),
      tokens,
    }),
    getAgentQueryOptions(tokens),
    getUserQueryOptions(tokens),
  ] as FetchOptions[]; // TODO 임시 타입 단언

  return (
    <ServerFetchBoundary fetchOptions={serverFetchOptions}>
      <Home params={params} />
    </ServerFetchBoundary>
  );
}
