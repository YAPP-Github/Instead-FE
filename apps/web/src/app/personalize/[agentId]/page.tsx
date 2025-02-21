import {
  FetchOptions,
  ServerFetchBoundary,
} from '@web/store/query/ServerFetchBoundary';
import { getServerSideTokens } from '@web/shared/server/serverSideTokens';
import { PersonalizePageProps } from './type';
import { getAgentQueryOptions } from '@web/store/query/useGetAgentQuery';
import { getUserQueryOptions } from '@web/store/query/useGetUserQuery';
import Personalize from './Personalize';
import { getAgentDetailQueryOptions } from '@web/store/query/useGetAgentDetailQuery';

export default function PersonalizePage({ params }: PersonalizePageProps) {
  const tokens = getServerSideTokens();

  const serverFetchOptions = [
    getAgentQueryOptions(tokens),
    getUserQueryOptions(tokens),
    getAgentDetailQueryOptions({ agentId: params.agentId, tokens }),
  ] as FetchOptions[];

  return (
    <ServerFetchBoundary fetchOptions={serverFetchOptions}>
      <Personalize params={params} />
    </ServerFetchBoundary>
  );
}
