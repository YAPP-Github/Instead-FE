export interface PostImage {
  id: number;
  postId: number;
  url: string;
}

export const POST_STATUS = {
  GENERATED: 'GENERATED',
  EDITING: 'EDITING',
  READY_TO_UPLOAD: 'READY_TO_UPLOAD',
  UPLOAD_RESERVED: 'UPLOAD_RESERVED',
  UPLOADED: 'UPLOADED',
  UPLOAD_FAILED: 'UPLOAD_FAILED',
} as const;

/**
 * 스켈레톤용 임시 상태
 */
export const SKELETON_STATUS = 'IS_LOADING';

export type PostStatus = (typeof POST_STATUS)[keyof typeof POST_STATUS];

export interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  summary: string;
  content: string;
  postImages: PostImage[];
  status: PostStatus;
  uploadTime: string;
  displayOrder?: number;
}

export type Purpose = 'INFORMATION' | 'OPINION' | 'HUMOR' | 'MARKETING';

export type Reference = 'NONE' | 'NEWS' | 'IMAGE';

export type NewsCategory =
  | 'INVEST'
  | 'STOCK'
  | 'REALESTATE'
  | 'FASHION'
  | 'TRAVEL'
  | 'BEAUTY'
  | 'FITNESS'
  | 'COOKING'
  | 'HEALTHCARE'
  | 'AI'
  | 'GAME'
  | 'APP'
  | 'SPACE'
  | 'ENVIRONMENT'
  | 'ENGINEER';

export type PostGroupLength = 'SHORT' | 'MEDIUM' | 'LONG';

export interface PostGroup {
  id: number;
  topic: string;
  purpose: Purpose;
  reference: Reference;
  newsCategory: NewsCategory | null;
  postGroupImages: PostImage[];
  length: PostGroupLength;
  content: string;
  eof: boolean;
}
