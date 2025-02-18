import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getServerSideTokens } from '@web/shared/server/serverSideTokens';
import { PersonalizePageProps } from './type';
import Personalize from './Personalize';

export default function PersonalizePage({ params }: PersonalizePageProps) {
  const tokens = getServerSideTokens();

  return <Personalize params={params} />;
}
