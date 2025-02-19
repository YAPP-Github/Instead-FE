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

export default function HomePage({ params }: HomePageProps) {
  const tokens = getServerSideTokens();
  const serverFetchOptions = [
    getAgentDetailQueryOptions({
      agentId: params.agentId,
      tokens,
    }),
    getAgentPostGroupsQueryOptions({
      agentId: params.agentId,
      tokens,
    }),
    getAgentQueryOptions(tokens),
  ];

  return (
    // TODO 임시 타입 단언
    <ServerFetchBoundary fetchOptions={serverFetchOptions as FetchOptions[]}>
      <Home params={params} />
    </ServerFetchBoundary>
  );
}
