/**
 * 입력된 날짜와 시간이 현재 시간으로부터 몇 분 전인지 계산하는 함수
 *
 * @param inputDatetime - 비교할 날짜와 시간 (Date 객체 또는 ISO 8601 문자열)
 * @returns minutes
 */
export function getMinutesAgo(inputDatetime: Date | string): number {
  const inputDate =
    typeof inputDatetime === 'string' ? new Date(inputDatetime) : inputDatetime;

  const now = new Date();

  const timeDifference = now.getTime() - inputDate.getTime();

  const minutes = Math.floor(timeDifference / (1000 * 60));

  return minutes;
}
