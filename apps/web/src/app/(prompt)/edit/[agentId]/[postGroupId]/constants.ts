import { Post } from '@web/types';
import { POST_STATUS } from '@web/types/post';

//MEMO: 임시 더미
export const INITIAL_CONTENT_ITEMS: Post[] = [
  {
    id: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    summary: '경제 기초 지식 1에 대한 요약',
    content: '경제 기초 지식 1의 상세 내용',
    postImages: [
      {
        id: 1,
        postId: 1,
        url: 'https://example.com/image1.jpg',
      },
    ],
    status: POST_STATUS.GENERATED,
    uploadTime: new Date().toISOString(),
  },
  {
    id: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    summary: '경제 기초 지식 2에 대한 요약',
    content: '경제 기초 지식 2의 상세 내용',
    postImages: [],
    status: POST_STATUS.GENERATED,
    uploadTime: new Date().toISOString(),
  },
  {
    id: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    summary: '경제 기초 지식 3에 대한 요약',
    content: '경제 기초 지식 3의 상세 내용',
    postImages: [],
    status: POST_STATUS.GENERATED,
    uploadTime: new Date().toISOString(),
  },
  {
    id: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    summary: '경제 기초 지식 4에 대한 요약',
    content: '경제 기초 지식 4의 상세 내용',
    postImages: [],
    status: POST_STATUS.GENERATED,
    uploadTime: new Date().toISOString(),
  },
  {
    id: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    summary: '경제 기초 지식 5에 대한 요약',
    content: '경제 기초 지식 5의 상세 내용',
    postImages: [],
    status: POST_STATUS.GENERATED,
    uploadTime: new Date().toISOString(),
  },
];
