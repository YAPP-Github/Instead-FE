/**
 * @param uploadTime - 변환할 날짜와 시간 (Date 객체 또는 ISO 8601 문자열)
 * @returns 예시: { date: '2025-02-14', hour: '03', minute: '30', amPm: '오후' }
 */
export function parseTime(time?: string) {
  if (!time) {
    return null;
  }

  const dateTime = new Date(time);
  const localHour = dateTime.getHours();
  const hour12 = localHour % 12 === 0 ? 12 : localHour % 12;
  const amPm = localHour < 12 ? '오전' : '오후';
  return {
    date: dateTime.toISOString().split('T')[0],
    hour: hour12.toString().padStart(2, '0'),
    minute: dateTime.getMinutes().toString().padStart(2, '0'),
    amPm,
  };
}
