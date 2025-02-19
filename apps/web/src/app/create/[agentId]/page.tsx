import Create from './Create';
import { newsCategoriesQueryOptions } from '@web/store/query/useNewsCategoriesQuery';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getServerSideTokens } from '@web/shared/server/serverSideTokens';
import { CreatePageProps } from './types';

export default function CreatePage({ params }: CreatePageProps) {
  const tokens = getServerSideTokens();
  const serverFetchOptions = newsCategoriesQueryOptions(tokens);

  return (
    <ServerFetchBoundary fetchOptions={serverFetchOptions}>
      <Create params={params} />
    </ServerFetchBoundary>
  );
}
