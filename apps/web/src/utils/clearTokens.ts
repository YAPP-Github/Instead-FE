import { deleteCookie } from 'cookies-next';

export const clearClientSideTokens = () => {
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
};
