import { PURPOSE_TYPE, REFERENCE_TYPE, LENGTH_TYPE } from './constants';

export type PurposeType = (typeof PURPOSE_TYPE)[keyof typeof PURPOSE_TYPE];

export type ReferenceType =
  (typeof REFERENCE_TYPE)[keyof typeof REFERENCE_TYPE];

export type LengthType = (typeof LENGTH_TYPE)[keyof typeof LENGTH_TYPE];

export interface CreateFormValues {
  topic: string;
  purpose: PurposeType;
  reference: ReferenceType;
  newsCategory?: string;
  imageUrls?: string[];
  length: LengthType;
  content: string;
}
