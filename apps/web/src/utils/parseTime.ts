/**
 * @param uploadTime - 변환할 날짜와 시간 (Date 객체 또는 ISO 8601 문자열)
 * @returns 예시: { date: '2025-02-14', hour: '15', minute: '30' }
 */
export function parseTime(uploadTime?: string) {
  if (!uploadTime) {
    return null;
  }

  const dateTime = new Date(uploadTime);
  return {
    date: dateTime.toISOString().split('T')[0],
    hour: dateTime.getUTCHours().toString().padStart(2, '0'),
    minute: dateTime.getUTCMinutes().toString().padStart(2, '0'),
  };
}
