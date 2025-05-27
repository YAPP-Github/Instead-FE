import { Suspense } from 'react';
import Schedule from './Schedule';
import { SchedulePageProps } from './type';
import { getServerSideTokens } from '@web/shared/server/serverSideTokens';
import { getAgentQueryOptions } from '@web/store/query/useGetAgentQuery';
import { getUserQueryOptions } from '@web/store/query/useGetUserQuery';
import {
  FetchOptions,
  ServerFetchBoundary,
} from '@web/store/query/ServerFetchBoundary';
import { getAgentUploadReservedQueryOptions } from '@web/store/query/useGetAgentUploadReserved';
import Loading from '@web/app/loading';

export default function SchedulePage({ params }: SchedulePageProps) {
  const tokens = getServerSideTokens();

  const serverFetchOptions = [
    getAgentQueryOptions(tokens),
    getUserQueryOptions(tokens),
    getAgentUploadReservedQueryOptions({ agentId: params.agentId, tokens }),
  ] as FetchOptions[];

  return (
    <ServerFetchBoundary fetchOptions={serverFetchOptions}>
      <Suspense fallback={<Loading />}>
        <Schedule params={params} />
      </Suspense>
    </ServerFetchBoundary>
  );
}
