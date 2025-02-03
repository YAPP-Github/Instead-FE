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

export interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  summary: string;
  content: string;
  postImages: PostImage[];
  status: PostStatus;
  uploadTime: string;
}
