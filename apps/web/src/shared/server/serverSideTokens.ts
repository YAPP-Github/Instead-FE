import { cookies } from 'next/headers';

/**
 * @description 서버에서 쿠키 가져오기
 */
export const getServerSideTokens = () => {
  const cookieStore = cookies();
  return {
    accessToken: cookieStore.get('accessToken')?.value ?? '',
    refreshToken: cookieStore.get('refreshToken')?.value ?? '',
  };
};
