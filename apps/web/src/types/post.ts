export interface PostImage {
  id: number;
  postId: number;
  url: string;
}

export interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  summary: string;
  content: string;
  postImages: PostImage[];
  status: string;
  uploadTime: string;
}
