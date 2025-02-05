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

type PostStatus = (typeof POST_STATUS)[keyof typeof POST_STATUS];

export const POST_PURPOSE = {
  INFORMATION: 'INFORMATION',
  OPINION: 'OPINION',
  HUMOR: 'HUMOR',
  MARKETING: 'MARKETING',
} as const;

type PostPurpose = (typeof POST_PURPOSE)[keyof typeof POST_PURPOSE];

export const POST_REFERENCE = {
  NONE: 'NONE',
  NEWS: 'NEWS',
  IMAGE: 'IMAGE',
} as const;

type PostReference = (typeof POST_REFERENCE)[keyof typeof POST_REFERENCE];

export const POST_LENGTH = {
  SHORT: 'SHORT',
  MEDIUM: 'MEDIUM',
  LONG: 'LONG',
};

type PostLength = (typeof POST_LENGTH)[keyof typeof POST_LENGTH];

export interface PostGroup {
  id: number;
  topic: string;
  purpose: PostPurpose;
  reference: PostReference;
  newsCategory: string;
  imageUrls: string[];
  length: PostLength;
  content: string;
}

export interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  displayOrder: number;
  summary: string;
  content: string;
  postImages: PostImage[];
  status: PostStatus;
  uploadTime: string;
}
