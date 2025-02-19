/**
 * 입력된 날짜와 시간이 "N월 N일 오전/오후 N시 N분" 형식의 문자열로 반환되는 함수.
 *
 * @param inputDatetime - 변환할 날짜와 시간 (Date 객체 또는 ISO 8601 문자열)
 * @returns 예시: "2월 14일 오후 3시 45분"
 */
export function getFormattedDatetime(inputDatetime: Date | string): string {
  const date =
    typeof inputDatetime === 'string' ? new Date(inputDatetime) : inputDatetime;

  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 24시간제를 12시간제로 변환
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // 오전/오후 구분
  const meridiem = hours < 12 ? '오전' : '오후';

  // 12시간제로 변환 (0시는 12시로 표현)
  hours = hours % 12;
  if (hours === 0) {
    hours = 12;
  }

  return `${month}월 ${day}일 ${meridiem} ${hours}시 ${minutes}분`;
}
