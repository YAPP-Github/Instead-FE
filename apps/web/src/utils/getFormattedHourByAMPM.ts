/**
 * 오전, 오후에 따른 시간을 반환
 *
 * @param hour
 * @param amPm
 * @returns 오후 1시 -> "13"
 */
export function getFormattedHourByAMPM(hour: string, amPm: string) {
  const hourNum = parseInt(hour, 10);

  if (amPm === '오전') {
    // 오전 12시는 00시로 변환
    return hourNum === 12 ? '00' : hour.padStart(2, '0');
  }

  // 오후 12시는 그대로 12시, 나머지는 12를 더함
  return hourNum === 12 ? '12' : String(hourNum + 12).padStart(2, '0');
}
