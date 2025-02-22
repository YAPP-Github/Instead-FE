import { useState } from 'react';
import { Post, POST_STATUS, PostStatus } from '@web/types';

export function useRandomScheduleData(
  posts: Record<PostStatus, Post[]>,
  startDate: string,
  whenValue: string
) {
  const [uploadCount, setUploadCount] = useState<string>('1');
  const [startDateState, setStartDate] = useState<string>(startDate);
  const [whenValueState, setWhenValue] = useState<string>(whenValue);
  const [readyToUploadPosts, setReadyToUploadPosts] = useState<Post[]>(
    posts[POST_STATUS.READY_TO_UPLOAD] || []
  );

  const generateRandomTimes = () => {
    const updatedPosts = readyToUploadPosts.map((post) => {
      const randomMinute = Math.floor(Math.random() * 60);
      let adjustedHour: number = 0;

      switch (true) {
        case whenValueState.includes('오전'):
          adjustedHour = Math.floor(Math.random() * 2) + 9;
          break;
        case whenValueState.includes('점심'):
          adjustedHour = Math.floor(Math.random() * 2) + 11;
          break;
        case whenValueState.includes('오후'):
          adjustedHour = Math.floor(Math.random() * 4) + 13;
          break;
        case whenValueState.includes('저녁'):
          adjustedHour = Math.floor(Math.random() * 4) + 17;
          break;
        case whenValueState.includes('밤'):
          adjustedHour = Math.floor(Math.random() * 5) + 21;
          break;
        default:
          adjustedHour = 0;
      }

      return {
        ...post,
        date: startDateState,
        hour: adjustedHour.toString(),
        minute: randomMinute.toString(),
      };
    });
    setReadyToUploadPosts(updatedPosts);
  };

  const updateSchedules = () => {
    generateRandomTimes(); // 랜덤 시간 생성
    return {
      [POST_STATUS.READY_TO_UPLOAD]: readyToUploadPosts,
      [POST_STATUS.UPLOAD_RESERVED]: [], // 필요에 따라 다른 상태의 포스트를 추가
      [POST_STATUS.EDITING]: [],
      [POST_STATUS.GENERATED]: [],
      [POST_STATUS.UPLOADED]: [],
      [POST_STATUS.UPLOAD_FAILED]: [],
    };
  };

  return {
    uploadCount,
    setUploadCount,
    startDate: startDateState,
    setStartDate,
    whenValue: whenValueState,
    setWhenValue,
    readyToUploadPosts,
    generateRandomTimes,
    updateSchedules, // 업데이트된 스케줄 반환
  };
}
