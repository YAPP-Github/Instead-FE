import { IdParams } from '@web/types';

export type PersonalizePageProps = {
  params: Pick<IdParams, 'agentId'>;
};

export interface PersonalizeFormValues {
  domain: string;
  introduction: string;
  tone: (typeof TONE_OPTIONS)[keyof typeof TONE_OPTIONS];
  customTone: string;
}

export const TONE_OPTIONS = {
  CASUAL: 'CASUAL',
  LESS_FORMAL: 'LESS_FORMAL',
  MORE_FORMAL: 'MORE_FORMAL',
  CUSTOM: 'CUSTOM',
} as const;

export const TONE_OPTIONS_KEYS = Object.keys(TONE_OPTIONS);
