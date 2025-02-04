import Create from './Create';
import { newsCategoriesQueryOptions } from '@web/store/query/useNewsCategoriesQuery';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getServerSideTokens } from '@web/shared/server/serverSideTokens';

export default function CreatePage() {
  const tokens = getServerSideTokens();
  const serverFetchOptions = newsCategoriesQueryOptions(tokens);

  return (
    <ServerFetchBoundary fetchOptions={serverFetchOptions}>
      <Create />
    </ServerFetchBoundary>
  );
}
