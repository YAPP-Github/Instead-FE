import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

/**
 * @description 서버에서 쿠키 가져오기
 */
export const getServerSideTokens = () => ({
  accessToken: String(getCookie('accessToken', { cookies })) || '',
  refreshToken: String(getCookie('refreshToken', { cookies })) || '',
});
