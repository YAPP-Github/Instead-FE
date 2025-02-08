import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';

import { getServerSideTokens } from '@web/shared/server/serverSideTokens';

import { Log } from './Log';
import { PostHistoryQueryQueryOptions } from '@web/store/query/usePostHistoryQuery';

type LogPageProps = {
  params: { agentId: string; postGroupId: string; postId: string };
};

export default function LogPage({ params }: LogPageProps) {
  const tokens = getServerSideTokens();

  const serverFetchOptions = PostHistoryQueryQueryOptions(
    Number(params.agentId),
    Number(params.postGroupId),
    Number(params.postId),
    tokens
  );
  return (
    <ServerFetchBoundary fetchOptions={serverFetchOptions}>
      <Log />
    </ServerFetchBoundary>
  );
}
