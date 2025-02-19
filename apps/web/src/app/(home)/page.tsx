import Home from './Home';
import { getServerSideTokens } from '@web/shared/server/serverSideTokens';
import { getAgentQueryOptions } from '@web/store/query/useGetAgentQuery';
import {
  FetchOptions,
  ServerFetchBoundary,
} from '@web/store/query/ServerFetchBoundary';
import { getUserQueryOptions } from '@web/store/query/useGetUserQuery';

export default function HomePage() {
  const tokens = getServerSideTokens();
  const serverFetchOptions = [
    getAgentQueryOptions(tokens),
    getUserQueryOptions(tokens),
  ];

  return (
    // TODO 임시 타입 단언
    <ServerFetchBoundary fetchOptions={serverFetchOptions as FetchOptions[]}>
      <Home />
    </ServerFetchBoundary>
  );
}
