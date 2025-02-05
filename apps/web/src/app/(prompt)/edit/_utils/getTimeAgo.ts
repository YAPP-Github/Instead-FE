/**
 * 입력된 날짜와 시간이 현재 시간으로부터 얼마나 지났는지를 반환하는 함수.
 *
 * @param inputDatetime - 비교할 날짜와 시간 (Date 객체 또는 ISO 8601 문자열)
 * @returns 예시: "방금 전", "5분 전", "3시간 전", "2일 전", "4달 전", "1년 전"
 */
export function getTimeAgo(inputDatetime: Date | string): string {
  const inputDate =
    typeof inputDatetime === 'string' ? new Date(inputDatetime) : inputDatetime;
  const now = new Date();

  const diffInSeconds = Math.floor(
    (now.getTime() - inputDate.getTime()) / 1000
  );

  // TODO 1분 미만이면 "방금 전" 리턴할지 논의 필요
  if (diffInSeconds < 60) {
    return '1분 전';
  }

  // 1분 이상 1시간 미만
  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) {
    return `${minutes}분 전`;
  }

  // 1시간 이상 1일 미만
  const hours = Math.floor(diffInSeconds / 3600);
  if (hours < 24) {
    return `${hours}시간 전`;
  }

  // 1일 이상 30일 미만
  const days = Math.floor(diffInSeconds / 86400);
  if (days < 30) {
    return `${days}일 전`;
  }

  // 30일 이상 12달 미만
  const months = Math.floor(diffInSeconds / (86400 * 30));
  if (months < 12) {
    return `${months}달 전`;
  }

  // 1년 이상
  const years = Math.floor(diffInSeconds / (86400 * 365));
  return `${years}년 전`;
}
