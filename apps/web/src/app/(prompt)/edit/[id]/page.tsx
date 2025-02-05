import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { EditDetail } from './EditDetail';
import { getServerSideTokens } from '@web/shared/server/serverSideTokens';
import { groupPostsQueryQueryOptions } from '@web/store/query/useGroupPostsQuery';

type EditDetailPageProps = {
  params: { id: string }; // Dynamic Route param
};

export default function EditDetailPage({ params }: EditDetailPageProps) {
  const tokens = getServerSideTokens();
  const serverFetchOptions = groupPostsQueryQueryOptions(
    1,
    Number(params.id),
    tokens
  );
  return (
    <ServerFetchBoundary fetchOptions={serverFetchOptions}>
      <EditDetail />
    </ServerFetchBoundary>
  );
}
