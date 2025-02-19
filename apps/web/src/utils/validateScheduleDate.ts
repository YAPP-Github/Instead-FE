/**
 * 예약 날짜와 시간이 현재 시점 이후인지 검증하는 함수
 *
 * @param date - 예약 날짜 (YYYY-MM-DD 형식)
 * @param hour - 시간 (00-23)
 * @param minute - 분 (00-59)
 * @returns 유효한 날짜/시간이면 true, 아니면 false
 */
export function validateScheduleDate(
  date: string,
  hour: string,
  minute: string
): boolean {
  const now = new Date();
  const scheduleDate = new Date(`${date}T${hour}:${minute}:00`);

  // 현재 시간보다 이후인지 확인
  return scheduleDate > now;
}
