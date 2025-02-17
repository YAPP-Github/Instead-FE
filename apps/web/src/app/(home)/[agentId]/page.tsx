import { getAgentDetailQueryOptions } from '@web/store/query/useGetAgentDetailQuery';
import Home from './Home';
import { getServerSideTokens } from '@web/shared/server/serverSideTokens';
import { getAgentPostGroupsQueryOptions } from '@web/store/query/useGetAgentPostGroupsQuery';
import { getAgentQueryOptions } from '@web/store/query/useGetAgentQuery';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { HomePageProps } from './types';

export default function HomePage({ params }: HomePageProps) {
  const tokens = getServerSideTokens();
  const serverFetchOptions = [
    getAgentDetailQueryOptions({
      agentId: 1,
      tokens,
    }),
    getAgentPostGroupsQueryOptions({
      agentId: 1,
      tokens,
    }),
    getAgentQueryOptions(tokens),
  ];

  return (
    <ServerFetchBoundary fetchOptions={serverFetchOptions}>
      <Home params={params} />
    </ServerFetchBoundary>
  );
}
