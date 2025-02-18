import { IdParams } from '@web/types';

export type PersonalizePageProps = {
  params: Pick<IdParams, 'agentId'>;
};

export interface PersonalizeFormValues {
  domain: string;
  introduction: string;
  tone: string;
  customTone: string;
}
