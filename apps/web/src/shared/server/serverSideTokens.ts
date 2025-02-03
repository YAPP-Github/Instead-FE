import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

/**
 * @description 서버에서 쿠키 가져오기
 */
export const getServerSideTokens = () => ({
  accessToken: getCookie('accessToken', { cookies })?.toString() ?? '',
  refreshToken: getCookie('refreshToken', { cookies })?.toString() ?? '',
});
