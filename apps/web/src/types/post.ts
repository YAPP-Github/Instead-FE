import { PostGroupId, PostId } from './id';

export interface PostImage {
  id: number;
  postId: PostId;
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

export type PostStatus = (typeof POST_STATUS)[keyof typeof POST_STATUS];

export const POST_REFERENCE = {
  NONE: 'NONE',
  NEWS: 'NEWS',
  IMAGE: 'IMAGE',
} as const;

export const POST_LENGTH = {
  SHORT: 'SHORT',
  MEDIUM: 'MEDIUM',
  LONG: 'LONG',
};

export interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  summary: string;
  content: string;
  postImages: PostImage[];
  status: PostStatus;
  uploadTime: string;
  displayOrder: number;
  isLoading?: boolean;
}

export interface CreatedPost {
  postGroupId: PostGroupId;
  eof: boolean;
  posts: Post[];
}

export type Purpose = 'INFORMATION' | 'OPINION' | 'HUMOR' | 'MARKETING';

export const POST_PURPOSE = {
  INFORMATION: { code: 'INFORMATION', label: '정보 제공' },
  OPINION: { code: 'OPINION', label: '의견 표출' },
  HUMOR: { code: 'HUMOR', label: '공감/유머' },
  MARKETING: { code: 'MARKETING', label: '홍보/마케팅' },
} as const;

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
  postGroupImages: PostImage[] | null;
  length: PostGroupLength;
  content: string;
  eof: boolean;
}

export type HomePostGroup = Omit<PostGroup, 'postGroupImages'> & {
  thumbnailImageUrl: string;
  createdAt: string;
};
