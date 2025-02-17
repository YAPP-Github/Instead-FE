/**
 * 입력된 날짜와 시간이 "N년 N월 N일 오전/오후 N시" 형식의 문자열로 반환되는 함수.
 *
 * @param inputDatetime - 변환할 날짜와 시간 (Date 객체 또는 ISO 8601 문자열)
 * @returns 예시: "2025년 2월 14일 오후 3시"
 */
export function getFormattedYearMonthDayHour(
  inputDatetime: Date | string
): string {
  const date =
    typeof inputDatetime === 'string' ? new Date(inputDatetime) : inputDatetime;

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let hours = date.getHours();
  const meridiem = hours < 12 ? '오전' : '오후';

  // 12시간제로 변환 (0시는 12시로 표현)
  hours = hours % 12;
  if (hours === 0) {
    hours = 12;
  }

  return `${year}년 ${month}월 ${day}일 ${meridiem} ${hours}시`;
}
