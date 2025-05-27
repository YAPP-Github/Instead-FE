import { EditDetail } from './EditDetail';
import { getServerSideTokens } from '@web/shared/server/serverSideTokens';
import {
  FetchOptions,
  ServerFetchBoundary,
} from '@web/store/query/ServerFetchBoundary';
import { getAllPostsQueryOptions } from '@web/store/query/useGetAllPostsQuery';
import { EditDetailPageProps } from './type';

export default function EditDetailPage({ params }: EditDetailPageProps) {
  const tokens = getServerSideTokens();
  const serverFetchOptions = [
    getAllPostsQueryOptions({
      agentId: Number(params.agentId),
      postGroupId: Number(params.postGroupId),
      tokens,
    }),
  ] as FetchOptions[];

  return (
    <ServerFetchBoundary fetchOptions={serverFetchOptions}>
      <EditDetail />
    </ServerFetchBoundary>
  );
}
